import React from 'react';
import { createStackNavigator } from 'react-navigation';

import Routes from './routes';
import UserListScreen from './Screens/User/List';
import UserDetailsScreen from './Screens/User/Details';
import NavigationService from './Services/Navigation';

const StackNavigator = createStackNavigator({
  [Routes.USER_LIST]: UserListScreen,
  [Routes.USER_DETAILS]: UserDetailsScreen,
});

export default class AppRoot extends React.Component {
  render() {
    return <StackNavigator ref={ref => NavigationService.setTopLevelNavigator(ref)} />;
  }
}
