

import { TextInput } from 'react-native'
import React from 'react'

const RoundedInput = ({ style, keyboardType, placeholder, onChangeText,value }) => {
    return (
        <TextInput
            style={style}
            keyboardType={keyboardType}
            placeholder={placeholder}
            onChangeText={onChangeText}
            value={value}
        />
    )
}

export default RoundedInput