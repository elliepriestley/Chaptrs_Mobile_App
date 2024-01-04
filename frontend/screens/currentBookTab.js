import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useMainContext } from '../utils/mainContext';
import SessionCard from '../components/SessionCard';
import globalStyles from '../styles/globalStyles';
import Note from '../components/Note';
import { useEffect, useState } from 'react';
import NewNoteModal from '../components/NewNoteModal';

export default function CurrentBookTab() {
  const { mySessions } = useMainContext();
  const [showModal, setShowModal] = useState(false);
  const [currentSession, setCurrentSession] = useState(
    mySessions.find((session) => new Date(session.datetime) > new Date()) ||
      null,
  );

  useEffect(() => {
    const current = mySessions.find(
      (session) => new Date(session.datetime) > new Date(),
    );
    setCurrentSession(current);
  }, [mySessions]);

  return (
    <>
      {currentSession && (
        <NewNoteModal
          setShowModal={setShowModal}
          showModal={showModal}
          sessionId={currentSession._id}
        />
      )}
      <View
        style={{
          flex: 1,
          backgroundColor: '#F8F6F2',
          borderTopRightRadius: 50,
          padding: 20,
        }}
      >
        {currentSession ? (
          <>
            <SessionCard session={currentSession} color='transparent' />
            <TouchableOpacity
              onPress={() => setShowModal(true)}
              style={[
                globalStyles.button,
                {
                  alignSelf: 'flex-start',
                  marginLeft: 0,
                  paddingHorizontal: 20,
                  paddingVertical: 5,
                  marginTop: 10,
                },
              ]}
            >
              <Text style={globalStyles.mdText}>add note</Text>
            </TouchableOpacity>
            <FlatList
              contentContainerStyle={{ paddingBottom: 70 }}
              data={currentSession.notes}
              ListEmptyComponent={() => (
                <Text style={globalStyles.mdText}>
                  No notes have been left.
                </Text>
              )}
              renderItem={({ item }) => {
                return <Note note={item} sessionId={currentSession._id} />;
              }}
            />
          </>
        ) : (
          <Text style={globalStyles.mdText}>
            You currently have no upcoming sessions
          </Text>
        )}
      </View>
    </>
  );
}
