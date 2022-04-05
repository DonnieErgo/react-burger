export const baseUrl = 'https://norma.nomoreparties.space/api/'

export const checkResponse = async (res) => {
  const body = await res.json()
  if (res.ok) { return body } 
  return Promise.reject(body)
}