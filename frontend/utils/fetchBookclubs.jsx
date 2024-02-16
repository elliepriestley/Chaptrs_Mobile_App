import { useState, useEffect } from 'react';
import useFetch from './useFetch';
import { useMainContext } from './mainContext';

function fetchBookclubs(refetch) {
  const baseUrl = process.env.EXPO_PUBLIC_API_URL;
  const url = `${baseUrl}/bookclubs`;
  const { bookclubs, setBookclubs } = useMainContext();
  const options = null;
  const { data, loading, error } = useFetch(url, bookclubs, options, refetch);

  useEffect(() => {
    console.log('fetchBookclubs data', data);
    if (data.bookclubs) setBookclubs(data.bookclubs);
  }, [data]);

  return { loading, error };
}

export default fetchBookclubs;
