import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import globalStyles from '../../styles/globalStyles';
import {
  More,
  BagCross,
  Edit2,
  CloseSquare,
  Book1,
} from 'iconsax-react-native';
import api from '../../utils/api';
import NewNoteModal from '../modals/NewNoteModal';
import { useAuth } from '../../utils/authContext';
import { useMainContext } from '../../utils/mainContext';
import ConfirmModal from '../modals/ConfirmModal';

export default function Note({ note, sessionId }) {
  const { token, setToken, user } = useAuth();
  const { setSessions } = useMainContext();
  const [hideIcons, setHideIcons] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const mine = note.user?._id === user?._id;

  const deleteNote = async () => {
    try {
      if (!sessionId) throw new Error('Session ID does not exist');
      const data = await api.deleteSessionNote(note._id, sessionId, token);
      if (data.token) setToken(data.token);
      setSessions((prev) => {
        const filteredArray = prev.filter(
          (session) => session._id !== data.session._id,
        );
        return [...filteredArray, data.session];
      });
    } catch (error) {
      alert(error.message || 'Something went wrong');
    }
  };

  const editNote = () => {
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
        sessionId={sessionId}
      />
      <ConfirmModal
        isVisible={showConfirmDelete}
        setModalVisible={setShowConfirmDelete}
        onConfirm={deleteNote}
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
            uri: user.profile_picture,
          }}
        />
        <View>
          <Text style={globalStyles.mdText}>{note.user?.username}</Text>
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
                {note.page && (
                  <Text style={[globalStyles.smText, { color: '#695203' }]}>
                    Page {note.page}
                  </Text>
                )}
                {note.chapter && (
                  <Text style={[globalStyles.smText, { color: '#695203' }]}>
                    {note.chapter}
                  </Text>
                )}
              </View>
            </View>
            {mine && (
              <TouchableOpacity onPress={() => setHideIcons(false)}>
                <More color='black' size={24} />
              </TouchableOpacity>
            )}
          </>
        ) : (
          <>
            <TouchableOpacity onPress={() => setShowConfirmDelete(true)}>
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
