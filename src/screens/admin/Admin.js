

import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import RequestCard from '../../components/card/RequestCard';

const Admin = () => {

    const [emergencyRequests, setEmergencyRequests] = useState()
    const [loader, setLoader] = useState(true)
    useEffect(() => {
        const getAllRequests = async () => {
            const token = await AsyncStorage.getItem('token')
            axios.get('https://ruby-long-salamander.cyclic.app/api/request', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => {
                    setEmergencyRequests(res.data.requests)
                    setLoader(false)
                })
                .catch(err => {
                    console.log(err);
                    setLoader(false)

                })
        }
        getAllRequests()
    }, [emergencyRequests])

    useEffect(() => {
        Geolocation.getCurrentPosition((async (data) => {
            await AsyncStorage.setItem('captain-latitude', data.coords.latitude.toString())
            await AsyncStorage.setItem('captain-longitude', data.coords.longitude.toString())
        }));
    }, [])

    return (
        <ScrollView>
            {!loader ?
                emergencyRequests && emergencyRequests.map((request, i) => {
                    return <RequestCard key={i} request={request} />
                })
                :
                <ActivityIndicator size="large" color="#499BFD" style={{marginTop: 20}} />
            }
        </ScrollView>
    )
}

export default Admin