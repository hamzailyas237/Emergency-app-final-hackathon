

import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Profile from '../profile/Profile';
import Location from '../location/Location';
import Home from '../home/Home';
import Admin from '../admin/Admin';

const DrawerScreen = () => {
    const Drawer = createDrawerNavigator();
    return (
        <Drawer.Navigator>
            <Drawer.Screen
                name="Home"
                component={Home}
            />
            <Drawer.Screen
                name="Profile"
                component={Profile}
            />
            <Drawer.Screen
                name="Admin"
                component={Admin}
            />
        </Drawer.Navigator>
    )
}

export default DrawerScreen