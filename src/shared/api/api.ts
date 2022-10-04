import { fetchData, processInputData, sendRequestAgain } from "./helpers";
import { RequestConfig, FetchConfig } from "./interfaces";

function post<Response>(path: string, body: object, config?: RequestConfig): Promise<Response> {
  const { url, changedHeaders } = processInputData(path, config);
  const requestParameters: FetchConfig = {
    method: "POST",
    body: JSON.stringify(body),
    headers: changedHeaders,
  };

  return fetchData(url, requestParameters).catch((err) => sendRequestAgain(err, requestParameters, url));
}

function get<Response>(path: string, config?: RequestConfig): Promise<Response> {
  if (config?.params) {
    path = path + "?" + new URLSearchParams(Object.entries(config.params)).toString();
  }
  const { url, changedHeaders } = processInputData(path, config);
  const requestParameters: FetchConfig = {
    method: "GET",
    headers: changedHeaders,
  };

  return fetchData(url, requestParameters).catch((err) => sendRequestAgain(err, requestParameters, url));
}

function remove(path: string, config?: RequestConfig): Promise<void> {
  const { url, changedHeaders } = processInputData(path, config);
  const requestParameters: FetchConfig = {
    method: "DELETE",
    headers: changedHeaders,
  };

  return fetchData(url, requestParameters).catch((err) => sendRequestAgain(err, requestParameters, url));
}

function put<Response>(path: string, body: object, config?: RequestConfig): Promise<Response> {
  const { url, changedHeaders } = processInputData(path, config);
  const requestParameters: FetchConfig = {
    method: "PUT",
    headers: changedHeaders,
    body: JSON.stringify(body),
  };

  return fetchData(url, requestParameters).catch((err) => sendRequestAgain(err, requestParameters, url));
}

export const api = {
  post: post,
  get: get,
  delete: remove,
  put: put,
  patch: {}, //3 parameters: path, body, config is optional
};
