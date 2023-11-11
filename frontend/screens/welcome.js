import { StyleSheet, View, Text, Image, Button } from 'react-native';
import Logo from '../assets/chaptrs.jpg';

function WelcomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to Chaptrs</Text>
      <Image source={Logo} style={styles.logo} />
      <Text style={{marginBottom: 20}}>The social media app for book lovers</Text>
      <Button title='Login' onPress={() => navigation.navigate('Login')} />
      <Button title='Sign Up' onPress={() => navigation.navigate('Sign Up')} />
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 300,
    maxHeight: 300,
  }
});
