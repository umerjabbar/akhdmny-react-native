import React from 'react';
import { StyleSheet, View, ImageBackground, AsyncStorage } from 'react-native';
import { DangerZone } from 'expo';
import { LocalConstants } from '../constants/Constants';
import { showMessage, hideMessage } from 'react-native-flash-message';
const { Lottie } = DangerZone;

export class SplashScreen extends React.Component {
  state = {
    animation: null,
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this._bootstrapAsync();
  }

  componentDidMount(){
    // this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      if (token !== null) {
        this.renewToken(token.toString());
      } else {
        console.log("accesstoken is null");
        this.props.navigation.navigate('Auth');
      }
    } catch (error) {
      console.log("Error in exception of accesstoken");
      console.log(error);
      this.props.navigation.navigate('Auth');
    }
  };

  async _storeData(key) {
    try {
      await AsyncStorage.setItem("access_token", key);
    } catch (error) {
      console.log("Error in  persisting asyncstorage key")
    }
  }

  async renewToken(token) {
    this._playAnimation();
    console.log("Renewing token");
    return await fetch(`${LocalConstants.BASEURL}/users/renewToken?access_token=${token}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json; charset=utf-8"
      },
    }).then((response) => {
      if (response.status == 500 || response.status == 404) {
        showMessage({
          message: "Error",
          type: 'danger',
          description: `Error connecting server with response code of ${response.status}`,
        });
        return;
      }
      response.json().then(responseJson => {
        if (response.status >= 200, response.status <= 300) {
          this._storeData(responseJson.access_token);
          this.props.navigation.navigate('App');
        } else {
          showMessage({
            message: "Error",
            type: 'danger',
            description: responseJson.error.message,
          });
          this.props.navigation.navigate('Auth');
        }
      }).catch(error => {
        showMessage({
          message: "Parse Error",
          type: 'danger',
          description: "Error in json parsing it is caused by server",
        });
        this.props.navigation.navigate('Auth');
      })
    }).catch((error) => {
      showMessage({
        message: "Failure",
        type: 'danger',
        description: "Internet Connection lost",
      });
      this.props.navigation.navigate('Auth');
    });
  }

  render() {
    return (
      <ImageBackground style={styles.animationContainer} source={require('../assets/images/splash.png')}>
        {this.state.animation &&
          // <View style={{width: '90%', height: 200, alignContent: 'center', justifyContent: 'center'}}>
          <Lottie
            ref={animation => {
              this.animation = animation;
            }}
            style={{
              // width: 100,
              height: 50,
              position: 'absolute',
              left: 0,
              right: 0,
              // backgroundColor: '#eee',
            }}
            source={this.state.animation}
          />
        }

        {/* <View style={styles.buttonContainer}>
          <Button title="Restart Animation" onPress={this._playAnimation} />
        </View> */}
      </ImageBackground>
    );
  }

  _playAnimation = () => {
    if (!this.state.animation) {
      this._loadAnimationAsync();
    } else {
      this.animation.reset();
      this.animation.play();
    }
  };

  _loadAnimationAsync = async () => {
    let result = await fetch(
      "https://assets.lottiefiles.com/datafiles/kaSuzs8QVBUsk3j/data.json"
    )
      .then(data => {
        return data.json();
      })
      .catch(error => {
        console.error(error);
      });
    this.setState({ animation: result }, this._playAnimation);
    // this._bootstrapAsync();
  };
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
  },
});
