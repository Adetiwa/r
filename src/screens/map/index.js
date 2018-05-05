import React from "react";
import { Root } from "native-base";
import { StackNavigator, DrawerNavigator } from "react-navigation";

import SideBar from "../../screens/sidebar";
import Map from "../../screens/map/app";
import Profile from "../../screens/profile";
import CardView from "../../screens/cardinput";
import Payment from "../../screens/payment";
import Route from "../../screens/route";
import RouteSingle from "../../screens/routesingle";
import Wallet from "../../screens/wallet";
import Confirm from "../../screens/confirm";
import Ticket from "../../screens/ticket";
import TicketSingle from "../../screens/ticketSingle";
import Charter from "../../screens/charter";
import Edit from "../../screens/edit";
import Test from "../../screens/test";
import RealHome from "../../screens/realhome";




const Drawer = DrawerNavigator(
  {
    Map: { screen: Map },
    // Profile: { screen: Profile },
    // Payment: { screen: Payment }, 
    // Route: { screen: Route }, 
    // Ticket: { screen : Ticket },
    // Charter: { screen: Charter},
 },
  {
    initialRouteName: "Map",
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',

    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <SideBar {...props} />
  }
);

const AppNavigator = StackNavigator(
  {
    Drawer: { screen: Drawer },
    //Profile: { screen: Profile },
    // CardView: { screen: CardView},
    // Payment: { screen: Payment }, 
    // Route: { screen: Route }, 
    // RouteSingle: { screen: RouteSingle },
    // Wallet: { screen: Wallet },
    // Confirm: { screen : Confirm },
    // TicketSingle: { screen : TicketSingle },
    // Ticket: { screen : Ticket },
    // Test: { screen: Test},
    // Charter: { screen: Charter},
    // Edit: { screen: Edit},
    // RealHome: { screen: RealHome },

    Profile: { screen: Profile },
    Payment: { screen: Payment }, 
    Route: { screen: Route }, 
    RouteSingle: { screen: RouteSingle }, 
    Ticket: { screen : Ticket },
    Charter: { screen: Charter},
    CardView: { screen: CardView },
	Wallet: { screen: Wallet },
   
  },
  {
    initialRouteName: "Drawer",
    headerMode: "none",
    mode: "modal",
		navigationOptions: {
			gesturesEnabled: false
		}
  }
);

export default () =>
  <Root>
    <AppNavigator />
  </Root>;
