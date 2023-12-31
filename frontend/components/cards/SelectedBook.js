import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';

export default function SelectedBook({ book, onPress: handlePress }) {
  if (book) {
    return (
      <TouchableOpacity style={styles.container} onPress={handlePress}>
        <Image
          style={styles.image}
          source={{
            uri: book.cover_photo,
          }}
        />
        <View style={{ alignSelf: 'center', flex: 1 }}>
          <Text style={styles.title}>{book.title}</Text>
          <Text style={styles.author}>{book.authors.join(', ')}</Text>
          <Text style={styles.author}>{book.published.getFullYear()}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    height: 130,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#E9E1D54D',
    overflow: 'scroll',
    marginBottom: 20,
  },
  image: {
    width: 80,
    height: '100%',
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Sansation-Regular',
  },
  author: {
    fontSize: 14,
    fontFamily: 'Sansation-Regular',
    color: '#695203',
  },
});
