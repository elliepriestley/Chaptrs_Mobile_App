import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Calendar1 } from 'iconsax-react-native';
import React from 'react';

export default function BookCard({ book }) {
  handlePress = () => {
    console.log(book);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
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
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    height: 100,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#E9E1D54D',
    overflow: 'scroll',
  },
  image: {
    width: 60,
    height: '100%',
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Sansation-Regular',
  },
  author: {
    fontSize: 12,
    fontFamily: 'Sansation-Regular',
    color: '#695203',
  },
  icon: {
    marginRight: 5,
  },
});
