import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
import bookGenres from '../../data/bookGenres';
import { TickCircle } from 'iconsax-react-native';

const GenresDropdown = ({
  onGenresSelected,
  preSelectedGenres = [],
  modalVisible,
  setModalVisible,
}) => {
  const [selectedGenres, setSelectedGenres] = useState(preSelectedGenres);

  useEffect(() => {
    setSelectedGenres(preSelectedGenres);
  }, [preSelectedGenres]);

  const toggleGenre = (genre) => {
    const updatedGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter((selectedGenre) => selectedGenre !== genre)
      : [...selectedGenres, genre];
    setSelectedGenres(updatedGenres);
  };

  const handleSave = () => {
    onGenresSelected(selectedGenres);
    setModalVisible(false);
  };

  return (
    <View style={styles.centeredView}>
      <Modal animationType='fade' transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ScrollView contentContainerStyle={styles.scrollView}>
              {bookGenres.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={[styles.genreItem, styles.textStyle]}
                    onPress={() => toggleGenre(item.name)}
                  >
                    <View style={styles.genreItemContainer}>
                      <Text style={[styles.genreText, styles.textStyle]}>
                        {item.name}
                      </Text>
                      {selectedGenres.includes(item.name) ? (
                        <TickCircle size={24} color='#DCC8A9' />
                      ) : null}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#DCC8A9' }]}
                onPress={() => {
                  handleSave();
                }}
              >
                <Text
                  style={[
                    styles.textStyle,
                    {
                      textAlign: 'center',
                    },
                  ]}
                >
                  save
                </Text>
              </TouchableOpacity>
              <Pressable
                style={[
                  styles.button,
                  { backgroundColor: 'black', color: 'white' },
                ]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={[styles.textStyle, { color: 'white' }]}>
                  close
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  modalView: {
    position: 'absolute',
    bottom: 10,
    height: '38%',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#DCC8A9',
    alignItems: 'center',
    padding: 10,
    borderRadius: 999,
    marginHorizontal: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'left',
  },
  genreItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  genreItem: {
    padding: 8,
    marginVertical: 5,
  },
  selectedGenreItem: {
    color: '#DCC8A9',
  },
  genreText: {
    color: '#000',
  },
  textStyle: {
    fontFamily: 'Sansation-Regular',
  },
});

export default GenresDropdown;
