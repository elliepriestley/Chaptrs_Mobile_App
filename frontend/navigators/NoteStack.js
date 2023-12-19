import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HeaderCenter from '../components/HeaderCenter.js';
import NotesScreen from '../screens/notes.js';

const NoteStack = createNativeStackNavigator();

export default function NoteStackScreen() {
  return (
    <NoteStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitle: HeaderCenter,
        headerTintColor: 'black',
        headerShadowVisible: false,
        headerBackTitleVisible: false,
      }}
    >
      <NoteStack.Screen name='Books' component={NotesScreen} />
    </NoteStack.Navigator>
  );
}
