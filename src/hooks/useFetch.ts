import { useState, useEffect } from 'react';

import request from '../utils/request';

const useFetch = (url: string) => {
  const [data, setData] = useState<null | unknown>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | Error>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await request.get(url);
        setData(res.data);
      } catch (err) {
        setError(err as Error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
