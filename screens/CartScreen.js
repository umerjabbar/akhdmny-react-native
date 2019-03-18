import React from 'react';
import {
    Animated,
    Platform,
    StyleSheet,
    Dimensions,
    FlatList,
    KeyboardAvoidingView,
    Keyboard,
    Image,
    ScrollView,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { Icon, BlurView } from 'expo';
import { NavigationBarButton } from '../components';
import Colors from '../constants/Colors';
import Swipeout from 'react-native-swipeout';

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
            headerLeft: <NavigationBarButton name={Platform.OS === 'ios' ? 'ios-arrow-down' : 'ios-arrow-down'} onPress={() => navigation.pop()} />
            // header: null
        };
    };

    constructor() {
        super();
        this.state = {
            items: ([]),
            offerBackgroundColor: 'transparent',
            priceBackgroundColor: Colors.appTheme,
            number: 55,
            canAddTip: false,
            canPlaceOrder: false,
            tipPrice: 0,
            isPriceVisible: true,
        };
        this.is_bid = 0;
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

    _bidButtonAction(choice) {
        if (choice == 1) {
            this.is_bid = 1;
            this.setState({
                offerBackgroundColor: Colors.appTheme,
                priceBackgroundColor: 'transparent',
                number: 43121,
                isPriceVisible: false
            }, () => {
                console.log(this.state.number);
            });
        } else {
            this.is_bid = 0;
            this.setState({
                priceBackgroundColor: Colors.appTheme,
                offerBackgroundColor: 'transparent',
                number: 1312,
                isPriceVisible: true
            });
        }
        console.log(choice);
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    style={styles.flatContainer}
                    data={this.state.items}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => item.id}
                    numColumns={1}
                    ListHeaderComponent={this.renderHeader.bind(this)}
                    ListFooterComponent={this.renderFooter.bind(this)}
                    ItemSeparatorComponent={this.renderSeparator}
                />
                {this.state.canAddTip && <BlurView tint='dark' intensity={100} style={{ height: '100%', width: '100%', position: 'absolute' }}>
                    <TouchableOpacity onPress={() => { Keyboard.dismiss(); this.setState({ canAddTip: false }) }} activeOpacity={1.0} style={{ height: '100%', width: '100%', flexDirection: 'column-reverse' }}>
                        <KeyboardAvoidingView behavior={'position'} keyboardVerticalOffset={65}>
                            <TextInput
                                style={styles.inputText}
                                placeholder={'TIP'}
                                placeholderTextColor={'#999'}
                                keyboardType={'numeric'}
                                clearButtonMode={'while-editing'}
                                underlineColorAndroid={'#fff'}
                                multiline={false}
                                autoCorrect={false}
                            />
                            <TouchableOpacity onPress={() => { Keyboard.dismiss(); this.setState({ canAddTip: false, tipPrice: 10 }); }} activeOpacity={0.8}>
                                <View style={[{ backgroundColor: Colors.appTheme, width: '100%', height: 65 }]}>
                                    <Text style={styles.buttonText}>Add To Cart</Text>
                                </View>
                            </TouchableOpacity>
                        </KeyboardAvoidingView>
                    </TouchableOpacity>
                </BlurView>}
                {this.state.canPlaceOrder && <BlurView tint='dark' intensity={100} style={{ height: '100%', width: '100%', position: 'absolute' }}>
                    <TouchableOpacity onPress={() => { Keyboard.dismiss(); this.setState({ canPlaceOrder: false }) }} activeOpacity={1.0} style={{ height: '100%', width: '100%', alignItems: 'center' }}>
                       <View style={{width: Dimensions.get('window').width * 0.9, height: Dimensions.get('window').width * 0.9, backgroundColor: 'white', borderRadius: 5}}>

                       </View>
                    </TouchableOpacity>
                </BlurView>}
            </SafeAreaView>
        );
    }

    _renderItem = ({ item, index }) => {
        return (
            <Swipeout right={[{ text: 'Delete', color: 'white', backgroundColor: 'red' }]}>
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
                        {this.state.isPriceVisible && <Text style={styles.sectionPriceText}>
                            {item.price}
                        </Text>}
                    </TouchableOpacity>
                </View>
            </Swipeout>
            // {/* </Transition> */}
            // {/*<Transition shared={`item${index}`}> */}
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
                <View style={{ alignItems: 'center', width: '100%', marginVertical: 10 }}>
                    <View style={styles.sectionSelectionButton}>
                        <TouchableOpacity style={[styles.sectionButton, { backgroundColor: this.state.priceBackgroundColor }]} onPress={() => this._bidButtonAction.bind(this)(0)} activeOpacity={0.8}>
                            <Text style={[styles.buttonText, { color: 'white', }]}>Price</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.sectionButton, { backgroundColor: this.state.offerBackgroundColor }]} onPress={() => this._bidButtonAction.bind(this)(1)} activeOpacity={0.8}>
                            <Text style={[styles.buttonText, { color: 'white', }]}>Offer</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.footerViewContainer}>
                    <View style={[styles.footerSection, { backgroundColor: "#31B2F5", flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }]}>
                        <Icon.FontAwesome style={{ marginHorizontal: 4 }} name={'money'} size={20} color={'white'} />
                        <Text style={styles.footerSectionTitle}>{'Add Tip'}</Text>
                    </View>
                    <TouchableOpacity onPress={() => {this.setState({canAddTip: true}); }}>
                        <Text style={[styles.screenHeaderText, { marginHorizontal: 5 }]}>{'Enter amount'}</Text>
                    </TouchableOpacity>
                    <Icon.Ionicons style={{ position: 'absolute', end: 42 }} name={'ios-arrow-forward'} size={20} color={'black'} />
                    <Text style={[styles.screenHeaderText, { position: 'absolute', end: 14 }]}>{'12'}</Text>
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
                    <Text style={styles.footerSectionValue}>{this.state.number}</Text>
                </View>
                <View style={styles.footerViewContainer}>
                    <View style={[styles.footerSection, { backgroundColor: "#31C700" }]}>
                        <Text style={styles.footerSectionTitle}>{'Final Total'}</Text>
                    </View>
                    <Text style={styles.footerSectionValue}>{'4'}</Text>
                </View>
                <View style={{ alignItems: 'center', width: '100%', marginVertical: 10 }}>
                    <TouchableOpacity style={[styles.button, { backgroundColor: Colors.appTheme }]} onPress={() => {this.setState({canPlaceOrder: true});}} activeOpacity={0.8}>
                        <Text style={[styles.buttonText, { color: 'white' }]}>Send</Text>
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
        // width: Dimensions.get("window").width * 0.3,
        width: 125,
        height: '100%',
        justifyContent: 'center',
        padding: 5,
    },
    footerSectionTitle: {
        color: 'white',
        marginHorizontal: 8,
        ...Platform.select({
            ios: {
                fontSize: 17,
                fontWeight: '500'
            },
            android: {
                fontSize: 16,
                fontWeight: '400'
            },
        }),
    },
    footerSectionValue: {
        color: 'black',
        marginHorizontal: 4,
        textAlign: 'center',
        width: Dimensions.get("window").width * 0.6,
        ...Platform.select({
            ios: {
                fontSize: 17,
                // fontWeight: '500'
            },
            android: {
                fontSize: 16,
                fontWeight: '400'
            },
        }),
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
        fontSize: 25,
        height: 65,
        width: '100%',
        backgroundColor: 'white',
        color: 'black',
        fontWeight: '600',
        textAlign: 'center',
    },
    sectionSelectionButton: {
        flexDirection: 'row',
        width: 300,
        marginVertical: 10,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: '#C0C0C0'
    },
    sectionButton: {
        alignItems: 'center',
        height: 45,
        justifyContent: 'center',
        width: '50%',
    },
    button: {
        alignItems: 'center',
        marginHorizontal: 15,
        marginVertical: 10,
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        width: 240,
    },
    buttonText: {
        textAlign: 'center',
        padding: 8,
        fontSize: 18,
    },
});