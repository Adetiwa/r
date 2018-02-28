import React, { Component } from 'react';
import { View, Image, NetInfo,  Dimensions, Animated, PermissionsAndroid,
  Platform, TextInput,
  
  AsyncStorage,Easing, StatusBar, StyleSheet, Text, TouchableWithoutFeedback, TouchableOpacity} from "react-native";

  import { connect } from 'react-redux';

import { ProgressDialog } from 'react-native-simple-dialogs';
import SnackBar from 'react-native-snackbar-component';
import Modal from "react-native-modal";
import moment from 'moment';
//import moment from 'moment-business-days';
import business from 'moment-business';

import Interactable from 'react-native-interactable';

import {  destinationChanged,
  select_vehicle,
  hoverondesc,
  getCurrentLocation,
  get_name_of_loc,
  update_region,
  get_wallet_info,
  fetchPrice,
  getNearByRoutes,
  getDistance,
  getRoute,
  calculatePrice,
  StorePrice,
  StoreKm,
  charge_method,
  StoreHr,
  getCard,
  saveScreenShot,
  getStaticImage,
  setDate,
  getNewMatch,
  setEmergency,
  change_type,from_where,
  onPayment,
  onChangeToken,
  network_change,
  getNewByDriver,
  shownOLU,
  setLongitude,
  setLatitude,
  getMyRoutes,
  myroutes,
  my_route_selected,
} from '../../actions/Map';

import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Left,
  Right,
  Body,
  List,
  Tabs,
  Tab,
  ListItem
} from "native-base";
import {Select, Option} from "react-native-chooser";

import * as firebase from "firebase";

import isEqual from 'lodash/isEqual';

import TabOne from "./tabOne";
import TabTwo from "./tabTwo";
import TabThree from "./tabThree";


const STORAGE_KEY = "user_access_token";
var { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

// (Initial Static Location) Lagos Island
const LATITUDE = 6.4549;
const LONGITUDE = 3.4246;

const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const USER_TOKEN = "user_token";

const connector = null;


const Screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height - 75
}

isMounted = false;

class Confirm extends Component {
    constructor(props) {
        super(props);
        this.state = {
          amount: '',
          pin: '',
          num_error: false,
          pin_error: false,
          showText: '',
          loading: false,
          show_otp: false,
          otp: '',
          transaction_reference: '',
          route_id: null,
          selected_cost: 0,
          subscribe: false,
          showModal: false,
          rovawallet: false,
          promocode: '',
          ticketID: '',
          startDay: null,
          charge_type: '',
          selected_type: '',
          expiry_date: null,
        }
    }
    handleCardNumber(input) {
        this.setState({promocode: input});
    }

    componentWillMount() {
        var chose = this.props.navigation.state.params.route_id;
        var froom = this.props.navigation.state.params.from;
        var selected_cost = this.props.navigation.state.params.selected_cost;
        var startDay = this.props.navigation.state.params.startDay;
        var charge_type = this.props.navigation.state.params.charge_type;
        var selected_type = this.props.navigation.state.params.selected_type;
        
        this.setState({route_id: chose});
        this.setState({amount: selected_cost});
        this.setState({selected_cost: selected_cost});
        
        this.setState({startDay: startDay});
        this.setState({charge_type: this.props.charge_type});
        this.setState({selected_type: selected_type});

        if (froom == 'all') {
            var a = this.props.routes;
        } else {
            //some other shits
            var a = this.props.routes;
        }
        
        var aFiltered = a.filter(function(elem, index){
        return elem.route_id == chose;
        });
        thissingle = aFiltered;

        this.genTicketID();

     //   this.getExpiry(add);

    
    }

    componentDidMount() {
        if (!this.props.card_exist){
            this.props.navigation.navigate('CardView', { from: 'wallet' });
        }
        this.addWeekdays(this.state.startDay, 5);


        if (this.state.selected_type == 'one_way') {
            add = 1;
        } else if (this.state.selected_type == 'day') {
            add = 1;
        } else if (this.state.selected_type == 'week') {
            add = 5;
        } else if (this.state.selected_type == 'month') {
            add = 20;
        }
        //this.setState({expiry_date: moment(this.state.startDay, 'DD-MM-YYYY').businessAdd(3)._d});
        //this.setState({expiry_date: business.addWeekDays( moment(this.state.startDay).format("YYYY-MM-DD"), 3 )});
        this.addWeekdays(this.state.startDay, add);
      
    }
    
