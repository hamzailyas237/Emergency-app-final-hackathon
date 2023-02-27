

import { Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { FormStyles } from '../../styles/Styles'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import Toast from 'react-native-toast-message';

const RoundButton = ({ text }) => {

    const [response, setResponse] = useState(false)

    const sendRequest = async () => {
        console.log('request sent');
        const userLatitude = await AsyncStorage.getItem('latitude')
        const userLongitude = await AsyncStorage.getItem('longitude')
        const id = await AsyncStorage.getItem('id')
        const token = await AsyncStorage.getItem('token')

        const loggedInUser = axios.get(`https://ruby-long-salamander.cyclic.app/api/user/${id}`, {
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
                        latitude: userLatitude,
                        longitude: userLongitude,
                        emergency_type: text
                    },
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    .then(res => {
                        setResponse(false)
                        Toast.show({
                            type: 'success',
                            text1: res.data.message,
                            visibilityTime: 2000,
                            topOffset: 20
                        });
                    })
                    .catch(err => {
                        setResponse(false)
                        Toast.show({
                            type: 'error',
                            text1: err.response.data.message,
                            visibilityTime: 2000,
                            topOffset: 20
                        });
                    })

            })
            .catch(err => {
                setResponse(false)
                Toast.show({
                    type: 'error',
                    text1: err.response.data.message,
                    visibilityTime: 2000,
                    topOffset: 20
                });
            })

        const checkResponse = async () => {
            setResponse(true)
            await loggedInUser
        }
        checkResponse()
    }

    const request = () => {
        Alert.alert('Emergency Request', 'To make an emergency request click on REQUEST', [
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
            <Text style={FormStyles.buttonStyle}>
                {
                    !response ? text
                        :
                        <ActivityIndicator color={'white'} />
                }
            </Text>
        </TouchableOpacity>
    )
}

export default RoundButton