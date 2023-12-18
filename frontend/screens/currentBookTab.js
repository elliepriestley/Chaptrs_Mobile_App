import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useMainContext } from '../utils/mainContext';
import SessionCard from '../components/SessionCard';
import globalStyles from '../styles/globalStyles';
import Note from '../components/Note';
import { useState } from 'react';
import NewNoteModal from '../components/NewNoteModal';

export default function CurrentBookTab() {
  const { mySessions } = useMainContext();
  const [showModal, setShowModal] = useState(false);
  const currentSession = mySessions[0];
  console.log(currentSession);
  return (
    <>
      <NewNoteModal
        setShowModal={setShowModal}
        showModal={showModal}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: '#F8F6F2',
          borderTopRightRadius: 50,
          padding: 20,
        }}
      >
        <SessionCard session={currentSession} />
        <TouchableOpacity
          onPress={() => setShowModal(true)}
          style={[
            globalStyles.button,
            { alignSelf: 'flex-start', marginLeft: 0, paddingHorizontal: 20 },
          ]}
        >
          <Text style={globalStyles.mdText}>add note</Text>
        </TouchableOpacity>
        <ScrollView contentContainerStyle={{ paddingBottom: 70 }}>
          <Note note={{ content: 'Hello', page: 12, chapter: 'Twelve' }} />
          <Note />
        </ScrollView>
      </View>
    </>
  );
}
