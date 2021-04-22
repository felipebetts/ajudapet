import { localStorageKeyToken, _baseUrl } from "../utils/constants";

export function client(endpoint, { body, ...customConfig } = {}) {
  const token = window.localStorage.getItem(localStorageKeyToken);
  const headers = { 'content-type': 'application/json' };
  console.log(customConfig)
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  // console.log(headers)
  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };
  // console.log(config.headers)
  if (body) {
    config.body = JSON.stringify(body);
  }

  return window
    .fetch(`${_baseUrl}/${endpoint}`, config)
    .then(r => r.json());
}

