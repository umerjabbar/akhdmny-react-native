import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

import {SignUpScreen,SplashScreen,SignInScreen, VerificationScreen} from '../screens'

const LoginStack = createStackNavigator({
  signinScreen: SignInScreen,
  signupScreen: {
    screen: SignUpScreen,
    navigationOptions:{
      gesturesEnabled: false
    }
  },
  verificationScreen: VerificationScreen,
},{
  mode: 'modal',
});

export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: SplashScreen,
  App: MainTabNavigator,
  Auth: LoginStack,
}));