import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import LogoMedium from '../components/LogoMedium';
import Heading from '../components/Heading';
import { Location, Calendar, Clock } from 'iconsax-react-native';

function SessionDetailsScreen({ route }) {
  const session = route.params?.session;
  const categories = ['adventure fiction', 'seastory', 'encyclopedic novel'];
  const colours = ['#E8C0DC', '#0FA7B047', '#F8964D7D'];
  return (
    <View style={styles.container}>
      <View style={{ marginHorizontal: 25 }}>
        <LogoMedium />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Heading text='Details' headingStyles={{ marginTop: 20 }} />
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
          <View style={{ flexDirection: 'row', gap: 10 }}>
            {['A', 'B', 'C'].map((user, index) => {
              return (
                <Image
                  key={index}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: '50%',
                    transform: [{ translateX: index * -20 }],
                  }}
                  source={{
                    uri: `https://ui-avatars.com/api/?length=1&background=random&name=${user[0]}}`,
                  }}
                />
              );
            })}
            <Image
              style={{
                width: 30,
                height: 30,
                borderRadius: '50%',
                transform: [{ translateX: 3 * -20 }],
              }}
              source={{
                uri: `https://ui-avatars.com/api/?length=2&background=random&name=%${'-3'}}}`,
              }}
            />
          </View>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.details}>
            <Location style={styles.icon} color='black' size={24} />
            {session.location}
          </Text>
          <Text style={styles.details}>
            <Calendar style={styles.icon} color='black' size={24} />
            {session.date}
          </Text>

          <Text style={styles.details}>
            <Clock style={styles.icon} color='black' size={24} />
            {session.time}
          </Text>
        </View>
        <TouchableOpacity style={styles.joinButton}>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'Sansation-Regular',
            }}
          >
            join meeting
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SessionDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  book: {
    flexDirection: 'row',
    gap: 10,
    height: 200,
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
    padding: 5,
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
});
