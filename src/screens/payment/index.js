import React, { Component } from 'react'
import {StackNavigator} from 'react-navigation'
import Payment from './payment'
import CardView from "../../screens/cardinput";
import Wallet from "../../screens/wallet"; 
  
const AppNavigator = StackNavigator(
	{
		Payment: { screen: Payment },
		CardView: { screen: CardView },
		Wallet: { screen: Wallet },
	},
	{
	  initialRouteName: "Payment",
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