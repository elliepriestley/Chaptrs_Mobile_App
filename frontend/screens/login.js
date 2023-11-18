import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Formik, Field } from 'formik';
import CustomInput from '../components/CustomInput';
import loginSchema from '../data/schemas/loginSchema';
import api from '../utils/api';
import Logo from '../components/Logo';

function LoginScreen({ navigation, route }) {
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
    <View style={styles.container}>
      <Logo />
      <Text style={{ fontSize: 20, marginLeft: 40, marginBottom: 20 }}>
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
              <Text style={{ fontSize: 20 }}>Log In</Text>
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
              <Text style={{ textAlign: 'center' }}>Login</Text>
            </TouchableOpacity>
            <Text
              style={{ fontSize: 15, textAlign: 'center', marginBottom: 20 }}
            >
              Don't have an account?{' '}
              <TouchableOpacity onPress={() => navigation.navigate('Sign Up')}>
                <Text style={styles.underline}>Sign Up</Text>
              </TouchableOpacity>
            </Text>
          </View>
        )}
      </Formik>
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
  },
  heading: {
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
    elevation: 10,
    backgroundColor: '#F8F6F2',
    borderRadius: 50,
    height: '70%',
  },
  underline: { textDecorationLine: 'underline', color: '#695203' },
});
