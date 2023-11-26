import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Location, Calendar, Clock } from 'iconsax-react-native';
import { useNavigation } from '@react-navigation/native';

function SessionCard({ session }) {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Session Details', { session });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{
            uri: session.chosen_book.cover_photo,
          }}
        />
        <View style={{ alignSelf: 'center', width: '50%' }}>
          <Text style={styles.title}>{session.chosen_book.title}</Text>
          <Text style={styles.author}>
            {session.chosen_book.authors.join(', ')}
          </Text>
          <View style={styles.detailContainer}>
            <Text style={styles.details}>
              <Location style={styles.icon} color='black' size={8} />
              {session.location}
            </Text>
            <Text style={styles.details}>
              <Calendar style={styles.icon} color='black' size={8} />
              {new Date(session.datetime).toLocaleDateString('en-gb', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </Text>

            <Text style={styles.details}>
              <Clock style={styles.icon} color='black' size={8} />
              {new Date(session.datetime).toLocaleTimeString('en-gb', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </View>
          <View style={styles.bookclubContainer}>
            <Image
              style={styles.bookclubImage}
              source={{
                uri: session.bookclub?.image,
              }}
            />
            <Text style={styles.bookclubText}>{session.bookclub?.name}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    width: 280,
    height: 200,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#E9E1D54D',
  },
  image: {
    width: 120,
    height: '100%',
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
    marginBottom: 15,
    justifyContent: 'center',
  },
  icon: {
    marginRight: 5,
  },
  details: {
    fontSize: 10,
    fontFamily: 'Sansation-Regular',
  },
  bookclubText: {
    fontFamily: 'Sansation-Regular',
    fontSize: 10,
    marginLeft: 10,
    lineHeight: 10,
    flexShrink: 1,
  },
  bookclubImage: {
    borderRadius: 100,
    height: 30,
    width: 30,
  },
  bookclubContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: '#DCC8A9',
    borderWidth: 1,
    padding: 5,
    borderRadius: 999,
    flexShrink: 1,
  },
});

export default SessionCard;
