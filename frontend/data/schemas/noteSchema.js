import * as Yup from 'yup';

const noteSchema = Yup.object({
  content: Yup.string().trim().required('Please enter your thoughts'),
  chapter: Yup.string().trim().nullable(),
  page: Yup.number().integer().positive().required('Page required'),
});

export default noteSchema;
