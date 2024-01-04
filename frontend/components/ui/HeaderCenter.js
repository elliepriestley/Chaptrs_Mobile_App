import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';

export default function HeaderCenter() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logoMedium.png')}
        style={styles.logo}
      />
      <Text style={styles.text}>Chaptrs</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 36,
    height: 30,
    alignSelf: 'center',
    marginRight: 10,
  },
  text: {
    fontFamily: 'Sansation-Regular',
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
  },
});
