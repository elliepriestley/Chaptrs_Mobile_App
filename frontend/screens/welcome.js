import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import BgImg from '../assets/chaptrs.jpg';

function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground source={BgImg} resizeMode='cover' style={styles.image}>
      
        <Text style={styles.heading}>Welcome to Chaptrs</Text>
        <Text style={{ marginBottom: 20 }}>
          The social media app for book lovers
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Sign Up')}
        >
          <Text>Sign Up</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 48,
    lineHeight: 60,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginVertical: 20,
    backgroundColor: '#DCC8A9',
    padding: 10,
    borderRadius: 999,
    marginHorizontal: 50,
    width: '50%',
    alignItems: 'center',
  },
});
