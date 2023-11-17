import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Danger } from 'iconsax-react-native';

function NewSessionScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>New Session Page</Text>
      <Text style={styles.subheading}>Under Construction</Text>
      <Danger size={50} color='orange' />
    </View>
  );
}

export default NewSessionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subheading: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
});
