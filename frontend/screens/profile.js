import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import LogoMedium from '../components/LogoMedium';
import { useAuth } from '../utils/authContext';
import { ScrollView } from 'react-native';
import Heading from '../components/Heading';
import globalStyles from '../styles/globalStyles';

function Profile({ navigation }) {
  const { setUser, setToken } = useAuth();
  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.container}
        style={styles.container}
      >
        <View style={{ marginHorizontal: 25 }}>
          <Heading text='Account' />
          <Image
            style={styles.userProfile}
            source={require('../assets/images/userProfile.png')}
          />
          <Text style={styles.userName}>Alina E</Text>
          <Text style={styles.subheading}>About</Text>
          <View style={[styles.line, { width: 53 }]} />
          <Text style={[styles.text, { marginTop: 25 }]}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud
          </Text>
          <Text style={styles.subheading}>BookClub</Text>
          <View style={[styles.line, { width: 82 }]} />
          <View style={styles.bookclubContainer}>
            <Image
              style={styles.bookclubImage}
              source={require('../assets/images/bookclubImage.png')}
            />
            <Text style={[styles.text, { marginLeft: 10 }]}>
              Ranter's Book Nook
            </Text>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={[
          globalStyles.button,
          {
            backgroundColor: '#DCC8A9',
            position: 'absolute',
            top: 0,
            right: 20,
            flexShrink: 1,
            paddingHorizontal: 20,
            marginHorizontal: 0,
            marginVertical: 0,
          },
        ]}
        onPress={logout}
      >
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>
    </>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 100,
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
    marginTop: 20,
  },
  subheading: {
    fontFamily: 'Sansation-Regular',
    fontSize: 18,
    paddingBottom: 5,
    marginTop: 30,
  },
  userProfile: {
    height: 115,
    width: 115,
    borderRadius: 100,
    alignSelf: 'center',
    marginTop: 30,
  },
  userName: {
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 25,
    fontFamily: 'Sansation-Regular',
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
    marginTop: 25,
    marginBottom: 25,
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
