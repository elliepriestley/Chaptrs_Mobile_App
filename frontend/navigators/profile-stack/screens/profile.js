import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
  Pressable,
} from 'react-native';
import React, { useState } from 'react';
import { useAuth } from '../../../utils/authContext';
import { useMainContext } from '../../../utils/mainContext';
import { ScrollView } from 'react-native';
import Heading from '../../../components/ui/Heading';
import { Edit } from 'iconsax-react-native';
import GenreColorBlock from '../../../components/ui/genreColorBlock';
import PressableModal from '../../../components/modals/PressableModal';
import BookclubPill from '../../../components/ui/BookclubPill';

function Profile({ navigation: { navigate } }) {
  const { user, setUser, setToken } = useAuth();
  const { myBookclubs } = useMainContext();
  const [modalVisible, setModalVisible] = useState(false);
  const layout = useWindowDimensions();

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20,
          marginHorizontal: 20,
        }}
      >
        <Heading text='Profile' />
        <Edit
          onPress={() => navigate('Edit Profile')}
          size={36}
          color='black'
        />
      </View>
      <Pressable onPress={() => setModalVisible(true)}>
        <Image
          style={styles.userProfile}
          source={{
            uri: user.profile_picture,
          }}
        />
        <PressableModal
          isVisible={modalVisible}
          setModalVisible={setModalVisible}
          onLogout={logout}
        />
      </Pressable>
      <Text style={styles.userName}>{user.username}</Text>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        style={styles.container}
      >
        <Heading
          text='About'
          textStyles={{ fontSize: 18 }}
          headingStyles={{ fontSize: 18, marginLeft: 20 }}
        />
        <Text style={[styles.text, { marginBottom: 20, marginLeft: 20 }]}>
          {user.description}
        </Text>
        <Heading
          text='Bookclubs'
          textStyles={{ fontSize: 18 }}
          headingStyles={{ fontSize: 18, marginLeft: 20 }}
        />
        <ScrollView
          horizontal={true}
          style={{ width: layout.width, marginBottom: 10 }}
          contentContainerStyle={{
            gap: 10,
            marginBottom: 10,
            paddingHorizontal: 20,
          }}
        >
          {myBookclubs.map((bookclub, index) => {
            return <BookclubPill key={index} bookclub={bookclub} />;
          })}
        </ScrollView>
        <Heading
          text='Favourite genres'
          textStyles={{ fontSize: 18 }}
          headingStyles={{ fontSize: 18, marginLeft: 20 }}
        />
        <View style={{ paddingLeft: 20 }}>
          {user.genre.length !== 0 ? (
            <GenreColorBlock genres={user.genre} />
          ) : (
            <Text>Choose you favourite genres</Text>
          )}
        </View>
      </ScrollView>
    </View>
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
    marginRight: 20,
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
    marginLeft: 20,
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
    marginHorizontal: 10,
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
