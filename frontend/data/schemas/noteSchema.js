import * as Yup from 'yup';

const noteSchema = Yup.object({
  content: Yup.string().trim().required('Please enter your thoughts'),
  chapter: Yup.string().trim(),
  page: Yup.number().integer().positive(),
  // chapter: Yup.string().when('page', {
  //   is: (val) => val,
  //   then: Yup.string().required('Please enter a page number or chapter'),
  // }),
  // page: Yup.number().when('chapter', {
  //   is: (val) => val,
  //   then: Yup.number().required('Please enter a page number or chapter'),
  // }),
});

export default noteSchema;
