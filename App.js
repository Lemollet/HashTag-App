import React, { Component } from 'react';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import { Button } from 'react-native-elements';
import {
  Text,
  View,
  Picker,
  Modal,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  Clipboard,
} from 'react-native';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickerSelection: 'Select Category',   //LABEL
      pickerId: 0,
      pickerDisplayed: false,               //IF PARA MOSTRAR PICKER
      pickerValue: [],                      //ARREGLO CREADO
      dataValue: [{ hashtag: ['cargando'] }], // #s
      textToCopy: '',                       //String
      selectedId: [],
    };
  }

  componentDidMount() {
    const headers = {
      'X-Parse-Application-Id': 'aVcbcdaMSITLDSmqDLKCrRr3sFRefjUpPW8p8qmJ',
    };
    axios.get('http://68.183.153.133:1919/parse/classes/IgSocial/', { headers })
      .then(res => {
        //console.log(res.data.results);
        let arraytests = [];
        res.data.results.map(e => {
          arraytests.push(e.category);
        });
        this.setState({ dataValue: res.data.results });
        this.setState({ pickerValue: arraytests });
        //console.log(this.state.pickerValue);
        //console.log(this.state.dataValue);
      })
      .catch(err => {
        console.log(err);
      });
  }

  deleteHashtags() {
    this.setState({ textToCopy: '' });
  }

  _onPress = (item, index) => {
    //console.log(index + ' ' + item);
    let prueba = this.state.textToCopy;
    if (this.state.selectedId.includes(index)) { // ELIMINA
      console.log('Ya existe');
      console.log(index);
      this.state.selectedId = this.state.selectedId.filter(item => item !== index);
      prueba = this.state.textToCopy.replace(' ' + item, '');
      //document.getElementById('boton').style.backgroundColor = 'rgba(176, 224, 230, 0.6)';
    } else {
      this.state.selectedId.push(index);      //Se agrega
      prueba = this.state.textToCopy + ' ' + item;
    }
    //console.log(this.state.selectedId)
    this.setState({ textToCopy: prueba });
  };

  funCopy() {
    Clipboard.setString(this.state.textToCopy);
    alert('¡Awesome! \n Your hashtags have been copied');
  }

  tooglePicker() {
    this.setState({
      pickerDisplayed: !this.state.pickerDisplayed,
    });
  }

  renderKeywordBoxes() {
    data = this.state.dataValue[this.state.pickerId].hashtag;
    if(this.state.pickerSelection === 'Select Category') {
      return <Text> Please Select a category </Text>
    } else {
      return data.map((e, i) => {
        return (
          <TouchableHighlight
            id='boton'
            onPress={() => this._onPress(e, i)}
            style={[
              styles.keywordBox,
              {
                backgroundColor: this.state.selectedId.includes(i)
                  ? 'rgba(176, 224, 230, 0.6)'
                  : styles.keywordBox
              },
            ]}
            key={i}
            underlayColor={'rgba(176, 224, 230, 0.6)'}>
            <Text
              style={[
                styles.keywordText,
                { color: this.state.selectedId.includes(i) ? 'black' : 'black' },]}>
              {e} </Text>
          </TouchableHighlight>
        );
      });
    }
  }

  render() {
    return (
      <LinearGradient colors={['#8AB5E8', '#C074B2', '#4c4c4c']} style={styles.linearGradient}>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
          <Text style={{ fontFamily: 'Gill Sans', fontSize: 30 }}> Hashtags </Text>
        </View>
        <View
          style={{
            height: 50,
            //backgroundColor: 'red',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingLeft: 10
          }}>
          <Button
            onPress={() => this.tooglePicker()}
            title={this.state.pickerSelection}
          >
            {' '}
          </Button>
        </View>
        <View style={{ flex: 3 }}>
          <ScrollView
            horizontal={false}
            style={styles.footerWrapperNC}
            contentContainerStyle={[styles.footerWrapper]}>
            {this.renderKeywordBoxes()}
          </ScrollView>
        </View>
        <View style={{ flex: 1, /* backgroundColor: 'blue' */ }}>
          <Text style={styles.keywordText}>{this.state.textToCopy}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Button
            icon={{
              name: 'copy',
              type: 'feather',
              color: 'white'
            }}
            title={'Copy your Hashtags'}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 20,
            }}
            onPress={() => this.funCopy()} />
          <Button
            icon={{
              name: 'format-clear',
              type: 'material',
              color: 'white'
            }}
            title={'Clear'}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              //margin: 10,
            }}
            onPress={() => this.deleteHashtags()} />
        </View>
        <Modal
          visible={this.state.pickerDisplayed}
          animationType={'slide'}
          transparent={true}>
          <View style={styles.modalitem}>
            <Picker
              style={styles.pickerStyle}
              selectedValue={this.state.pickerSelection}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({
                  pickerSelection: itemValue,
                  pickerId: itemIndex,
                })
              }>
              {this.state.pickerValue.map((e, i) => {
                /* this.setState({dataValue: data[i].hashtag}) */
                return <Picker.Item key={i} label={e} value={e} />;
              })}
            </Picker>
            <Button
              onPress={() => this.tooglePicker()}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                margin: 20,
              }}
              title={'Done'} />

          </View>
        </Modal>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  modalitem: {
    position: 'absolute',
    backgroundColor: '#C074B2',
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
    backgroundColor: '#C074B2',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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

export default App;