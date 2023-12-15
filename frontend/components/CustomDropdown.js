import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, Pressable, StyleSheet } from 'react-native';
import bookGenres from '../data/bookGenres';

const CustomDropdown = ({ onGenresSelected, preSelectedGenres }) => {
    const [modalVisible, setModalVisible] = useState(false);
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
        <View>
            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}>
                <Text style={{
                    textAlign: 'center',
                    fontFamily: 'Sansation-Regular',
                }}>
                    Edit genres
                </Text>
            </Pressable>
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <ScrollView contentContainerStyle={styles.scrollView}>
                                {bookGenres.map((item, index) => {
                                    return <TouchableOpacity
                                        key={index}
                                        style={[
                                            styles.genreItem,
                                            selectedGenres.includes(item.name) && styles.selectedGenreItem,
                                        ]}
                                        onPress={() => toggleGenre(item.name)}>
                                        <Text style={styles.genreText}>{item.name}</Text>
                                    </TouchableOpacity>
                                })}
                            </ScrollView>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {
                                    handleSave();
                                }}>
                                <Text style={styles.textStyle}>Save</Text>
                            </TouchableOpacity>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>close</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        marginTop: 80,
    },
    modalView: {
        height: '80%',
        width: '90%',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
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
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#DCC8A9',
    },
    buttonClose: {
        backgroundColor: '#DCC8A9',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'left',
    },
    genreItem: {
        padding: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
    },
    selectedGenreItem: {
        backgroundColor: '#DCC8A9',
        borderColor: '#DCC8A9',
    },
    genreText: {
        color: '#000',
    },
});

export default CustomDropdown;


