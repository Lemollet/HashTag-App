import React, {Component} from 'react';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import { Header, Icon, Input, Button  } from 'react-native-elements';
import { StyleSheet, Text, View, StackActions} from 'react-native';

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


  makeAPromise() {
    return new Promise((resolve, reject)=> {
      resolve(this.formatHashtags())
    })
    .then(res => {
      //console.log(this.props.navigation.state.params.item2);
      alert('your hashtags have been successfully added')
    })
    .catch(err => alert('There was an error, try later'))
  }


  formatHashtags(){
    const toSupply = /\s/;
    let textToAdd = this.state.comment;
    let textWithFormat = textToAdd.replace(/, |,|. /g, ' ');
    //console.log(textWithFormat)
    let newArray = textWithFormat.split(toSupply); 
    //console.log(newArray)
    for (let i = 0; i < newArray.length; i++) {
      if( newArray[i].charAt(0) === '#'){
        console.log('si es un hastag')
      } else {
        newArray[i] = '#'.concat(newArray[i]);
      } 
    }
    console.log(newArray)
    for (let i = 0; i < newArray.length; i++){
      if (this.props.navigation.state.params.item2.includes(newArray[i])){
        console.log("ya existe el elemento " + newArray[i])
      } else {
        console.log("agregue " + newArray[i])
        this.props.navigation.state.params.item2.push(newArray[i])
      }
    }
    console.log(this.props.navigation.state.params.item2)
    this.props.navigation.state.params.item2.sort()
    console.log(this.props.navigation.state.params.item2)
    //this.actulizarEnServer(this.props.navigation.state.params.item2);

    /* const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: 'Hash'})],
    });
    this.props.navigation.dispatch(resetAction); */
  }

  actulizarEnServer(arreglo) {
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
      })
      .catch(err => {
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
                onPress={() => this.makeAPromise()}
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