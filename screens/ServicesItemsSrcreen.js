import React from 'react';
import {
    Platform,
    StyleSheet,
    Dimensions,
    FlatList,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { Icon } from 'expo';
import { NavigationBarButton } from '../components';
import Colors from '../constants/Colors';
import { Transition } from 'react-navigation-fluid-transitions';

export class ServicesItemsScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'SERVICES',
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

            headerRight: <NavigationBarButton name={Platform.OS === 'ios' ? 'md-cart' : 'md-cart'} onPress={() => navigation.navigate('Map')} />,
            headerLeft: <NavigationBarButton name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'ios-arrow-back'} onPress={() => navigation.pop()} />
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
                id: `${index}`,
                title: 'Managment Team',
                color: 'white',
                price: `${index * 173} PKR`,
                address: 'sdjafhjkasfdhjhsagda gsdas gdkg asdg sadg isugdsa igd asgdksag dasg asjdg kjasg djkkasdhf',
                icon: `https:\/\/theappsolutions.com\/images\/articles\/source\/restaurant-app\/tumvi-logo.png`,
            })
        }
    }

    _onItemPress(item, index) {
        this.props.navigation.navigate('ServicesItemDetail', { item, index });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.upperViewContainer}>
                    {/* <Transition shared={`image${this.props.navigation.state.params.index}`}> */}
                        <Image style={{ height: 40, width: 40, borderRadius: 20, backgroundColor: 'white', marginHorizontal: 6 }}
                            source={{ uri: this.props.navigation.state.params.item.icon }}></Image>
                    {/* </Transition> */}
                    <Text style={styles.screenHeaderText}>{this.props.navigation.state.params.item.title}</Text>
                </View>
                <FlatList
                    style={styles.flatContainer}
                    data={this.state.items}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => item.id}
                    numColumns={1}
                    ListHeaderComponent={this.renderHeader}
                    ItemSeparatorComponent={this.renderSeparator}
                />
            </View>
        );
    }

    _renderItem = ({ item, index }) => {
        return (
            <Transition shared={`item${index}`}>
                <View style={styles.sectionContentContainer}>
                    <TouchableOpacity onPress={() => this._onItemPress(item, index)}
                        activeOpacity={0.8} style={[styles.card, { backgroundColor: item.color }]}>
                        <Image style={styles.itemImage} source={{ uri: item.icon }} />
                        <View>
                            <Text style={styles.sectionTitleText}>
                                {item.title}
                            </Text>
                            <Text style={styles.sectionContentText}>
                                {item.address}
                            </Text>
                        </View>
                        <Text style={styles.sectionPriceText}>
                            {item.price}
                        </Text>
                    </TouchableOpacity>
                </View>
            </Transition>
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
        height: 80,
        width: Dimensions.get('window').width,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        // borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center',
        height: 80,
        width: Dimensions.get('window').width,
        // marginVertical: 12,
        // marginHorizontal: 12,
        paddingVertical: 8,
        paddingHorizontal: 8,
        // ...Platform.select({
        //     ios: {
        //         shadowColor: 'black',
        //         shadowOffset: { height: 0 },
        //         shadowOpacity: 0.1,
        //         shadowRadius: 10,
        //     },
        //     android: {
        //         elevation: 3,
        //     },
        // }),
    },
    itemImage: {
        height: 50,
        width: 50,
        marginEnd: 8,
        borderRadius: 5,
    },
    screenHeaderText: {
        width: Dimensions.get('window').width - 145,
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
        marginHorizontal: 2,
    },
    sectionContentText: {
        width: Dimensions.get('window').width - 145,
        color: 'black',
        fontSize: 14,
        fontWeight: '300',
        marginHorizontal: 2,
    },
    sectionTitleText: {
        width: Dimensions.get('window').width - 145,
        color: 'black',
        fontSize: 16,
        fontWeight: '500',
        marginHorizontal: 2,
        marginTop: 4,
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
        padding: 6,
        fontSize: 17,
        color: 'white'
    }
});