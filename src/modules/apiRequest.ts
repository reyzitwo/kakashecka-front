type ApiEndpoint = "users";
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

async function api(endpoint: ApiEndpoint, method: HttpMethod, params?: object) {
  const data = await fetch(`${import.meta.env.VITE_BACKEND_URL}/${endpoint}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  return await data.json();
}

export default api;
