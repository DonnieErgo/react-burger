import { saveData } from '../slices/feed'
import { AnyAction } from 'redux'
import { actions } from '../slices/websocket'

export const wsMiddleware = (wsActions: typeof actions) => {
  return (store: { dispatch: any }) => {
    let socket: WebSocket | null = null

    return (next: (action: AnyAction) => void) => (action: AnyAction) => {

      const{ wsStart, wsStop, wsSuccess, wsError, wsClosed } = wsActions
      const { dispatch } = store
      const { type, payload } = action

      if (type === wsStart.type) {
        const wsUrl: string = payload.token ? `${payload.url}?token=${payload.token}` : `${payload.url}`   
        socket = new WebSocket(wsUrl)
      }

      if (type === wsStop.type) socket && socket.close(1000, 'CLOSE_NORMAL')

      if (socket) {

        socket.onopen = () => dispatch(wsSuccess())

        socket.onmessage = e => {
          const { data } = e
          const { success, ...parsedData } = JSON.parse(data)
          if (success) dispatch(saveData(parsedData))
        }

        socket.onerror = () => dispatch(wsError())

        socket.onclose = () => dispatch(wsClosed())
      }

      next(action)
    }
  }
}