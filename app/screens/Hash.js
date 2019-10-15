import React, {Component} from 'react';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import {
  Button,
  Header,
  Icon,
  Badge,
  Tooltip,
  Text,
} from 'react-native-elements';
import {
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
      contador: 0,
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
        arraytests.push('Cancel');
        this.setState({
          dataValue: res.data.results,
          pickerValue: arraytests,
          selectedId: seletedIdArrays,
        });
        //console.log(this.state.pickerValue);
        //console.log(this.state.dataValue);
      })
      .catch(err => {
        console.log(err);
      });
  }

  deleteHashtags() {
    justForDelete = [];
    this.state.pickerValue.map(e => {
      justForDelete.push([]);
    });
    this.setState({
      textToCopy: '',
      selectedId: justForDelete, //Esto debe estar bien.
      contador: 0,
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
    if (this.state.pickerId === null ) {
      return <Text style={{color: 'white'}}> Please Select a category </Text>;
    } else {
      return dataDePrueba.map((e, i) => {
        return (
          <TouchableHighlight
            onPress={() => this._onPress(e, i)}
            style={[
              styles.keywordBox,
              {
                backgroundColor: this.state.selectedId[
                  this.state.pickerId
                ].includes(i)
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
    let text = this.state.textToCopy;
    if (this.state.selectedId[this.state.pickerId].includes(index)) {
      // ELIMINA
      console.log('Ya existe');
      console.log(index);
      this.state.selectedId[this.state.pickerId] = this.state.selectedId[
        this.state.pickerId
      ].filter(item => item !== index);
      text = this.state.textToCopy.replace(' ' + item, '');
    } else {
      this.state.selectedId[this.state.pickerId].push(index); //Se agrega
      text = this.state.textToCopy + ' ' + item;
    }
    //console.log(this.state.selectedId)
    //let forAccountant = 0;
    //const valorArreglo = this.state.pickerValue.length - 2;
    /* for( let i=0; i <= valorArreglo; i++ ){
        forAccountant += this.state.selectedId[i].length   
    } */
    /* this.state.pickerValue.map(e => {
        forAccountant += this.state.selectedId[this.state.pickerId].length
    }) */

    this.setState({textToCopy: text});
    this.setState({
      contador:
        this.state.selectedId[0].length +
        this.state.selectedId[1].length +
        this.state.selectedId[2].length,
    });
  };

  funCopy() {
    if (this.state.textToCopy == '') {
      alert(' No items to copy ');
    } else {
      Clipboard.setString(this.state.textToCopy);
      alert(` Awesome \n yo have ${this.state.contador} hashtags copied`);
    }
  }

  colorBadge() {
    if (this.state.contador <= 24) {
      return 'success';
    } else if (
      this.state.contador <= 30 &&
      this.state.contador > 24
    ) {
      return 'warning';
    } else {
      return 'error';
    }
  }

  navigateToCategory = () => {
    const {navigate} = this.props.navigation;
    navigate({
      key: 'Add',
      routeName: 'Add',
      params: {item: this.state.pickerSelection,
               item2: dataDePrueba},
    });
  };

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
          centerComponent={
            <Text
              onPress={() => this.actionSheet()}
              style={{color: 'white', fontFamily: 'Bebas Neue', fontSize: 20}}>
              {' '}
              {this.state.pickerSelection}
            </Text>
          }
          rightComponent={
            <Tooltip
              height={100}
              width={300}
              popover={
                <Text
                  style={{justifyContent: 'center', alignContent: 'center'}}>
                  Instagram only supports 34 hashtags, be careful
                </Text>
              }>
              <Badge
                badgeStyle={{margin: 15, height: 30, width: 30}}
                value={this.state.contador}
                status={this.colorBadge()}
              />
            </Tooltip>
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
        <View style={{flex: 1, /* backgroundColor: 'blue' */}}>
          <ScrollView>
            <Text style={styles.keywordText}>{this.state.textToCopy}</Text>
          </ScrollView>
        </View>
        <View style={{flex: 1, /* backgroundColor: 'red' */}}>
          <View style={{justifyContent: "space-around", flexDirection: "row", /* backgroundColor: "white" */}}>
            <Button
              title={'Add hashtags'}
              buttonStyle={styles.styleButton}
              style={styles.buttonStyleAround}
              onPress={() => this.navigateToCategory()}
            />
            <Button
              title={'Edit category'}
              buttonStyle={styles.styleButton}
              style={styles.buttonStyleAround}
              onPress={() => this.navigateToCategory()}
            />
          </View>
          <Button
            icon={{
              name: 'copy',
              type: 'feather',
              color: 'white',
            }}
            title={'Copy your Hashtags'}
            buttonStyle={styles.styleButton}
            style={styles.buttonStyleAround}
            onPress={() => this.funCopy()}
          />
          <Button
            icon={{
              name: 'format-clear',
              type: 'material',
              color: 'white',
            }}
            buttonStyle={styles.styleButton}
            title={'Clear'}
            style={styles.buttonStyleAround}
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
  styleButton: {
    backgroundColor: 'orange', 
    borderRadius: 10,
  },
  buttonStyleAround: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  }
});

export default App;
