import React from 'react';
import {
    Platform,
    StyleSheet,
    Dimensions,
    FlatList,
    KeyboardAvoidingView,
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Vibration
} from 'react-native';
import { Audio, Icon, BlurView, Permissions, FileSystem } from 'expo';
import { NavigationBarButton } from '../components';
import Colors from '../constants/Colors';
import { Transition } from 'react-navigation-fluid-transitions';

export class ServicesItemDetailScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            // title: 'SERVICES',
            // headerTintColor: '#ffffff',
            headerStyle: {
                backgroundColor: 'black',
                borderBottomColor: 'rgba(0, 0, 0, 0)',
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
            audioIcon: 'ios-mic',
            haveRecordingPermissions: false,
        };
        this.isAudioAdded = false;
        this.recording = null;
        this.sound = null;
        this.makeSections();
    }

    componentDidMount() {
        this._askForPermissions();
    }

    makeSections() {
        for (let index = 0; index < 10; index++) {
            this.state.items.push({
                image: `https://s3.envato.com/files/221060184/thumbnail.png`,
            })
        }
    }

    _onItemPress(item) {

    }

    _audioButtonTapped() {
        console.log('_audioButtonTapped');
        if (this.sound != null) {
            if (this.state.isPlaying) {
                this.sound.stopAsync();
                this.setState({ 'audioIcon': 'ios-play' });
            } else {
                this.sound.playAsync();
                this.setState({ 'audioIcon': 'ios-pause' });
            }
        }else{

        }
    }
    _audioButtonPressOut() {
        if (this.recording !== null) {
            if (this.state.isRecording) {
                this._stopRecordingAndEnablePlayback();
            }
        }

        if (this.sound !== null) {
            this.setState({ 'audioIcon': 'ios-play' });
        } else {
            this.setState({ 'audioIcon': 'ios-mic' });
        }
        console.log('_audioButtonPressOut');
    }
    _audioButtonLongPress() {
        this.setState({ 'audioIcon': 'ios-radio-button-on' });
        Vibration.vibrate(100);
        console.log('_audioButtonLongPress');
        if (this.state.haveRecordingPermissions) {
            this._startAudioRecording();
        }
    }

    _cameraButtonTapped() {
        console.log('_cameraButtonTapped');
    }

    _askForPermissions = async () => {
        const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        this.setState({ haveRecordingPermissions: response.status === 'granted' });
    };

    _startAudioRecording = async () => {
        if (this.sound !== null) {
            await this.sound.unloadAsync();
            this.sound.setOnPlaybackStatusUpdate(null);
            this.sound = null;
        }
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            playThroughEarpieceAndroid: true,
        });
        if (this.recording !== null) {
            this.recording.setOnRecordingStatusUpdate(null);
            this.recording = null;
        }
        const recording = new Audio.Recording();
        await recording.prepareToRecordAsync(this.recordingSettings);
        recording.setOnRecordingStatusUpdate(this._updateScreenForRecordingStatus);

        this.recording = recording;
        await this.recording.startAsync();
    }
    _updateScreenForRecordingStatus = status => {
        if (status.canRecord) {
            this.setState({ isRecording: status.isRecording, });
        } else if (status.isDoneRecording) {
            this.setState({ isRecording: false, });
        }
    };
    async _stopRecordingAndEnablePlayback() {
        try {
            await this.recording.stopAndUnloadAsync();
        } catch (error) {}
        const info = await FileSystem.getInfoAsync(this.recording.getURI());
        console.log(`FILE INFO: ${JSON.stringify(info)}`);
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            playsInSilentLockedModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            playThroughEarpieceAndroid: true,
        });
        const { sound, status } = await this.recording.createNewLoadedSoundAsync({
            isLooping: false,
        },this._updateScreenForSoundStatus);
        this.sound = sound;
        this.setState({ 'audioIcon': 'ios-play' });
    }

    _updateScreenForSoundStatus = status => {
        if (status.isLoaded) {
            this.setState({isPlaying: status.isPlaying,});
        } else {
            if (status.error) {
                console.log(`FATAL PLAYER ERROR: ${status.error}`);
            }
        }
    };

    _onPlayPausePressed = () => {
        if (this.sound != null) {
            if (this.state.isPlaying) {
                this.sound.pauseAsync();
            } else {
                this.sound.playAsync();
            }
        }
    };

    render() {
        return (
            <View style={styles.container}>
                {/* <BlurView tint='dark' intensity={50} style={styles.backgroundImage}></BlurView> */}
                {/* <Transition shared={`item${this.props.navigation.state.params.index}`}> */}
                <View style={styles.sectionContentContainer}>
                    <View style={[styles.card, { backgroundColor: 'white' }]}>
                        <Image style={styles.itemImage} source={{ uri: this.props.navigation.state.params.item.icon }} />
                        <View>
                            <Text style={styles.sectionTitleText}>
                                {this.props.navigation.state.params.item.title}
                            </Text>
                            <Text style={styles.sectionContentText}>
                                {this.props.navigation.state.params.item.address}
                            </Text>
                        </View>
                        <Text style={styles.sectionPriceText}>
                            {this.props.navigation.state.params.item.price}
                        </Text>
                    </View>
                </View>
                {/* </Transition> */}
                <View style={styles.bottomSectionContentContainer}>
                    <View style={[styles.bottomCard, { backgroundColor: 'white' }]}>
                        <KeyboardAvoidingView>
                            <ScrollView keyboardDismissMode='on-drag'>
                                <TextInput
                                    style={styles.inputText}
                                    placeholder={'Write Something'}
                                    placeholderTextColor={'#999'}
                                    underlineColorAndroid={'#fff'}
                                    multiline={true}
                                    autoCorrect={false}
                                    onFocus={() => {
                                        // this.props.changeInputFocus('search');
                                    }}
                                    ref={(inputSearch) => {
                                        this.inputSearch = inputSearch;
                                    }}
                                />
                            </ScrollView>
                        </KeyboardAvoidingView>
                        <View style={styles.bottomCollectionContainer}>
                            <TouchableOpacity style={{ height: 80, width: 85 }} onPress={() => this._audioButtonTapped()}
                                onPressOut={() => this._audioButtonPressOut()} onLongPress={() => this._audioButtonLongPress()} activeOpacity={0.8}>
                                <View style={[styles.audioButton, { backgroundColor: Colors.appTheme }]}>
                                    <Icon.Ionicons name={this.state.audioIcon} size={45} color={'white'} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ height: 80, width: 85 }} onPress={() => this._cameraButtonTapped()} activeOpacity={0.8}>
                                <View style={[styles.audioButton, { backgroundColor: Colors.appTheme }]}>
                                    <Icon.Ionicons name={'ios-camera'} size={45} color={'white'} />
                                </View>
                            </TouchableOpacity>
                            <FlatList
                                style={styles.flatContainer}
                                data={this.state.items}
                                renderItem={this._renderItem}
                                keyExtractor={(item, index) => `${index}`}
                                horizontal={true}
                            />
                        </View>

                    </View>
                </View>

                <TouchableOpacity onPress={() => console.log()} activeOpacity={0.8}>
                    <View style={[styles.button, { backgroundColor: Colors.appTheme }]}>
                        <Text style={styles.buttonText}>Add To Cart</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    _renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={{ height: 80, width: 85 }} onPress={() => this._cameraButtonTapped()} activeOpacity={0.8}>
                <View style={[styles.audioButton, { backgroundColor: Colors.appTheme }]}>
                    <Image style={{ height: '100%', width: '100%', borderRadius: 8 }} source={{ uri: item.image }} resizeMode={'cover'} />
                </View>
            </TouchableOpacity>

        );
    };

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    flatContainer: {
        marginStart: 2.5,
        marginEnd: 5,
        // marginHorizontal: 5,
        // start: 2.5,
    },
    backgroundImage: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: Dimensions.get('screen').height
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
        height: 110,
        width: Dimensions.get('window').width,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center',
        height: 100,
        width: Dimensions.get('window').width - 14,
        // marginVertical: 12,
        // marginHorizontal: 12,
        paddingVertical: 8,
        paddingHorizontal: 8,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { height: 3 },
                shadowOpacity: 0.1,
                shadowRadius: 5,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    itemImage: {
        height: 50,
        width: 50,
        marginEnd: 8,
        borderRadius: 5,
    },
    screenHeaderText: {
        width: Dimensions.get('window').width - 147,
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
        marginHorizontal: 2,
    },
    sectionContentText: {
        width: Dimensions.get('window').width - 157,
        color: 'black',
        fontSize: 14,
        fontWeight: '300',
        marginHorizontal: 2,
    },
    sectionTitleText: {
        width: Dimensions.get('window').width - 157,
        color: 'black',
        fontSize: 16,
        fontWeight: '500',
        marginHorizontal: 2,
        marginTop: 4,
        marginBottom: 2,
    },
    sectionPriceText: {
        width: 65,
        color: 'black',
        fontSize: 15,
        fontWeight: '500',
        marginHorizontal: 2,
    },
    bottomSectionContentContainer: {
        height: Dimensions.get('window').height * 0.5 + 10,
        width: Dimensions.get('window').width,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomCard: {
        borderRadius: 5,
        // flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'center',
        height: Dimensions.get('window').height * 0.5,
        width: Dimensions.get('window').width - 14,
        // marginVertical: 12,
        // marginHorizontal: 12,
        paddingVertical: 12,
        paddingHorizontal: 15,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { height: 3 },
                shadowOpacity: 0.1,
                shadowRadius: 5,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    inputText: {
        // display: 'flex',
        // marginLeft: 20,
        fontSize: 16,
        height: Dimensions.get('window').height * 0.5 - 100,
        width: Dimensions.get('window').width - 14 - 30,
        color: '#000000',
    },
    bottomCollectionContainer: {
        position: 'absolute',
        flexDirection: 'row',
        bottom: 0,
        height: 90,
        marginHorizontal: 5,
        width: Dimensions.get('window').width - 14,
        // backgroundColor: 'grey',
    },
    audioButton: {
        alignItems: 'center',
        // flex:1,
        justifyContent: 'center',
        alignContent: 'center',
        // marginHorizontal: 2.5,
        marginVertical: 5,
        height: 80,
        width: 80,
        borderRadius: 8,
    },
    audioIcon: {
        height: 80,
        width: 80,
        justifyContent: 'center',
        alignContent: 'center',
    },
    button: {
        alignItems: 'center',
        marginHorizontal: 15,
        marginVertical: 8,
        height: 55,
        borderRadius: 8,
        justifyContent: 'center'
    },
    buttonText: {
        textAlign: 'center',
        padding: 8,
        fontSize: 18,
        color: 'white'
    },

});