import {
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  Text,
  useWindowDimensions,
  RefreshControl,
} from 'react-native';
import Heading from '../components/Heading';
import SessionCard from '../components/SessionCard';
import { useEffect, useState, useCallback } from 'react';
import { useMainContext } from '../utils/mainContext';
import useFetch from '../utils/useFetch';
import { useNavigation } from '@react-navigation/native';
import globalStyles from '../styles/globalStyles';
import Sessions from '../components/Sessions';

function HomeScreen() {
  const { mySessions, setSessions, bookclubs, setBookclubs } = useMainContext();
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [pastSessions, setPastSessions] = useState([]);
  const navigation = useNavigation();
  const layout = useWindowDimensions();

  const [refetching, setRefetching] = useState(false);
  // if refetching is set to false, data will be fetched on mount
  // When refetching is set to true, data will be re-fetched
  // if refetching is set to null, data will not be fetched on mount
  // const { sessions } = useMainContext();
  const url = 'http://192.168.1.124:8080/sessions';
  const { data, loading, error } = useFetch(url, null, {}, refetching);

  useEffect(() => {
    // once data is fetched, set refetching to null
    // if set to false it will fetch data again
    if (!loading) {
      setRefetching(null);
    }
  }, [loading]);

  useEffect(() => {
    if (data?.sessions) setSessions(data.sessions);
  }, [data]);

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
        <Sessions sessions={upcomingSessions} />
        {/* <FlatList
          style={{ width: layout.width, transform: [{ translateX: -20 }] }}
          contentContainerStyle={{
            gap: 15,
            marginBottom: 10,
            paddingHorizontal: 20,
          }}
          data={upcomingSessions}
          renderItem={({ item }) => {
            return (
              <SessionCard
                session={item}
                onPress={() =>
                  navigation.navigate('Session Details', { session: item })
                }
              />
            );
          }}
          horizontal={true}
          alwaysBounceHorizontal={true}
          keyExtractor={(session) => session._id}
          ListEmptyComponent={() => (
            <Text style={globalStyles.mdText}>
              You currently have no upcoming sessions
            </Text>
          )}
        /> */}
        <Heading text='Past Sessions' headingStyles={{ marginTop: 20 }} />
        <Sessions sessions={pastSessions} />
        {/* <FlatList
          style={{ width: layout.width, transform: [{ translateX: -20 }] }}
          contentContainerStyle={{
            gap: 15,
            marginBottom: 10,
            paddingHorizontal: 20,
          }}
          data={pastSessions}
          renderItem={({ item }) => {
            return (
              <SessionCard
                session={item}
                onPress={() =>
                  navigation.navigate('Session Details', { session: item })
                }
              />
            );
          }}
          horizontal={true}
          keyExtractor={(session) => session._id}
          ListEmptyComponent={() => (
            <Text style={globalStyles.mdText}>
              You haven't been to any sessions yet
            </Text>
          )}
        /> */}
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

export default HomeScreen;
