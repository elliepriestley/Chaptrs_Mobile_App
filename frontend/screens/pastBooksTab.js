import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import { useMainContext } from '../utils/mainContext';
import globalStyles from '../styles/globalStyles';

export default function PastBooksTab() {
  const { mySessions } = useMainContext();
  const currentSession = mySessions[0];
  console.log(currentSession);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#F8F6F2',
        borderTopLeftRadius: 50,
        padding: 20,
      }}
    >
      <FlatList
        data={[...mySessions, ...mySessions, ...mySessions, ...mySessions]}
        renderItem={({ item }) => {
          return <PastBookCard session={item} />;
        }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    </View>
  );
}

function PastBookCard({ session }) {
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
      <View style={{ flexDirection: 'column', flex: 1, flexBasis: 150 }}>
        <Text style={globalStyles.mdText}>{session.chosen_book.title}</Text>
        <Text style={[globalStyles.smText, { marginBottom: 10 }]}>
          {session.chosen_book.authors.join(', ')}
        </Text>
        <Text style={globalStyles.mdText}>Bookclub</Text>
      </View>
      <TouchableOpacity
        style={[globalStyles.button, { marginLeft: 0, paddingHorizontal: 10 }]}
      >
        <Text style={globalStyles.smText}>see notes</Text>
      </TouchableOpacity>
    </View>
  );
}
