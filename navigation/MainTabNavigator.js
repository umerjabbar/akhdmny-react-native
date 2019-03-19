import React from 'react';
import { Platform, View, Dimensions } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createDrawerNavigator, DrawerNavigator } from 'react-navigation';
import { FluidNavigator, createFluidNavigator } from 'react-navigation-fluid-transitions';

import TabBarIcon from '../components/TabBarIcon';
import Colors from '../constants/Colors';

// import HomeScreen from '../screens/HomeScreen';
import {
  HomeScreen,
  ServicesScreen,
  ServicesItemsScreen,
  ServicesItemDetailScreen,
  CartScreen,
  BidScreen,
} from '../screens';

const ServicesStack = createStackNavigator({
  Main: ServicesScreen,
  ServicesItems: ServicesItemsScreen,
});

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Services: {
    screen: ServicesStack,
    navigationOptions: {
      header: null,
    }
  },
  ServicesItemDetail: ServicesItemDetailScreen,
  Cart: CartScreen
}, {
    mode: 'modal',
    headerMode: 'screen',
  });

HomeStack.navigationOptions = {
  tabBarLabel: () => { return null },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'my-location'}
      title={'My Location'}
    />
  ),
  tabBarOptions: {
    style: {
      backgroundColor: Colors.appTheme,
      showLabel: false
    }
  }
};


const routes = {
  Home: { screen: HomeStack, navigationOptions: { title: 'Home' } },
};
const options = {
  initialRouteName: 'Home',
  order: ['Home'],
  drawerWidth: Dimensions.get('window').width - 119,
  style: {
    paddingTop: 0,
  },
};

export default createDrawerNavigator(routes, options);
