import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Header, Icon, Input, Button  } from 'react-native-elements';
import { StyleSheet, Text, View, ScrollView} from 'react-native';

export default class App extends Component {
  constructor() {
    super();
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
                centerComponent={{ text: 'Add your hashtags', style: { color: '#fff' } }}
            />
            <View>
                <Input placeholder='Recomended: #hola, #mundo'/>
            </View>
            <Button 
                title={'Add'}
                buttonStyle={{backgroundColor: 'orange', borderRadius: 10}}
                style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,}}
            />
        </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
    linearGradient: {
      flex: 1,
    },
    keywordText: {
      fontFamily: 'Bebas Neue',
      fontSize: 18,
      padding: 6,
      fontWeight: 'bold',
      color: 'white',
      letterSpacing: 1.5,
      textAlign: 'center',
    },
    keywordBox: {
      backgroundColor: 'transparent',
      margin: 3,
      borderColor: 'rgba(176,224,230, 0.6)',
      borderWidth: 1,
    },
    footerWrapper: {
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      flexDirection: 'row',
      paddingTop: 10,
    },
    footerWrapperNC: {
      flexDirection: 'column',
    },
  });


    {/* <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Button
          title="Go to Hash"
          onPress={() => this.props.navigation.navigate('Hash')}
        />
      </View> */}