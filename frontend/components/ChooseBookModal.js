import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Modal,
  Pressable,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import api from '../utils/api';
import BookCard from './BookCard';
import SearchInput from './SearchInput';

export default function ChooseBookModal({
  showModal,
  setShowModal,
  setSelectedBook,
  query,
  setQuery,
}) {
  const [books, setBooks] = useState([]);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (query === '') return;
    setSearching(true);
    try {
      const books = await api.findBooks(query);
      setBooks(() => books);
    } catch (error) {
      setError(error.message);
    } finally {
      setSearching(false);
    }
  };

  useEffect(() => {
    if (!showModal) return;
    handleSearch();
  }, [showModal]);

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={showModal}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setShowModal(!showModal);
      }}
    >
      <View style={styles.modal}>
        <SearchInput
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          placeholder='Search'
        />
        {searching ? (
          <ActivityIndicator size='large' color='#695203' />
        ) : (
          <ScrollView contentContainerStyle={{ gap: 15 }}>
            {books.length === 0 &&
              (query === '' ? (
                <Text style={styles.text}>Search for a book</Text>
              ) : (
                <Text style={styles.text}>No Books Found</Text>
              ))}
            {books.map((book, i) => {
              return (
                <BookCard
                  key={book.isbn}
                  book={book}
                  setShowModal={setShowModal}
                  setSelectedBook={setSelectedBook}
                />
              );
            })}
          </ScrollView>
        )}
        <Pressable
          style={styles.button}
          onPress={() => setShowModal(!showModal)}
        >
          <Text style={styles.textStyle}>close</Text>
        </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#F8F6F2',
    borderRadius: 50,
    padding: 35,
    bottom: 0,
    top: 160,
    width: '100%',
    position: 'absolute',
  },
  search: {
    flex: 1,
    backgroundColor: 'white',
    borderColor: '#695203',
    borderWidth: 1,
    borderRadius: 999,
    padding: 10,
  },
  text: {
    fontFamily: 'Sansation-Regular',
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#DCC8A9',
    alignItems: 'center',
    padding: 10,
    borderRadius: 999,
    marginHorizontal: 20,
  },
});
