//import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

//import TabBarIcon from '../components/TabBarIcon';
import InvoiceScreen from '../screens/Invoice';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const InvoiceStack = createStackNavigator(
  {
    Invoice: InvoiceScreen,
  },
  config
);

InvoiceStack.navigationOptions = {
  tabBarLabel: 'Invoice ',
  /* tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-rocket' : 'md-rocket'} />
  ), */
};

InvoiceStack.path = '';

const tabNavigator = createBottomTabNavigator({
  InvoiceStack,
});

tabNavigator.path = '';

export default tabNavigator;
