import { StyleSheet, View, Text, Button, Pressable } from 'react-native';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import CustomInput from '../components/CustomInput';

function SignupScreen() {
  // Handling form validation
  const signupSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string()
      .email('Email is not valid')
      .required('Email is required'),
    password: Yup.string()
      .matches(/\w*[a-z]\w*/, 'Password must have a lowercase letter')
      .matches(/\w*[A-Z]\w*/, 'Password must have a uppercase letter')
      .matches(/\d/, 'Password must have a number')
      .matches(
        /[!@#$%^&*()\-_"=+{}; :,<.>]/,
        'Password must have a special character',
      )
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Please confirm your password'),
  });

  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const signUp = (values, { setSubmitting }) => {
    setSubmitting(true);
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 2500);
    console.log('Sign up pressed');
    console.log(values);
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={signupSchema}
        onSubmit={signUp}
      >
        {({ handleSubmit, isValid }) => (
          <View style={styles.signupContainer}>
            <Text style={styles.heading}>Sign Up</Text>
            <Field
              component={CustomInput}
              name='email'
              placeholder='Email Address'
              keyboardType='email-address'
              label='Email Address'
            />
            <Field
              component={CustomInput}
              name='username'
              placeholder='Username'
              label='Username'
            />
            <Field
              component={CustomInput}
              name='password'
              placeholder='Password'
              secureTextEntry
              label='Password'
            />
            <Field
              component={CustomInput}
              name='confirmPassword'
              placeholder='Confirm Password'
              secureTextEntry
              label='Confirm Password'
            />
            <Pressable
              style={isValid ? styles.submit : styles.submitDisabled}
              onPress={handleSubmit}
              disabled={!isValid}
            >
              <Text style={{ color: 'white' }}>Sign Up</Text>
            </Pressable>
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
