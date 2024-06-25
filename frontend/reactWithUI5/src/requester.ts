// src/api.ts

export interface RequestOptions {
  method: "GET" | "POST" | "PUT" | "DELETE";
  headers?: { [key: string]: string };
  body?: any;
}
const baseUrl = "https://swapi.dev/api/";
export async function requester<T>(
  url: string = "",
  options: RequestOptions = { method: "GET" }
): Promise<T> {
  const { method, headers, body } = options;

  const response = await fetch(`${baseUrl}${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}
