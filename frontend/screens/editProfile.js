import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Image,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { useAuth } from '../utils/authContext';
import api from '../utils/api';
import Heading from '../components/Heading';

function EditProfileScreen({ navigation }) {
    const { user, setUser, token, setToken } = useAuth();
    const [newUserInfo, setNewUserInfo] = useState({
        username:  user.username,
        description: user.description,
    });

    const handleInput = (key, value) => {
        setNewUserInfo({
            ...newUserInfo,
            [key]: value,
        });
    };

    const handleSubmit = async() => {
        try {
            const data = await api.editUserInfo(user._id, newUserInfo, token);
            if (data) setToken(data.token);
            setUser(data.user);
        }
        catch (error) {
            alert(error.message || 'Something went wrong');
        }
        finally {
            console.log('success')
        }
    }

    return (
        <View style={styles.container}>
            <Heading text='Edit profile' />
            <ScrollView>
                <View style={{ gap: 15, marginTop: 20 }}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your name"
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
                </View>
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity
                        style={styles.button}
                    >
                        <Text style={{ fontFamily: 'Sansation-Regular' }} onPress={handleSubmit}>save changes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{ fontFamily: 'Sansation-Regular' }}>delete profile</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        paddingBottom: 110,
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
});

export default EditProfileScreen;