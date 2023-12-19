import { StyleSheet, View, FlatList, ScrollView, Text } from 'react-native';
import Heading from '../components/Heading';
import SessionCard from '../components/SessionCard';
import { useEffect, useState } from 'react';
import { useMainContext } from '../utils/mainContext';
import { useNavigation } from '@react-navigation/native';
import globalStyles from '../styles/globalStyles';

function HomeScreen() {
  const { mySessions } = useMainContext();
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

  const navigation = useNavigation();
  const handlePress = (session) => {
    navigation.navigate('Session Details', { session });
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Heading text='Upcoming Sessions' headingStyles={{ marginTop: 20 }} />
        <FlatList
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
          ItemSeparatorComponent={Separator}
          ListEmptyComponent={() => (
            <Text style={globalStyles.mdText}>
              You currently have no upcoming sessions
            </Text>
          )}
        />
        <Heading text='Past Sessions' headingStyles={{ marginTop: 20 }} />
        <FlatList
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
          ItemSeparatorComponent={Separator}
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

const Separator = () => {
  return (
    <View
      style={{
        width: 2,
        marginHorizontal: 10,
        borderRadius: 10,
        backgroundColor: '#DCC8A9',
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
});

export default HomeScreen;
