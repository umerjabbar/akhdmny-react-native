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

export class CartScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'CART',
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

            // headerRight: <NavigationBarButton name={Platform.OS === 'ios' ? 'md-cart' : 'md-cart'} onPress={() => navigation.navigate('Map')} />,
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
        for (let index = 0; index < 2; index++) {
            this.state.items.push({
                id: `${index}`,
                title: 'Managment Team',
                color: 'white',
                price: `${index * 173} PKR`,
                address: 'sdjafhjkasfdhjhsagda gsdas gdkg asdg sadg isugdsa igd',
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
                <FlatList
                    style={styles.flatContainer}
                    data={this.state.items}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => item.id}
                    numColumns={1}
                    ListHeaderComponent={this.renderHeader}
                    ListFooterComponent={this.renderFooter}
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
            <View style={{ marginBottom: 5 }}>
                <View style={[styles.upperViewContainer, { paddingHorizontal: 8, }]}>
                    <Icon.MaterialCommunityIcons name={'tag-plus'} size={25} color={'black'} />
                    <Text style={styles.screenHeaderText}>{'Have Coupon ?'}</Text>
                    <Icon.Ionicons style={{ position: 'absolute', end: 10 }} name={'ios-arrow-forward'} size={25} color={'black'} />
                </View>
            </View>
        );
    }

    renderFooter = () => {
        return (
            <View style={{ marginTop: 5 }}>
                <View style={styles.footerViewContainer}>
                    <View style={[styles.footerSection, { backgroundColor: "#31B2F5" }]}>
                        {/* <Icon.FontAwesome name={'money'} size={25} color={'black'} /> */}
                        <Text style={styles.footerSectionTitle}>{'Add Tip'}</Text>
                    </View>
                    <Text style={[styles.screenHeaderText, {marginHorizontal: 5}]}>{'Enter amount'}</Text>
                    <Icon.Ionicons style={{ position: 'absolute', end: 40 }} name={'ios-arrow-forward'} size={20} color={'black'} />
                    <Text style={[styles.screenHeaderText, {position: 'absolute', end: 12}]}>{'12'}</Text>
                </View>
                <View style={styles.footerViewContainer}>
                    <View style={[styles.footerSection, { backgroundColor: "#1266B3" }]}>
                        <Text style={styles.footerSectionTitle}>{'Total Services'}</Text>
                    </View>
                    <Text style={styles.footerSectionValue}>{'4'}</Text>
                </View>
                <View style={styles.footerViewContainer}>
                    <View style={[styles.footerSection, { backgroundColor: "#EDB61A" }]}>
                        <Text style={styles.footerSectionTitle}>{'Discount'}</Text>
                    </View>
                    <Text style={styles.footerSectionValue}>{'4'}</Text>
                </View>
                <View style={styles.footerViewContainer}>
                    <View style={[styles.footerSection, { backgroundColor: "#31C700" }]}>
                        <Text style={styles.footerSectionTitle}>{'Final Total'}</Text>
                    </View>
                    <Text style={styles.footerSectionValue}>{'4'}</Text>
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
        alignItems: 'center',
        backgroundColor: '#F7F7F9',
        flexDirection: 'row',
    },
    sectionContentContainer: {
        height: 80,
        width: Dimensions.get('window').width,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 80,
        width: Dimensions.get('window').width,
        paddingVertical: 8,
        paddingHorizontal: 8,
    },
    itemImage: {
        height: 50,
        width: 50,
        marginEnd: 8,
        borderRadius: 5,
    },
    footerViewContainer: {
        marginVertical: 1,
        height: 45,
        alignItems: 'center',
        backgroundColor: '#F7F7F9',
        flexDirection: 'row',
    },
    footerSection: {
        width: Dimensions.get("window").width * 0.36,
        height: '100%',
        justifyContent: 'center',
        padding: 5,
    },
    footerSectionTitle: {
        color: 'white',
        fontSize: 16,
        marginHorizontal: 2,
    },
    footerSectionValue: {
        color: 'black',
        fontSize: 16,
        marginHorizontal: 2,
        textAlign: 'center',
        width: Dimensions.get("window").width * 0.6,
    },
    screenHeaderText: {
        color: Colors.appTheme,
        fontSize: 16,
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