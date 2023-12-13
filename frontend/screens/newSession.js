// external libraries
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { Formik, Field } from 'formik';
// import { Picker } from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

// utils, context, data
import { useAuth } from '../utils/authContext';
import { useMainContext } from '../utils/mainContext';
import api from '../utils/api';
import sessionSchema from '../data/schemas/sessionSchema';

// Components
import Heading from '../components/Heading';
import CustomInput from '../components/CustomInput';
import ChooseBookModal from '../components/ChooseBookModal';
import SelectedBook from '../components/SelectedBook';
import SearchInput from '../components/SearchInput';

// icons
import { Calendar, Clock, ArrowDown2 } from 'iconsax-react-native';

const initialDateTime = new Date();
initialDateTime.setSeconds(0);
const currentMins = initialDateTime.getMinutes();
if (currentMins !== 0) {
  initialDateTime.setMinutes(0);
  initialDateTime.setHours(initialDateTime.getHours() + 1);
}

export default function NewSessionScreen({ navigation: { navigate } }) {
  const { setBookclubs, myBookclubs, setSessions } = useMainContext();
  const [selectedBook, setSelectedBook] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [query, setQuery] = useState('');
  const { user, token, setToken } = useAuth();
  const initialValues = {
    location: '',
    details: '',
    datetime: initialDateTime,
    bookclub: myBookclubs[0] || null,
  };

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    if (!selectedBook) return alert('Please select a book');
    setSubmitting(true);
    try {
      const bookData = await api.createBook(selectedBook, token);
      const sessionData = { ...values, chosen_book: bookData.book._id };
      const data = await api.createSession(sessionData, token);
      if (data) setToken(data.token);
      setSessions((prev) => [...prev, data.session]);
      alert(data.message);
      setSelectedBook(null);
      setQuery('');
      resetForm();
      navigate('Home');
    } catch (error) {
      alert(error.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps='handled'
    >
      <ChooseBookModal
        showModal={showModal}
        setShowModal={setShowModal}
        setSelectedBook={setSelectedBook}
        query={query}
        setQuery={setQuery}
      />
      <Heading text='Add new session' />
      <Formik
        initialValues={initialValues}
        validationSchema={sessionSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, isValid, values, setFieldValue }) => (
          <View style={styles.formContainer}>
            <Text style={styles.label}>Book title</Text>
            <SearchInput
              value={query}
              placeholder='Search'
              onChangeText={setQuery}
              onSubmitEditing={() => setShowModal(true)}
            />
            <SelectedBook
              book={selectedBook}
              onPress={() => setShowModal(true)}
            />
            <Text style={styles.label}>Bookclub</Text>
            <RNPickerSelect
              items={myBookclubs.map((bookclub) => {
                return { label: bookclub.name, value: bookclub._id };
              })}
              onValueChange={(itemValue) =>
                setFieldValue('bookclub', itemValue)
              }
              Icon={() => {
                return <ArrowDown2 color='black' />;
              }}
              doneText='Select'
              pickerProps={{
                mode: 'dropdown',
                selectionColor: '#DCC8A94D',
                itemStyle: { fontFamily: 'Sansation-Regular' },
              }}
              placeholder={{ value: null, label: 'Choose a bookclub' }}
              value={values.bookclub}
              style={{
                inputIOS: {
                  fontFamily: 'Sansation-Regular',
                },
                placeholder: {
                  fontFamily: 'Sansation-Regular',
                  color: '#69520377',
                },
                iconContainer: {
                  top: -4,
                },
                done: {
                  color: 'black',
                  fontFamily: 'Sansation-Regular',
                },
                modalViewBottom: {
                  padding: 20,
                },
                viewContainer: {
                  borderRadius: 999,
                  borderColor: '#695203',
                  padding: 10,
                  marginBottom: 20,
                  borderWidth: 1,
                },
              }}
            />
            <Field
              component={CustomInput}
              name='location'
              placeholder='Whereabouts?'
              textContentType='location'
              label='Location'
              placeholderTextColor='#69520377'
            />
            <View style={styles.datetimeContainer}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Calendar size={32} strokeWidth='8px' color='black' />
                <TouchableOpacity
                  style={styles.datetimeDisplay}
                  onPress={() => setShowDatePicker(true)}
                >
                  <Text style={styles.text}>
                    {values.datetime.toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    backgroundColor: '#DCC8A9',
                    borderRadius: 999,
                  }}
                >
                  <DateTimePickerModal
                    isVisible={showDatePicker}
                    value={values.datetime}
                    minimumDate={new Date()}
                    onCancel={() => setShowDatePicker(false)}
                    onConfirm={(date) => {
                      const datetime = new Date(
                        Date.parse(
                          `${date.toDateString()} ${values.datetime.toTimeString()}`,
                        ),
                      );
                      setFieldValue('datetime', datetime);
                      setShowDatePicker(false);
                    }}
                    date={values.datetime}
                    mode='date'
                    display='inline'
                    accentColor='#695203'
                    buttonTextColorIOS='#695203'
                  />
                </View>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Clock size={32} color='black' />
                <TouchableOpacity
                  style={[styles.datetimeDisplay, { minWidth: 80 }]}
                  onPress={() => setShowTimePicker(true)}
                >
                  <Text style={styles.text}>
                    {values.datetime.toLocaleTimeString('en-GB', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={showTimePicker}
                  value={values.datetime}
                  date={values.datetime}
                  minuteInterval={15}
                  onCancel={() => setShowTimePicker(false)}
                  onConfirm={(time) => {
                    const datetime = new Date(
                      Date.parse(
                        `${values.datetime.toDateString()} ${time.toTimeString()}`,
                      ),
                    );
                    setFieldValue('datetime', datetime);
                    setShowTimePicker(false);
                  }}
                  mode='time'
                  display='spinner'
                  accentColor='#695203'
                  buttonTextColorIOS='#695203'
                />
              </View>
            </View>
            <Field
              component={CustomInput}
              name='details'
              placeholder='Write a little about the session'
              label='Session details'
              style={styles.inputArea}
              editable
              multiline
              numberOfLines={6}
              maxLength={240}
            />
            <View style={{ width: '100%', flex: 1 }} />
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
                create session
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
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
  datetimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: 20,
  },
  datetimeDisplay: {
    backgroundColor: '#DCC8A9',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 999,
    marginLeft: 10,
  },
  inputArea: {
    fontFamily: 'Sansation-Regular',
    backgroundColor: '#F8F6F2',
    borderRadius: 10,
    height: 120,
    padding: 10,
    marginBottom: 20,
  },
  label: {
    fontFamily: 'Sansation-Regular',
    fontSize: 15,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
});
