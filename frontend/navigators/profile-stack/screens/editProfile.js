import React, { useState, useEffect } from 'react';
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
import { useAuth } from '../../../utils/authContext';
import api from '../../../utils/api';
import Heading from '../../../components/ui/Heading';
import GenresDropdown from '../../../components/ui/GenresDropdown';
import GenreColorBlock from '../../../components/ui/genreColorBlock';
import SearchInput from '../../../components/form/SearchInput';

function EditProfileScreen({ navigation }) {
  const { user, setUser, token, setToken } = useAuth();
  const [newUserInfo, setNewUserInfo] = useState({
    username: user.username,
    description: user.description,
    genre: user.genre,
  });

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [prevGenres, setPrevGenres] = useState(newUserInfo.genre);
  // const [query, setQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleGenresSelected = (selectedGenres) => {
    setSelectedGenres(selectedGenres);
  };

  const handleInput = (key, value) => {
    setNewUserInfo({
      ...newUserInfo,
      [key]: value,
    });
  };

  useEffect(() => {}, [selectedGenres]);

  const handleSubmit = async () => {
    try {
      const data = await api.editUserInfo(
        user._id,
        {
          ...newUserInfo,
          genre: selectedGenres,
        },
        token,
      );
      if (data) setToken(data.token);
      setUser(data.user);
    } catch (error) {
      alert(error.message || 'Something went wrong');
    } finally {
      navigation.navigate('Profile');
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
            <Heading text='Edit profile' />
            <View style={{ gap: 15, marginTop: 20 }}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                placeholder='Enter your name'
                value={newUserInfo.username}
                onChangeText={(text) => handleInput('username', text)}
              />
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={styles.inputArea}
                editable
                multiline
                numberOfLines={6}
                maxLength={240}
                value={newUserInfo.description}
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
                <Text style={styles.textStyle}>delete profile</Text>
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

export default EditProfileScreen;
