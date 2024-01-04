import WelcomeScreen from './screens/welcome.js';
import LoginScreen from './screens/login.js';
import SignupScreen from './screens/signup.js';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const AuthStack = createNativeStackNavigator();

export default function AuthStackScreen() {
  return (
    <AuthStack.Navigator
      initialRouteName='Welcome'
      screenOptions={{ headerShown: false }}
    >
      <AuthStack.Screen
        name='Welcome'
        component={WelcomeScreen}
        options={{ title: 'Chaptrs' }}
      />
      <AuthStack.Screen name='Login' component={LoginScreen} />
      <AuthStack.Screen name='Sign Up' component={SignupScreen} />
    </AuthStack.Navigator>
  );
}
