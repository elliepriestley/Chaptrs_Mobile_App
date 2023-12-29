import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import Heading from '../components/Heading';
import { useEffect, useState, useCallback } from 'react';
import { useMainContext } from '../utils/mainContext';
import useFetch from '../utils/useFetch';
import Sessions from '../components/Sessions';
import fetchBookclubs from '../utils/fetchBookclubs';
import fetchSessions from '../utils/fetchSessions';

export default function HomeScreen() {
  const { mySessions, setSessions } = useMainContext();
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [pastSessions, setPastSessions] = useState([]);
  const [refetching, setRefetching] = useState(false);
  // if refetching is set to false, data will be fetched on mount
  // When refetching is set to true, data will be re-fetched
  // if refetching is set to null, data will not be fetched on mount
  const url = 'http://192.168.1.124:8080/sessions';
  // const { data, loading, error } = useFetch(url, null, {}, refetching);
  const { loading, error } = fetchSessions(refetching);
  fetchBookclubs(refetching);

  useEffect(() => {
    // once data is fetched, set refetching to null
    // if set to false it will fetch data again
    if (!loading) {
      setRefetching(null);
    }
  }, [loading]);

  const onRefresh = useCallback(() => {
    setRefetching((prev) => !prev);
  }, [loading]);

  useEffect(() => {
    mySessions.sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
    const upcomingSessions = mySessions.filter(
      (session) => new Date(session.datetime) > new Date(),
    );
    const pastSessions = mySessions
      .filter((session) => new Date(session.datetime) < new Date())
      .reverse();
    setUpcomingSessions(upcomingSessions);
    setPastSessions(pastSessions);
  }, [mySessions]);

  return (
    <ScrollView
      style={styles.container}
      refreshing={loading}
      refreshControl={
        <RefreshControl
          tintColor='#DAA520'
          refreshing={refetching}
          onRefresh={onRefresh}
        />
      }
    >
      <View>
        <Heading text='Upcoming Sessions' headingStyles={{ marginTop: 20 }} />
        {loading && !refetching ? (
          <ActivityIndicator
            size='large'
            color='#DAA520'
            style={{ height: 200 }}
          />
        ) : (
          <Sessions sessions={upcomingSessions} sessionType='upcoming' />
        )}
        <Heading text='Past Sessions' headingStyles={{ marginTop: 20 }} />
        {loading && !refetching ? (
          <ActivityIndicator
            size='large'
            color='#DAA520'
            style={{ height: 200 }}
          />
        ) : (
          <Sessions sessions={pastSessions} sessionType='past' />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    gap: 10,
  },
});
