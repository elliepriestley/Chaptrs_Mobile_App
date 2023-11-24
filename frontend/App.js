import { NavigationContainer } from '@react-navigation/native';
import { Text } from 'react-native';
import { useFonts } from 'expo-font';
import TabNavigator from './navigators/TabNavigator.js';
import AuthStack from './navigators/AuthStack';
import { AuthProvider, useAuth } from './utils/authContext.jsx';

// Determine which navigator to use based on whether the user is logged in
function NavigationSelector() {
  const { user } = useAuth();
  return <>{user ? <TabNavigator /> : <AuthStack />}</>;
}

export default function App() {
  const [fontsLoaded] = useFonts({
    'Sansation-Regular': require('./assets/fonts/sansation/Sansation_Regular.ttf'),
  });
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }
  return (
    <AuthProvider>
      <NavigationContainer>
        <NavigationSelector />
      </NavigationContainer>
    </AuthProvider>
  );
}
