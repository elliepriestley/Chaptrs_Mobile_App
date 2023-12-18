import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Heading from '../components/Heading';
import { Location, Calendar, Clock } from 'iconsax-react-native';
import AvatarGroup from '../components/AvatarGroup';
import api from '../utils/api';
import { useAuth } from '../utils/authContext';
import { useMainContext } from '../utils/mainContext';
import BookclubPill from '../components/BookclubPill';

function SessionDetailsScreen({ route, navigation: { navigate } }) {
  const { user, token, setToken } = useAuth();
  const { sessions, setSessions } = useMainContext();
  const session = route.params?.session;
  const categories = ['adventure fiction', 'seastory', 'encyclopedic novel'];
  const colours = ['#E8C0DC', '#0FA7B047', '#F8964D7D'];
  const joined = !session.users_attending
    .map((attendingUser) => attendingUser._id)
    .includes(user._id);

  const joinSession = async () => {
    try {
      const data = await api.joinSession(session._id, token);
      session.users_attending = data.session.users_attending;
      setSessions((prev) => {
        const oldSessions = prev.filter(
          (prevSession) => prevSession._id !== session._id,
        );
        return [...oldSessions, session];
      });
      navigate('Home');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={styles.container}
    >
      <View style={{ marginHorizontal: 25 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Heading text='Details' headingStyles={{ marginTop: 10 }} />
        </View>
        <View style={styles.book}>
          <Image
            style={styles.image}
            source={{
              uri: session.chosen_book.cover_photo,
            }}
          />
          <View
            style={{
              width: '60%',
              alignItems: 'flex-start',
              alignContent: 'flex-start',
            }}
          >
            <Text style={styles.title}>{session.chosen_book.title}</Text>
            <Text style={styles.author}>
              {session.chosen_book.authors.join(', ')}
            </Text>
            <View style={styles.categories}>
              {categories.map((category, index) => {
                return (
                  <View
                    key={index}
                    style={[
                      styles.category,
                      { backgroundColor: colours[index % colours.length] },
                    ]}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: 'Sansation-Regular',
                      }}
                    >
                      {category}
                    </Text>
                  </View>
                );
              })}
            </View>
            <BookclubPill bookclub={session.bookclub} size={30} />
          </View>
        </View>
        <Heading text='About session' textStyles={{ fontSize: 16 }} />
        <ScrollView style={{ maxHeight: 150 }}>
          <Text
            style={{
              fontFamily: 'Sansation-Regular',
              fontSize: 14,
              marginBottom: 20,
            }}
          >
            {session.details || 'No details provided.'}
          </Text>
        </ScrollView>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 20,
            gap: 10,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontFamily: 'Sansation-Regular',
              fontSize: 18,
            }}
          >
            {session.users_attending.length === 0
              ? 'Be the first to attend. Join now!'
              : 'Participants:'}
          </Text>
          <AvatarGroup users={session.users_attending} />
        </View>
        <View style={styles.detailContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Location style={styles.icon} color='black' size={24} />
            <Text style={styles.details}>{session.location}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Calendar style={styles.icon} color='black' size={24} />
            <Text style={styles.details}>
              {new Date(session.datetime).toLocaleDateString('en-gb', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Clock style={styles.icon} color='black' size={24} />
            <Text style={styles.details}>
              {new Date(session.datetime).toLocaleTimeString('en-gb', {
                minute: '2-digit',
                hour: '2-digit',
              })}
            </Text>
          </View>
        </View>
        {joined && (
          <TouchableOpacity style={styles.joinButton} onPress={joinSession}>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'Sansation-Regular',
              }}
            >
              join
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

export default SessionDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 100,
  },
  book: {
    flexDirection: 'row',
    gap: 10,
    // height: 200,
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Sansation-Regular',
    marginBottom: 5,
  },
  author: {
    fontSize: 12,
    fontFamily: 'Sansation-Regular',
    color: '#695203',
    marginBottom: 15,
  },
  detailContainer: {
    gap: 4,
  },
  icon: {
    marginRight: 5,
  },
  details: {
    fontSize: 14,
    fontFamily: 'Sansation-Regular',
  },
  joinButton: {
    marginVertical: 20,
    backgroundColor: '#DCC8A9',
    padding: 10,
    borderRadius: 999,
    marginHorizontal: 50,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 15,
  },
  category: {
    backgroundColor: '#F8964D7D',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 999,
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
  },
});
