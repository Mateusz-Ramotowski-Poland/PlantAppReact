export interface RequestConfig {
  headers?: HeadersInit;
  body?: BodyInit;
  params?: object;
}

export interface FetchConfig extends RequestConfig {
  method: "POST" | "GET" | "PATCH" | "DELETE" | "PUT";
}

export interface Response {
  status: number;
}
