import {
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { Field, Formik } from 'formik';
import noteSchema from '../data/schemas/noteSchema';
import CustomInput from './CustomInput';
import globalStyles from '../styles/globalStyles';

export default function NewNoteModal({ showModal, setShowModal, note }) {
  const [error, setError] = useState(null);

  const initialValues = {
    content: note?.content || '',
    page: note?.page.toString() || null,
    chapter: note?.chapter || null,
  };

  useEffect(() => {
    if (error) {
      alert(error.message || 'Something went wrong');
    }
  }, [error]);

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log(note.page);
    setSubmitting(true);
    try {
      // const data = await api.createNote(sessionId, token);
      // if (data) setToken(data.token);
      // update sessions here
      throw new Error('Not implemented');
      resetForm();
      setShowModal(false);
    } catch (error) {
      setError(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={showModal}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setShowModal(!showModal);
      }}
    >
      <ScrollView
        keyboardShouldPersistTaps='never'
        keyboardDismissMode='interactive'
        style={styles.modal}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={noteSchema}
          onSubmit={onSubmit}
        >
          {({ handleSubmit, isValid, values, setFieldValue }) => (
            <View style={styles.formContainer}>
              <Field
                component={CustomInput}
                name='content'
                placeholder="Tell us what you're thinking"
                style={styles.inputArea}
                editable
                multiline
                numberOfLines={6}
                maxLength={240}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 20,
                  marginBottom: 20,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 5,
                  }}
                >
                  <Text style={globalStyles.mdText}>Page</Text>
                  <Field
                    component={CustomInput}
                    name='page'
                    placeholder='369'
                    keyboardType='numeric'
                    placeholderTextColor='#69520377'
                    inputStyle={{
                      marginBottom: 0,
                      // width: 50,
                    }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 5,
                  }}
                >
                  <Text style={globalStyles.mdText}>Chapter</Text>
                  <Field
                    component={CustomInput}
                    name='chapter'
                    placeholder='Chapter Twelve'
                    placeholderTextColor='#69520377'
                    inputStyle={{ marginBottom: 0 }}
                  />
                </View>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={
                    isValid
                      ? [styles.button, styles.submit]
                      : [
                          styles.button,
                          styles.submit,
                          { backgroundColor: '#ddd' },
                        ]
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
                    save
                  </Text>
                </TouchableOpacity>
                <Pressable
                  style={[
                    styles.button,
                    { backgroundColor: 'black', color: 'white' },
                  ]}
                  onPress={() => setShowModal(!showModal)}
                >
                  <Text style={(styles.textStyle, { color: 'white' })}>
                    close
                  </Text>
                </Pressable>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#F8F6F2',
    borderRadius: 50,
    padding: 35,
    bottom: 0,
    top: 140,
    width: '100%',
    position: 'absolute',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#DCC8A9',
    alignItems: 'center',
    padding: 10,
    borderRadius: 999,
    marginHorizontal: 20,
  },
  inputArea: {
    fontFamily: 'Sansation-Regular',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    height: 200,
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#695203',
  },
  buttonContainer: {
    // position: 'absolute',
    // width: '100%',
    // bottom: 0,
  },
  formContainer: {
    // height: '100%',
    // minHeight: 500,
  },
});
