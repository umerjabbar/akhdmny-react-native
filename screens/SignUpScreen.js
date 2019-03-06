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
import { LinearGradient, Icon, DangerZone } from 'expo';
import CountryPicker, { getAllCountries } from 'react-native-country-picker-modal';
import { showMessage, hideMessage } from 'react-native-flash-message';
import { Header } from 'react-navigation';
import { LocalConstants, NetworkServices } from '../constants/Constants'
import { NavigationBarButton } from '../components';

const { Localization } = DangerZone;

export class SignUpScreen extends React.Component {

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
      headerLeft: <NavigationBarButton name={'ios-arrow-back'} onPress={() => navigation.pop()} />
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
    return fetch(`${LocalConstants.BASEURL}${LocalConstants.MIDDLEURL}${NetworkServices.Register}`, {
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
    return (
      <View style={styles.container}>
        <LinearGradient colors={[Colors.appTheme, Colors.appTheme, Colors.appTheme]} style={styles.backgroundImage}></LinearGradient>
        <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logoImage} resizeMode={'cover'}/>
          <Text style={{ color: 'transparent', fontSize: 18, marginVertical: 10, }}>LOGIN TO YOUR ACCOUNT</Text>
          <View style={[styles.textboxView, { borderColor: this.state.phoneBorderColor }]}>
            <View style={{ width: 30, top: -3 }}>
              <CountryPicker
                onChange={(country) => this._onCountryChange(country)}
                cca2={this.state.cca2 || 'SA'} translation='eng' />
            </View>
            <Text style={styles.codeStyle}>{`+${this.state.callingCode}`}</Text>
            <TextInput style={[styles.phoneTextInput]} placeholder={'Phone'} keyboardType={'phone-pad'}
              onChangeText={(phone) => this._onPhoneChange(phone.replace(/\s/g, ""))}
              textContentType={'telephoneNumber'} placeholderTextColor={'#D4D4D4'} />
          </View>
          <View style={[styles.textboxView, { borderColor: this.state.passwordBorderColor }]}>
            <Icon.EvilIcons name={'lock'} size={30} color={'white'} />
            <TextInput style={[styles.passwordTextInput]} placeholder={'Password'} keyboardType={'default'}
              secureTextEntry={this.state.isSecurePassword} onChangeText={(password) => this._onPasswordChange(password.replace(/\s/g, ""))}
              textContentType={'password'} placeholderTextColor={'#D4D4D4'} />
            <TouchableOpacity onPress={() => this._eyeButtonAction()} activeOpacity={0.6}>
              <Icon.Foundation name={'eye'} size={30} color={'white'} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={[styles.button, { backgroundColor: 'white' }]} onPress={() => this._loginButtonAction()} activeOpacity={0.8}>
            <Text style={[styles.buttonText, { color: Colors.appTheme }]}>Register</Text>
          </TouchableOpacity>
          <View style={[styles.underlineView]}>
            <Text style={styles.underlineText}>Forget Password?</Text>
          </View>
          <View style={[styles.underlineView]}>
            <Text style={styles.underlineText}>Skip Login</Text>
          </View>
          <View style={[styles.underlineView]}>
            <Text style={styles.underlineText}>Register Now</Text>
          </View>
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
    width: 260 - 30 - 16 - 5 - 30,
    fontSize: 17,
    color: 'white',
    marginStart: 5,
  },
  passwordTextInput: {
    height: '100%',
    width: 260 - 30 - 16 - 5 - 30,
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
    color: 'transparent',
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