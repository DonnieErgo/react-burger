export const checkResponse = async (res) => {
  const body = await res.json()
  if (res.ok) { return body } 
  return Promise.reject(body)
}

export const checkStatus = code => {
  switch (code) {
    case 'done':
      return 'Выполнен'
    case 'pending':
      return 'В работе'
    case 'created':
      return 'Создан'
  }
}