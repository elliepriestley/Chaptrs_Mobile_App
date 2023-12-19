import { View, Text, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useAuth } from '../utils/authContext';
import { useMainContext } from '../utils/mainContext';
import Heading from '../components/Heading';
import SearchInput from '../components/SearchInput';
import { ArrowDown2, ArrowUp2 } from 'iconsax-react-native';
import api from '../utils/api';
import bookclubImg from '../data/bookclubImg';

function NewBookclubScreen({ navigation }) {
  const [isPrivate, setIsPrivate] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const { user, token, setToken } = useAuth();
  const { setBookclubs, myBookclubs, setSessions } = useMainContext();

  const [bookclubInfo, setBookclubInfo] = useState({
    name: '',
    description: '',
  });

  const onRadioBtnClick = () => {
    setIsPrivate(!isPrivate);
  };

  const onArrowBtnClick = () => {
    setIsShown(!isShown)
  }

  const handleInput = (key, value) => {
    setBookclubInfo({
      ...bookclubInfo,
      [key]: value,
    });
  };

  const handleSubmit = async() => {
    const randomImage = bookclubImg[Math.floor(Math.random() * bookclubImg.length)];
    try {
      const data = await api.createBookclub({
        ...bookclubInfo,
        image: randomImage.url
      }, token);
      if (data) setToken(data.token);
      setBookclubs((prev) => [...prev, data.bookclub])
      alert(data.message);
      setBookclubInfo({name: '', description: ''})
    }
      catch (error) {
    alert(error.message || 'Something went wrong');
    } finally {
    console.log('success')
    navigation.navigate('Community')
    }
  };

  return (
    <View style={styles.container}>
      <Heading text='Create bookclub' />
      <KeyboardAvoidingView
        behavior={'padding'}
        enabled
        style={{ flexGrow: 1, height: '100%' }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            automaticallyAdjustKeyboardInsets={true}
            style={{ flex: 1 }}
          >
            <View style={{gap: 15, marginTop: 20}}>
              <Text style={styles.label}>Bookclub name</Text>
              <TextInput
                style={styles.input}
                placeholder="Choose name for your bookclub"
                placeholderTextColor='#69520377'
                value={bookclubInfo.name}
                onChangeText={(text) => handleInput('name', text)}
              />
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={styles.inputArea}
                editable
                multiline
                numberOfLines={6}
                maxLength={240}
                value={bookclubInfo.description}
                onChangeText={(text) => handleInput('description', text)}
              />
              <Text style={styles.label}>Favourite genres</Text>
              <SearchInput placeholder="Example: fantasy" />
              <View style={{gap: 10}}>
                <View style={styles.radioButtonContainer}>
                  <TouchableOpacity onPress={onRadioBtnClick} style={styles.radioButton}>
                    {isPrivate ? <View style={styles.radioButtonIcon} /> : null}
                  </TouchableOpacity>
                  <TouchableOpacity onPress={onRadioBtnClick}>
                    <Text style={styles.radioButtonText}>Private</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={onArrowBtnClick}>
                    { isShown ? <ArrowDown2 size={24} color='black' /> : <ArrowUp2 size={24} color='black' /> }
                  </TouchableOpacity>
                </View>
                { !isShown ? <Text style={styles.caption}>Private: Other users won’t see your upcoming/past sessions</Text> : null}
              </View>
            </View>
            <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit}
              >
                <Text>create bookclub</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
}

export default NewBookclubScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Sansation-Regular',
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 45,
  },
  radioButton: {
    height: 20,
    width: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#695203",
    alignItems: "center",
    justifyContent: "center"
  },
  radioButtonIcon: {
    height: 14,
    width: 14,
    borderRadius: 7,
    backgroundColor: "#695203"
  },
  radioButtonText: {
    fontFamily: 'Sansation-Regular',
    fontSize: 16,
    marginLeft: 16,
    marginRight: 10,
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
  caption: {
    color: "#695203",
    fontSize: 12,
    fontFamily: 'Sansation-Regular',
  },
  button: {
    marginVertical: 20,
    backgroundColor: '#DCC8A9',
    padding: 10,
    borderRadius: 999,
    width: '60%',
    alignItems: 'center',
  },
});
