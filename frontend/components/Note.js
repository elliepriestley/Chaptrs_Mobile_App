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
            uri: `https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png`,
          }}
        />
        <View>
          <Text style={globalStyles.mdText}>{note.user.username}</Text>
          <Text style={[globalStyles.smText, { color: '#69520399' }]}>
            {new Date(note.createdAt).toDateString()}
          </Text>
        </View>
      </View>
      <Text style={globalStyles.mdText}>{note.content}</Text>
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
              <View>
              {note.page &&
                <Text style={[globalStyles.smText, { color: '#695203' }]}>
                  Page {note.page}
                </Text>
              }
                {note.chapter && (
                  <Text style={[globalStyles.smText, { color: '#695203' }]}>
                    {note.chapter}
                  </Text>
                )}
              </View>
            </View>
            <TouchableOpacity onPress={() => setHideIcons(false)}>
              <More color='black' size={24} />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity onPress={deleteNote}>
              <BagCross color='tomato' size={24} />
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
