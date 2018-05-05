import React, { Component } from 'react'
import {StackNavigator} from 'react-navigation'
import CardView from './cardview'
  
const AppNavigator = StackNavigator(
	{
		CardView: { screen: CardView },
	},
	{
	  initialRouteName: "CardView",
	  headerMode: "none",
	  mode: "modal",
		//   navigationOptions: {
		// 	//   gesturesEnabled: false
		//   }
	}
  );
  
export default class CardViewView extends Component {
 
  render() {
 
    return (
      <AppNavigator screenProps={this.props.navigation} />
    )
  }
}