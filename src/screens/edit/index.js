import React, { Component } from 'react'
import {StackNavigator} from 'react-navigation'
import Edit from './edit'
  
const AppNavigator = StackNavigator(
	{
		Edit: { screen: Edit },
	},
	{
	  initialRouteName: "Edit",
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