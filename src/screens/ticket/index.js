import React, { Component } from 'react'
import {StackNavigator} from 'react-navigation'
import Ticket from './ticket'
import Edit from '../../screens/edit'
  
const AppNavigator = StackNavigator(
	{
		Ticket: { screen: Ticket },
		Edit: { screen: Edit }
	},
	{
	  initialRouteName: "Ticket",
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