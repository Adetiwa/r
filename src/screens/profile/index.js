import React, { Component } from 'react'
import {StackNavigator} from 'react-navigation'
import Profile from './profile';
import RealHome from '../../screens/realhome';
  
const AppNavigator = StackNavigator(
	{
		Profile: { screen: Profile },
		RealHome: { screen: RealHome },
	},
	{
	  initialRouteName: "Profile",
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