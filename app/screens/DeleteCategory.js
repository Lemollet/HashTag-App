import React, {Component} from 'react';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import {Header, Icon, Input, Button, CheckBox} from 'react-native-elements';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      comment: '',
      arrayDelete: [],
      checked: [],
    };
  }
  componentDidMount() {
    console.log(this.props.navigation.state.params);
  }

  renderKeywordBoxes() {
    const originalArray = this.props.navigation.state.params.item2;
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
    //this.setState({checked: !this.state.checked});
    console.log(this.state.checked);
    this.state.checked[index] = !this.state.checked[index];
    this.setState({checked: this.state.checked});
    this.state.arrayDelete.push(item);
    console.log(this.state.arrayDelete);
  };

  deleteHastags() {
    console.log(this.state.arrayDelete);
    for (let i = 0; i < this.state.arrayDelete.length; i++) {
      if (
        this.props.navigation.state.params.item2.includes(
          this.state.arrayDelete[i],
        )
      ) {
        this.props.navigation.state.params.item2 = this.arrayRemove(
          this.props.navigation.state.params.item2,
          this.state.arrayDelete[i],
        );
        console.log(this.state.arrayDelete[i]);
      } else {
        console.log('todo bien');
      }
    }
    alert(`Your category has been updated 😃`);
    console.log(this.props.navigation.state.params.item2);
  }

  arrayRemove = (arr, value) => {
    return arr.filter(ele => {
      return ele != value;
    });
  };

  /* actulizarEnServer(arreglo) {
    const headers = {
      'X-Parse-Application-Id': 'aVcbcdaMSITLDSmqDLKCrRr3sFRefjUpPW8p8qmJ',
    };
    axios
      .put(
        'http://68.183.153.133:1919/parse/classes/IgSocial/' + this.props.navigation.state.params.item3,
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
        //alert('you added hashtags'+ newArray.length)
      })
      .catch(err => {
        alert('There was an error, try later');
        console.log(err);
        console.log(err.response.data.error);
      });
  } */

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
    //flexDirection: 'row',
    paddingTop: 10,
  },
  footerWrapperNC: {
    flexDirection: 'column',
  },
});
