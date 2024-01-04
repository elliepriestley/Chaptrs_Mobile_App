import { useEffect } from 'react';
import useFetch from './useFetch';
import { useMainContext } from './mainContext';

function fetchSessions(refetch) {
  const url = 'http://192.168.1.124:8080/sessions';
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
