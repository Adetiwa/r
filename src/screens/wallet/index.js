import React, { Component } from 'react'
import {StackNavigator} from 'react-navigation'
import Wallet from './wallet';
import CardView from '../../screens/cardinput';
  
const AppNavigator = StackNavigator(
	{
        Wallet: { screen: Wallet },
        CardView: { screen: CardView }
	},
	{
	  initialRouteName: "Wallet",
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