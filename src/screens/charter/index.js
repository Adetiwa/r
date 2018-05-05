import React, { Component } from 'react'
import {StackNavigator} from 'react-navigation'
import Charter from './charter'
  
const AppNavigator = StackNavigator(
	{
		Charter: { screen: Charter },
	},
	{
	  initialRouteName: "Charter",
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