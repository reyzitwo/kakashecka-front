type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

async function api(endpoint: string, method: HttpMethod, params?: object) {
  const data = await fetch(`${import.meta.env.VITE_BACKEND_URL}/${endpoint}`, {
    method: method,
    headers: {
      authorization: `Bearer ${
        window.location.href
          .slice(window.location.href.indexOf("?") + 1)
          .split("#")[0]
      }`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  const json = await data.json();

  return json.data ?? false;
}

export default api;
