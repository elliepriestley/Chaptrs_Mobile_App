import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HeaderCenter from '../../components/ui/HeaderCenter.js';
import CommunityScreen from './screens/community.js';
import NewBookclubScreen from './screens/newBookclub.js';
import BookclubDetailsScreen from './screens/bookclubDetails.js';
import EditBookclubScreen from './screens/editBookclub.js';

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
      <CommunityStack.Screen
        name='New Bookclub'
        component={NewBookclubScreen}
      />
      <CommunityStack.Screen
        name='Bookclub Details'
        component={BookclubDetailsScreen}
      />
      <CommunityStack.Screen
        name='Edit Bookclub'
        component={EditBookclubScreen}
      />
    </CommunityStack.Navigator>
  );
}
