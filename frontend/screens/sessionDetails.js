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

function SessionDetailsScreen({ route }) {
  const session = route.params?.session;
  const categories = ['adventure fiction', 'seastory', 'encyclopedic novel'];
  const colours = ['#E8C0DC', '#0FA7B047', '#F8964D7D'];
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
            <View style={styles.bookclubContainer}>
              <Image
                style={styles.bookclubImage}
                source={{
                  uri: session.bookclub.image,
                }}
              />
              <Text style={styles.bookclubText}>{session.bookclub.name}</Text>
            </View>
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
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
            Participants:
          </Text>
          <AvatarGroup users={session.participants} />
        </View>
        <View style={styles.detailContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Location style={styles.icon} color='black' size={24} />
            <Text style={styles.details}>{session.location}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Calendar style={styles.icon} color='black' size={24} />
            <Text style={styles.details}>{session.date}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Clock style={styles.icon} color='black' size={24} />
            <Text style={styles.details}>{session.time}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.joinButton}>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'Sansation-Regular',
            }}
          >
            join
          </Text>
        </TouchableOpacity>
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
    height: 180,
    marginBottom: 20,
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
  },
  icon: {
    marginRight: 5,
  },
  details: {
    fontSize: 14,
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
    flex: 1,
  },
  category: {
    backgroundColor: '#F8964D7D',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
});