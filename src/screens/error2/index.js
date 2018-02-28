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


export default class Error2 extends Component {
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
     
            <Text style = {{
                textAlign: 'center',
                fontFamily: "Montserrat",
                //paddingLeft: 50,
                color: '#FFF',
                paddingTop: 5,
                paddingBottom: 5,
                paddingRight: 10,
                paddingLeft: 10,
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
        marginTop: 35,
        marginBottom: 5,
        flexDirection: 'row',
        
        //height: 40,
        backgroundColor: '#F05959',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

  
  