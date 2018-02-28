import React, { Component } from 'react';
import { Router, Scene, Actions, ActionConst } from 'react-native-router-flux';

import LoginScreen from './LoginScreen';
import SecondScreen from './SecondScreen';

export default class Main extends Component {
  render() {
		const { navigate } = this.props.navigation;
  
	  return (
	    <LoginScreen navigation={this.props.navigation}/>
	  );
	}
}