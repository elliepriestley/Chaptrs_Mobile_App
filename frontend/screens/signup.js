import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Formik, Field } from 'formik';
import CustomInput from '../components/CustomInput';
import signupSchema from '../data/schemas/signupSchema';
import api from '../utils/api';

function SignupScreen({navigation}) {
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
      if (data) navigation.navigate('Login', { email: values.email, password: values.password });
    } catch (error) {
      alert(error.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={signupSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, isValid }) => (
          <View style={styles.signupContainer}>
            <Text style={styles.heading}>Sign Up</Text>
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
              name='username'
              placeholder='Username'
              textContentType='username'
              label='Username'
            />
            <Field
              component={CustomInput}
              name='password'
              placeholder='Password'
              secureTextEntry
              textContentType='newPassword'
              label='Password'
            />
            <Field
              component={CustomInput}
              name='confirmPassword'
              placeholder='Confirm Password'
              secureTextEntry
              textContentType='newPassword'
              label='Confirm Password'
            />
            <TouchableOpacity
              style={isValid ? styles.submit : styles.submitDisabled}
              onPress={handleSubmit}
              disabled={!isValid}
            >
              <Text style={{ color: 'white' }}>Sign Up</Text>
            </TouchableOpacity>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    padding: 15,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 5,
    backgroundColor: '#fff',
  },
  errorText: {
    fontSize: 10,
    color: 'red',
    marginBottom: 10,
  },
  submit: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#86A789',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  submitDisabled: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#red',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  signupContainer: {
    width: '80%',
    alignItems: 'center',
    padding: 20,
    elevation: 10,
    backgroundColor: '#EBF3E8',
    borderRadius: 10,
  },
});
