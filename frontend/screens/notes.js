import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Heading from '../components/Heading';
import React, { useEffect, useState } from 'react';
import BookTabView from '../navigators/NotesTabs';

export default function NotesScreen() {
  const [books, setBooks] = useState([]);

  return (
    <View style={styles.container}>
      <Heading text='Notes' headingStyles={{ marginLeft: 20 }} />
      <BookTabView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text: {
    fontFamily: 'Sansation-Regular',
    fontSize: 16,
    textAlign: 'center',
  },
});
