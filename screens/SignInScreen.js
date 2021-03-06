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
  ActivityIndicator
} from 'react-native';

import Colors from '../constants/Colors'
import { LinearGradient, Icon, DangerZone, Localization } from 'expo';
import CountryPicker, { getAllCountries } from 'react-native-country-picker-modal';
import { showMessage, hideMessage } from 'react-native-flash-message';
import { Header } from 'react-navigation';
import { LocalConstants, NetworkServices } from '../constants/Constants'
import i18n from 'i18n-js';


const en = {
  l1: "LOGIN TO YOUR ACCOUNT",
  l2: "Phone",
  l3: "Password",
  l4:"Login",
  l5:"Forgot Password?",
  l6:"Skip Login",
  l7:"Register Now",
}
const ar = {
  l1: "تسجيل الدخول إلى حسابك",
  l2: "هاتف",
  l3: "كلمه السر",
  l4:"تسجيل الدخول",
  l5:"هل نسيت كلمة المرور؟",
  l6:"تخطي تسجيل الدخول",
  l7:"سجل الان",
}

i18n.fallbacks = false;
i18n.translations = { en, ar };
i18n.locale = Localization.locale;

export class SignInScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerTintColor: '#ffffff',
      headerStyle: {
        backgroundColor: 'transparent',
        borderBottomColor: 'rgba(255, 255, 255, 0)',
        ...Platform.select({
          ios: {},
          android: {
            elevation: 0,
          },
        }),
      },

      // headerRight: <NavigationBarButton name={Platform.OS === 'ios' ? 'md-person' : 'md-person'} onPress={navigation.getParam('scanQRCode')} />,
      // headerLeft: <NavigationBarButton name={Platform.OS === 'ios' ? 'md-qr-scanner' : 'md-qr-scanner'} onPress={() => navigation.navigate('MyModal')} />
      // header: null
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      cca2: 'SA',
      phoneBorderColor: 'white',
      passwordBorderColor: 'white',
      isSecurePassword: true,
      isLoading: false,
      callingCode: '966',
    };
    this.countryName = 'Saudi Arabia';
    this.phone = '';
    this.password = '';
  }

  componentDidMount() {
    this.queryPreferredLocales();
  }

  queryPreferredLocales = async () => {
    const currentLocale = await Localization.locale;
    const locale = String(currentLocale);
    const data = locale.split("-");
    if (data === undefined) { return; }
    if (data[1] === undefined) { return; }
    const cca2 = data[1];
    this.setState({ cca2: cca2 });
    const userCountryData = getAllCountries()
      .filter(country => country.cca2 === cca2)
      .pop()
    if (userCountryData === undefined) { return; }
    this.countryName = userCountryData.name.common;
    this.setState({ callingCode: userCountryData.callingCode });
  };

  _onCountryChange(country) {
    this.setState({ cca2: country.cca2, callingCode: country.callingCode });
  }
  _onPhoneChange(phone) {
    this.phone = phone;
  }
  _onPasswordChange(password) {
    this.password = password;
  }
  _eyeButtonAction(){
     this.setState({isSecurePassword: !this.state.isSecurePassword})
  }

  _loginButtonAction() {
    if (this.phone.length == 0 & this.password.length == 0) {
      this.setState({ phoneBorderColor: 'red', passwordBorderColor: 'red', });
      showMessage({ message: "Warning", type: 'danger', description: 'Some fields are missing', });
    } else if (this.phone.length == 0) {
      this.setState({ phoneBorderColor: 'red', passwordBorderColor: 'white', });
      showMessage({ message: "Warning", type: 'danger', description: 'Phone field is missing', });
    } else if (this.password.length == 0) {
      this.setState({ phoneBorderColor: 'white', passwordBorderColor: 'red', });
      showMessage({ message: "Warning", type: 'danger', description: 'Password field is missing', });
    } else {
      this.setState({ phoneBorderColor: 'white', passwordBorderColor: 'white', });
      this.lgoinRequest();
    }

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

  async _storeData(key) {
    try {
      await AsyncStorage.setItem("access_token", key);
    } catch (error) {
      console.log("Error in  persisting asyncstorage key")
    }
  }

  async lgoinRequest() {
    this.setState({ isLoading: true });
    return fetch(`${LocalConstants.BASEURL}${LocalConstants.MIDDLEURL}${NetworkServices.Login}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "client-id": "akhdmny-app-ios",
        "Authorization": "Basic YWhsYW0tYXBwLWlvczo1Nzk3ZTY2Mi0wYzQ0LTRjYWYtOGU1OS01OGUwNzVjOWI3NGI="
      },
      body: JSON.stringify({
        phone: `+${this.state.callingCode}${this.phone}`,
        password: this.password,
        country: this.countryName
      }),
    }).then((response) => {
      this.setState({ isLoading: false });
      if (response.status == 500 || response.status == 404) {
        showMessage({ message: "Error", type: 'danger', description: `Error connecting server with response code of ${response.status}`, });
        return;
      }
      response.json().then(responseJson => {
        if (response.status >= 200, response.status <= 300) {
          // this._storeData(responseJson.access_token)
          const { navigate } = this.props.navigation;
          navigate('App');
        } else {
          showMessage({ message: "Error", type: 'danger', description: "responseJson.error.message", });
        }
      }).catch(error => {
        showMessage({ message: "Parse Error", type: 'danger', description: "Error in json parsing it is caused by server", });
      })
    }).catch((error) => {
      this.setState({ isLoading: false });
      showMessage({ message: "Failure", type: 'danger', description: "Internet Connection lost", });
    });
  }

  render() {
    const rtlText = Localization.isRTL && {
      textAlign: 'right',
      writingDirection: 'rtl',
    };

    return (
      <View style={styles.container}>
        <LinearGradient colors={[Colors.appTheme, Colors.appTheme, Colors.appTheme]} style={styles.backgroundImage}></LinearGradient>
        <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logoImage} resizeMode={'cover'}
          />
          <Text style={{ color: 'white', fontSize: 18, marginVertical: 10 }}>{i18n.t('l1')}</Text>
          <View style={[styles.textboxView, { borderColor: this.state.phoneBorderColor }]}>
            <View style={{ width: 30, top: -3 }}>
              <CountryPicker
                onChange={(country) => this._onCountryChange(country)}
                cca2={this.state.cca2 || 'SA'} translation='eng' />
            </View>
            <Text style={styles.codeStyle}>{`+${this.state.callingCode}`}</Text>
            <TextInput style={[styles.phoneTextInput, rtlText]} placeholder={i18n.t('l2')} keyboardType={'phone-pad'}
              onChangeText={(phone) => this._onPhoneChange(phone.replace(/\s/g, ""))}
              textContentType={'telephoneNumber'} placeholderTextColor={'#D4D4D4'} />
          </View>
          <View style={[styles.textboxView, { borderColor: this.state.passwordBorderColor }]}>
            <Icon.EvilIcons name={'lock'} size={30} color={'white'} />
            <TextInput style={[styles.passwordTextInput, rtlText]} placeholder={i18n.t('l3')} keyboardType={'default'}
              secureTextEntry={this.state.isSecurePassword} onChangeText={(password) => this._onPasswordChange(password.replace(/\s/g, ""))}
              textContentType={'password'} placeholderTextColor={'#D4D4D4'} />
            <TouchableOpacity onPress={() => this._eyeButtonAction()} activeOpacity={0.6}>
              <Icon.Foundation name={'eye'} size={30} color={'white'} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={[styles.button, { backgroundColor: 'white' }]} onPress={() => this._loginButtonAction()} activeOpacity={0.8}>
            <Text style={[styles.buttonText, { color: Colors.appTheme }]}>{i18n.t('l4')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.underlineView]} onPress={() => this._ForgetPasswordButtonAction()} activeOpacity={0.6}>
            <Text style={styles.underlineText}>{i18n.t('l5')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.underlineView]} onPress={() => this._SkipLoginButtonAction()} activeOpacity={0.6}>
            <Text style={styles.underlineText}>{i18n.t('l6')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.underlineView]} onPress={() => this._RegisterNowButtonAction()} activeOpacity={0.6}>
            <Text style={styles.underlineText}>{i18n.t('l7')}</Text>
          </TouchableOpacity>
          <View style={{ height: Header.HEIGHT + Dimensions.get('screen').height * 0.05 }}></View>
        </View>
        {this.state.isLoading && <View style={[{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.3)' }, styles.backgroundImage]}>
          <View style={{ height: 100, width: 100, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', borderRadius: 10 }}>
            <ActivityIndicator size="large" color="#0000ff" style={{ position: 'absolute' }} />
          </View>
        </View>}
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
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    padding: 8
  },
  codeStyle: {
    fontSize: 17,
    color: 'white',
    marginStart: 10
  },
  phoneTextInput: {
    height: '100%',
    width: 260 - 30 - 16 - 5 - 34,
    fontSize: 17,
    color: 'white',
    marginStart: 5,
    // textAlign: 
  },
  passwordTextInput: {
    height: '100%',
    width: 260 - 30 - 16 - 5 - 34,
    fontSize: 17,
    marginStart: 5,
    color: 'white',
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
    color: 'white',
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