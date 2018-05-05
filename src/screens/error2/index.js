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
                fontFamily: "Montserrat-Regular",
                //height: 40,
                color: '#FFF',
                paddingTop: 5,
                paddingBottom: 5,
                fontSize: 18,
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                alignSelf: 'center',
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
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#F09B95',
        
        //height: 40,
        backgroundColor: '#F09B95',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

  
  