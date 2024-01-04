import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HeaderCenter from '../../components/ui/HeaderCenter.js';
import SessionDetailsScreen from './screens/sessionDetails.js';
import HomeScreen from './screens/home.js';

const HomeStack = createNativeStackNavigator();

export default function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitle: HeaderCenter,
        headerTintColor: 'black',
        headerShadowVisible: false,
        headerBackTitleVisible: false,
      }}
    >
      <HomeStack.Screen name='Home' component={HomeScreen} />
      <HomeStack.Screen
        name='Session Details'
        component={SessionDetailsScreen}
      />
    </HomeStack.Navigator>
  );
}
