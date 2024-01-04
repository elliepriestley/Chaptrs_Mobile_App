import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { Typography } from '../../styles';

export default function LogoMedium() {
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
    marginTop: 55,
  },
  logo: {
    width: 36,
    height: 30,
    alignSelf: 'center',
    marginRight: 10,
  },
  text: {
    ...Typography.fontSize.xxl,
    textAlign: 'center',
  },
});
