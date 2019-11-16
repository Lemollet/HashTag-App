import React, {Component} from 'react';
import appNavigator from '../src/config/appNavigator';
import {createrAppContainer, createAppContainer} from 'react-navigation';

const AppContainer = createAppContainer(appNavigator);

// Testing push from Tony

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
} 