import React, { Component } from 'react';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import { Button, Icon } from 'react-native-elements';
import { Text, View, Picker, Modal, StyleSheet, TouchableHighlight, FlatList, borderColor, ScrollView, Clipboard} from 'react-native';

export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      pickerSelection: 'Select Category',
      pickerDisplayed: false,
      pickerValue: [],
      dataValue:[], 
      textToCopy: '',
      y:[] 
    }
  }

  componentDidMount() {
    const headers = {
      'X-Parse-Application-Id': 'aVcbcdaMSITLDSmqDLKCrRr3sFRefjUpPW8p8qmJ'
    };
    axios.get('http://68.183.153.133:1919/parse/classes/IgSocial/', { headers })
      .then(res => {
        console.log(res.data.results)
        let arraytests = []
        res.data.results.map(e => {
          arraytests.push(e.category)
        })
        //this.setState({dataValue: res.data.results[0].hashtag})
        this.setState({pickerValue: arraytests})
        console.log(this.state.pickerValue)

        this.setState({y: res.data.results});
      })
      .catch(err => {
        console.log(err)
      })
    }

  deleteHashtags(){
    this.setState({textToCopy: ''})
  }

  _onPress = item => {
    let prueba = this.state.textToCopy + ' ' + item;
    this.setState({textToCopy: prueba})
  };

  funCopy(){
      Clipboard.setString(this.state.textToCopy);
      alert('¡Awesome! \n Your hashtags have been copied')
  }

  tooglePicker() {
    this.setState({
      pickerDisplayed: !this.state.pickerDisplayed,
    });
  }

  renderKeywordBoxes() {
    data = this.state.dataValue;
    return data.map((e, i) => {
      return <TouchableHighlight
        onPress={() => this._onPress(e)}
        style={styles.keywordBox}
        key={i}
        underlayColor={'rgba(176, 224, 230, 0.6)'}>
        <Text style={styles.keywordText} >{e}</Text>
      </TouchableHighlight>
    })
  }

  render() {
    const x = this.state.y;
    return (
      <LinearGradient colors={['#8AB5E8', '#C074B2']} style={styles.linearGradient}>
        <View style={{ flexDirection: 'row', justifyContent: "space-between", marginTop: 70, marginLeft: 20 }}>
          <Button onPress={() => this.tooglePicker()} title={this.state.pickerSelection} style={{ marginBottom: 20 }}> </Button>
        </View>
        <View hidden={true}>
          <ScrollView
            horizontal={false}
            style={styles.footerWrapperNC}
            contentContainerStyle={[styles.footerWrapper]}>
            {this.renderKeywordBoxes()}
          </ScrollView>
        </View>
        <View style={{ marginTop: 50 }}>
          <Text style={{ flex: 1 }} style={styles.keywordText}>{this.state.textToCopy}</Text>
        </View>
        <View >
          <Button
            Icon={{
              name: 'heartbeat',
              type: 'font-awesome'
            }}
            title={'Copy your Hashtags'}
            style={{ justifyContent: 'center', alignItems: 'center', margin: 20,}}
            onPress={() => this.funCopy()} />
            <Button
            title={'Clear'}
            style={{ justifyContent: 'center', alignItems: 'center', margin: 10, }}
            onPress={() => this.deleteHashtags()}/>
        </View>
        <Modal visible={this.state.pickerDisplayed} animationType={'slide'} transparent={true}>
          <View style={styles.modalitem}>
            <Picker
              style={styles.pickerStyle}
              selectedValue={this.state.pickerSelection}
              onValueChange={(itemValue, itemIndex) => this.setState({ pickerSelection: itemValue })}>
              {this.state.pickerValue.map((e, i) => {
                /* this.setState({dataValue: data[i].hashtag}) */
                return <Picker.Item key={i} label={e} value={e} />
              })}
            </Picker>
            <Button
              onPress={() => this.tooglePicker()}
              style={{ justifyContent: 'center', alignItems: 'center', margin: 20 }}
              title={'Done'} />
          </View>
        </Modal>
      </LinearGradient>
    );
  };
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  modalitem: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  pickerStyle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginBottom: 50,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  keywordText: {
    fontFamily: 'Bebas Neue',
    fontSize: 18,
    padding: 6,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 1.5,
    textAlign: 'center'
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
  },
  footerWrapperNC: {
    flexDirection: 'column',
  },
});

export default App;