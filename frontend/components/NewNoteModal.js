import {
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { Field, Formik } from 'formik';
import noteSchema from '../data/schemas/noteSchema';
import CustomInput from './CustomInput';
import globalStyles from '../styles/globalStyles';
import { useAuth } from '../utils/authContext';
import { useMainContext } from '../utils/mainContext';

export default function NewNoteModal({
  showModal,
  setShowModal,
  note,
  sessionId,
}) {
  const { token, setToken } = useAuth();
  const { setSessions } = useMainContext();
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
    setSubmitting(true);
    try {
      let data
      if (!note) {
        data = await api.createSessionNote(
          values,
          sessionId,
          token,
        );
      } else {
        data = await api.updateSessionNote(values, note._id, sessionId, token);
      }
      if (data) setToken(data.token);
      setSessions((prev) => {
        const filteredArray = prev.filter(
          (session) => session._id !== data.session._id,
        );
        return [...filteredArray, data.session];
      });
      setError(null);
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
                displayError={false}
              />
              <View
                style={{
                  // flexDirection: 'row',
                  // alignItems: 'center',
                  gap: 20,
                  marginBottom: 20,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <Text style={globalStyles.mdText}>Chapter</Text>
                  <Field
                    component={CustomInput}
                    name='chapter'
                    placeholder='e.g. Lost in Battle'
                    placeholderTextColor='#69520377'
                    clearButtonMode='while-editing'
                    inputStyle={{
                      marginBottom: 0,
                      width: 200,
                    }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <Text style={globalStyles.mdText}>Page</Text>
                  <Field
                    component={CustomInput}
                    name='page'
                    placeholder='369'
                    keyboardType='numeric'
                    placeholderTextColor='#69520377'
                    maxLength={4}
                    textAlign='center'
                    inputStyle={{
                      marginBottom: 0,
                      width: 60,
                    }}
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
