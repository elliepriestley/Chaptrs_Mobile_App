import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useMainContext } from '../utils/mainContext';
import SessionCard from '../components/SessionCard';
import globalStyles from '../styles/globalStyles';
import Note from '../components/Note';

export default function CurrentBookTab() {
  const { mySessions } = useMainContext();
  const currentSession = mySessions[0];
  console.log(currentSession);
  return (
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
        style={[
          globalStyles.button,
          { alignSelf: 'flex-start', marginLeft: 0, paddingHorizontal: 20 },
        ]}
      >
        <Text style={globalStyles.mdText}>add note</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={{ paddingBottom: 70 }}>
        <Note />
        <Note />
      </ScrollView>
    </View>
  );
}
