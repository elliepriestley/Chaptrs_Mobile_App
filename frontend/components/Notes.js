import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import globalStyles from '../styles/globalStyles';
import Note from './Note';
import SessionCard from './SessionCard';
import { CloseCircle } from 'iconsax-react-native';

const data = [
  {
    _id: '1',
    content: 'This is a note',
    page: 12,
    chapter: 'Twelve',
  },
  {
    _id: '2',
    content: 'This is a note2',
    page: 13,
    chapter: 'Thirteen',
  },
  {
    _id: '3',
    content: 'This is a note3',
    page: 15,
    chapter: 'Fourteen',
  },
  {
    _id: '4',
    content: 'This is a note4',
    page: 19,
    chapter: 'Fifteen',
  },
];

export default function Notes({ setActiveSession, session }) {
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error) {
      alert(error.message || 'Something went wrong');
    }
  }, [error]);

  return (
    <>
      <Pressable
        style={styles.closeButton}
        onPress={() => setActiveSession(null)}
      >
        <CloseCircle color='black' />
      </Pressable>
      <SessionCard session={session} color='transparent' />
      <FlatList
        contentContainerStyle={styles.container}
        style={{ marginTop: 20 }}
        data={session.notes}
        ListEmptyComponent={() => (
          <Text style={globalStyles.mdText}>
            This session does not have any notes
          </Text>
        )}
        renderItem={({ item }) => {
          return <Note note={item} />;
        }}
        ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F6F2',
    paddingBottom: 70,
  },
  closeButton: {
    top: 5,
    right: 10,
    position: 'absolute',
    zIndex: 9999,
  },
});
