// src/useApi.ts

import { useState, useEffect } from "react";
import { requester, RequestOptions } from "../requester";

export function useApi<T>(
  url?: string,
  options?: RequestOptions
): { data: T | null; error: string | null; loading: boolean } {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const result = await requester<T>(url, options);
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [url, options]);

  return { data, error, loading };
}
