import { StyleSheet, View, FlatList, ScrollView } from 'react-native';
import Heading from '../components/Heading';
import SessionCard from '../components/SessionCard';
import exampleSessions from '../data/exampleSessions';
import { useEffect, useState } from 'react';
import { useMainContext } from '../utils/mainContext';
import api from '../utils/api';
import { useAuth } from '../utils/authContext';

function HomeScreen() {
  const { mySessions, setmySessions } = useMainContext();
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [pastSessions, setPastSessions] = useState([]);

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
      <View style={{ marginHorizontal: 25 }}>
        <Heading text='Upcoming Sessions' headingStyles={{ marginTop: 20 }} />
        <FlatList
          style={{ marginBottom: 20 }}
          data={upcomingSessions}
          renderItem={({ item }) => {
            return <SessionCard session={item} />;
          }}
          horizontal={true}
          keyExtractor={(session) => session._id}
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
        />
        <Heading text='Past Sessions' />
        <FlatList
          style={{ marginBottom: 20 }}
          data={pastSessions}
          renderItem={({ item }) => {
            return <SessionCard session={item} />;
          }}
          horizontal={true}
          keyExtractor={(session) => session._id}
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 50,
  },
  heading: {
    fontFamily: 'Sansation-Regular',
    fontSize: 24,
    paddingBottom: 5,
    marginTop: 30,
  },
  line: {
    height: 0,
    borderTopColor: '#DCC8A9',
    borderTopWidth: 2,
    marginTop: 5,
  },
});

export default HomeScreen;
