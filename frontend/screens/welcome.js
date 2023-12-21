import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import BgImg from '../assets/chaptrs.jpg';
import { Buttons, Typography } from '../styles';

function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground source={BgImg} resizeMode='cover' style={styles.image}>
        <Text style={styles.heading}>Welcome to Chaptrs</Text>
        <Text style={styles.subheading}>
          The social media app for book lovers
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={Buttons.main.primary.text}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Sign Up')}
        >
          <Text style={Buttons.main.primary.text}>Sign Up</Text>
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
    ...Typography.heading['4xl'],
    lineHeight: 48,
    textAlign: 'center',
    marginBottom: 10,
  },
  subheading: {
    ...Typography.fontSize.xxl,
    width: 200,
    textAlign: 'center',
    marginBottom: 10,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    ...Buttons.main.primary.container,
    marginVertical: 10,
    paddingHorizontal: 70,
  },
});
