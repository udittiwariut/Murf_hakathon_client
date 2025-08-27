// hooks/useAxios.ts
import { useState, useCallback } from "react";
import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";

type UseAxiosResult<T> = {
  error: string | null;
  loading: boolean;
  sendRequest: (overrideConfig?: AxiosRequestConfig) => Promise<any>;
};

export function useAxios<T = any>(initialConfig: AxiosRequestConfig): UseAxiosResult<T> {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const sendRequest = useCallback(
    async (overrideConfig?: AxiosRequestConfig) => {
      setLoading(true);
      setError(null);

      try {
        const finalConfig: AxiosRequestConfig = {
          ...initialConfig,
          ...overrideConfig,
        };

        // Handle multipart/form-data automatically
        if (finalConfig.data instanceof FormData && !finalConfig.headers?.["Content-Type"]) {
          finalConfig.headers = {
            ...finalConfig.headers,
            "Content-Type": "multipart/form-data",
          };
        }

        const response: AxiosResponse<T> = await axios(finalConfig);
        return response.data;
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || "Request failed");
      } finally {
        setLoading(false);
      }
    },
    [initialConfig]
  );

  return { error, loading, sendRequest };
}
