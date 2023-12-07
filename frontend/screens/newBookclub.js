import { View, Text, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, ScrollView } from 'react-native';
import { RadioButton } from 'react-native-paper';
import React, { useState } from 'react';
import Heading from '../components/Heading';
import SearchInput from '../components/SearchInput';

function NewBookclubScreen() {
  const [isLiked, setIsLiked] = useState(false);

  const onRadioBtnClick = () => {
    setIsLiked(!isLiked);
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
              />
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={styles.inputArea}
                editable
                multiline
                numberOfLines={6}
                maxLength={240}
              />
              <Text style={styles.label}>Favourite genres</Text>
              <SearchInput placeholder="Example: fantasy" />
              <View>
                <View style={styles.radioButtonContainer}>
                  <TouchableOpacity onPress={onRadioBtnClick} style={styles.radioButton}>
                    {isLiked ? <View style={styles.radioButtonIcon} /> : null}
                  </TouchableOpacity>
                  <TouchableOpacity onPress={onRadioBtnClick}>
                    <Text style={styles.radioButtonText}>Private</Text>
                  </TouchableOpacity>
                </View>
              </View>
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
  }
});
