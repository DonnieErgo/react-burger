import { formatRelative } from 'date-fns'
import { ru } from 'date-fns/locale'

// Проверяет ответ на fetch-запрос
export const checkResponse = async (res) => {
  const body = await res.json()
  if (res.ok) { return body } 
  return Promise.reject(body)
}

// Возвращает статус заказа в нужном формате
export const getStatus = code => {
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
export const getDate = date => {
  if (date) return formatRelative(new Date(date), new Date(), { locale: ru })
      .split(' в ')
      .join(', ') + ' i-GMT+3'
}