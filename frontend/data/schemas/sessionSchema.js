import * as Yup from 'yup';

const sessionSchema = Yup.object({
  location: Yup.string().required('We need to know where to meet!'),
  datetime: Yup.date().required('We need to know when to meet!'),
  bookclub: Yup.string().required('Which bookclub is this for?'),
  details: Yup.string(),
});

export default sessionSchema;
