import React from 'react';
import {
    Platform,
    StyleSheet,
    Dimensions,
    FlatList,
    Image,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { Icon } from 'expo';
import { NavigationBarButton } from '../components';
import Colors from '../constants/Colors';
import { Transition } from 'react-navigation-fluid-transitions';

export class BidScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('Title', 'SERVICES'),
            headerTintColor: '#ffffff',
            headerStyle: {
                backgroundColor: Colors.appTheme,
                borderBottomColor: 'rgba(0, 0, 0, 0.2)',
                ...Platform.select({
                    ios: {},
                    android: {
                        elevation: 1,
                    },
                }),
            },

            // headerRight: <NavigationBarButton name={Platform.OS === 'ios' ? 'md-cart' : 'md-cart'} onPress={() => navigation.navigate('Cart')} />,
            headerLeft: null
            // header: null
        };
    };

    constructor() {
        super();
        this.state = {
            items: ([]),
        };
        this.makeSections();
    }

    makeSections() {
        for (let index = 0; index < 10; index++) {
            this.state.items.push({
                "bid": 431,
                "car": "cultus",
                "currency": "PKR",
                "distance": "0",
                "driverId": 18,
                "image": "http://148.251.72.170:8080/akhdmny/public/user_avatar/1548265024_31.jpeg",
                "lat": 24.922092030779385,
                "long": 67.14933528571125,
                "name": "Umair Khan",
                "orderId": 537,
                "rate": "5"
            })
        }
    }

    _onItemPress(item, index) {
        this.props.navigation.navigate('ServicesItemDetail', { item, index });
    }

    _renderStars() {
        var views = {s

        };


        return (
            <View>
                <Icon.Ionicons
                    name={this.props.name}
                    size={28}
                    color={'white'}
                    style={{ flex: 1 }}
                />
            </View>
        );
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    style={styles.flatContainer}
                    data={this.state.items}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => `${index}`}
                    numColumns={1}
                    // ListHeaderComponent={this.renderHeader}
                    ItemSeparatorComponent={this.renderSeparator.bind(this)}
                />
            </SafeAreaView>
        );
    }

    _renderItem = ({ item, index }) => {
        return (
            <View style={styles.sectionContentContainer}>
                <TouchableOpacity onPress={() => this._onItemPress(item, index)}
                    activeOpacity={0.8} style={[styles.card, {}]}>
                    <View style={styles.itemImageView}>
                        <Image style={styles.itemImage} source={{ uri: item.image }} />
                    </View>
                    <View>
                        <Text style={styles.sectionTitleText}>
                            {item.name}
                        </Text>
                        <Text style={styles.sectionContentText}>
                            {item.car}
                        </Text>
                        <Text style={styles.sectionContentText}>
                            {item.distance}
                        </Text>
                    </View>
                    <Text style={styles.sectionPriceText}>
                        {item.bid}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };

    renderHeader = () => {
        return (
            <View style={{ borderBottomWidth: 1, borderBottomColor: '#CED0CE' }}>
                <View style={styles.searchInput}>
                    <TextInput
                        style={styles.inputText}
                        placeholder={'Enter Place'}
                        placeholderTextColor={'#999'}
                        underlineColorAndroid={'#fff'}
                        autoCorrect={false}
                        onFocus={() => {
                            // this.props.changeInputFocus('search');
                        }}
                        ref={(inputSearch) => {
                            this.inputSearch = inputSearch;
                        }}
                    />
                    <TouchableOpacity
                        style={styles.button} onPress={() => this.props.navigation.navigate('Services')}
                        activeOpacity={0.6} >
                        <Text style={styles.buttonText}>Search</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "86%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "14%"
                }}
            />
        );
    };
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    flatContainer: {

    },
    upperViewContainer: {
        top: 0,
        left: 0,
        right: 0,
        height: 55,
        paddingHorizontal: 8,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { height: 0 },
                shadowOpacity: 0.2,
                shadowRadius: 5,
            },
            android: {
                elevation: 5,
            },
        }),
        alignItems: 'center',
        backgroundColor: 'black',
        flexDirection: 'row',
        // justifyContent: 'center',
    },
    sectionContentContainer: {
        // height: 110,
        width: Dimensions.get('window').width,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        // borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center',
        height: 110,
        width: Dimensions.get('window').width,
        // marginVertical: 12,
        // marginHorizontal: 12,
        paddingVertical: 8,
        paddingHorizontal: 8,

    },
    itemImage: {
        height: 80,
        width: 80,
        borderRadius: 40,
    },
    itemImageView: {
        height: 80,
        width: 80,
        marginEnd: 16,
        borderRadius: 40,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { height: 0 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    screenHeaderText: {
        width: Dimensions.get('window').width - 175,
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
        marginHorizontal: 2,
    },
    sectionContentText: {
        width: Dimensions.get('window').width - 175,
        color: 'black',
        fontSize: 14,
        fontWeight: '300',
        marginHorizontal: 2,
    },
    sectionTitleText: {
        width: Dimensions.get('window').width - 175,
        color: 'black',
        marginHorizontal: 2,
        marginTop: 4,
        ...Platform.select({
            ios: {
                fontSize: 16,
                fontWeight: '600',
            },
            android: {
                fontSize: 16,
                fontWeight: '500',
            },
        }),
    },
    sectionPriceText: {
        width: 65,
        color: 'black',
        fontSize: 15,
        fontWeight: '500',
        marginHorizontal: 2,
    },
    searchInput: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'stretch',
        display: 'flex',
        backgroundColor: 'white',
        // height: this.height,
        // marginHorizontal: 5,
        marginTop: 3,
        marginBottom: 2,
        // width: '100%',
    },
    inputText: {
        // display: 'flex',
        marginLeft: 20,
        fontSize: 15,
        height: '100%',
        width: Dimensions.get('window').width - 20 - 80 - 8,
        color: '#999',
    },
    button: {
        height: 35,
        width: 80,
        alignSelf: 'center',
        borderRadius: 5,
        marginVertical: 5,
        // alignItems: 'center',
        // marginHorizontal: 15,
        justifyContent: 'center',
        backgroundColor: Colors.appTheme,
        // flexDirection: 'row',
        // height: '100%',
        // width: Dimensions.get('screen').width / 2 - 30
    },
    buttonText: {
        marginHorizontal: 5,
        textAlign: 'center',
        padding: 4,
        color: 'white',
        ...Platform.select({
            ios: {
                fontSize: 17,
                // fontWeight: '400',
            },
            android: {
                fontSize: 15,
                fontWeight: '400',
            },
        }),
    }
});