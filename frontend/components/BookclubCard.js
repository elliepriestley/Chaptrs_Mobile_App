import { StyleSheet, Text, View, Image } from 'react-native';
import { UserAdd, TickCircle } from 'iconsax-react-native';
import AvatarGroup from './AvatarGroup';
import React from 'react';
import api from '../utils/api';
import { useAuth } from '../utils/authContext';
import { useMainContext } from '../utils/mainContext';

export default function BookclubCard({ bookclub }) {
  const { token, user } = useAuth();
  const { setBookclubs } = useMainContext();

  const joinBookclub = () => {
    api.joinBookclub(bookclub._id, token).then((data) => {
      setBookclubs((prev) => {
        const arr = prev.filter(
          (prevBookclub) => prevBookclub._id !== data.bookclub._id,
        );
        const updatedBookclubs = [data.bookclub, ...arr];
        updatedBookclubs.sort((a, b) => {
          if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
          else return -1;
        });
        return updatedBookclubs;
      });
    });
  };

  return (
    <View style={styles.card}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <Image
          source={{ uri: bookclub.image }}
          style={{ width: 50, height: 50, borderRadius: 999 }}
        />
        <Text
          style={{
            flex: 1,
            fontFamily: 'Sansation-Bold',
            fontSize: 16,
            color: '#695203',
          }}
        >
          {bookclub.name}
        </Text>
        {bookclub.members.map((member) => member._id).includes(user._id) ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Text style={{ fontFamily: 'Sansation-Regular', color: 'green' }}>
              Joined
            </Text>
            <TickCircle size={30} color='green' />
          </View>
        ) : (
          <UserAdd size={30} color='black' onPress={joinBookclub} />
        )}
      </View>
      <View style={{ gap: 5 }}>
        <Text style={[styles.text]}>About</Text>
        <Text style={{ fontFamily: 'Sansation-Regular' }}>
          {bookclub.description}
        </Text>
      </View>
      <View style={{ gap: 5 }}>
        <Text style={styles.text}>
          {bookclub.members.length === 0 ? 'No Members' : 'Members'}
        </Text>
        <AvatarGroup users={bookclub.members} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 20,
    backgroundColor: '#E9E1D54D',
    padding: 20,
    borderRadius: 10,
  },
  text: {
    fontFamily: 'Sansation-Regular',
    fontSize: 16,
    marginBottom: 10,
  },
});
