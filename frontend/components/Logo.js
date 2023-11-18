import { View, Text, Image } from 'react-native';
import React from 'react';

export default function Logo() {
  return (
    <View>
      <Image
        source={require('../assets/chaptrs-logo.jpg')}
        style={{
          alignSelf: 'center',
        }}
      />
      <Text style={{ fontSize: 30, textAlign: 'center', marginBottom: 20 }}>
        Chaptrs
      </Text>
    </View>
  );
}
