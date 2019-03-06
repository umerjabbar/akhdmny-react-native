import React from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Button,
  View,
  TouchableOpacity,
  Dimensions,
  Share,
  AsyncStorage
} from 'react-native';
import {NavigationBarButton} from '../components';
import Colors from '../constants/Colors'
import { LinearGradient } from 'expo';

export class SignInScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'LOGIN',
      headerTintColor: '#ffffff',
      headerStyle: {
        backgroundColor: 'transparent',
        borderBottomColor: 'rgba(0, 0, 0, 0.2)',
        ...Platform.select({
          ios: {},
          android: {
            elevation: 1,
          },
        }),
      },

      headerRight: <NavigationBarButton name={Platform.OS === 'ios' ? 'ios-exit' : 'md-exit'} onPress={() => { AsyncStorage.removeItem("access_token"); navigation.navigate('Auth')}} />,
      // headerLeft: <NavigationBarButton name={Platform.OS === 'ios' ? 'md-qr-scanner' : 'md-qr-scanner'} onPress={() => navigation.navigate('Scanner')} />
      // header: null
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <LinearGradient colors={[Colors.appTheme, Colors.appTheme, Colors.appTheme]} style={styles.backgroundImage}></LinearGradient>
        
        {/* <ExpoConfigView /> */}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  backgroundImage: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: Dimensions.get('screen').height
  },
});