import React, {Component} from 'react';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import {Button, Header, Icon, Badge} from 'react-native-elements';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  Clipboard,
  ActionSheetIOS,
} from 'react-native';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickerSelection: 'Select Category', //LABEL
      pickerId: 0,
      pickerDisplayed: false, //IF PARA MOSTRAR PICKER
      pickerValue: [], // Categories
      dataValue: [{hashtag: ['cargando']}], // #s
      textToCopy: '', //String
      selectedId: [[]],
      contadorPrueba: 0,
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
        let seletedIdArrays = [];
        res.data.results.map(e => {
          arraytests.push(e.category);
          seletedIdArrays.push([]);
        });
        arraytests.push('Add new category');
        arraytests.push('Cancel');
        this.setState({dataValue: res.data.results});
        this.setState({pickerValue: arraytests});
        this.setState({selectedId: seletedIdArrays});
        //console.log(this.state.pickerValue);
        //console.log(this.state.dataValue);
      })
      .catch(err => {
        console.log(err);
      });
  }

  deleteHashtags() {
    justForDelet=[]
    this.state.pickerValue.map(e => {
      justForDelet.push([]);
    })
    this.setState({
      textToCopy: '',
      selectedId: justForDelet, //Esto debe estar bien.
      contadorPrueba: 0,
    });
  }

  actionSheet() {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: this.state.pickerValue,
        cancelButtonIndex: this.state.pickerValue.length - 1,
      },
      buttonIndex => {
        if (buttonIndex === this.state.pickerValue.length - 1) {
          alert('Acción cancelada');
        } else if (buttonIndex === this.state.pickerValue.length - 2) {
            alert("...");
            //this.props.navigation.navigate('Hash')
        } else {
          this.setState({pickerId: buttonIndex});
          this.renderKeywordBoxes();
          this.setState({pickerSelection: this.state.pickerValue[buttonIndex]});
        }
      },
    );
  }

  renderKeywordBoxes() {
    dataDePrueba = this.state.dataValue[this.state.pickerId].hashtag;
    if (this.state.pickerId === null) {
      return <Text style={{color: 'white'}}> Please Select a category </Text>;
    } else {
      return dataDePrueba.map((e, i) => {
        return (
          <TouchableHighlight
            onPress={() => this._onPress(e, i)}
            style={[
              styles.keywordBox,
              {
                backgroundColor: this.state.selectedId[this.state.pickerId].includes(i)
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
                  color: this.state.selectedId[this.state.pickerId].includes(i)
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

  _onPress = (item, index) => {
    let prueba = this.state.textToCopy;
    if (this.state.selectedId[this.state.pickerId].includes(index)) {      // ELIMINA
      console.log('Ya existe');
      console.log(index);
      this.state.selectedId[this.state.pickerId] = this.state.selectedId[this.state.pickerId].filter(
        item => item !== index);
      prueba = this.state.textToCopy.replace(' ' + item, '');
    } else {
      this.state.selectedId[this.state.pickerId].push(index); //Se agrega
      prueba = this.state.textToCopy + ' ' + item;
    }
    //console.log(this.state.selectedId)
    this.setState({textToCopy: prueba});
    this.setState({
      contadorPrueba: this.state.selectedId[this.state.pickerId].length,
    });
  };

  funCopy() {
    if (this.state.textToCopy == '') {
      alert(' No items to copy ');
    } else {
      Clipboard.setString(this.state.textToCopy);
      alert(` Awesome \n yo have ${this.state.contadorPrueba} hashtags copied`);
    }
  }

  colorBadge() {
    if (this.state.contadorPrueba <= 24) {
      return 'success';
    } else if (this.state.contadorPrueba <= 30 && this.state.contadorPrueba > 24) {
      return 'warning';
    } else {
      return 'error';
    }
  }

  render() {
    return (
      <LinearGradient
        colors={['#181a33', '#131529']}
        style={styles.linearGradient}>
        <Header
          placement="left"
          ViewComponent={LinearGradient}
          linearGradientProps={{
            colors: ['#181a33', '#131529'],
          }}
          leftComponent={
            <Icon
              type="font-awesome"
              name="hashtag"
              color="white"
              onPress={() => this.actionSheet()}
            />
          }
          centerComponent={{
            text: this.state.pickerSelection,
            style: {color: '#ffff'},
          }}
          rightComponent={
            <Badge
              badgeStyle={{margin: 10}}
              value={this.state.contadorPrueba}
              status={this.colorBadge()}
            />
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
        <View style={{flex: 1 /* backgroundColor: 'blue' */}}>
          <Text style={styles.keywordText}>{this.state.textToCopy}</Text>
        </View>
        <View style={{flex: 1}}>
          <Button 
            title={'Add your own hashtags'}
            buttonStyle={{backgroundColor: 'orange', borderRadius: 10}}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 10, }}
            onPress={() => this.props.navigation.navigate('Add')}/>
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
              marginBottom: 10,
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

export default App;