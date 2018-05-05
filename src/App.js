import React from "react";
import { Root } from "native-base";
import { StackNavigator, DrawerNavigator } from "react-navigation";

import Home from "./screens/home/";
import SplashPage from "./screens/splashscreen";

import RealHome from "./screens/realhome";
import Map from "./screens/map";

const AppNavigator = StackNavigator(
  {
    SplashPage: { screen: SplashPage },
    RealHome: { screen: RealHome },
    Map: { screen: Map }
  },
  {
    initialRouteName: "SplashPage",
    headerMode: "none",
    // mode: "modal",
		navigationOptions: {
			gesturesEnabled: true
		}
  }
);

export default () =>
  <Root>
    <AppNavigator />
  </Root>;
