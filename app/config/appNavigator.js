import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import AddScreen from '../screens/Add';
import HashScreen from '../screens/Hash';
import DeleteScreen from '../screens/DeleteCategory';


const AppNavigator = createStackNavigator({
  Hash: {
    screen: HashScreen,
    navigationOptions : {
      header: null,
    },
  },
  Add: {
    screen: AddScreen,
    navigationOptions: {
      header: null,
    },
  },
  DeleteCategory: {
    screen: DeleteScreen,
    navigationOptions: {
      header: null,
    },
  },
});


export default createAppContainer(
  createSwitchNavigator(
    {
      App: AppNavigator,
    }
  )
);