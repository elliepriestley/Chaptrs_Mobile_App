import { Text, useWindowDimensions, FlatList } from 'react-native';
import SessionCard from './SessionCard';
import { useNavigation } from '@react-navigation/native';
import globalStyles from '../../styles/globalStyles';

export default function Sessions({ sessions = [], sessionType }) {
  const layout = useWindowDimensions();

  const navigation = useNavigation();
  const handlePress = (session) => {
    navigation.navigate('Session Details', { session });
  };

  return (
    <FlatList
      style={{
        width: layout.width,
        transform: [{ translateX: -20 }],
      }}
      contentContainerStyle={{
        height: 180,
        gap: 15,
        marginBottom: 10,
        paddingHorizontal: 20,
      }}
      data={sessions}
      renderItem={({ item }) => {
        return <SessionCard session={item} onPress={() => handlePress(item)} />;
      }}
      horizontal={true}
      keyExtractor={(session) => session._id}
      ListEmptyComponent={() => (
        <Text style={globalStyles.mdText}>
          {`There are no ${
            sessionType ? sessionType.toLowerCase() + ' ' : ''
          }sessions.`}
        </Text>
      )}
    />
  );
}
