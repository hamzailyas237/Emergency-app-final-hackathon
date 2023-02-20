


import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from '../../screens/signup/Signup';
import Login from '../../screens/login/Login';
import Splash from '../../screens/splash/Splash';
import DrawerScreen from '../../screens/drawerScreen/DrawerScreen';
import Toast from 'react-native-toast-message'
import Ambulance from '../../screens/ambulance/Ambulance';
import Police from '../../screens/police/Police';
import Firebrigade from '../../screens/firebrigade/Firebrigade';
import Admin from '../../screens/admin/Admin';


const Stack = createNativeStackNavigator();

function AppNavigation() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Signup" component={Signup}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Splash" component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="DrawerScreen" component={DrawerScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Ambulance" component={Ambulance}
        />
        <Stack.Screen name="Police" component={Police}
        />
        <Stack.Screen name="Firebrigade" component={Firebrigade}
        />
        <Stack.Screen name="Location" component={Location}
        />

      </Stack.Navigator>





      <Toast />

    </NavigationContainer>
  );
}

export default AppNavigation;