import { formatRelative } from 'date-fns'
import { ru } from 'date-fns/locale'

// Шаблон для запросов
export const customFetch = async (
  url: RequestInfo, 
  method = 'GET', 
  body: string = null, 
  headers: {[name: string]: string} = { 'Content-Type': 'application/json' }
  ) => {
  const res: Response = await (fetch(url, {method, body, headers}))
  const data = await res.json()
  if (res.ok) return data
  return Promise.reject(data)
}

// Возвращает статус заказа в нужном формате
export const getStatus = (code: string) => {
  switch (code) {
    case 'done':
      return 'Выполнен'
    case 'pending':
      return 'В работе'
    case 'created':
      return 'Создан'
  }
}

// Возвращает дату в нужном формате
export const getDate = (date: string) => {
  if (date) return formatRelative(new Date(date), new Date(), { locale: ru })
      .split(' в ')
      .join(', ') + ' GMT+3'
}