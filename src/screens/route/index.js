import React, { Component } from 'react'
import {StackNavigator} from 'react-navigation'
import Route from './route'
import RouteSingle from '../../screens/routesingle'
  
const AppNavigator = StackNavigator(
	{
		Route: { screen: Route },
		RouteSingle: { screen: RouteSingle },
	},
	{
	  initialRouteName: "Route",
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