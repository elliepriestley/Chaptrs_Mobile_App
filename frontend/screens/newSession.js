import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Formik, Field } from 'formik';
import Heading from '../components/Heading';
import CustomInput from '../components/CustomInput';
import sessionSchema from '../data/schemas/sessionSchema';
import api from '../utils/api';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useAuth } from '../utils/authContext';
import ChooseBookModal from '../components/ChooseBookModal';
import SelectedBook from '../components/SelectedBook';
import { useMainContext } from '../utils/mainContext';
import SearchInput from '../components/SearchInput';
import { useRef } from 'react';
import { Calendar1, Clock } from 'iconsax-react-native';

export default function NewSessionScreen({ navigation: { navigate } }) {
  const { setBookclubs, myBookclubs, setSessions } = useMainContext();
  const [selectedBook, setSelectedBook] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [query, setQuery] = useState('');
  const { user, token, setToken } = useAuth();
  const initialValues = {
    location: '',
    description: '',
    datetime: new Date(),
    bookclub: '',
  };

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    try {
      const bookData = await api.createBook(selectedBook, token);
      const sessionData = { ...values, chosen_book: bookData.book._id };
      const data = await api.createSession(sessionData, token);
      if (data) setToken(data.token);
      setSessions((prev) => [...prev, data.session]);
      alert(data.message);
      setSelectedBook(null);
      resetForm();
      navigate('Home');
    } catch (error) {
      alert(error.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <ChooseBookModal
        showModal={showModal}
        setShowModal={setShowModal}
        setSelectedBook={setSelectedBook}
        query={query}
        setQuery={setQuery}
      />
      <Heading text='Create a session' />
      <Formik
        initialValues={initialValues}
        validationSchema={sessionSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, isValid, values, setFieldValue }) => (
          <View style={styles.formContainer}>
            <SearchInput
              value={query}
              placeholder='Book title'
              onChangeText={setQuery}
              onSubmitEditing={() => setShowModal(true)}
            />
            <SelectedBook book={selectedBook} />
            <Picker
              placeholder='Choose a bookclub'
              itemStyle={{
                color: '#695203',
                fontFamily: 'Sansation-Regular',
                fontSize: 18,
                height: 70,
                overflow: 'hidden',
                justifyContent: 'center',
              }}
              mode='dropdown'
              selectionColor={'#DCC8A94D'}
              selectedValue={values.bookclub}
              onValueChange={(itemValue, itemIndex) => {
                console.log('itemValue', itemValue);
                setFieldValue('bookclub', itemValue);
              }}
            >
              {myBookclubs.map((bookclub) => {
                return (
                  <Picker.Item
                    key={bookclub?._id}
                    label={bookclub?.name}
                    value={bookclub?._id}
                  />
                );
              })}
            </Picker>
            <Field
              component={CustomInput}
              name='location'
              placeholder='Whereabouts?'
              textContentType='location'
              label='Location'
            />
            <Field
              component={CustomInput}
              name='description'
              placeholder='Write a little about the session'
              label='Description'
              multiline
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 20,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Calendar1 size={32} color='#695203' />
                <DateTimePicker
                  value={values.datetime}
                  minimumDate={new Date()}
                  onChange={(event, date) => {
                    const datetime = new Date(
                      Date.parse(
                        `${date.toDateString()} ${values.datetime.toTimeString()}`,
                      ),
                    );
                    setFieldValue('datetime', datetime);
                  }}
                  mode={'date'}
                  accentColor='#695203'
                />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Clock size={32} color='#695203' />
                <DateTimePicker
                  value={values.datetime}
                  minuteInterval={1}
                  onChange={(event, time) => {
                    const datetime = new Date(
                      Date.parse(
                        `${values.datetime.toDateString()} ${time.toTimeString()}`,
                      ),
                    );
                    setFieldValue('datetime', datetime);
                  }}
                  mode={'time'}
                  accentColor='#695203'
                />
              </View>
            </View>
            <TouchableOpacity
              style={
                isValid
                  ? [styles.button, styles.submit]
                  : [styles.button, styles.submit, { backgroundColor: '#ddd' }]
              }
              onPress={handleSubmit}
              disabled={!isValid}
            >
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'Sansation-Regular',
                }}
              >
                create
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingBottom: 110,
  },
  search: {
    flex: 1,
    backgroundColor: 'white',
    borderColor: '#695203',
    borderWidth: 1,
    borderRadius: 999,
    padding: 10,
  },
  button: {
    backgroundColor: '#DCC8A9',
    padding: 10,
    borderRadius: 999,
    width: '80%',
    marginTop: 10,
    alignSelf: 'center',
  },
  text: {
    fontFamily: 'Sansation-Regular',
    fontSize: 16,
    textAlign: 'center',
  },
  formContainer: {
    flex: 1,
  },
});
