import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { useMainContext } from '../utils/mainContext';
import globalStyles from '../styles/globalStyles';
import { useState, useEffect } from 'react';
import Notes from '../components/Notes';
import BookclubPill from '../components/BookclubPill';

export default function PastBooksTab() {
  const { mySessions } = useMainContext();
  const [pastSessions, setPastSessions] = useState(
    mySessions
      .filter((session) => new Date(session.datetime) < new Date())
      .reverse(),
  );

  useEffect(() => {
    const past = mySessions
      .filter((session) => new Date(session.datetime) < new Date())
      .reverse();
    setPastSessions(past);
  }, [mySessions]);

  const [activeSession, setActiveSession] = useState(null);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#F8F6F2',
        borderTopLeftRadius: 50,
        padding: 15,
      }}
    >
      {activeSession ? (
        <Notes setActiveSession={setActiveSession} session={activeSession} />
      ) : (
        <FlatList
          contentContainerStyle={{ padding: 10, paddingBottom: 90 }}
          style={{ borderTopLeftRadius: 30 }}
          data={pastSessions}
          renderItem={({ item }) => {
            return (
              <PastBookCard
                setActiveSession={setActiveSession}
                session={item}
              />
            );
          }}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 1,
                backgroundColor: '#DCC8A9',
                marginVertical: 10,
              }}
            />
          )}
          ListEmptyComponent={() => (
            <Text style={globalStyles.mdText}>
              You haven't been to any sessions yet.
            </Text>
          )}
        />
      )}
    </View>
  );
}

function PastBookCard({ session, setActiveSession }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        justifyContent: 'space-between',
      }}
    >
      <Image
        source={{ uri: session.chosen_book.cover_photo }}
        style={{
          width: 70,
          height: 100,
          borderRadius: 10,
        }}
      />
      <View
        style={{ flexDirection: 'column', flex: 1, flexBasis: 150, gap: 5 }}
      >
        <Text style={globalStyles.smText}>{session.chosen_book.title}</Text>
        <Text
          style={[
            globalStyles.smText,
            { marginBottom: 10, fontSize: 10, color: '#695203' },
          ]}
        >
          {session.chosen_book.authors.join(', ')}
        </Text>
        <BookclubPill bookclub={session.bookclub} size={20} />
      </View>
      <TouchableOpacity
        onPress={() => setActiveSession(session)}
        style={[
          globalStyles.button,
          { marginLeft: 0, paddingHorizontal: 10, paddingVertical: 5 },
        ]}
      >
        <Text style={globalStyles.smText}>see notes</Text>
      </TouchableOpacity>
    </View>
  );
}
