type APIMethod = "GET" | 'POST' | 'PATCH' | 'DELETE'

interface Request {
  method: APIMethod,
  headers: {
    'Authorization': string
    'Content-Type'?: string
  },
  body?: string
}

export const fetchWithAuth = async (
  url: string, method: APIMethod, body?: object
  ): Promise<any> => {
    const token = localStorage.getItem('_product_ive_token')

    const request: Request = {
      method,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }

    if ( method !== 'GET' && method !== 'DELETE' ) {
      request.headers['Content-Type'] = 'application/json'
      request.body = JSON.stringify(body)
    }

    const response = await fetch(url, request as object)
    return await response.json()
}