    genTicketID() {
        var id = this.props.user.fullname.substring(0,3).toUpperCase() +' '+ this.makeid(4)+ ' '+this.makeid(5) +' '+this.makeid(4)
        this.setState({ticketID: id});
    }
    getTheFuck() {
        var froom = this.state.from;
        if (froom === "payment") {
            this.props.navigation.navigate('Payment');

        }  else {
            this.props.navigation.navigate('Map');

        }
    }



addWeekdays(date, days) {
    // date = moment(date).format("YYYY-MM-DD"); // clone
    //console.log('start date is '+this.state.startDay);
    
    //date = moment(this.state.startDay, 'DD/MM/YYYY').format('YYYY-MM-DD');
    date = moment(this.state.startDay,'YYYY-MM-DD').format('YYYY-MM-DD[T]HH:mm:ss')
    while (days > 0) {
        date = moment(date).add(1, 'day');
        // decrease "days" only if it's a weekday.
        if (date.isoWeekday() !== 6 && date.isoWeekday() !== 7) {
            days -= 1;
        }
    }
       // console.log(date.format("YYYY-MM-DD"));
        this.setState({expiry_date: date.format("YYYY-MM-DD")});
     
    }

    
makeid(len) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
    for (var i = 0; i < len; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    
    return text;
}
      
   validateTransaction () {
        this.setState({show: false});
        this.setState({showText: ""});
        if (this.state.amount == 0 || this.state.transaction_reference == '') {
          this.setState({show: true});
          this.setState({showText: "missing data!"});
        }  else {
            //run code 
            this.finanlize(this.state.otp, this.state.transaction_reference);
        }
    }

    
    async enter(route) {
        Keyboard.dismiss();
        this.setState({ loading: true });
                
        fetch('https://admin.rova.com.ng/api2/accept-payment', {
          
                method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    route: route,
                    user: this.props.user.userid,
                    coupon: this.state.promocode,
                    method: this.state.charge_type,
                    subscribe: this.state.subscribe,
                    amount_original: this.state.amount,
                    amount_paid: this.state.selected_cost,
                    type: this.state.selected_type,
                    date_active: this.state.startDay,
                    date_expire: this.state.expiry_date,
                    ticketID: this.state.ticketID
                  })
                })
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({ loading: false });
                    if (responseJson.status !== 'null') {
                        this.props.getMyRoutes(responseJson);
              
                        this.props.navigation.navigate('Ticket');
                    } else {
                        alert(response.status_msg);
                    }
                    console.log("responseJson is "+JSON.stringify(responseJson));
                  
                //   this.props.getMyRoutes(responseJson);
                //   this.setState({ loading: false });
                //   let status = responseJson.status;
                //   if (status === 'success') {
                //       //this.props.hahaCard(responseJson);
                //      //   this.getTheFuck();
                //   } else {
                //     this.setState({ loading: false });
                //     this.setState({show: true});
                //     this.setState({showText: responseJson.msg});
                    
                //   }
          
                })
                .catch((error) => {
                  this.setState({ loading: false });
                  //this.err
                  console.log(error);
                  
              })
        //this.props.clearEverything();
      }

      onToggleSHit() {
        if (this.state.subscribe) {
          this.setState({subscribe: false});
        } else {
          this.setState({subscribe: true});
        }
      }


      onToggleSH() {
        if (this.state.rovawallet) {
          this.setState({rovawallet: false});
        } else {
          this.setState({rovawallet: true});
        }
      }

    


  render() {
    return (
        <View style={styles.container}>
        
        <Header style = {{borderBottomColor: "#22313F", borderBottomWidth: 1, backgroundColor: "#22313F"}} >
            <Left>
                <TouchableOpacity
                        transparent onPress={() => this.props.navigation.navigate('RouteSingle', { route_id: this.state.route_id })}>
                <Icon style = {{color : "#FFF", fontSize: 40, fontFamily: 'Montserrat'}}  size = {40} name={"close"} />
                </TouchableOpacity>

            </Left>

            <Body>
            <Title style = {{color: '#FFF', fontWeight: '100',fontFamily: 'Montserrat',
									}}>Confirm</Title>

            </Body>
            <Right>
            <TouchableOpacity
            style = {{
              borderWidth: 1,
              borderColor: "#22313F",
              backgroundColor: '#FFF',
              borderRadius: 4,
              padding: 5,
            }}>
            
              <Text style = {{fontFamily: 'Montserrat-Regular',  color: '#22313F',  }}
                >{this.props.wallet_nice}</Text></TouchableOpacity>
          </Right>
        </Header>


        <View style={styles.body}>
          {this.renderContent()}
        </View>

      </View>
    );
  }

  renderContent() {
    return (
      <View style={styles.container}>


        <View style={styles.panelContainer} pointerEvents={'box-none'}>
       
              
          <Animated.View
            pointerEvents={'box-none'}
            style={[styles.panelContainer, {
            backgroundColor: 'black',
            opacity: this._deltaY.interpolate({
              inputRange: [0, Screen.height-100],
              outputRange: [0.5, 0],
              extrapolateRight: 'clamp'
            })
          }]} />



          <Interactable.View
            ref = 'autoView'
            verticalOnly={true}
            snapPoints={[{y: 40}, {y: Screen.height-300}, {y: Screen.height-100}]}
            boundaries={{top: -300}}
            initialPosition={{y: Screen.height-100}}
            animatedValueY={this._deltaY}>
            <View style={styles.panel}>
              <View style={styles.panelHeader}>
                <View style={styles.panelHandle} />
              </View>
              <Text style={styles.panelTitle}>Route Image</Text>
              </View>
          </Interactable.View>
        </View>
          
				<SnackBar visible={!this.props.network_connected} textMessage="Network Unavailable!"/>
            <ProgressDialog 
				visible={(this.props.getting_wallet || this.state.getting_route) && this.props.network_connected} 
				message="Please, wait..."
				/>
      </View>
            
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: 'white',
  },
  header: {
    height: 75,
    paddingTop: 22,
    paddingLeft: 20,
    flexDirection: 'row',
    backgroundColor: '#5894f3',
    alignItems: 'center',
    zIndex: 1001
  },
  body: {
    flex: 1,
    zIndex: 1000
  },
  menuContainer: {
    flex: 1,
    paddingTop: 30,
    paddingLeft: 40,
    backgroundColor: '#223f6b'
  },
  menuIcon: {
    width: 30,
    height: 30
  },
  headerTitle: {
    marginLeft: 30,
    color: 'white',
    fontSize: 20
  },
  button: {
    color: '#e0e0e0',
    fontSize: 20,
    marginBottom: 24
  },
  button2: {
    color: '#F09B95',
    fontSize: 20,
    marginBottom: 24
  },
  panelContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  panel: {
    height: Screen.height + 300,
    padding: 20,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
    shadowOpacity: 0.4
  },
  panelHeader: {
    alignItems: 'center'
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
    fontFamily: 'Montserrat-Regular'
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10
  },
  panelButton: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#318bfb',
    alignItems: 'center',
    marginVertical: 10
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white'
  },
  photo: {
    width: Screen.width-40,
    height: 225,
    marginTop: 30
  },
  map: {
    height: Screen.height,
    width: Screen.width
  }
});

