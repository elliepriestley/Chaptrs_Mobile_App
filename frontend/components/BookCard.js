import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';

export default function BookCard({ book, setShowModal, setSelectedBook }) {
  handlePress = () => {
    setSelectedBook(book);
    setShowModal(false);
  };
  if (book) {
    return (
      <TouchableOpacity onPress={handlePress}>
        <View style={styles.container}>
          {book.cover_photo ? (
            <Image
              style={styles.image}
              source={{
                uri: book.cover_photo,
              }}
            />
          ) : (
            <View
              style={[
                styles.image,
                { borderWidth: 1, backgroundColor: '#ddd' },
              ]}
            >
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'Sansation-Regular',
                  fontSize: 12,
                }}
              >
                Cover not available
              </Text>
            </View>
          )}
          <View style={{ alignSelf: 'center', flex: 1 }}>
            <Text style={styles.title}>{book.title}</Text>
            <Text style={styles.author}>{book.authors.join(', ')}</Text>
            <Text style={styles.author}>{book.published.getFullYear()}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    height: 100,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    overflow: 'scroll',
  },
  image: {
    width: 60,
    height: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
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
