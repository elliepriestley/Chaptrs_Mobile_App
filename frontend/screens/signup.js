import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Formik, Field } from 'formik';
import CustomInput from '../components/CustomInput';
import signupSchema from '../data/schemas/signupSchema';
import api from '../utils/api';
import Logo from '../components/Logo';

function SignupScreen({ navigation }) {
  // Handling form validation

  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const onSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    try {
      const formData = { ...values };
      delete formData.confirmPassword;
      const data = await api.signupUser(formData);
      console.log(data);
      if (data)
        navigation.navigate('Login', {
          email: values.email,
          password: values.password,
        });
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
        <Text style={{ color: '#695203' }}>Hey!</Text>
        {' Join now'}
      </Text>
      <Formik
        initialValues={initialValues}
        validationSchema={signupSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, isValid }) => (
          <View style={styles.signupContainer}>
            <View style={styles.heading}>
              <Text style={{ fontSize: 20 }}>Sign Up</Text>
            </View>
            <Field
              component={CustomInput}
              name='email'
              placeholder='Email'
              keyboardType='email-address'
              textContentType='emailAddress'
              label='email'
            />
            <Field
              component={CustomInput}
              name='username'
              placeholder='Username'
              textContentType='username'
              label='username'
            />
            <Field
              component={CustomInput}
              name='password'
              placeholder='Password'
              secureTextEntry
              textContentType='newPassword'
              label='password'
            />
            <Field
              component={CustomInput}
              name='confirmPassword'
              placeholder='Confirm Password'
              secureTextEntry
              textContentType='newPassword'
              label='confirm password'
            />
            <TouchableOpacity
              style={isValid ? styles.submit : styles.submitDisabled}
              onPress={handleSubmit}
              disabled={!isValid}
            >
              <Text style={{ textAlign: 'center' }}>Sign Up</Text>
            </TouchableOpacity>
            <Text
              style={{ fontSize: 15, textAlign: 'center', marginBottom: 20 }}
            >
              Already have an account?{' '}
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.underline}>Log In</Text>
              </TouchableOpacity>
            </Text>
          </View>
        )}
      </Formik>
    </View>
  );
}

export default SignupScreen;

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
