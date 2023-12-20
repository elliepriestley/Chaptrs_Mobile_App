import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { Logout } from 'iconsax-react-native';

const ConfirmModal = ({ isVisible, setModalVisible, onConfirm }) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType='slide'
        transparent={true}
        visible={isVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!isVisible);
        }}
      >
        <View style={styles.modalView}>
          <TouchableOpacity onPress={() => onConfirm()}>
            <View style={styles.iconContainer}>
              <Logout size={28} color='black' />
              <Text style={[styles.textStyle, { marginVertical: 20 }]}>
                confirm
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: 'black', color: 'white' },
            ]}
            onPress={() => setModalVisible(!isVisible)}
          >
            <Text style={[styles.textStyle, { color: 'white' }]}>close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default ConfirmModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    padding: 10,
  },
  modalView: {
    marginTop: 300,
    alignSelf: 'center',
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
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
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  textStyle: {
    fontFamily: 'Sansation-Regular',
    fontSize: 18,
  },
});
