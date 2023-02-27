

import React, { useState } from 'react'
import { Text, Card, Button, Icon } from '@rneui/themed';
import RoundButton from '../button/RoundButton';
import alertImg from '../../assets/alert.png'
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { FormStyles } from '../../styles/Styles';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';

const RequestCard = ({ request }) => {

    const [loader, setLoader] = useState(false)

    const navigation = useNavigation()
    goToLocationScreen = async () => {
        setLoader(true)

        const token = await AsyncStorage.getItem('token')

        Geolocation.getCurrentPosition((async (data) => {
            await axios.delete(`https://ruby-long-salamander.cyclic.app/api/request/${request._id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => {
                    setLoader(false)
                    navigation.navigate('Location', { captainLatitude: data.coords.latitude, captainLongitude: data.coords.longitude })
                })
                .catch(err => {
                    setLoader(false)
                    console.log(err);
                })
        }));


    }
    return (
        <Card>
            <Card.Title>{request.emergency_type}</Card.Title>
            <Card.Divider />
            <Card.Image
                style={{ padding: 0 }}
                resizeMode="contain"
                source={alertImg}
            />
            <Text style={{ marginBottom: 10 }}>
                Name: {request.name}
            </Text>
            <Text style={{ marginBottom: 10 }}>
                Email: {request.email}
            </Text>
            <Text style={{ marginBottom: 10 }}>
                Phone: {request.phone}
            </Text>
            <Text style={{ marginBottom: 10 }}>
                Emergency Type: {request.emergency_type}
            </Text>
            <TouchableOpacity style={[FormStyles.buttonContainer, FormStyles.shadow]}
                onPress={goToLocationScreen}>
                <Text style={FormStyles.buttonStyle}>
                    {loader ?
                        <ActivityIndicator color={'white'} />
                        :
                        'Accept'
                    }
                </Text>
            </TouchableOpacity>
        </Card>
    )
}

export default RequestCard