import React from 'react';

import {
    TouchableOpacity,
    View,
    Text,
    Image
} from 'react-native';

import { COLORS, FONTS, SIZES, icons} from '../constants';

const VerticalFoodCard = ({containerStyle, item, onPress}) => {
    return (
        <TouchableOpacity
            style={{
                width: 200,
                padding: SIZES.radius,
                alignItems: 'center',
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.lightGray2,
                ...containerStyle
            }}
        >
            {/*Calories and Favourite */}
            <View style={{flexDirection: 'row'}}>
                <View
                    style={{flex: 1, flexDirection: 'row'}}
                >
                    <Image
                        source={icons.calories}
                        style={{width: 30, height: 30}}
                    />
                    <Text
                        style={{color: COLORS.darkGray2, ...FONTS.body5}}
                    >{item.calories}Calories</Text>
                </View>
                <Image
                    source={icons.love}
                    style={{
                        width: 20,
                        height: 20,
                        tintColor: item.isFavourite ? COLORS.primary : COLORS.gray
                    }}
                />
            </View>

            {/*Image*/}

            <View 
                style={{
                    height: 150,
                    width: 150,
                    alignItems: 'center',
                }}
            >
                <Image
                    source={item.image}
                    style={{
                        height: '100%',
                        width: '100%'
                    }}
                />
            </View>

            {/*Info */}

            <View 
                style={{
                    alignItems: 'center',
                    marginTop: -20
                }}
            >
                <Text style={{...FONTS.h3}}>
                    {item.name}
                </Text>
                <Text style={{color: COLORS.darkGray2, textAlign: 'center', ...FONTS.body5}}>{item.description}</Text>
                <Text>${item.price}</Text>

            </View>

        </TouchableOpacity>

    )
}
export default VerticalFoodCard;