import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Pressable
} from 'react-native';
import React, { useState } from 'react';
import Heading from '../../../components/ui/Heading';
import { Edit } from 'iconsax-react-native';
import GenreColorBlock from '../../../components/ui/genreColorBlock';
import MembersGroup from '../../../components/ui/MembersGroup';
import globalStyles from '../../../styles/globalStyles';
import PressableModal from '../../../components/modals/PressableModal';

function BookclubDetailsScreen({ route, navigation: { navigate } }) {
  const bookclub = route.params?.bookclub;
  const [modalVisible, setModalVisible] = useState(false);

  const leaveBookclub = () => {
    
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
        <Heading text='Bookclub details' />

        <Edit
          // if only you are in this bookclub
          onPress={() => navigate('Edit Bookclub', { bookclub: bookclub })}
          size={36}
          color='black'
        />
      </View>
      <Pressable onPress={() => setModalVisible(true)}>
        <Image
          style={styles.userProfile}
          source={{
            uri: bookclub.image,
          }}
        />
        <PressableModal
          isVisible={modalVisible}
          setModalVisible={setModalVisible}
          itemTwo={'leave bookclub'}
        />
      </Pressable>
      <Text style={styles.userName}>{bookclub.name}</Text>
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
          {bookclub.description}
        </Text>
        <Heading
          text='Favourite genres'
          textStyles={{ fontSize: 18 }}
          headingStyles={{ fontSize: 18, marginLeft: 20 }}
        />
        <View style={{ paddingLeft: 20 }}>
          {bookclub.genre.length !== 0 ? (
            <GenreColorBlock genres={bookclub.genre} />
          ) : (
            <Text style={[globalStyles.mdText, { marginBottom: 20 }]}>
              Add your favourite genres...
            </Text>
          )}
        </View>
        <Heading
          text='Members'
          textStyles={{ fontSize: 18 }}
          headingStyles={{ fontSize: 18, marginLeft: 20 }}
        />
        <MembersGroup bookclub={bookclub} />
      </ScrollView>
    </View>
  );
}

export default BookclubDetailsScreen;

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
