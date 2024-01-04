// Libraries
import {
  View,
  StyleSheet,
  RefreshControl,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';

// Components
import Heading from '../../../components/ui/Heading';
import BookclubCard from '../../../components/cards/BookclubCard';
import SearchInput from '../../../components/form/SearchInput';

// Utils and data
import { useMainContext } from '../../../utils/mainContext';
import fetchBookclubs from '../../../utils/fetchBookclubs';

// Icons
import { AddCircle } from 'iconsax-react-native';

export default function CommunityScreen({ navigation: { navigate } }) {
  const { bookclubs } = useMainContext();
  const [searchValue, setSearchValue] = useState('');
  const [filteredBookclubs, setFilteredBookclubs] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const { loading, error } = fetchBookclubs(refetch);

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

  const onRefresh = useCallback(() => {
    setRefetch((prev) => !prev);
  }, [loading]);

  useEffect(() => {
    // once data is fetched, set refetching to null
    // if set to false it will fetch data again
    if (!loading) {
      setRefetch(null);
    }
  }, [loading]);

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
      {loading && !refetch && (
        <ActivityIndicator
          size='large'
          color='#DAA520'
          style={{ marginBottom: 10 }}
        />
      )}
      <ScrollView
        contentContainerStyle={{ gap: 15, paddingBottom: 100 }}
        pagingEnabled={true}
        refreshing={loading}
        refreshControl={
          <RefreshControl
            tintColor='#DAA520'
            refreshing={refetch}
            onRefresh={onRefresh}
          />
        }
      >
        {filteredBookclubs.map((bookclub) => {
          return (
            <BookclubCard
              key={bookclub._id}
              bookclub={bookclub}
              onPress={() =>
                navigate('Bookclub Details', { bookclub: bookclub })
              }
            />
          );
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
