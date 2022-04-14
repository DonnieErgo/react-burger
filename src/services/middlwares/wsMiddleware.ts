import { wsStart, wsStop, wsSuccess, wsError, wsClosed } from '../slices/websocket'
import { saveData } from '../slices/feed'

export const wsMiddleware = () => {
  return store => {
    let socket = null

    return next => action => {

      const { dispatch } = store
      const { type, payload } = action

      if (type === wsStart.type) {
        const wsUrl = payload.token ? `${payload.url}?token=${payload.token}` : `${payload.url}`   
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