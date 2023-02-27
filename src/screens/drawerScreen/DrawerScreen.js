

import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Profile from '../profile/Profile';
import Location from '../location/Location';
import Home from '../home/Home';
import Admin from '../admin/Admin';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DrawerScreen = () => {


    const [role, setRole] = useState('')

    useEffect(() => {
        const getLoggedInUser = async () => {
            const id = await AsyncStorage.getItem('id')
            const token = await AsyncStorage.getItem('token')
            await axios.get(`https://ruby-long-salamander.cyclic.app/api/user/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => {
                    setRole(res.data.user.role)
                })
                .catch(err => {
                    console.log(err);
                })
        }
        getLoggedInUser()
    }, [])


    const Drawer = createDrawerNavigator();
    return (
        <Drawer.Navigator>
            {role && role !== 'User' ?
                <>
                    <Drawer.Screen
                        name="Admin"
                        component={Admin}
                    />
                    <Drawer.Screen
                        name="Profile"
                        component={Profile}
                    />

                </>
                :
                <>
                    <Drawer.Screen
                        name="Home"
                        component={Home}
                    />
                    <Drawer.Screen
                        name="Profile"
                        component={Profile}
                    />
                </>

            }

        </Drawer.Navigator >
    )


}

export default DrawerScreen


