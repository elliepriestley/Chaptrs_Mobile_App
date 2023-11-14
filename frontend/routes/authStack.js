import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/welcome';
import LoginScreen from '../screens/login';
import SignupScreen from '../screens/signup';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Group initialRouteName='Welcome'>
      <Stack.Screen
        name='Welcome'
        component={WelcomeScreen}
        options={{ title: 'Chaptrs' }}
      />
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Sign Up' component={SignupScreen} />
    </Stack.Group>
  );
};

export default AuthStack;
