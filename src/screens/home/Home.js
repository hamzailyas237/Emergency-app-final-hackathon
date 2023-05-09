

import { View, Text, Alert, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import AppSwiper from '../../components/swiper/AppSwiper'
import banner1 from '../../assets/b1.jpg'
import banner2 from '../../assets/b2.jpg'
import banner3 from '../../assets/b3.jpg'
import banner4 from '../../assets/b4.jpg'
import { styles } from '../../styles/Styles'
import ServiceCard from '../../components/card/ServiceCard'
import ambulance from '../../assets/ambulance.png'
import police from '../../assets/police.png'
import firebrigade from '../../assets/firebrigade.png'
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage'

const Home = ({ navigation }) => {


  const swiperImages = [banner4, banner1, banner2, banner3]

  const navigateToAmbulanceScreen = () => {
    navigation.navigate('Ambulance')
  }

  const navigateToPoliceScreen = () => {
    navigation.navigate('Police')
  }

  const navigateToFirebrigadeScreen = () => {
    navigation.navigate('Firebrigade')
  }

  useEffect(() => {
    Geolocation.getCurrentPosition(((data) => {
        AsyncStorage.setItem('latitude', data.coords.latitude.toString())
        AsyncStorage.setItem('longitude', data.coords.longitude.toString())
    }));
}, [])

  return (

    <ScrollView>
      <AppSwiper swiperImages={swiperImages} />
      <View style={{paddingBottom:50}}>
        <Text style={styles.homeMainText}>Choose what you need</Text>
        <ServiceCard img={ambulance} text={'Ambulance'} func={navigateToAmbulanceScreen} />
        <ServiceCard img={police} text={'Police'} func={navigateToPoliceScreen} />
        <ServiceCard img={firebrigade} text={'Firebrigade'} func={navigateToFirebrigadeScreen} />
      </View>
    </ScrollView>

  )
}

export default Home
