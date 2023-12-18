import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

export default function BookclubPill({ bookclub, size = 30 }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
        borderColor: '#DCC8A9',
        borderWidth: 1,
        padding: size / 8,
        paddingRight: size / 2,
        borderRadius: 999,
      }}
    >
      <Image
        style={{
          borderRadius: 999,
          height: size,
          width: size,
          backgroundColor: 'white',
        }}
        source={{
          uri: bookclub.image,
        }}
      />
      <Text
        style={{
          fontFamily: 'Sansation-Regular',
          fontSize: size / 2.5,
          marginLeft: size / 3,
          flexShrink: 1,
        }}
      >
        {bookclub.name}
      </Text>
    </View>
  );
}
