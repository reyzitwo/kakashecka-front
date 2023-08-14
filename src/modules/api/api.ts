// @ts-nocheck

import apiRequest from "./apiRequest";

import methods from "src/modules/api/methods.json";
import APIProps from "src/modules/api/interfaces";

interface MethodConfig {
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
}

class API {
  constructor() {
    for (const methodName in methods) {
      const methodConfig = methods[methodName] as MethodConfig;

      // если есть вложенные методы, то иницилизируем их
      if (!methods[methodName].endpoint) {
        this[methodName] = {};
        const methodsName = Object.keys(methods[methodName]);
        methodsName.forEach(
          (element) =>
            (this[methodName][element] = this.createMethodProxy(
              methods[methodName][element]
            ))
        );
      } else {
        this[methodName] = this.createMethodProxy(methodConfig);
      }
    }
  }

  createMethodProxy(methodInfo: MethodConfig) {
    return async (params: Record<string, unknown>, query_value?: number) => {
      let endpoint = methodInfo.endpoint;
      endpoint = endpoint.replace("{value}", query_value);
      if (methodInfo.method === "GET") {
        endpoint += `?${new URLSearchParams(params).toString()}`;
      }

      return await apiRequest(
        endpoint,
        methodInfo.method,
        methodInfo.method === "GET" ? undefined : params
      );
    };
  }
}

interface API extends APIProps {}

export default API;
