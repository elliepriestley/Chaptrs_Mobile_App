import AuthStack from './routes/authStack';
import { NavigationContainer } from '@react-navigation/native';
import WelcomeScreen from './screens/welcome.js';

export default function App() {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
}
