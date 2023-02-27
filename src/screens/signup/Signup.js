

import React, { useEffect, useState } from 'react'
import { Text, View, Image, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet } from 'react-native'
import { FormStyles } from '../../styles/Styles'
import axios from 'axios'
import Toast from 'react-native-toast-message';
import RoundedInput from '../../components/input/RoundedInput';
import { Dropdown } from 'react-native-element-dropdown';

const Signup = ({ navigation }) => {


    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [response, setResponse] = useState(false)
    const [value, setValue] = useState('');
    const data = [
        { label: 'User', value: '1' },
        { label: 'Ambulance, Fire brigade, Police', value: '2' },
    ];

    const signupHandler = () => {
        const loginUserResponse = axios.post('https://ruby-long-salamander.cyclic.app/api/signup', {
            name,
            email,
            password,
            phone,
            role: value
        })
            .then(async (res) => {
                // navigation.navigate('Login')
                setResponse(false)
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
            await loginUserResponse
            setName('')
            setEmail('')
            setPhone('')
            setValue('')
            setPassword('')
        }
        checkResponse()
    }


    return (

        <ScrollView>
            <View style={FormStyles.mainContainer}>

                <View style={FormStyles.appHeadingContainer}>
                    <Text style={FormStyles.appHeading}>Safe and Quick Pakistan</Text>
                </View>


                <View style={[FormStyles.containerShadow, { width: '95%', }]}>

                    <View style={[FormStyles.inputContainer]}>
                        <Text style={FormStyles.mainHeading}>Sign up</Text>

                        <RoundedInput
                            style={[FormStyles.inputStyle, FormStyles.shadow]}
                            placeholder='user name'
                            onChangeText={(e) => setName(e)}
                            value={name}
                        />
                        <RoundedInput
                            style={[FormStyles.inputStyle, FormStyles.shadow]}
                            keyboardType="email-address"
                            placeholder='email@address.com'
                            onChangeText={(e) => setEmail(e)}
                            value={email}
                        />
                        <RoundedInput
                            style={[FormStyles.inputStyle, FormStyles.shadow]}
                            keyboardType='numeric'
                            placeholder='phone'
                            onChangeText={(e) => setPhone(e)}
                            value={phone}
                        />
                        <Dropdown
                            style={[FormStyles.inputStyle, FormStyles.shadow, styles.dropdown]}
                            data={data}
                            maxHeight={150}
                            labelField="label"
                            valueField="value"
                            placeholder="Select role"
                            value={value}
                            onChange={item => {
                                setValue(item.label);
                            }}
                        />
                        <RoundedInput
                            style={[FormStyles.inputStyle, FormStyles.shadow]}
                            secureTextEntry={true}
                            placeholder='Passowrd'
                            onChangeText={(e) => setPassword(e)}
                            value={password}
                        />
                    </View>

                    <TouchableOpacity style={[FormStyles.buttonContainer, FormStyles.shadow]}
                        onPress={signupHandler}
                    >
                        <Text style={FormStyles.buttonStyle}>
                            {!response ?
                                'Sign up'
                                :
                                <ActivityIndicator color={'white'} />
                            }
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={{ textAlign: 'center' }}>
                            Already have an account ?
                            <Text style={{ color: '#336CEF' }}> Login</Text>
                        </Text>
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', alignItems: 'center', margin: 20 }}>
                        <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                        <View>
                            <Text style={{ width: 50, textAlign: 'center' }}>or</Text>
                        </View>
                        <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingBottom: 10 }}>
                        <Image style={{ width: 40, height: 40 }} source={{ uri: 'https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png ' }} />
                        <Image style={{ width: 30, height: 30 }} source={{ uri: 'https://1000logos.net/wp-content/uploads/2021/04/Facebook-logo.png' }} />
                    </View>
                </View>


            </View >
        </ScrollView >

    )
}

export default Signup


const styles = StyleSheet.create({
    dropdown: {
        height: 50,
        padding: 12,
    },
});