

import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FormStyles } from '../styles/Styles'
import Geolocation from '@react-native-community/geolocation'
import AsyncStorage from '@react-native-async-storage/async-storage'
import RoundButton from '../../components/button/RoundButton'


const Police = () => {


    useEffect(() => {
        Geolocation.getCurrentPosition((async (data) => {
            await AsyncStorage.setItem('latitude', data.coords.latitude.toString())
            await AsyncStorage.setItem('longitude', data.coords.longitude.toString())
        }));
    }, [])

    return (
        <>
            <RoundButton text={'Fight'} />
            <RoundButton text={'Robbery'} />
            <RoundButton text={'Harassment'} />
        </>
    )
}

export default Police