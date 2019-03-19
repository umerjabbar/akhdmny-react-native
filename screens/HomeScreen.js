import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Button,
  LayoutAnimation,
  UIManager,
} from 'react-native';
import { Location, Permissions, Icon, Localization } from 'expo';
import {Header} from 'react-navigation';
import { NavigationBarButton } from '../components';
import Colors from '../constants/Colors'
import MapView, { PROVIDER_GOOGLE, Marker, AnimatedRegion } from 'react-native-maps';
import i18n from 'i18n-js';
import { homeScreenEn, homeScreenAr } from '../constants/Translations'

import {WaveIndicator} from 'react-native-indicators';

i18n.fallbacks = true;
i18n.translations = { homeScreenEn, homeScreenAr };
i18n.locale = Localization.locale;


const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.016;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


export class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('Title', 'HOME'),
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
      
      headerRight: <NavigationBarButton name={Platform.OS === 'ios' ? 'md-cart' : 'md-cart'} onPress={() => navigation.navigate('Cart')} />,
      headerLeft: <NavigationBarButton name={Platform.OS === 'ios' ? 'md-menu' : 'md-menu'} onPress={() => navigation.toggleDrawer()} />,
      ...navigation.getParam('navBarHidden',  false) ? {header: null} : {},
    };
  };

  constructor() {
    super();
    this.state = {
      region: {
        latitude: 24.83447,
        longitude: 67.29881,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
    };
  }

  componentDidUpdate() {
    
  }

  componentWillMount() {
    if (UIManager.setLayoutAnimationEnabledExperimental){
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    this._showSearching(true);
  }

  componentDidMount() {
    this._getLocationAsync();
  }

  async _getLocationAsync() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({ locationResult: 'Permission to access location was denied', });
    }
    let location = await Location.getCurrentPositionAsync({});
    this.setState({
      region: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }
    });
    this.map.animateToRegion(this.state.region, 100)
  };

  goToCurrentLocation() {
    // let response = Location.getCurrentPositionAsync();
    // response.then(location => {
    //   console.log(JSON.stringify(location));
    //   this.setState({
    //     region: {
    //       latitude: location.coords.latitude,
    //       longitude: location.coords.longitude,
    //       latitudeDelta: LATITUDE_DELTA,
    //       longitudeDelta: LONGITUDE_DELTA,
    //     }
    //   });
    //   this.map.animateToRegion(this.state.region, 100)
    // })
    console.log(this.props)
    // this.props.navigation.setParams({Title: 'Sky Blue Activity'});
    this._showSearching(true)
  }

  _showSearching(isHidden){
    LayoutAnimation.easeInEaseOut();
    this.setState({ isSearching: isHidden });
    
    this.props.navigation.setParams({navBarHidden: isHidden});
  }

  render() {
    let { active } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.mapView}>
          <MapView
            style={{ flex: 1 }}
            ref={map => { this.map = map }}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            followsUserLocation={true}
            loadingEnabled={true}
            customMapStyle={customStyle}
            initialRegion={this.state.region}
            // onRegionChange={}
            userLocationAnnotationTitle={'You'}
          />
        </View>
        {!this.state.isSearching && <View style={styles.tabBarInfoContainer}>
          <TouchableOpacity
            style={styles.button} onPress={() => this.goToCurrentLocation()} activeOpacity={0.6}>
            <Icon.MaterialIcons
              name={'my-location'}
              size={28}
              color={'white'} />
            <Text style={styles.buttonText}>{"My Location"}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button} onPress={() => this.props.navigation.navigate('Services')} activeOpacity={0.6}>
            <Icon.MaterialIcons
              name={'format-list-bulleted'}
              size={28}
              color={'white'} />
            <Text style={styles.buttonText}>{'Services'}</Text>
          </TouchableOpacity>
        </View>}
        {this.state.isSearching && <View style={{ height: '100%', width: '100%', position: 'absolute', alignItems: 'center', justifyContent: 'center' }}>
          <WaveIndicator color={Colors.appTheme} size={Dimensions.get('window').width * 0.9} animationDuration={800} count={1} />
          <View style={{ alignItems: 'center', width: '100%', marginBottom: 20 }}>
            <TouchableOpacity style={[styles.simplebutton, { backgroundColor: Colors.red, marginBottom: 8 }]} onPress={() => this._showSearching(false)} activeOpacity={0.8}>
              <Text style={[styles.simplebuttonText, { color: 'white' }]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>}
      </SafeAreaView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.appTheme,
    flex: 1,
  },
  mapView: {
    top: 0,
    left: 0,
    right: 0,
    // bottom: 55,
    flex: 1,

  },
  tabBarInfoContainer: {
    // position: 'relative',
    bottom: 0,
    left: 0,
    right: 0,
    height: 55,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    // alignItems: 'center',
    backgroundColor: Colors.appTheme,
    flexDirection: 'row'
  },
  button: {
    alignSelf: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
    justifyContent: 'center',
    flexDirection: 'row',
    height: '100%',
    width: Dimensions.get('screen').width / 2 - 30
  },
  buttonText: {
    marginHorizontal: 5,
    textAlign: 'auto',
    padding: 8,
    fontSize: 18,
    color: 'white'
  },
  simplebutton: {
    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: 10,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    width: 240,
  },
  simplebuttonText: {
    textAlign: 'center',
    padding: 8,
    fontSize: 18,
  },
});


const customStyle = [
  {
    "featureType": "administrative",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#d6e2e6"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#cfd4d5"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#7492a8"
      }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "lightness": 25
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#dde2e3"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#cfd4d5"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#dde2e3"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#7492a8"
      }
    ]
  },
  {
    "featureType": "landscape.natural.terrain",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#dde2e3"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#588ca4"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.icon",
    "stylers": [
      {
        "saturation": -100
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a9de83"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#bae6a1"
      }
    ]
  },
  {
    "featureType": "poi.sports_complex",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#c6e8b3"
      }
    ]
  },
  {
    "featureType": "poi.sports_complex",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#bae6a1"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#41626b"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "saturation": -45
      },
      {
        "lightness": 10
      },
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#c1d1d6"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#a6b5bb"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#9fb6bd"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.icon",
    "stylers": [
      {
        "saturation": -70
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#b4cbd4"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#588ca4"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#008cb5"
      },
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "transit.station.airport",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "saturation": -100
      },
      {
        "lightness": -5
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a6cbe3"
      }
    ]
  }
];
