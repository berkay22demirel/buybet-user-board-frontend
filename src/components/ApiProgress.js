import axios from "axios";
import { useEffect, useState } from "react";

export const useApiProgress = (apiMethod, apiPath) => {
  const [pendingApiCall, setPendingApiCall] = useState(false);

  useEffect(() => {
    let requestInterceptorId, responseInterceptorId;

    const updatePendingApiCall = (method, url, inProgress) => {
      if (url.startsWith(apiPath) && method === apiMethod) {
        setPendingApiCall(inProgress);
      }
    };

    const register = () => {
      requestInterceptorId = axios.interceptors.request.use((request) => {
        const { url, method } = request;
        updatePendingApiCall(method, url, true);
        return request;
      });

      responseInterceptorId = axios.interceptors.response.use(
        (response) => {
          const { url, method } = response.config;
          updatePendingApiCall(method, url, false);
          return response;
        },
        (error) => {
          const { url, method } = error.config;
          updatePendingApiCall(method, url, false);
          throw error;
        }
      );
    };

    register();

    const unRegister = () => {
      axios.interceptors.request.eject(requestInterceptorId);
      axios.interceptors.response.eject(responseInterceptorId);
    };

    return () => {
      unRegister();
    };
  }, [apiPath, apiMethod]);

  return pendingApiCall;
};
