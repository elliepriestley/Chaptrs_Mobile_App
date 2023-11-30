import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Heading from '../components/Heading';
import React, { useEffect, useState } from 'react';
import { SearchNormal1 } from 'iconsax-react-native';
import api from '../utils/api';
import BookCard from '../components/BookCard';

export default function BookScreen() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setSearching(true);
    try {
      const books = await api.findBooks(query);
      setBooks(books);
    } catch (error) {
      setError(error.message);
    } finally {
      setSearching(false);
    }
  };

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  return (
    <View style={styles.container}>
      <Heading text='Books' />
      <View
        style={{
          flexDirection: 'row',
          gap: 20,
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <TextInput
          style={styles.search}
          placeholder='Search'
          returnKeyType='search'
          placeholderTextColor='#69520377'
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
        />
        <SearchNormal1 onPress={() => handleSearch()} size={36} color='black' />
      </View>
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
            return <BookCard key={book.isbn} book={book} />;
          })}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingBottom: 110,
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
});
