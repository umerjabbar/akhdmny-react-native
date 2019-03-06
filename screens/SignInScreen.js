import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  AsyncStorage,
  TextInput,
} from 'react-native';

import Colors from '../constants/Colors'
import { LinearGradient, Icon } from 'expo';

export class SignInScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };

  _onPasswordChange(password) {
    this.password = password;
  }

  _loginButtonAction() {

  }
  _ForgetPasswordButtonAction() {
    const { navigate } = this.props.navigation;
    navigate('forgetPasswordScreen');
  }
  _SkipLoginButtonAction() {

  }
  _RegisterNowButtonAction() {
    const { navigate } = this.props.navigation;
    navigate('signupScreen');
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
            <Icon.EvilIcons name={'lock'} size={30} color={'white'} />
            <TextInput style={[styles.passwordTextInput]} placeholder={'Password'} keyboardType={'default'}
              secureTextEntry={true} onChangeText={(password) => this._onPasswordChange(password.replace(/\s/g, ""))}
              textContentType={'password'} />
          </View>
          <TouchableOpacity style={[styles.button, { backgroundColor: 'white' }]} onPress={() => this._loginButtonAction()} activeOpacity={0.8}>
            <Text style={[styles.buttonText, { color: Colors.appTheme }]}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.underlineView]} onPress={() => this._ForgetPasswordButtonAction()} activeOpacity={0.8}>
            <Text style={styles.underlineText}>Forget Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.underlineView]} onPress={() => this._SkipLoginButtonAction()} activeOpacity={0.8}>
            <Text style={styles.underlineText}>Skip Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.underlineView]} onPress={() => this._RegisterNowButtonAction()} activeOpacity={0.8}>
            <Text style={styles.underlineText}>Register Now</Text>
          </TouchableOpacity>
          <View style={{ height: Dimensions.get('screen').height * 0.1 }}></View>
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
    alignItems: 'center',
    marginVertical: 5,
    padding: 8
  },
  passwordTextInput: {
    height: '100%',
    width: 260 - 30 - 16 - 5,
    fontSize: 17,
    marginStart: 5,
    color: 'white'
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