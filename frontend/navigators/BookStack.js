import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HeaderCenter from '../components/HeaderCenter.js';
import BookScreen from '../screens/books.js';

const BookStack = createNativeStackNavigator();

export default function BookStackScreen() {
  return (
    <BookStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitle: HeaderCenter,
        headerTintColor: 'black',
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        headerBackTitleStyle: { color: 'green' },
      }}
    >
      <BookStack.Screen name='Books' component={BookScreen} />
    </BookStack.Navigator>
  );
}
