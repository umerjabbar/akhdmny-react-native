import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import { Location, Permissions, Icon } from 'expo';
import { NavigationBarButton } from '../components';
import Colors from '../constants/Colors'
import MapView, { PROVIDER_GOOGLE, Marker, AnimatedRegion } from 'react-native-maps';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.016;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export  class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'HOME',
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
      headerLeft: <NavigationBarButton name={Platform.OS === 'ios' ? 'md-menu' : 'md-menu'} onPress={() => navigation.navigate('Scanner')} />
      // header: null
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
      }
    };
  }

  componentDidMount() {
    this._getLocationAsync();
  }

  async _getLocationAsync(){
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({locationResult: 'Permission to access location was denied',});
    }
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ region: {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }});
    this.map.animateToRegion(this.state.region, 100)
  };

  goToCurrentLocation(){
    let response = Location.getCurrentPositionAsync();
    response.then(location => {
      console.log(JSON.stringify(location));
      this.setState({ region: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }});
      this.map.animateToRegion(this.state.region, 100)
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.mapView}>
          <MapView
            style={{ flex: 1 }}
            ref={map => { this.map = map }}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            followsUserLocation={true}
            loadingEnabled= {true}
            customMapStyle={customStyle}
            initialRegion={this.state.region}
            // onRegionChange={}
            userLocationAnnotationTitle={'You'}
          />
        </View>
        <View style={styles.tabBarInfoContainer}>
          <TouchableOpacity
            style={styles.button} onPress={() => this.goToCurrentLocation()} activeOpacity={0.6}>
            <Icon.MaterialIcons
              name={'my-location'}
              size={28}
              color={'white'}/>
            <Text style={styles.buttonText}>My Location</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button} onPress={() => this.props.navigation.navigate('Services')} activeOpacity={0.6}>
              <Icon.MaterialIcons
              name={'format-list-bulleted'}
              size={28}
              color={'white'}/>
            <Text style={styles.buttonText}>Services</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    alignSelf : 'center',
    alignItems: 'center',
    marginHorizontal: 15,
    justifyContent: 'center',
    flexDirection: 'row',
    height: '100%',
    width: Dimensions.get('screen').width/2 - 30
  },
  buttonText: {
    marginHorizontal: 5,
    textAlign: 'auto',
    padding: 8,
    fontSize: 18,
    color: 'white'
  }
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
