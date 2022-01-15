import axios from "axios";
import { useEffect, useState } from "react";

export const useApiProgress = (apiPath) => {
  const [pendingApiCall, setPendingApiCall] = useState(false);

  useEffect(() => {
    let requestInterceptorId, responseInterceptorId;

    const updatePendingApiCall = (url, inProgress) => {
      if (apiPath === url) {
        setPendingApiCall(inProgress);
      }
    };

    const register = () => {
      requestInterceptorId = axios.interceptors.request.use((request) => {
        updatePendingApiCall(request.url, true);
        return request;
      });

      responseInterceptorId = axios.interceptors.response.use(
        (response) => {
          updatePendingApiCall(response.config.url, false);
          return response;
        },
        (error) => {
          updatePendingApiCall(error.config.url, false);
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
  });

  return pendingApiCall;
};
