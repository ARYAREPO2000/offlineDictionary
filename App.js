import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Header } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Dictionary from './database'


export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      displayText: '',
    };
  }


  getWord=(text)=>{
    var text= text.toLowerCase()
    try {
      var word = Dictionary [text]["word"]
      var lexicalCategory = Dictionary [text]["lexicalCategory"]
      var definition =Dictionary [text]["definition"]
      this.setState({
        "word" : word,
        "lexicalCategory" : lexicalCategory,
        "definition":definition
      })
    }
      catch(err){
        alert("Sorry, this word is not available for now")
        this.setState({
          'text':'',
          'isSearchPressed': false
        })
      }
    
  }

   

  render() {
    return (
      <SafeAreaProvider>

      <View style={styles.detailsContainer}>
        <Header
          backgroundColor={'#9c8210'}
          centerComponent={{
            text: 'Online Dictionary',
            style: { color: '#fff', fontSize: 20 },
          }}
        />

        <TextInput
          style={styles.inputBox}
          onChangeText={text => {
            this.setState({ 
              text: text,
              isSearchPressed: false,
              word:"loading....",
              lexicalCategory:'',
              examples : [],
              definition:""
             });

          }}
          value={this.state.text}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            this.setState({ isSearchPressed:true });
            this.getWord(this.state.text)
          }}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>

        
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>
          Word:{""}
          </Text>
          <Text style={styles.definitionText}>
          {this.state.word}
          </Text>
        </View>

         <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>
          Type:{""}
          </Text>
          <Text style={styles.definitionText}>
          {this.state.lexicalCategory}
          </Text>
        </View>

         <View style={{flexDirection:'row', flexWrap:'wrap'}}>
          <Text style={styles.detailsTitle}>
          Definition:{""}
          </Text>
          <Text style={styles.definitionText}>
          {this.state.definition}
          </Text>
        </View>        
        
       
      </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  detailsContainer: {
    flex: 1,
    backgroundColor: '#b8b8b8',
  },
  inputBox: {
    marginTop: 200,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    outline: 'none',
  },
  searchButton: {
    width: '50%',
    height: 55,
    alignSelf: 'center',
    padding: 10,
    margin: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  displayText: {
    textAlign: 'center',
    fontSize: 30,
  },
  definitionText:{
    fontSize: 18,
  },

  detailsTitle:{
     fontSize: 20
  }
});
