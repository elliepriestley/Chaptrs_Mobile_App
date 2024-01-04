import { useState, useEffect } from 'react';
import { useAuth } from './authContext';

function useFetch(url, initialData, options, refetch) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { token, setToken } = useAuth();

  const { method = 'GET', body = '' } = options || {};

  useEffect(() => {
    if (refetch !== null) {
      setLoading(true);
      const request$ = fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        method,
        ...(method !== 'GET' && { body }),
      });

      request$
        .then(async (res) => {
          let resData;
          if (res.ok) {
            try {
              // in case if request was succeed and valid JSON data was returned
              resData = await res.clone().json();
              return resData;
            } catch (e) {
              // in case if request was succeed but no JSON data was returned
              resData = await res.text();
              return resData;
            }
          } else {
            throw new Error('Error occured');
          }
        })
        .then((resData) => {
          if (resData?.token) setToken(resData.token);
          setData(resData);
          setError(null);
        })
        .catch((err) => {
          setData(null);
          setError(err.message);
        })
        .finally(() => setLoading(false));
    }
  }, [refetch]);

  return { data, loading, error };
}

export default useFetch;
