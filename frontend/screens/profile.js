import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import LogoMedium from '../components/LogoMedium';
import { useAuth } from '../utils/authContext';
import { useMainContext } from '../utils/mainContext';
import { ScrollView } from 'react-native';
import Heading from '../components/Heading';
import { Edit } from 'iconsax-react-native';
import globalStyles from '../styles/globalStyles';

function Profile({ navigation }) {
  const { user, setUser, setToken } = useAuth();
  const { myBookclubs } = useMainContext();
  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
      <ScrollView style={styles.container}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Heading text='Account' />
              <Edit
                size={36}
                color='black'
              />
          </View>
          <Image
            style={styles.userProfile}
            source={require('../assets/images/userProfile.png')}
          />
          <Text style={styles.userName}>{user.username}</Text>
          <Heading text='About' textStyles={{ fontSize: 18 }} />
          <Text style={[styles.text, { marginBottom: 20 }]}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud
          </Text>
          <Heading text='Bookclubs' textStyles={{ fontSize: 18 }} />
          <ScrollView
            horizontal={true}
            contentContainerStyle={{ gap: 10 }}
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
    padding: 20,
  },
  line: {
    height: 0,
    borderTopColor: '#DCC8A9',
    borderTopWidth: 2,
    marginTop: 5,
  },
  heading: {
    fontFamily: 'Sansation-Regular',
    fontSize: 24,
    paddingBottom: 5,
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
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 50,
    alignSelf: 'flex-start',
  },
});
