import React, { Component } from "react";
import { StyleSheet, View, Switch,Text,Keyboard, StatusBar,Platform, Image,  TextInput, TouchableOpacity } from "react-native";


import {
	Container,
	Header,
	Title,
	Content,
	Button,
	Icon,
	List,
	ListItem,
	Left,
	Right,
	Body,
	icon,
  Separator,
  CheckBox,
} from 'native-base';


export default class Error extends Component {
    constructor(props) {
        super(props);
        this.state = {
          card_num: '',
        }
    }

    componentWillMount() {
    }

    reload() {
    }
    
 

  render() {
    return (
      <View style={styles.container}>
      {/* <TouchableOpacity>
          <Text  style = {{
                textAlign: 'center',
                fontFamily: "Montserrat",
                //color: '#FFF',
                fontSize: 15,
            }}>
              X
              </Text>
        </TouchableOpacity> */}
            <Text style = {{
                //backgroundColor: '#FFF',
                //margin: 10,
                textAlign: 'center',
                fontFamily: "Montserrat-Bold",
                //paddingLeft: 50,
                color: '#FFF',
                padding: 5,
                fontSize: 15,
            }}>
               {this.props.msg}
            </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        marginTop: 5,
        marginBottom: 5,
        flexDirection: 'row',
        
        //height: 40,
        backgroundColor: '#87D37C',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

  
  