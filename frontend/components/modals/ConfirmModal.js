import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { TickSquare } from 'iconsax-react-native';

const ConfirmModal = ({ isVisible, setModalVisible, onConfirm }) => {
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!isVisible);
      }}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.modalView}>
          <TouchableOpacity onPress={() => onConfirm()}>
            <View style={[styles.button, { backgroundColor: '#DCC8A9' }]}>
              <Text style={[styles.textStyle, { color: 'black' }]}>
                confirm
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: 'black' }]}
            onPress={() => setModalVisible(!isVisible)}
          >
            <Text style={[styles.textStyle, { color: 'white' }]}>close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmModal;

const styles = StyleSheet.create({
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    gap: 20,
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
    backgroundColor: '#DCC8A9',
    alignItems: 'center',
    padding: 10,
    borderRadius: 999,
    marginHorizontal: 20,
  },
  // confirmContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   backgroundColor: '#DCC8A9',
  //   padding: 5,
  //   gap: 10,
  //   borderRadius: 999,
  // },
  textStyle: {
    fontFamily: 'Sansation-Regular',
    fontSize: 18,
  },
});
