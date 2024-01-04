import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useMainContext } from '../utils/mainContext';
import api from '../utils/api';
import Heading from '../components/Heading';
import { useAuth } from '../utils/authContext';
import GenresDropdown from '../components/GenresDropdown';
import GenreColorBlock from '../components/genreColorBlock';
import SearchInput from '../components/SearchInput';

function EditBookclubScreen({ navigation, route }) {
  const bookclub = route.params?.bookclub;
  const updatedBookclub = useRef(bookclub);
  const { token, setToken } = useAuth();
  const { setBookclubs } = useMainContext();
  const [newBookclubInfo, setNewBookclubInfo] = useState({
    name: bookclub.name,
    description: bookclub.description,
    genre: bookclub.genre,
  });

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [prevGenres, setPrevGenres] = useState(newBookclubInfo.genre);
  // const [query, setQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleGenresSelected = (selectedGenres) => {
    setSelectedGenres(selectedGenres);
  };

  const handleInput = (key, value) => {
    setNewBookclubInfo({
      ...newBookclubInfo,
      [key]: value,
    });
  };

  // useEffect(() => {
  // }, [selectedGenres]);

  const handleSubmit = async () => {
    try {
      const data = await api.editBookclubInfo(
        bookclub._id,
        {
          ...newBookclubInfo,
          genre: selectedGenres,
        },
        token,
      );
      if (data) setToken(data.token);
      setBookclubs((prev) => {
        const updatedBookclubs = prev.map((prevBookclub) =>
          prevBookclub._id === data.bookclub._id ? data.bookclub : prevBookclub,
        );
        return updatedBookclubs;
      });
      updatedBookclub.current = data.bookclub;
    } catch (error) {
      alert(error.message || 'Something went wrong');
    } finally {
      navigation.navigate('Bookclub Details', {
        bookclub: updatedBookclub.current,
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={'padding'}
      enabled
      style={{ flexGrow: 1, height: '100%' }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <ScrollView nestedScrollEnabled={true}>
            <Heading text='Edit bookclub' />
            <View style={{ gap: 15, marginTop: 20 }}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                placeholder='Enter your bookclub name'
                value={newBookclubInfo.name}
                onChangeText={(text) => handleInput('name', text)}
              />
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={styles.inputArea}
                editable
                multiline
                numberOfLines={6}
                maxLength={240}
                value={newBookclubInfo.description}
                onChangeText={(text) => handleInput('description', text)}
              />
              <Text style={styles.label}>Favourite genres</Text>
              <SearchInput
                placeholder='Search'
                onPress={() => setModalVisible(true)}
              />
              <View>
                {selectedGenres.length === 0 ? (
                  <GenreColorBlock genres={prevGenres} />
                ) : (
                  <GenreColorBlock genres={selectedGenres} />
                )}
                <GenresDropdown
                  onGenresSelected={handleGenresSelected}
                  preSelectedGenres={prevGenres}
                  setModalVisible={setModalVisible}
                  modalVisible={modalVisible}
                />
              </View>
            </View>
            <View style={{ width: '100%', alignItems: 'center' }}>
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.textStyle}>save changes</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.textStyle}>delete bookclub</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingBottom: 100,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Sansation-Regular',
  },
  input: {
    backgroundColor: 'white',
    borderColor: '#695203',
    borderWidth: 1,
    borderRadius: 999,
    padding: 10,
  },
  inputArea: {
    backgroundColor: '#F8F6F2',
    borderRadius: 10,
    height: 120,
    padding: 10,
  },
  button: {
    marginVertical: 20,
    backgroundColor: '#DCC8A9',
    padding: 10,
    borderRadius: 999,
    width: '60%',
    alignItems: 'center',
  },
  textStyle: {
    fontFamily: 'Sansation-Regular',
  },
});

export default EditBookclubScreen;
