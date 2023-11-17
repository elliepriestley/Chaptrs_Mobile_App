import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home.js';
import ProfileScreen from '../screens/profile.js';
import NotificationScreen from '../screens/notifications.js';
import NewSessionScreen from '../screens/newSession.js';
import BooksScreen from '../screens/books.js';
import {
  BookSquare,
  Profile,
  AddCircle,
  Category,
  Notification,
} from 'iconsax-react-native';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        tabBarActiveTintColor: '#DCC8A9',
        tabBarShowLabel: false,
        tabBarInactiveTintColor: 'white',
        tabBarStyle: {
          marginHorizontal: 15,
          paddingHorizontal: 15,
          borderRadius: '999',
          backgroundColor: '#000000',
          bottom: 20,
        },
        tabBarItemStyle: {
          paddingVertical: 30,
          top: 8,
        },
      }}
    >
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => {
            return <Category size={32} color={color} variant='Outline' />;
          },
        }}
      />
      <Tab.Screen
        name='Books'
        component={BooksScreen}
        options={{
          tabBarIcon: ({ color }) => {
            return <BookSquare size={32} color={color} variant='Outline' />;
          },
        }}
      />
      <Tab.Screen
        name='New Session'
        component={NewSessionScreen}
        options={{
          tabBarIcon: ({ color }) => {
            return <AddCircle size={32} color={color} variant='Outline' />;
          },
        }}
      />
      <Tab.Screen
        name='Notifications'
        component={NotificationScreen}
        options={{
          tabBarIcon: ({ color }) => {
            return <Notification size={32} color={color} variant='Outline' />;
          },
        }}
      />
      <Tab.Screen
        name='Profile'
        component={ProfileScreen}
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
