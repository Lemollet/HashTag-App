import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Header, Icon, Input, Button  } from 'react-native-elements';
import { StyleSheet, Text, View, ScrollView, TextInput} from 'react-native';

export default class App extends Component {
  constructor() {
    super();
    this.state={
      comment: ""
    }
  }
  componentDidMount(){
    console.log(this.props.navigation.state.params)
  }

  formatHashtags(){
    const toSupply = /\s/;
    let textToAdd = this.state.comment.split(toSupply);
    textToAdd.sort();
    console.log(textToAdd)
    Array.prototype.push.apply(this.props.navigation.state.params.item2, textToAdd);
    console.log(this.props.navigation.state.params.item2)
    this.props.navigation.state.params.item2.sort()

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