import React, { Component } from 'react'
import {StackNavigator} from 'react-navigation'
import RouteSingle from './routesingle'
import CardView from "../../screens/cardinput";
import Ticket from "../../screens/ticket";
  
const AppNavigator = StackNavigator(
	{
		RouteSingle: { screen: RouteSingle },
    CardView: { screen: CardView },
    Ticket: {screen: Ticket}
	},
	{
	  initialRouteName: "RouteSingle",
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