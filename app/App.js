import React, {Component} from 'react';
import appNavigator from '../app/config/appNavigator';
import {createrAppContainer, createAppContainer} from 'react-navigation';

const AppContainer = createAppContainer(appNavigator);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}