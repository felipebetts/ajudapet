import { localStorageKeyToken, _baseUrl } from "../utils/constants";

export function client(endpoint, { body, ...customConfig } = {}) {
  const token = window.localStorage.getItem(localStorageKeyToken);
  const headers = { 'content-type': 'application/json' };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };
  if (body) {
    config.body = JSON.stringify(body);
  }

  return window
    .fetch(`${_baseUrl}/${endpoint}`, config)
    .then(r => r.json());
}

