import { View, Text, Image } from 'react-native';
import React from 'react';

export default function Logo() {
  return (
    <View style={{marginTop: 55, marginBottom: 30}}>
      <Image
        source={require('../assets/chaptrs-logo.jpg')}
        style={{
          alignSelf: 'center',
        }}
      />
      <Text style={{ fontSize: 30, textAlign: 'center', marginBottom: 20, fontFamily: 'Sansation-Regular' }}>
        Chaptrs
      </Text>
    </View>
  );
}
