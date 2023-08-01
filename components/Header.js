import React from 'react';

import {
    View,
    Text,

} from 'react-native';

import {FONTS} from '../constants';


const Header = ({containerStyle, title, leftComponent, rightComponent}) => {
    return (
        <View style={{
            flexDirection: 'row',
            ...containerStyle
        }}>

            {/* left*/}
            {leftComponent}

            {/* title*/}
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyCenter: 'center'
            }}>
                <Text style={{...FONTS.h3}}>{title}</Text>
            </View>


            {/* right*/}
            {rightComponent}

        </View>
    )

}