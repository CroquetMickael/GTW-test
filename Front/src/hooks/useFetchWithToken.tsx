import { useCallback } from "react";
import { useAuth } from "../context/AuthProvider";

const useFetchWithToken = () => {
  const { token } = useAuth();
  const fetchWithToken = useCallback(
    async ({
      url,
      configFetch,
      body,
    }: {
      url: string;
      configFetch?: RequestInit;
      body?: any;
    }) => 
      await fetch(`http://127.0.0.1:8000/api/${url}`, {
        ...configFetch,
        body: body ? JSON.stringify(body) : undefined,
        headers: {
          ...configFetch?.headers,
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }),
    []
  );

  return { fetchWithToken };
};

export { useFetchWithToken };
