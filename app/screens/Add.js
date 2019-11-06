import React, {Component} from 'react';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import { Header, Icon, Input, Button  } from 'react-native-elements';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import {apiHeader, parseURL} from '../credentials/variables';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      comment: '',
    }
  }
  componentDidMount(){
    console.log(this.props.navigation.state.params)
  }

  formatHashtags(){
    const toSupply = /\s/;
    let textToAdd = this.state.comment;
    textToAdd = textToAdd.toLowerCase();
    let textWithFormat = textToAdd.replace(/, |,/g, ' ');
    let newArray = textWithFormat.split(toSupply); 
    for (let i = 0; i < newArray.length; i++) {
      if( newArray[i].charAt(0) === '#'){
        console.log('si es un hastag')
      } else {
        newArray[i] = '#'.concat(newArray[i]);
      } 
    }
    console.log(newArray)
    let cant = 0;
    for (let i = 0; i < newArray.length; i++){
      if (this.props.navigation.state.params.item2.includes(newArray[i])){
        console.log("ya existe el elemento " + newArray[i])
      } else {
        if(newArray[i] === "#"){
          console.log("El hasgtag esta vacio")
        } else {
          console.log("agregue " + newArray[i])
          this.props.navigation.state.params.item2.push(newArray[i])
          cant += 1;
        }
      }
    }
    console.log(this.props.navigation.state.params.item2)
    this.props.navigation.state.params.item2.sort()
    console.log(this.props.navigation.state.params.item2)
    if (this.state.comment === "" || this.state.comment === " "){
      alert("You haven't added any hashtag yet")
    } else {
      this.actulizarEnServer(this.props.navigation.state.params.item2);
      alert(`You added ${cant} hashtags`);
    }
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
        <LinearGradient  colors={['#181a33', '#131529']} style={styles.linearGradient}>
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
                  />}
                centerComponent={<Text 
                  style={{color: 'white', fontFamily: 'Bebas Neue', fontSize: 20}}
                  > {this.props.navigation.state.params.item} </Text>}
            />
            <View style={{ height: 100,}}>
                <Input 
                  placeholder='Recomended: #hola,#mundo'
                  onChangeText={(comment) => this.setState({comment})}/>
            </View>
            <Button 
                title={'Add'}
                buttonStyle={{backgroundColor: 'orange', borderRadius: 10}}
                style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,}}
                onPress={() => this.formatHashtags()}
            />
            <Text> {this.state.comment} </Text>
        </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
    linearGradient: {
      flex: 1,
    },
  });