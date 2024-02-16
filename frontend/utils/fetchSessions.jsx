import { useEffect } from 'react';
import useFetch from './useFetch';
import { useMainContext } from './mainContext';

function fetchSessions(refetch) {
  const baseUrl = process.env.EXPO_PUBLIC_API_URL;
  const url = `${baseUrl}/sessions`;
  const { sessions, setSessions } = useMainContext();
  const options = null;
  const { data, loading, error } = useFetch(url, sessions, options, refetch);

  useEffect(() => {
    console.log('fetchSessions data', data);
    if (data.sessions) setSessions(data.sessions);
  }, [data]);

  return { loading, error };
}

export default fetchSessions;
