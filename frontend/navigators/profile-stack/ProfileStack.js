import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HeaderCenter from '../../components/ui/HeaderCenter.js';
import ProfileScreen from './screens/profile.js';
import EditProfileScreen from './screens/editProfile.js';

const ProfileStack = createNativeStackNavigator();

export default function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitle: HeaderCenter,
        headerTintColor: 'black',
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        headerBackTitleStyle: { color: 'green' },
      }}
    >
      <ProfileStack.Screen name='Profile' component={ProfileScreen} />
      <ProfileStack.Screen name='Edit Profile' component={EditProfileScreen} />
    </ProfileStack.Navigator>
  );
}