const mapStateToProps = ({ map }) => {
  const { destination, hoveron,
    pickup, vehicle,
    latitude,
    type,
    longitude,
    latitudeDelta,
    route,
    estimated_price,
    longitudeDelta,
    error, region,prices,charge_type,
    no_new_match,
    distanceInKM,
    card_exist,
    scheduled,
    match_alert, 
    distance_error,
    network_connected,
    getting_distance,
    fetching_prices,
    fetch_error,fcm_token,
    running,
    getting_wallet,
    distanceInHR,
    nearbydriver,
    shown,
    locationGotten,
    myroutes,
    payment,
    getting_route,
    driversGotten,
    nearest_selected,
    wallet,
    wallet_nice,
    nearest_route_single,
    walletRan,
    my_selected,
    my_route_single,
    nearbyroutes,
    user, dropoff_coords,loading,emergency,route_set, raw, status } = map;
  return {
    destination,
    pickup,
    vehicle,
    error,
    hoveron,
    loading,
    route,
    region,
    nearest_selected,
    nearest_route_single,
    user,
    status,
    latitude,getting_route,
    longitude,
    getting_wallet,
    wallet,
    wallet_nice,
    dropoff_coords,
    latitudeDelta,fcm_token,
    longitudeDelta,
    estimated_price,
    emergency,route_set,
    type,
    distanceInKM,
    scheduled,
    distanceInHR,
    prices,
    match_alert,
    network_connected,
    charge_type,
    raw,
    no_new_match,
    card_exist,
    distance_error,
    getting_distance,
    fetching_prices,
    fetch_error,
    nearbydriver,
    locationGotten,
    driversGotten,
    myroutes,
    running,
    walletRan,
    shown,
    my_selected,
    my_route_single,
    payment,
    nearbyroutes,
  };
};

export default connect(mapStateToProps, {
  destinationChanged,
  getCurrentLocation,
  hoverondesc,
  select_vehicle,
  get_name_of_loc,
  update_region,
  fetchPrice,
  getDistance,
  getRoute,
  calculatePrice,
  StorePrice,
  getCard,
  setDate,
  network_change,
  StoreKm,
  saveScreenShot,
  charge_method,
  StoreHr,
  getStaticImage,
  getNewMatch,
  setEmergency,from_where,
  change_type,
  onChangeToken,
  onPayment,
  getNewByDriver,
  shownOLU, get_wallet_info,
  setLongitude,
  setLatitude,
  getMyRoutes,
  my_route_selected,
  getNearByRoutes,
})(Confirm);
