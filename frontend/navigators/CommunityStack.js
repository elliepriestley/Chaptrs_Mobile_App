import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HeaderCenter from '../components/HeaderCenter.js';
import CommunityScreen from '../screens/community.js';
import NewBookclubScreen from '../screens/newBookclub.js';

const CommunityStack = createNativeStackNavigator();

export default function CommunityStackScreen() {
  return (
    <CommunityStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitle: HeaderCenter,
        headerTintColor: 'black',
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        headerBackTitleStyle: { color: 'green' },
      }}
    >
      <CommunityStack.Screen name='Community' component={CommunityScreen} />
      <CommunityStack.Screen name='New Bookclub' component={NewBookclubScreen} />
    </CommunityStack.Navigator>
  );
}
