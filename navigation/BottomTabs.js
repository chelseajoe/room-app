/* eslint-disable global-require */
import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CalendarScreen from '../screens/CalendarScreen';
import RequestScreen from '../screens/RequestScreen';
import { colors } from '../styles/GlobalStyles';

const Tab = createBottomTabNavigator();

const tabBarIcon = (route, focused, color, size) => {
  let iconSource;
  if (route.name === 'Home') {
    iconSource = focused
      ? require('../assets/active-home.png')
      : require('../assets/inactive-home.png');
  } else if (route.name === 'Calendar') {
    iconSource = focused
      ? require('../assets/active-calendar.png')
      : require('../assets/inactive-calendar.png');
  } else if (route.name === 'Request') {
    iconSource = focused
      ? require('../assets/active-request.png')
      : require('../assets/inactive-request.png');
  }
  console.log(iconSource);
  return <Image source={iconSource} />;
};
  // console.log(route);
  // return null;
  // // if else based on route, return image

const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: colors.primarySageGreen,
        tabBarLabelStyle: { fontSize: 16 },
        tabBarStyle: { marginTop: 10 },
        tabBarIcon: ({ focused, color, size }) => tabBarIcon(route, focused, color, size),
        // tabBarIcon: ({ focused, color, size }) => {
        //   let iconSource;

        //   if (route.name === 'Home') {
        //     iconSource = focused
        //       ? require('../assets/active-calendar.svg')
        //       : require('../assets/active-calendar.svg');
        //   } else iconSource = 'foo';

        //   return <Image source={iconSource} />;
        // },
      })}
    >
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Request" component={RequestScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
