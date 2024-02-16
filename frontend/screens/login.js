import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Button,
} from 'react-native';
import { Formik, Field } from 'formik';
import CustomInput from '../components/CustomInput';
import loginSchema from '../data/schemas/loginSchema';
import api from '../utils/api';
import Logo from '../components/Logo';
import Heading from '../components/Heading';
import { useAuth } from '../utils/authContext';

function LoginScreen({ navigation, route }) {
  const { setUser, setToken } = useAuth();

  // Handling form validation
  const initialValues = {
    email: route.params?.email || '',
    password: route.params?.password || '',
  };

  const onSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    try {
      const formData = { ...values };
      delete formData.confirmPassword;
      const data = await api.loginUser(formData);
      if (data) {
        setToken(data.token);
        setUser(data.user);
      }
    } catch (error) {
      alert(error.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  const DemoLogin = async (setValues, setTouched, handleSubmit) => {
    await setValues({ email: 'user@test.com', password: 'Qwerty1!' });
    await setTouched({ email: 'true', password: 'true' });
    handleSubmit();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Logo />
        <Text
          style={{
            fontSize: 20,
            marginLeft: 40,
            marginBottom: 20,
            fontFamily: 'Sansation-Regular',
          }}
        >
          Welcome back!
        </Text>
        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={onSubmit}
        >
          {({ handleSubmit, isValid, setValues, setTouched }) => (
            <View style={styles.signupContainer}>
              <Heading text='Log In' textStyles={{ fontSize: 20 }} />
              <Field
                component={CustomInput}
                name='email'
                placeholder='Email Address'
                keyboardType='email-address'
                textContentType='emailAddress'
                label='Email Address'
              />
              <Field
                component={CustomInput}
                name='password'
                placeholder='Password'
                secureTextEntry
                textContentType='password'
                label='Password'
              />
              <TouchableOpacity
                style={
                  isValid
                    ? styles.submit
                    : { ...styles.submit, backgroundColor: '#ddd' }
                }
                onPress={handleSubmit}
                disabled={!isValid}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: 'Sansation-Regular',
                  }}
                >
                  Login
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 15,
                  textAlign: 'center',
                  fontFamily: 'Sansation-Regular',
                }}
              >
                Don't have an account?{' '}
                <TouchableOpacity
                  style={{ marginBottom: -2 }}
                  onPress={() => navigation.navigate('Sign Up')}
                >
                  <Text style={styles.underline}>Sign Up</Text>
                </TouchableOpacity>
              </Text>
              {/* <Button
                title='Demo Login'
                color='red'
                onPress={() => DemoLogin(setValues, setTouched, handleSubmit)}
              /> */}
            </View>
          )}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  heading: {
    fontFamily: 'Sansation-Regular',
    fontSize: 25,
    marginBottom: 20,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderColor: '#DCC8A9',
    alignSelf: 'flex-start',
  },
  submit: {
    marginVertical: 20,
    backgroundColor: '#DCC8A9',
    padding: 10,
    borderRadius: 999,
    marginHorizontal: 50,
  },
  signupContainer: {
    width: '100%',
    padding: 40,
    backgroundColor: '#F8F6F2',
    borderRadius: 50,
    height: '100%',
  },
  underline: {
    fontSize: 15,
    textDecorationLine: 'underline',
    color: '#695203',
    fontFamily: 'Sansation-Regular',
  },
});
