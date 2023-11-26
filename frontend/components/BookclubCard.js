import { StyleSheet, Text, View, Image } from 'react-native';
import { UserAdd } from 'iconsax-react-native';
import AvatarGroup from './AvatarGroup';
import React from 'react';

export default function BookclubCard({ bookclub }) {
  return (
    <View style={styles.card}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <Image
          source={{ uri: bookclub.image }}
          style={{ width: 50, height: 50, borderRadius: 999 }}
        />
        <Text
          style={{ fontFamily: 'Sansation-Regular', flex: 1, fontSize: 14 }}
        >
          {bookclub.name}
        </Text>
        <UserAdd size={30} color='black' />
      </View>
      <View style={{ gap: 5 }}>
        <Text style={{ fontFamily: 'Sansation-Regular', fontSize: 14 }}>
          About
        </Text>
        <Text style={{ fontFamily: 'Sansation-Regular' }}>
          {bookclub.description}
        </Text>
      </View>
      <View style={{ gap: 5 }}>
        <Text style={{ fontFamily: 'Sansation-Regular', fontSize: 14 }}>
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
});
