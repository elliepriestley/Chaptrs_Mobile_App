import {
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  Text,
  useWindowDimensions,
} from 'react-native';
import Heading from '../components/Heading';
import SessionCard from '../components/SessionCard';
import { useEffect, useState } from 'react';
import { useMainContext } from '../utils/mainContext';
import { useNavigation } from '@react-navigation/native';
import globalStyles from '../styles/globalStyles';

function HomeScreen() {
  const { mySessions, bookclubs, setBookclubs } = useMainContext();
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [pastSessions, setPastSessions] = useState([]);
  const navigation = useNavigation();
  const layout = useWindowDimensions();

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
    <ScrollView style={styles.container}>
      <View>
        <Heading text='Upcoming Sessions' headingStyles={{ marginTop: 20 }} />
        <FlatList
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
        />
        <Heading text='Past Sessions' headingStyles={{ marginTop: 20 }} />
        <FlatList
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
        />
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
