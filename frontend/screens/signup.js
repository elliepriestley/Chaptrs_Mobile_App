import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import { Formik, Field } from 'formik';
import CustomInput from '../components/CustomInput';
import signupSchema from '../data/schemas/signupSchema';
import api from '../utils/api';
import Logo from '../components/Logo';
import Heading from '../components/Heading';

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
      console.log(formData);
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
    <KeyboardAvoidingView
      behavior={'padding'}
      enabled
      style={{ flexGrow: 1, height: '100%' }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          style={{ flex: 1 }}
        >
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
              <Text
                style={{ color: '#695203', fontFamily: 'Sansation-Regular' }}
              >
                Hey!
              </Text>
              {' Join now'}
            </Text>

            <Formik
              initialValues={initialValues}
              validationSchema={signupSchema}
              onSubmit={onSubmit}
            >
              {({ handleSubmit, isValid }) => (
                <View style={styles.signupContainer}>
                  <Heading text='Sign Up' textStyles={{ fontSize: 20 }} />
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
                    autoCapitalize='none'
                    autoCorrect={false}
                    name='password'
                    placeholder='Password'
                    // secureTextEntry
                    textContentType='newPassword'
                    label='password'
                  />
                  <Field
                    component={CustomInput}
                    autoCapitalize='none'
                    autoCorrect={false}
                    name='confirmPassword'
                    placeholder='Confirm Password'
                    // secureTextEntry
                    textContentType='newPassword'
                    label='confirm password'
                  />
                  <TouchableOpacity
                    style={isValid ? styles.submit : styles.submitDisabled}
                    onPress={handleSubmit}
                    disabled={!isValid}
                  >
                    <Text
                      style={{
                        textAlign: 'center',
                        fontFamily: 'Sansation-Regular',
                      }}
                    >
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 15,
                      textAlign: 'center',
                      marginBottom: 20,
                      fontFamily: 'Sansation-Regular',
                    }}
                  >
                    Already have an account?{' '}
                    <TouchableOpacity
                      style={{ marginBottom: -2 }}
                      onPress={() => navigation.navigate('Login')}
                    >
                      <Text style={styles.underline}>Log In</Text>
                    </TouchableOpacity>
                  </Text>
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default SignupScreen;

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
