import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Location, Calendar, Clock } from 'iconsax-react-native';
import BookclubPill from './BookclubPill';

function SessionCard({ session, onPress, color = '#E9E1D54D' }) {
  const datetime = new Date(session.datetime);

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: color }]}
      onPress={onPress}
    >
      <Image
        style={styles.image}
        source={{
          uri: session.chosen_book.cover_photo,
        }}
      />
      <View
        style={{
          alignItems: 'flex-start',
          justifyContent: 'center',
          maxWidth: 200,
        }}
      >
        <Text style={styles.title}>{session.chosen_book.title}</Text>
        <Text style={styles.author}>
          {session.chosen_book.authors.join(', ')}
        </Text>
        <View style={styles.detailContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Location style={styles.icon} color='black' size={12} />
            <Text style={styles.details}>{session.location}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Calendar style={styles.icon} color='black' size={12} />
            <Text style={styles.details}>
              {datetime.toLocaleDateString('en-gb', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}{' '}
              {datetime.toLocaleTimeString('en-gb', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </View>
          {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Clock style={styles.icon} color='black' size={12} />
            <Text style={styles.details}>
              {datetime.toLocaleTimeString('en-gb', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </View> */}
        </View>
        <BookclubPill bookclub={session.bookclub} size={30} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    minWidth: 320,
    padding: 15,
    borderRadius: 10,
  },
  image: {
    width: 120,
    height: 180,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Sansation-Regular',
    marginBottom: 5,
  },
  author: {
    fontSize: 14,
    fontFamily: 'Sansation-Regular',
    color: '#695203',
    marginBottom: 10,
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
    fontSize: 12,
    fontFamily: 'Sansation-Regular',
  },
});

export default SessionCard;
