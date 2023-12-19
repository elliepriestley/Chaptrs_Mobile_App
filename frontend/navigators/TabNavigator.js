import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileStackScreen from './ProfileStack.js';
import NewSessionScreen from '../screens/newSession.js';
import HomeStackScreen from './HomeStack.js';
import NoteStackScreen from './NoteStack.js';
import CommunityStackScreen from './CommunityStack.js';
import HeaderCenter from '../components/HeaderCenter.js';
import {
  BookSquare,
  Profile,
  AddCircle,
  Category,
  People,
} from 'iconsax-react-native';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName='HomeStack'
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#DCC8A9',
        tabBarShowLabel: false,
        tabBarInactiveTintColor: 'white',
        tabBarStyle: {
          marginHorizontal: 15,
          paddingHorizontal: 15,
          paddingBottom: 0,
          borderRadius: 999,
          backgroundColor: '#000000',
          marginBottom: 20,
          position: 'absolute',
        },
      }}
    >
      <Tab.Screen
        name='HomeStack'
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({ color }) => {
            return <Category size={32} color={color} variant='Outline' />;
          },
        }}
      />
      <Tab.Screen
        name='CommunityStack'
        component={CommunityStackScreen}
        options={{
          tabBarIcon: ({ color }) => {
            return <People size={32} color={color} variant='Outline' />;
          },
        }}
      />
      <Tab.Screen
        name='New Session'
        component={NewSessionScreen}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerTitle: HeaderCenter,
          headerTintColor: 'black',
          headerShadowVisible: false,
          headerBackTitleVisible: false,
          tabBarIcon: ({ color }) => {
            return <AddCircle size={32} color={color} variant='Outline' />;
          },
        }}
        screenOptions={{}}
      />
      <Tab.Screen
        name='NoteStack'
        component={NoteStackScreen}
        options={{
          tabBarIcon: ({ color }) => {
            return <BookSquare size={32} color={color} variant='Outline' />;
          },
        }}
      />
      <Tab.Screen
        name='ProfileStack'
        component={ProfileStackScreen}
        options={{
          tabBarIcon: ({ color }) => {
            return <Profile size={32} color={color} variant='Outline' />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
