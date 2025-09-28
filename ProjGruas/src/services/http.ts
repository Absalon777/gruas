import Constants from 'expo-constants';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || (Constants?.expoConfig as any)?.extra?.apiUrl;

export class HttpError extends Error {
  status: number;
  data: any;
  constructor(message: string, status: number, data: any) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

async function withTimeout<T>(promise: Promise<T>, ms = 10000): Promise<T> {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  const timer = new Promise<never>((_, reject) => {
    timeout = setTimeout(() => reject(new Error('Request timed out')), ms);
  });
  try {
    return await Promise.race([promise, timer]);
  } finally {
    if (timeout) clearTimeout(timeout);
  }
}

export async function httpGet<T>(path: string): Promise<T> {
  if (!BASE_URL) throw new Error('EXPO_PUBLIC_API_URL no está configurada');
  const url = `${BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
  const res = await withTimeout(fetch(url));
  const data = await res.json().catch(() => undefined);
  if (!res.ok) {
    throw new HttpError(`GET ${url} failed`, res.status, data);
  }
  return data as T;
}

export async function httpPost<T, B = any>(path: string, body: B): Promise<T> {
  if (!BASE_URL) throw new Error('EXPO_PUBLIC_API_URL no está configurada');
  const url = `${BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
  const res = await withTimeout(fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }));
  const data = await res.json().catch(() => undefined);
  if (!res.ok) {
    throw new HttpError(`POST ${url} failed`, res.status, data);
  }
  return data as T;
}
