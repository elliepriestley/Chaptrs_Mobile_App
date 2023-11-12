import * as Yup from 'yup';

const signupSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Email is not valid').required('Email is required'),
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

export default signupSchema;
