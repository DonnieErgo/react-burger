export const useHttp = () => {
  const request = async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {
    try {
      const res = await fetch(url, {method, headers, body});
      if (!res.ok) { throw new Error(`Fetching ${url} failed. Status is ${res.status}`) }
      const data = await res.json();
      return data;
    } catch(e) { throw e }
  }
  return {request}
}