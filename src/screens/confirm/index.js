import React, { Component } from 'react'
import {StackNavigator} from 'react-navigation'
import Confirm from './confirm'
  
const AppNavigator = StackNavigator(
	{
		Confirm: { screen: Confirm },
	},
	{
	  initialRouteName: "Confirm",
	  headerMode: "none",
	//   mode: "modal",
		  navigationOptions: {
			//   gesturesEnabled: false
		  }
	}
  );
  
export default class Main extends Component {
 
  render() {
 
    return (
      <AppNavigator screenProps={this.props.navigation} />
    )
  }
}