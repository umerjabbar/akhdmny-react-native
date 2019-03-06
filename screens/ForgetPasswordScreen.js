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
import { NavigationBarButton } from '../components';
import Colors from '../constants/Colors'
import { LinearGradient } from 'expo';

export class ForgetPasswordScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };

  _loginButtonAction(){

  }
  _ForgetPasswordButtonAction(){
    const { navigate } = this.props.navigation;
    navigate()
  }
  _SkipLoginButtonAction(){
    
  }
  _RegisterNowButtonAction(){
    const { navigate } = this.props.navigation;
    navigate()
  }

  render() {
    return (
      <View style={styles.container}>
        <LinearGradient colors={[Colors.appTheme, Colors.appTheme, Colors.appTheme]} style={styles.backgroundImage}></LinearGradient>
        <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logoImage} resizeMode={'cover'}
          />
          <Text style={{ color: 'white', fontSize: 18, marginVertical: 10 }}>LOGIN TO YOUR ACCOUNT</Text>
          <View style={styles.textboxView}>

          </View>
          <View style={styles.textboxView}>

          </View>
          <TouchableOpacity style={[styles.button, { backgroundColor: 'white' }]} onPress={() => console.log("haskdlj")} activeOpacity={0.8}>
            <Text style={[styles.buttonText, { color: Colors.appTheme }]}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.underlineView]} onPress={() => console.log("haskdlj")} activeOpacity={0.8}>
            <Text style={styles.underlineText}>Forget Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.underlineView]} onPress={() => console.log("haskdlj")} activeOpacity={0.8}>
            <Text style={styles.underlineText}>Skip Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.underlineView]} onPress={() => console.log("haskdlj")} activeOpacity={0.8}>
            <Text style={styles.underlineText}>Register Now</Text>
          </TouchableOpacity>
          <View style={{ height: 50 }}></View>
        </View>
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
  logoImage: {
    height: Dimensions.get('screen').height * 0.3,
    width: Dimensions.get('screen').height * 0.3,
  },
  textboxView: {
    height: 45,
    width: 260,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
    flexDirection: 'row',
    marginVertical: 5
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
  underlineText: {
    textAlign: 'center',
    padding: 5,
    fontSize: 16,
    color: 'white'
  },
  underlineView: {
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 5,
    height: 25,
    justifyContent: 'center',
    width: 200,
  },
});