import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    FlatList
} from 'react-native';

import {FONTS, SIZES, COLORS, icons, dummyData} from '../../constants';
import {HorizontalFoodCard, VerticalFoodCard} from '../../components/output';
import {FilterModal} from '../';

const Section = ({title, onPress, children}) => {
    return (
        <View>
            {/*Header */}
            <View style={{
                flexDirection: 'row',
                marginHorizontal: SIZES.padding,
                marginTop: 30,
                marginBottom: 20
            }}>
                <Text style={{flex: 1, ...FONTS.h3}}>
                    {title}
                </Text>

                <TouchableOpacity
                    onPress={onPress}
                >
                    <Text
                        style={{
                            color: COLORS.primary,
                            ...FONTS.body3
                        }}
                    >Show All
                    </Text>
                </TouchableOpacity>
            </View>

            {/*content*/}
        </View>
    )
}
const Home = () => {

    const[selectedCategoryId, setSelectedCategoryID] = React.useState(1);

    const[selectedMenuType, setSelectedMenuType] = React.useState(1)

    const[menuList, setMenuList] = React.useState([])

    const[recommends, setRecommends] = React.useState([])

    const[showFilterModal, setShowFilterModal] = React.useState(false)

    React.useEffect(() => {
        handleChangeCategory(selectedCategoryId, selectedMenuType)
    }, [])

    //handler

    function handleChangeCategory(categoryId, menuTypeId) {

        //retrieve the recommended menu
        let selectedRecommend = dummyData.menu.find(a => a.name == "Recommended")

        //find the menu based on the menuTypeId
        let selectedMenu = dummyData.menu.find(a => a.id == menuTypeId)

        //set the recommended menu based on the categoryId
        setRecommends(selectedRecommend?.list.filter(a => a.categories.includes(categoryId)))

        //set the menu based on the categoryId
        setMenuList(selectedMenu?.list.filter(a => a.categories.includes(categoryId)))

    }

    //render

    function renderSearch() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    height: 40,
                    alignItems: 'center',
                    marginHorizontal: SIZES.padding,
                    marginVertical: SIZES.base,
                    paddingHorizontal: SIZES.radius,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.lightGray2
                }}
            >
                {/* icon */}

                <Image
                    style={{
                        height: 20,
                        width: 20,
                        tintColor: COLORS.black
                    }}
                />

                {/* text input */}

                <TextInput
                    style={{
                        flex: 1,
                        marginLeft: SIZES.radius,
                        ...FONTS.body3
                    }}
                    placeholder='search food...'
                />

                {/* filter button */}

                <TouchableOpacity
                    onPress={() => setShowFilterModal(true)}
                >
                    <Image
                        source={icons.filter}
                        style={{
                            height: 20,
                            width: 20,
                            tintColor: COLORS.black
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }


    function renderMenuTypes() {
        return (
            <FlatList
                horizontal
                data={dummyData.menu}
                keyExtractor={item => `${item.id}`}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    marginTop: 30,
                    marginBottom: 20
                }}
                renderItem={({item, index}) => (
                    <TouchableOpacity
                        style={{
                            marginLeft: SIZES.padding,
                            marginRight: index == dummyData.menu.length - 1 ? SIZES.padding : 0
                        }}
                        onPress={() => {
                            setSelectedMenuType(item.id)
                            handleChangeCategory(selectedCategoryId, item.id)
                        }}
                    >
                        <Text
                            style={{
                                color: selectedMenuType == item.id ? COLORS.primary : COLORS.black, ...FONTS.h3
                            }}
                        >
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                )}
            />
        )
    }

    function renderRecommendedSection() {
        return (
            <Section
                title="Recommended"
                onPress={() => console.log("show all recommended") }
            >
                <FlatList
                data={recommends}
                keyExtractor={item => '${item.id'}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index}) => (
                    <HorizontalFoodCard
                        containerStyle={{
                            height: 180,
                            width: SIZES.width * 0.85,
                            marginLeft: index == 0 ? SIZES.padding : 18,
                            marginRight: index == recommends.length - 1 ? SIZES.padding : 0,
                            paddingRight: SIZES.radius,
                            alignItems: 'center'
                        }}
                        imageStyle={{
                            marginTop: 35,
                            height: 150,
                            width: 150,
                        }}
                        item={item}
                        onPress={() => console.log("horizontalFoodCard")}
                    />
                )}
                />
            </Section>
        )
    }

    function renderPopularSection() {
        return (
            <Section
                title="Popular Near you"
                onPress={() => console.log("Show all popular items")}
            >
                <FlatList
                    data={popular}
                    keyExtractor={item => `${item.id}`}
                    horizontalshowsHorizontalScrollIndicator={false}
                    renderItem={({item, index}) => (
                        <VerticalFoodCard
                            containerStyle={{
                                marginLeft: index == 0 ? SIZES.padding : 18,
                                marginRight: index == popular.length - 1 ? SIZES.padding : 0
                            }}
                            item={item}
                            onPress={() => console.log("VerticalFoodCard")}
                        />
                    )}
                />           
            </Section>
        )
    }

    function renderFoodCategories() {
        return (
            <FlatList
                data={dummyData.categories}
                keyExtractor={item => `${item.id}`}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index}) => (
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            height: 55,
                            marginTop: SIZES.padding,
                            marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
                            marginRight: index == dummyData.categories.length - 1 ? SIZES.padding : 0,
                            paddingHorizontal: 8, 
                            borderRadius: SIZES.radius,
                            backgroundColor: selectedCategoryId == item.id ? COLORS.primary : COLORS.lightGray2
                        }}
                        onPress={() => {
                            setSelectedCategoryID(item.id)
                            handleChangeCategory(item.id, selectedMenuType)
                        }}
                    >
                        <Image
                            source={item.icon}
                            style={{
                                marginTop: 5,
                                height: 50,
                                width: 50,  
                            }}
                        />
                        <Text
                            style={{
                                alignSelf: 'center',
                                marginRight: SIZES.base,
                                color: selectedCategoryId == item.id ? COLORS.white : COLORS.darkGray, ...FONTS.h3
                            }}
                        >
                        </Text>
                    </TouchableOpacity>
                )}
            />
        )
    }

    function renderDeliverTo() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding,
                    marginHorizontal: SIZES.padding
                }}
            >
                <Text
                    style={{
                        color: COLORS.primary, ...FONTS.body3
                    }}
                >DELIVERY TO
                </Text>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        marginTop: SIZES.base,
                        alignItems: 'center'
                    }}
                >
                    <Text style={{...FONTS.h3}}>
                        {dummyData?.myProfile?.address}
                    </Text>
                    <Image
                        source={icons.down_arrow}
                        style={{
                          marginLeft: SIZES.base,
                          height: 20,
                          width: 20  
                        }}
                    />

                     
                </TouchableOpacity>
            </View>
        )
    }



    return (
        <View
            style={{
                flex: 1
            }}
        >

            {/* Search */}
            {renderSearch}
            {showFilterModal && 
                <FilterModal
                    isVisible={showFilterModal}
                    onClose={() => setShowFilterModal(false)}    
                />
            }

            {/* List */}
            <FlatList
                data={menuList}
                keyExtractor={(item) => `${item.id}`}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent= {
                    
                    <View>
                        {/*Delivery to */}
                        {renderDeliveryTo()}

                        {/*Food categories */}
                        {renderFoodCategories()}

                        
                        {/*Popular */}
                        {renderPopularSection()}


                        {/*Recommended */}
                        {renderRecommendedSection()}

                        {/*Menu type */}
                        {renderMenuTypes()}
                    </View>
                }
                renderItem={({item, index}) => {
                    return (
                        <HorizontalFoodCard
                            containerStyle={{
                                height: 130,
                                alignItems: 'center',
                                marginBottom: SIZES.radius,
                                marginHorizontal: SIZES.padding,
                            }}
                            imageStyle={{
                                marginTop: 20,
                                height: 110,
                                width: 110,
                            }}
                            item={item}
                            onPress={() => console.log('HorizontalFoodCard')}
                        />
                    )
                }}
                ListFooterComponent={
                    <View style={{
                        height: 200
                    }}/>
                }
            />
        </View>
        
    )
}

export default Home;