import { NavigationContainer } from '@react-navigation/native';
import { Text } from 'react-native';
import { useFonts } from 'expo-font';
import TabNavigator from './navigators/TabNavigator.js';
import AuthStack from './navigators/AuthStack';
import { AuthProvider, useAuth } from './utils/authContext.jsx';
import { MainProvider } from './utils/mainContext.jsx';

// Determine which navigator to use based on whether the user is logged in
function NavigationSelector() {
  const { user } = useAuth();
  return (
    <>
      {user ? (
        <MainProvider>
          <TabNavigator />
        </MainProvider>
      ) : (
        <AuthStack />
      )}
    </>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    'Sansation-Regular': require('./assets/fonts/sansation/Sansation_Regular.ttf'),
    'Sansation-Bold': require('./assets/fonts/sansation/Sansation_Bold.ttf'),
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
