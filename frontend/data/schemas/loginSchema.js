import * as Yup from 'yup';

const loginSchema = Yup.object({
  email: Yup.string().email('Email is not valid').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export default loginSchema;
