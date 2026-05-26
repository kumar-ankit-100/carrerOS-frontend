import axios, { AxiosError, AxiosRequestConfig } from "axios";

const BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000/api/v1";

const ACCESS_KEY = "iw_access";
const REFRESH_KEY = "iw_refresh";

let accessToken: string | null = null;
let refreshToken: string | null = null;
let refreshPromise: Promise<void> | null = null;
let onUnauthorized: (() => void) | null = null;

if (typeof window !== "undefined") {
  accessToken = localStorage.getItem(ACCESS_KEY);
  refreshToken = localStorage.getItem(REFRESH_KEY);
}

export function setTokens(a: string | null, r: string | null) {
  accessToken = a;
  refreshToken = r;
  if (typeof window === "undefined") return;
  if (a && r) {
    localStorage.setItem(ACCESS_KEY, a);
    localStorage.setItem(REFRESH_KEY, r);
  } else {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
  }
}

export function getAccessToken() {
  return accessToken;
}

export function setUnauthorizedHandler(fn: (() => void) | null) {
  onUnauthorized = fn;
}

export const api = axios.create({ baseURL: BASE });

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers = config.headers ?? {};
    (config.headers as Record<string, string>).Authorization =
      `Bearer ${accessToken}`;
  }
  return config;
});

async function rotate(): Promise<void> {
  if (!refreshToken) throw new Error("No refresh token");
  if (!refreshPromise) {
    refreshPromise = axios
      .post(`${BASE}/auth/refresh`, { refreshToken })
      .then((r) => {
        const payload = r.data?.data ?? r.data;
        setTokens(payload.accessToken, payload.refreshToken);
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

api.interceptors.response.use(
  (r) => r,
  async (error: AxiosError) => {
    const cfg = error.config as AxiosRequestConfig & { _retried?: boolean };
    if (error.response?.status === 401 && !cfg?._retried && refreshToken) {
      cfg._retried = true;
      try {
        await rotate();
        return api.request(cfg);
      } catch {
        setTokens(null, null);
        onUnauthorized?.();
      }
    }
    return Promise.reject(error);
  }
);

// Unwrap response envelope { data, meta? }
function unwrap<T>(payload: unknown): T {
  if (payload && typeof payload === "object" && "data" in (payload as object)) {
    return (payload as { data: T }).data;
  }
  return payload as T;
}

export async function apiGet<T>(url: string, cfg?: AxiosRequestConfig) {
  const r = await api.get(url, cfg);
  return unwrap<T>(r.data);
}
export async function apiPost<T>(
  url: string,
  body?: unknown,
  cfg?: AxiosRequestConfig
) {
  const r = await api.post(url, body, cfg);
  return unwrap<T>(r.data);
}
export async function apiPatch<T>(
  url: string,
  body?: unknown,
  cfg?: AxiosRequestConfig
) {
  const r = await api.patch(url, body, cfg);
  return unwrap<T>(r.data);
}
export async function apiDelete(url: string, cfg?: AxiosRequestConfig) {
  await api.delete(url, cfg);
}

export async function apiGetPage<T>(url: string, cfg?: AxiosRequestConfig) {
  const r = await api.get(url, cfg);
  const payload = r.data;
  const data = (payload?.data ?? payload) as T[];
  const meta = payload?.meta ?? { nextCursor: null, hasMore: false };
  return { data, meta } as {
    data: T[];
    meta: { nextCursor: string | null; hasMore: boolean };
  };
}
