

import React from 'react'
import { Text, Card, Button, Icon } from '@rneui/themed';
import RoundButton from '../button/RoundButton';
import alertImg from '../../assets/alert.png'
import { TouchableOpacity } from 'react-native';
import { FormStyles } from '../../styles/Styles';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const RequestCard = ({ request }) => {

    const navigation = useNavigation()
    goToLocationScreen = async () => {
        const captain_latitude = await AsyncStorage.getItem('captain-latitude')
        const captain_longitude = await AsyncStorage.getItem('captain-longitude')
        const token = await AsyncStorage.getItem('token')
        
        console.log(captain_latitude, captain_longitude);
        navigation.navigate('Location', { captain_latitude, captain_longitude })

        axios.delete(`https://ruby-long-salamander.cyclic.app/api/request/${request._id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        })
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
                <Text style={FormStyles.buttonStyle}>Accept</Text>
            </TouchableOpacity>
        </Card>
    )
}

export default RequestCard