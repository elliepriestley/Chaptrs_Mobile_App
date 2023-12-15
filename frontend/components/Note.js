import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import globalStyles from '../styles/globalStyles';
import {
  More,
  BagCross,
  Edit2,
  CloseSquare,
  Book1,
} from 'iconsax-react-native';
import NewNoteModal from '../components/NewNoteModal';

export default function Note({ note }) {
  const [hideIcons, setHideIcons] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const deleteNote = () => {
    // write delete note function
    console.log('delete note');
  };

  const editNote = () => {
    // write edit note function

    console.log('edit note', note);
    setShowModal(true);
  };

  return (
    <View
      style={{
        width: '100%',
        backgroundColor: '#ffffff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
      }}
    >
      <NewNoteModal
        setShowModal={setShowModal}
        showModal={showModal}
        note={note}
      />
      <View
        style={{
          alignSelf: 'flex-start',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          marginBottom: 10,
          maxWidth: 180,
        }}
      >
        <Image
          style={{ width: 30, height: 30, borderRadius: 100 }}
          source={{
            uri: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png',
          }}
        />
        <View>
          <Text style={globalStyles.mdText}>Rikie Patrick</Text>
          <Text style={globalStyles.smText}>{new Date().toDateString()}</Text>
        </View>
      </View>
      <Text style={globalStyles.mdText}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac magna
        sit amet purus gravida tristique. Nullam id dolor id nibh ultricies
        vehicula ut id elit. Donec id elit non mi porta gravida at eget metus.
      </Text>
      <View
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          flexDirection: 'row',
          gap: 15,
          alignItems: 'center',
        }}
      >
        {hideIcons ? (
          <>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
              }}
            >
              <Book1 color='#695203' size={24} />
              <Text style={[globalStyles.smText, { color: '#695203' }]}>
                Chapter 13
              </Text>
            </View>
            <TouchableOpacity onPress={() => setHideIcons(false)}>
              <More color='black' size={24} />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity onPress={deleteNote}>
              <BagCross color='black' size={24} />
            </TouchableOpacity>
            <TouchableOpacity onPress={editNote}>
              <Edit2 color='black' size={24} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setHideIcons(false)}>
              <CloseSquare
                color='black'
                size={24}
                onPress={() => setHideIcons(true)}
              />
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}
