import { StyleSheet, View, Text, TouchableOpacity,Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Formik, Field } from 'formik';
import CustomInput from '../components/CustomInput';
import loginSchema from '../data/schemas/loginSchema';
import api from '../utils/api';
import Logo from '../components/Logo';

function LoginScreen({ navigation, route }) {
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
      console.log(data);
      if (data) {
        navigation.navigate('Main');
      }
    } catch (error) {
      alert(error.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Logo />
        <Text style={{ fontSize: 20, marginLeft: 40, marginBottom: 20, fontFamily: 'Sansation-Regular' }}>
          Welcome back!
        </Text>
        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={onSubmit}
        >
          {({ handleSubmit, isValid }) => (
            <View style={styles.signupContainer}>
              <View style={styles.heading}>
                <Text style={{ fontSize: 20, fontFamily: 'Sansation-Regular' }}>Log In</Text>
              </View>
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
                <Text style={{ textAlign: 'center', fontFamily: 'Sansation-Regular', }}>Login</Text>
              </TouchableOpacity>
                <Text
                  style={{ fontSize: 15, textAlign: 'center', fontFamily: 'Sansation-Regular' }}
                >
                  Don't have an account?{' '}
                  <TouchableOpacity style={{marginBottom: -2}} onPress={() => navigation.navigate('Sign Up')}>
                    <Text style={styles.underline}>Sign Up</Text>
                  </TouchableOpacity>
                </Text>
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
    fontFamily: 'Sansation-Regular' 
  },
});
