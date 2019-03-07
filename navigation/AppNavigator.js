import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

import {SignUpScreen,SplashScreen,SignInScreen, VerificationScreen, ForgetPasswordScreen} from '../screens'

const LoginStack = createStackNavigator({
  signinScreen: SignInScreen,
  signupScreen: SignUpScreen,
  verificationScreen: VerificationScreen,
  forgetPasswordScreen: ForgetPasswordScreen,
});

export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  App: MainTabNavigator,
  Main: SplashScreen,
  Auth: LoginStack,
}));