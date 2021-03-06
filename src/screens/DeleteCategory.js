import React, {Component} from 'react';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import {Header, Icon, Input, Button, CheckBox} from 'react-native-elements';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';
import {apiHeader, parseURL} from '../credentials/variables';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      comment: '',
      checked: [],
    };
  }
  componentDidMount() {
    console.log(this.props.navigation.state.params);
  }

  renderKeywordBoxes() {
    let originalArray = this.props.navigation.state.params.item2;
    console.log(originalArray);
    return originalArray.map((e, i) => {
      return (
        <CheckBox
          title={e}
          checked={this.state.checked[i]}
          key={i}
          onPress={() => this._onPress(e, i)}
        />
      );
    });
  }

  _onPress = (item, index) => {
    this.state.checked[index] = !this.state.checked[index];
    this.setState({checked: this.state.checked});
    console.log(this.state.checked);
  };

  deleteHastags() {
    let e = 0;
    for (let i = 0; i < this.state.checked.length; i++) {
      if ( this.state.checked[i] === true ) {
        this.props.navigation.state.params.item2.splice(e,1);
      } else {
        e += 1;
        console.log('todo bien');
      }
    }
    alert(`Your category has been updated 😃`);
    this.actulizarEnServer(this.props.navigation.state.params.item2);
    console.log(this.props.navigation.state.params.item2);
  }

  actulizarEnServer(arreglo) {
    const headers = {
      'X-Parse-Application-Id': apiHeader,
    };
    axios
      .put(
        parseURL + this.props.navigation.state.params.item3,
        {
          hashtag: arreglo,
        },
        {headers},
      )
      .then(res => {
        console.log(res.data);
        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({routeName: 'Hash'})],
        });
        this.props.navigation.dispatch(resetAction);
      })
      .catch(err => {
        alert('There was an error, try later');
        console.log(err);
        console.log(err.response.data.error);
      });
  } 

  render() {
    return (
      <LinearGradient
        colors={['#181a33', '#131529']}
        style={styles.linearGradient}>
        <Header
          ViewComponent={LinearGradient}
          linearGradientProps={{
            colors: ['#181a33', '#131529'],
          }}
          leftComponent={
            <Icon
              type="antdesign"
              name="back"
              color="white"
              onPress={() => this.props.navigation.navigate('Hash')}
            />
          }
          centerComponent={
            <Text
              style={{color: 'white', fontFamily: 'Bebas Neue', fontSize: 20}}>
              {' '}
              {this.props.navigation.state.params.item}{' '}
            </Text>
          }
        />
        <View style={{flex: 3}}>
          <ScrollView
            horizontal={false}
            style={styles.footerWrapperNC}
            contentContainerStyle={[styles.footerWrapper]}>
            {this.renderKeywordBoxes()}
          </ScrollView>
        </View>
        <View style={{flex: 1}}>
          <Button
            title={'Delete'}
            buttonStyle={{backgroundColor: 'orange', borderRadius: 10}}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}
            onPress={() => this.deleteHastags()}
          />
          <Text>{this.state.comment}</Text>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  footerWrapper: {
    //flexWrap: 'wrap',
    alignItems: 'flex-start',
    //flexDirection: 'row,
    paddingTop: 10,
  },
  footerWrapperNC: {
    flexDirection: 'column',
  },
});
