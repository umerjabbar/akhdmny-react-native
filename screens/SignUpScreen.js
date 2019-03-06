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
import { ExpoConfigView } from '@expo/samples';
import {NavigationBarButton} from '../components';
import Colors from '../constants/Colors';
import { LinearGradient } from 'expo';

export class SignUpScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'REGISTER',
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
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View style={styles.container}>
        {/* <LinearGradient colors={[Colors.backColor1, Colors.backColor2, Colors.backColor3]} style={styles.backgroundImage}></LinearGradient> */}
        <ExpoConfigView />
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