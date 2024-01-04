import { useState, useEffect } from 'react';
import useFetch from './useFetch';
import { useMainContext } from './mainContext';

function fetchBookclubs(refetch) {
  const url = 'http://192.168.1.124:8080/bookclubs';
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
