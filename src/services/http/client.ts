export type HttpClient = {
  get<T>(path: string, init?: RequestInit): Promise<T>
}

function joinUrl(baseUrl: string, path: string): string {
  const base = baseUrl.replace(/\/$/, '')
  if (path.startsWith('http')) return path
  const p = path.startsWith('/') ? path : `/${path}`
  return `${base}${p}`
}

export function createHttpClient(baseUrl: string): HttpClient {
  return {
    async get<T>(path: string, init?: RequestInit): Promise<T> {
      const url = joinUrl(baseUrl, path)
      const res = await fetch(url, {
        ...init,
        method: 'GET',
        headers: {
          Accept: 'application/json',
          ...init?.headers,
        },
      })
      if (!res.ok) {
        const text = await res.text().catch(() => '')
        throw new Error(`HTTP ${res.status}: ${res.statusText}${text ? ` — ${text.slice(0, 200)}` : ''}`)
      }
      return res.json() as Promise<T>
    },
  }
}
