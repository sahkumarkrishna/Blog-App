import { useState, useEffect } from "react";
import axios from "axios";

export const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return; // ✅ Prevents fetching if no URL is provided

    let isMounted = true; // ✅ Prevent memory leaks

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios(url, {
          ...options,
          headers: {
            "Content-Type": "application/json",
            ...options.headers, // ✅ Supports dynamic headers
          },
        });

        if (isMounted) {
          setData(response.data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err); // ✅ Set error state
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false; // ✅ Prevent state updates if unmounted
    };
  }, [url, JSON.stringify(options)]); // ✅ Ensures correct re-fetching

  return { data, loading, error };
};
