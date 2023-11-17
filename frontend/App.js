import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import AuthStack from './routes/authStack';
import WelcomeScreen from './screens/welcome.js';
import LoginScreen from './screens/login.js';
import SignupScreen from './screens/signup.js';
import TabNavigator from './navigators/TabNavigator.js';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Group
          initialRouteName='Welcome'
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen
            name='Welcome'
            component={WelcomeScreen}
            options={{ title: 'Chaptrs' }}
          />
          <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen name='Sign Up' component={SignupScreen} />
        </Stack.Group>
        <Stack.Screen
          name='Main'
          component={TabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
