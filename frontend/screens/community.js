import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { AddCircle, Scroll, UserAdd } from 'iconsax-react-native';
import Heading from '../components/Heading';
import BookclubCard from '../components/BookclubCard';
import SearchInput from '../components/SearchInput';
import { useMainContext } from '../utils/mainContext';
import { useAuth } from '../utils/authContext';

export default function CommunityScreen({ navigation: { navigate } }) {
  const { user, token, setToken } = useAuth();
  const { bookclubs, setBookclubs } = useMainContext();
  const [searchValue, setSearchValue] = useState('');
  const [filteredBookclubs, setFilteredBookclubs] = useState([]);

  useEffect(() => {
    setFilteredBookclubs(bookclubs);
  }, [bookclubs]);

  useEffect(() => {
    if (searchValue === '') {
      setFilteredBookclubs(bookclubs);
    } else {
      setFilteredBookclubs(
        bookclubs
          .filter((bookclub) =>
            bookclub.name.toLowerCase().includes(searchValue.toLowerCase()),
          )
          .sort((a, b) => a.name - b.name),
      );
    }
  }, [searchValue]);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Heading text='Community' />
        <AddCircle
          onPress={() => navigate('New Bookclub')}
          size={36}
          color='black'
        />
      </View>
      <SearchInput
        value={searchValue}
        onChangeText={setSearchValue}
        placeholder="Example: Ranter's Book Nook"
      />
      <ScrollView contentContainerStyle={{ gap: 15, paddingBottom: 100, }}>
        {filteredBookclubs.map((bookclub) => {
          return <BookclubCard key={bookclub._id} bookclub={bookclub} />;
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  search: {
    height: 40,
    marginBottom: 20,
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderColor: '#695203',
    borderWidth: 1,
    borderRadius: 999,
    padding: 10,
  },
});
