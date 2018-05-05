import React, { Component } from 'react'
import {StackNavigator} from 'react-navigation'
import RealHome from './realhome'
  
const AppNavigator = StackNavigator(
	{
		RealHome: { screen: RealHome },
	},
	{
	  initialRouteName: "RealHome",
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