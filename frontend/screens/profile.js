import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useAuth } from '../utils/authContext';
import { useMainContext } from '../utils/mainContext';
import { ScrollView } from 'react-native';
import Heading from '../components/Heading';
import { Edit } from 'iconsax-react-native';

function Profile({ navigation: { navigate } }) {
  const { user, setUser, setToken } = useAuth();
  const { myBookclubs } = useMainContext();
  const colours = ['#E8C0DC', '#0FA7B047', '#F8964D7D'];

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
      <ScrollView style={styles.container}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, marginHorizontal: 20 }}>
            <Heading text='Profile' />
              <Edit
                onPress={() => navigate('Edit Profile')}
                size={36}
                color='black'
              />
          </View>
          <Image
            style={styles.userProfile}
            source={{
              uri: user.profile_picture,
            }}
          />
          <Text style={styles.userName}>{user.username}</Text>
          <Heading text='About' textStyles={{ fontSize: 18 }} headingStyles={{ fontSize: 18, marginLeft: 20 }} />
          <Text style={[styles.text, { marginBottom: 20, marginLeft: 20 }]}>
            {user.description}
          </Text>
          <Heading text='Bookclubs' textStyles={{ fontSize: 18 }} headingStyles={{ fontSize: 18, marginLeft: 20 }} />
          <ScrollView
            horizontal={true}
            style={{ height: 70 }}
          >
            {myBookclubs.map((bookclub) => {
              return (
                <View key={bookclub._id} style={styles.bookclubContainer}>
                  <Image
                    style={styles.bookclubImage}
                    source={{ uri: bookclub.image }}
                  />
                  <Text style={[styles.text, { marginLeft: 10 }]}>
                    {bookclub.name}
                  </Text>
                </View>
              );
            })}
          </ScrollView>
          <View style={styles.categories}>
              {user.genre.map((item, index) => {
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
                      {item}
                    </Text>
                  </View>
                )
              })}
            </View>
          <TouchableOpacity
            onPress={logout}
          >
            <Text style={styles.text}>log out</Text>
          </TouchableOpacity>
      </ScrollView>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  heading: {
    fontFamily: 'Sansation-Regular',
    fontSize: 24,
    paddingBottom: 5,
    marginRight: 20
  },
  userProfile: {
    height: 115,
    width: 115,
    borderRadius: 100,
    alignSelf: 'center',
  },
  userName: {
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 25,
    fontFamily: 'Sansation-Regular',
    marginBottom: 20,
  },
  text: {
    fontFamily: 'Sansation-Regular',
    fontSize: 16,
    lineHeight: 30,
    marginLeft: 20
  },
  bookclubImage: {
    borderRadius: 100,
    height: 35,
    width: 35,
  },
  bookclubContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: '#DCC8A9',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 50,
    alignSelf: 'flex-start',
    marginHorizontal: 10
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 15,
    flex: 1,
    paddingLeft: 20,
  },
  category: {
    backgroundColor: '#F8964D7D',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
});
