

import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { FormStyles } from '../../styles/Styles'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import Toast from 'react-native-toast-message';

const RoundButton = ({ text }) => {

    const sendRequest = async () => {
        console.log('request sent');
        const latitude = await AsyncStorage.getItem('latitude')
        const longitude = await AsyncStorage.getItem('longitude')
        const id = await AsyncStorage.getItem('id')
        const token = await AsyncStorage.getItem('token')

        const loggedInUser = await axios.get(`https://ruby-long-salamander.cyclic.app/api/user/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(async (res) => {
                const createEmergencyRequest = await axios.post(`https://ruby-long-salamander.cyclic.app/api/request`,
                    {
                        name: res.data.user.name,
                        email: res.data.user.email,
                        phone: res.data.user.phone,
                        latitude,
                        longitude,
                        emergency_type: text
                    },
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    .then(res => {
                        Toast.show({
                            type: 'success',
                            text1: res.data.message,
                            visibilityTime: 2000,
                            topOffset: 20
                        });
                    })
                    .catch(err => {
                        Toast.show({
                            type: 'error',
                            text1: err.response.data.message,
                            visibilityTime: 2000,
                            topOffset: 20
                        });
                    })

            })
            .catch(err => {
                Toast.show({
                    type: 'error',
                    text1: err.response.data.message,
                    visibilityTime: 2000,
                    topOffset: 20
                });
            })
    }

    const request = () => {
        Alert.alert('Upload Image', 'Take a photo or select from gallery', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
            },
            { text: 'Request', onPress: sendRequest },
        ]
        )
    }
    return (
        <TouchableOpacity style={[FormStyles.buttonContainer, FormStyles.shadow]} onPress={request}>
            <Text style={FormStyles.buttonStyle}>{text}</Text>
        </TouchableOpacity>
    )
}

export default RoundButton