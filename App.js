import React, {Component} from 'react';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import {Button, Header, Icon} from 'react-native-elements';
import {
  Text,
  View,
  Picker,
  Modal,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  Clipboard,
  ImageBackground,
} from 'react-native';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickerSelection: 'Select Category', //LABEL
      pickerId: 0,
      pickerDisplayed: false, //IF PARA MOSTRAR PICKER
      pickerValue: [], //ARREGLO CREADO
      dataValue: [{hashtag: ['cargando']}], // #s
      textToCopy: '', //String
      selectedId: [],
    };
  }

  componentDidMount() {
    const headers = {
      'X-Parse-Application-Id': 'aVcbcdaMSITLDSmqDLKCrRr3sFRefjUpPW8p8qmJ',
    };
    axios
      .get('http://68.183.153.133:1919/parse/classes/IgSocial/', {headers})
      .then(res => {
        //console.log(res.data.results);
        let arraytests = [];
        res.data.results.map(e => {
          arraytests.push(e.category);
        });
        this.setState({dataValue: res.data.results});
        this.setState({pickerValue: arraytests});
        //console.log(this.state.pickerValue);
        //console.log(this.state.dataValue);
      })
      .catch(err => {
        console.log(err);
      });
  }

  deleteHashtags() {
    this.setState({textToCopy: '', selectedId: []});
  }

  _onPress = (item, index) => {
    //console.log(index + ' ' + item);
    let prueba = this.state.textToCopy;
    if (this.state.selectedId.includes(index)) {
      // ELIMINA
      console.log('Ya existe');
      console.log(index);
      this.state.selectedId = this.state.selectedId.filter(
        item => item !== index,
      );
      prueba = this.state.textToCopy.replace(' ' + item, '');
    } else {
      this.state.selectedId.push(index); //Se agrega
      prueba = this.state.textToCopy + ' ' + item;
    }
    //console.log(this.state.selectedId)
    this.setState({textToCopy: prueba});
  };

  funCopy() {
    if (this.state.textToCopy == '') {
      alert(' No items to copy ')
    } else {
      Clipboard.setString(this.state.textToCopy);
      alert('¡Awesome! \n Your hashtags have been copied');
    }
  }

  tooglePicker() {
    this.setState({
      pickerDisplayed: !this.state.pickerDisplayed,
      selectedId: []  

    });
  }
  
  renderKeywordBoxes() {
    data = this.state.dataValue[this.state.pickerId].hashtag;
    if (this.state.pickerSelection === 'Select Category') {
      return <Text style={{color: 'white',}}> Please Select a category </Text>;
    } else {
      if (this.state.pickerDisplayed == true) {
        return  
      } else {
        return data.map((e, i) => {
          return (
          <TouchableHighlight
            id="boton"
            onPress={() => this._onPress(e, i)}
            style={[
              styles.keywordBox,
              {
                backgroundColor: this.state.selectedId.includes(i)
                  ? 'rgba(176, 224, 230, 0.6)'
                  : 'transparent',
              },
            ]}
            key={i}
            underlayColor={'rgba(176, 224, 230, 0.6)'}>
            <Text
              style={[
                styles.keywordText,
                {
                  color: this.state.selectedId.includes(i)
                    ? '#000000'
                    : '#FFFFFF',
                },
              ]}>
              {e}
            </Text>
          </TouchableHighlight>
        );
      });
    }
    }
  }

  render() {
    return (
      <LinearGradient
        colors={['#181a33', '#131529']}
        style={styles.linearGradient}>
        <Header
          ViewComponent={LinearGradient} // Don't forget this!
          linearGradientProps={{
            colors: ['#181a33', '#131529']}}
          leftComponent={
            <Icon
            //buttonStyle={{backgroundColor: 'orange', borderRadius: 10, height:40, width: 50}}
            //title={this.state.pickerSelection}
            type= 'font-awesome'
            name='hashtag'
            color= 'white'
            onPress={() => this.tooglePicker()}/>}
          centerComponent={{text: '# App', style: {color: '#fff', fontSize: 25 }}}
          rightComponent={{icon: 'plus', color: '#fff', type: 'font-awesome' } }/>
        <View style={{flex: 3}}>
          <ScrollView
            horizontal={false}
            style={styles.footerWrapperNC}
            contentContainerStyle={[styles.footerWrapper]}>
            {this.renderKeywordBoxes()}
          </ScrollView>
        </View>
        <View style={{flex: 1 /* backgroundColor: 'blue' */}}>
          <Text style={styles.keywordText}>{this.state.textToCopy}</Text>
        </View>
        <View style={{flex: 1}}>
          <Button
            icon={{
              name: 'copy',
              type: 'feather',
              color: 'white',
            }}
            title={'Copy your Hashtags'}
            buttonStyle={{backgroundColor: 'orange', borderRadius: 10}}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 20,
            }}
            onPress={() => this.funCopy()}
          />
          <Button
            icon={{
              name: 'format-clear',
              type: 'material',
              color: 'white',
            }}
            buttonStyle={{backgroundColor: 'orange', borderRadius: 10}}
            title={'Clear'}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => this.deleteHashtags()}
          />
        </View>
        <Modal
          style={{backgroundColor: 'red'}}
          visible={this.state.pickerDisplayed}
          animationType={'slide'}
          transparent={true}>
          <View style={styles.modalitem}>
            <TouchableHighlight
              onPress={() => this.setState({pickerDisplayed: false})}
              style={{flex: 1, backgroundColor: 'transparent'}}>
              <View />
            </TouchableHighlight>

            <Picker
              style={{backgroundColor: '#3a3a51'}}
              selectedValue={this.state.pickerSelection}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({
                  pickerSelection: itemValue,
                  pickerId: itemIndex,
                })
              }>
              {this.state.pickerValue.map((e, i) => {
                return <Picker.Item key={i} label={e} value={e} />;
              })}
            </Picker>
            <View
              style={{backgroundColor: '#3a3a51', width: '100%', height: 80}}>
              <Button
                onPress={() => this.tooglePicker()}
                //onPress={() => () => this.deleteHashtags()}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 20,
                }}
                title={'Done'}
              />
            </View>
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
    //backgroundColor: '#3a3a51',
    flex: 1,
    justifyContent: 'space-around',
  },
  pickerStyle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginBottom: 50,
    backgroundColor: '#3a3a51',
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
