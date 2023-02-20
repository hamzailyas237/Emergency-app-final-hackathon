

import { View, Text, Image } from 'react-native'
import React from 'react'
import { Card } from '@rneui/themed'
import { TouchableOpacity } from 'react-native-gesture-handler'


const ServiceCard = ({ img, text, func }) => {
    return (
        <TouchableOpacity onPress={func}>
            <Card>
                <Card.Title>{text}</Card.Title>
                <Card.Divider />
                <View style={{ position: "relative", alignItems: "center" }}>
                    <Image
                        style={{ width: "100%", height: 100 }}
                        resizeMode="contain"
                        source={img}
                    />
                </View>
            </Card>
        </TouchableOpacity>
    )
}

export default ServiceCard