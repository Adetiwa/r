import React, { Component } from 'react';
import { View, Image, NetInfo,  Dimensions, Animated, PermissionsAndroid,
  Platform, TextInput,  BackHandler, BackAndroid, 
  AsyncStorage,Easing, StatusBar, StyleSheet, Text, TouchableWithoutFeedback, TouchableOpacity} from "react-native";

  import { connect } from 'react-redux';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';

import { ProgressDialog } from 'react-native-simple-dialogs';
import SnackBar from 'react-native-snackbar-component';
import Communications from 'react-native-communications';

import Modal from "react-native-modal";

import Ticket from './ticket';
import StatusBarAlert from 'react-native-statusbar-alert';

import Interactable from 'react-native-interactable';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import AwesomeAlert from 'react-native-awesome-alerts';
import Loader from "../../components/loader";
 
import {  destinationChanged,
  select_vehicle,
  set_active_bus_info,
  hoverondesc, all_route,
  set_active_bus,
  getCurrentLocation,
  resetNetwork,
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

drivers = [];

class Map extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    
    this._deltaY = new Animated.Value(Screen.height-100);
    this.state = {

      region: {
      latitude: this.props.locationGotten ? this.props.latitude : LATITUDE,
      longitude: this.props.locationGotten ? this.props.longitude : LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
    currentpickuplng: null,
    currentpickuplat: null,
    currentdropofflat: null,
    currentdropofflng: null,
    getting_route: false,
    changed: false,
    newlat: null,
    newlng: null,
    active_bus: 0,
    showAlert: false,
    openLoader: this.props.getting_route || this.props.getting_wallet || !this.props.network_connected,
    isLoading: this.props.getting_wallet || this.props.getting_route,
    msg: !this.props.network_connected && 'Network Unavailable'   
  }
}


 showAlert = () => {
    this.setState({
      showAlert: true
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };

retVal() {
  if (this.props.nearest_selected && this.props.nearest_route_single !== null) {
    return 570;
  } else {
    return 100;
  }
}

getName(t) {
  if (t== 'one_way') {
      return 'One Way';
  } else if (t== 'day') {
      return 'Daily';
  }  else if (t== 'week') {
      return 'Weekly';
  }  else if (t== 'month') {
      return 'Monthly';
  }
}

  async componentWillMount() {

    ///this.props.from_where(false);
    
    /*NetInfo.isConnected.addEventListener('change', this.handleConnectionChange);

    NetInfo.isConnected.fetch().done(
      (isConnected) => {  this.props.network_change(isConnected); }
    );*/
    //AIzaSyDazSY71rPfUy_eOP_p_6PWPhYX2HLzajQ

    const user = await AsyncStorage.getItem(USER_TOKEN);
    if (user !== null) {
    } else {
      try {
          await AsyncStorage.setItem(USER_TOKEN, JSON.stringify(this.props.user));
      } catch (error) {
      }
    }
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  
  }
  
  async  reload() {
    this.props.resetNetwork();
    if (!this.props.card_exist) {
      this.props.getCard(this.props.user.userid);
    }
    if (!this.props.routes) {
      this.props.all_route();
		}
    if (!this.props.walletRan) {
      this.props.get_wallet_info(this.props.user.userid);
    }
    //const response = await this.props.getMyRoutes(this.props.user.userid);
    if(!this.props.route_set){
      this.runroute(this.props.user.userid);
    }
     /* New Location Code */

     navigator.geolocation.getCurrentPosition(
      (position) => {
        //console.log("This is the location Gotten!!! "+JSON.stringify(position));
        a = position;
        this.props.setLatitude(parseFloat(position.coords.latitude));
        this.props.setLongitude(parseFloat(position.coords.longitude));
        let angle = position.coords.heading;

        if (isMounted) {
          this.setState({angle: angle})
        }
        this.props.getNearByRoutes(position.coords.latitude, position.coords.longitude);
      },
      (error) => console.log(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition(
      (position) => {
       // a = position;
       let angle = position.coords.heading;

       this.props.setLatitude(parseFloat(position.coords.latitude));
       this.props.setLongitude(parseFloat(position.coords.longitude));
       if (isMounted) {
        this.setState({angle: angle})
      }

   })


     
     if (this.props.fcm_token === null) {
      try{
        let result = await FCM.requestPermissions({badge: false, sound: true, alert: true});
      } catch(e){
        console.error(e);
      }
      

     FCM.getFCMToken().then(token => {
       console.log("TOKEN (getFCMToken)", token);
       if(token !== '') {
        this.props.onChangeToken(this.props.user.userid, token, Platform.OS);
       }
     });
    }

     if(Platform.OS === 'ios'){
       FCM.getAPNSToken().then(token => {
         console.log("APNS TOKEN (getFCMToken)", token);
       });
     }

     FCM.getInitialNotification().then(notif => {
       console.log("INITIAL NOTIFICATION", notif);
       /*FCM.presentLocalNotification({
         vibrate: 500,
         title: 'Welcome Back',
         body: 'Test Notification',
         big_text: 'i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large, i am large',
         priority: "high",
         sound: "bell.mp3",
         large_icon: "https://image.freepik.com/free-icon/small-boy-cartoon_318-38077.jpg",
         show_in_foreground: true
       });*/
     });

     this.notificationListener = FCM.on(FCMEvent.Notification, notif => {
       console.log("Notification", notif);
        if (Platform.OS !== 'ios') {
          FCM.presentLocalNotification({
            vibrate: 500,
            title: notif.header,
            body: notif.message,
            big_text: notif.longmessage,
            priority: "high",
            sound: "bell.mp3",
            large_icon: "ic_launcher",                           // Android only
            icon: "ic_launcher",
            click_action: "ACTION",                             // as FCM payload
          // badge: 10,                                          // as FCM payload IOS only, set 0 to clear badges
          // number: 10,                                         // Android only
          ///ticker: "My Notification Ticker",
          // large_icon: "https://image.freepik.com/free-icon/small-boy-cartoon_318-38077.jpg",
           show_in_foreground: true
          });
        }
        
       if(notif.local_notification){
        if (Platform.OS === 'ios') {
          FCM.presentLocalNotification({
          vibrate: 500,
          title: notif.header,
          body: notif.message,
          big_text: notif.longmessage,
          priority: "high",
          sound: "bell.mp3",
          large_icon: "ic_launcher",                           // Android only
          icon: "ic_launcher",
          click_action: "ACTION",                             // as FCM payload
        // badge: 10,                                          // as FCM payload IOS only, set 0 to clear badges
        // number: 10,                                         // Android only
        ///ticker: "My Notification Ticker",
        // large_icon: "https://image.freepik.com/free-icon/small-boy-cartoon_318-38077.jpg",
         // show_in_foreground: true
        });
      }
         return;
       }
       if(notif.opened_from_tray){
         return;
       }

       if(Platform.OS ==='ios'){
               //optional
               //iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see the above documentation link.
               //This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
               //notif._notificationType is available for iOS platfrom
               switch(notif._notificationType){
                 case NotificationType.Remote:
                   notif.finish(RemoteNotificationResult.NewData) //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
                   break;
                 case NotificationType.NotificationResponse:
                   notif.finish();
                   break;
                 case NotificationType.WillPresent:
                   notif.finish(WillPresentNotificationResult.All) //other types available: WillPresentNotificationResult.None
                   break;
               }
       }

       this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, token => {
         console.log("TOKEN (refreshUnsubscribe)", token);
         if(token !== '') {
          this.props.onChangeToken(this.props.user.userid, token, Platform.OS);
          }
       });

       // direct channel related methods are ios only
       // directly channel is truned off in iOS by default, this method enables it
       FCM.enableDirectChannel();
       this.channelConnectionListener = FCM.on(FCMEvent.DirectChannelConnectionChanged, (data) => {
         console.log('direct channel connected' + data);
       });
       setTimeout(function() {
         FCM.isDirectChannelEstablished().then(d => console.log(d));
       }, 1000);
     })

    
      if (this.props.nearbyroutes === null && this.props.locationGotten) {
        //this.props.getNearByRoutes(this.props.latitude, this.props.longitude);
      }

       if (!firebase.apps.length) {
          firebase.initializeApp({
            apiKey: "AIzaSyBvtGfwzUrkiS33-zkkycehC-2sjTYsEIs",
            authDomain: "rova-41d3f.firebaseio.com",
            databaseURL: "https://rova-41d3f.firebaseio.com",
            projectId: "rova-41d3f",
            storageBucket: "rova-41d3f.appspot.com",
            messagingSenderId: "425840534264"
          })
        }

      let q = firebase.database().ref('drivers');
      q.on('value', snapshot => {
        let result = snapshot.val();
        if (result !== null) {
          drivers = this.snapshotToArray(snapshot);
      }
     });


    //  this._interval = setInterval(() => {
    //   this.reUpdateEveryThing();
    //   this.sortoutthing();
    // }, 1000);
  }


  snapshotToArray(snapshot) {
    var returnArr = [];
    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;
        //console.log("Item screenshot is "+JSON.stringify(item)+ " and key is "+item.key )
        if (this.props.active_bus !== 0 && (item.bus_id == this.props.active_bus)) {
            this.props.set_active_bus_info(item);
            returnArr.push(item);
        } 
    }.bind(this));
    return returnArr;
};


  async componentWillReceiveProps() {
  if (this.props.myroutes !== null && this.props.active_bus == 0) {
        for (var i = 0; i < this.props.myroutes.length; i++) {
          if (this.props.myroutes[i].payment_status == 'active' && this.props.myroutes[i].current_bus != 0) {
              var buss = this.props.myroutes[i].current_bus;
              this.props.set_active_bus(buss);
              return;
          }
        }
      }
  }




  getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    var num = Math.round(d * 100) / 100
    return num;
  }
  
  deg2rad(deg) {
    return deg * (Math.PI/180)
  }



  close(e) {
    e.preventDefault()
    this.setState({
      openLoader: false,
      msg: false
    });
  }



  async runroute(id) {
    this.setState({ getting_route: true });
    this.setState({ openLoader: true });
    this.setState({ isLoading: true });
    
    fetch('https://admin.rova.com.ng/api2/get-route', {
            method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                id: id,
              })
            })
            .then((response) => response.json())
            .then((responseJson) => {
              this.setState({ getting_route: false });
              this.setState({ openLoader: false });
              this.setState({ isLoading: false });
              this.props.getMyRoutes(responseJson);
              if (responseJson.length !== 0) {
                var pickup = responseJson[0].pickup;
                var dropoff = responseJson[0].dropoff;
                var waypoints = responseJson[0].stops.map((point) => {
                  return point.stop;
                }).join("|");
                this.setState({currentpickuplat: responseJson[0].pickup_coords_lat});
                this.setState({currentpickuplng: responseJson[0].pickup_coords_lng});
                this.setState({currentdropofflat: responseJson[0].dropoff_coords_lng});
                this.setState({currentdropofflng: responseJson[0].dropoff_coords_lat});
                this.props.getRoute(pickup, dropoff, waypoints);
               }
            })
            .catch((error) => {
              // this.setState({ getting_route: false });
              this.setState({ isLoading: false });
              this.setState({ msg: 'Network Unavailable!' });
             
              
          })
  }
  
  

componentDidMount() {
    isMounted = true;
    this.reload();
    NetInfo.isConnected.fetch().then().done(() => {
      NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange)
    });

  }

  handleConnectionChange = (isConnected) => {
    this.props.network_change(isConnected);
    if (isConnected) {
      this.props.resetNetwork();
      if (!this.props.card_exist) {
        this.props.getCard(this.props.user.userid);
      }
      if (!this.props.walletRan) {
        this.props.get_wallet_info(this.props.user.userid);
      }
      //const response = await this.props.getMyRoutes(this.props.user.userid);
      if(!this.props.route_set){
        this.runroute(this.props.user.userid);
      }
    }
  }

 
  // componentDidUpdate() {
  //   this.sortoutthing();
  // }
          
  tabOne() {
    if (this.props.active_bus_info == null) {
      return(
      <Tab heading="Nearby" tabStyle={{backgroundColor: '#FFF', }} activeTabStyle={{backgroundColor: '#FFF', }} activeTextStyle={{color: '#22A7F0', fontSize: 20, fontFamily: 'Montserrat-Regular'}} textStyle={{color: '#22313F', fontSize: 20, fontFamily: 'Montserrat-Regular'}} >
                {this.props.nearbyroutes !== null && 
                <TabOne navigation={this.props.navigation} />
                }
        </Tab>
        );
    } else if (!this.props.active_bus_info.trip_stated) {
    return(
      <Tab heading="Nearby" tabStyle={{backgroundColor: '#FFF', }} activeTabStyle={{backgroundColor: '#FFF', }} activeTextStyle={{color: '#22A7F0', fontSize: 20, fontFamily: 'Montserrat-Regular'}} textStyle={{color: '#22313F', fontSize: 20, fontFamily: 'Montserrat-Regular'}} >
                {this.props.nearbyroutes !== null && 
                <TabOne navigation={this.props.navigation} />
                }
        </Tab>
        );
    } else {
      return null;
    }
  }


  getWidth () {
    if (this.props.active_bus_info == null) {
      return '40%'
    } else if (!this.props.active_bus_info.trip_stated) {
      return '40%'
    } else {
      return '80%';
    }
  }
  tabTwo() {
    if (this.props.active_bus_info == null) {
      return(
      <Tab heading="My Trips" tabStyle={{backgroundColor: '#FFF'}}  activeTabStyle={{backgroundColor: '#FFF'}} activeTextStyle={{color: '#22A7F0', fontSize: 20, fontFamily: 'Montserrat-Bold'}} textStyle={{color: '#22313F', fontSize: 20, fontFamily: 'Montserrat-Regular'}} >
                {this.props.myroutes  !== null && 
                  <TabThree navigation={this.props.navigation} />
                  }
              </Tab>
        );
    } else if (!this.props.active_bus_info.trip_stated) {
    return(
      <Tab heading="My Trips" tabStyle={{backgroundColor: '#FFF'}}  activeTabStyle={{backgroundColor: '#FFF'}} activeTextStyle={{color: '#22A7F0', fontSize: 20, fontFamily: 'Montserrat-Bold'}} textStyle={{color: '#22313F', fontSize: 20, fontFamily: 'Montserrat-Regular'}} >
                {this.props.myroutes  !== null && 
                  <TabThree navigation={this.props.navigation} />
                  }
              </Tab>
        );
    } else {
      return null;
    }
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
    clearInterval(this._interval);
    this.notificationListener.remove();
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  
    NetInfo.removeEventListener('connectionChange', this.handleConnectionChange)
    isMounted = false;
}

getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

okayokay(lat, lng) {
  this.setState({newlat: lat});
  this.setState({newlng: lng});
  this.setState({changed: true});
  
}
conditionFetch(c) {
  if (c == 0) {
    return "bad";
  } else if (c == 1) {
    return "Normal";
  } else if (c == 2) {
    return "Good";
  } else if (c == 3) {
    return "Excellent";
  } 
}

  handleBackButtonClick() {
    BackHandler.exitApp();
    return true;
  }


  render() {
    return (
      <View style={styles.container}>
   
      <StatusBar backgroundColor="#22313F" barStyle="light-content" />

      <Header style = {{borderBottomColor: "#22313F", borderBottomWidth: 1, backgroundColor: '#22313F'}}>
          
       <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon style = {{color: '#FFF', fontSize: 40, }} name="menu" />
            </Button>
          </Left>
          <Body>
          <Text style = {{fontFamily: (Platform.OS == 'ios') ? 'Montserrat-Regular' : 'Montserrat-Bold', fontSize: 20, color: '#FFF'}}>Rova</Text>
          
            {/* <Text style = {{fontFamily: 'Montserrat-Bold', fontSize: 20, color: '#FFF'}}>ROVA</Text> */}
          </Body>
          <Right>
            <TouchableOpacity
            style = {{
              borderWidth: 1,
              borderColor: "#22313F",
              borderRadius: 4,
              backgroundColor: '#FFF',
              padding: 5,
            }}
            onPress={this.props.card_exist ? () => this.props.navigation.navigate('Wallet', {from: 'map'}) : () => this.showAlert()}
            >
            
              <Text style = {{fontFamily: 'Montserrat-Regular',color: '#22313F'}}
                ><Icon style = {{fontSize: 18, color: '#22313F'}} name = "add"/> {this.props.wallet_nice}</Text></TouchableOpacity>
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
        <MapView
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1,
        }}
        region={{
          latitude: !this.state.changed ? this.props.latitude : Number(this.state.newlat),
          longitude: !this.state.changed ? this.props.longitude : Number(this.state.newlng),
          latitudeDelta: this.props.latitudeDelta * 10,
          longitudeDelta: this.props.longitudeDelta  * 10,
        }}
        //onRegionChange={this.onRegionChange.bind(this)}
        loadingEnabled={true}
        zoomEnabled={true}
        customMapStyle={mapStyle}
        minZoomLevel={1}
        maxZoomLevel={5}
        cacheEnabled={true}
        followsUserLocation={true}
        showsCompass={true}
        initialRegion={this.state.region}
        //loadingEnabled={true}
        showsUserLocation={true}
        >
          {this.props.route_set && this.props.route.length > 0  &&
            <MapView.Polyline
              coordinates={this.props.route}
              strokeWidth={3}
              strokeColor="#22313F"
              fillColor="#22313F"
              strokeWidth={3}
              lineCap = "square" 
              lineJoin = "miter"
              geodesic = {true}
              lineDashPhase = {100}
            />
          }
          {this.props.myroutes !== null && this.props.myroutes.length > 1 &&
          <MapView.Marker
              coordinate={{
                latitude: this.props.nearest_selected ? Number(this.props.nearest_route_single[0].pickup_coords_lat) : Number(this.props.myroutes[0].pickup_coords_lat),
                longitude: this.props.nearest_selected ? Number(this.props.nearest_route_single[0].pickup_coords_lng) : Number(this.props.myroutes[0].pickup_coords_lng),
              }}
              onPress = {() => this.props.nearest_selected ?  this.okayokay(this.props.nearest_route_single[0].pickup_coords_lat, this.props.nearest_route_single[0].pickup_coords_lng) : this.okayokay(this.props.myroutes[0].pickup_coords_lat, this.props.myroutes[0].pickup_coords_lng)}
            
              >
               <View style = {{
            width: 20,
            height: 20,
            borderRadius: 20,
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: this.getRandomColor(),
          }}
            ><View style = {{
            width: 12,
            height: 12,
            borderRadius: 12,
            backgroundColor: '#FFF',
          }}
            ></View>
            </View>
            <MapView.Callout 
            tooltip={true}
            style={{ 
              width: 250, height: 90,
              backgroundColor: '#22313F',
              borderRadius: 8,
              borderWidth: 1,
             }}
            >
            <View style = {{
              alignItems: 'center',
              paddingTop: 15,
              paddingBottom: 15,
              }}>
              <Text style = {{
                fontSize: 15,
                marginTop: 10,
                alignSelf: 'center',
                color: '#FFF',
                fontFamily: 'Montserrat-Bold',
              }}> {this.props.nearest_selected ? this.props.nearest_route_single[0].pickup :this.props.myroutes[0].pickup}</Text>
              <Text style = {{
                fontSize: 12,
                marginTop: 10,
                alignSelf: 'center',
                color: '#FFF',
                fontFamily: 'Montserrat-Regular',
              }}>Next stop: {this.props.stops.length > 0 && this.props.stops[0].end_address} </Text>
              
            </View>
            </MapView.Callout>
          </MapView.Marker>
              } 
         
{this.props.stops.length > 0 &&
       this.props.stops.map((stop, i) => (
         
          <MapView.Marker
              coordinate={
                { latitude: Number(stop.end_location.lat),
                  longitude: Number(stop.end_location.lng)
                }
              }
              onPress = {() => this.okayokay(stop.end_location.lat, stop.end_location.lng)}
              key={i}
              //#F49C00
              //title={marker.title}
              //image={require('../../../img/car.png')}
            >
            <View style = {{
            width: 20,
            height: 20,
            borderRadius: 20,
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: this.getRandomColor(),
          }}
            ><View style = {{
            width: 12,
            height: 12,
            borderRadius: 12,
            backgroundColor: '#FFF',
          }}
            ></View>
            </View>

            <MapView.Callout 
            tooltip={true}
            style={{ 
              width: 250, height: 90,
              backgroundColor: '#22313F',
              borderRadius: 8,
              borderWidth: 1,
             }}
            >
            <View style = {{
              alignItems: 'center',
              paddingTop: 5,
              paddingBottom: 5,
              }}>
              <Text style = {{
                fontSize: 15,
                marginTop: 10,
                alignSelf: 'center',
                color: '#FFF',
                fontFamily: 'Montserrat-Bold',
              }}> {stop.end_address} </Text>
              <Text style = {{
                fontSize: 12,
                marginTop: 10,
                alignSelf: 'center',
                color: '#FFF',
                fontFamily: 'Montserrat-Regular',
              }}>ETA: {stop.duration.text} </Text>
               <Text style = {{
                fontSize: 12,
                marginTop: 10,
                alignSelf: 'center',
                color: '#FFF',
                fontFamily: 'Montserrat-Regular',
              }}>Distance: {stop.distance.text} </Text>
              
            </View>
            </MapView.Callout>
            </MapView.Marker>
          ))
      }
      
      {this.props.myroutes !== null && drivers.length > 0 && this.props.active_bus !== 0 && this.props.active_bus_info !== null &&
        <MapView.Marker
        anchor={{ x: 0.5, y: 0.5 }}
        zIndex={10}
        style = {{
          flex: 1,
        }}
        coordinate={{
          latitude: Number(this.props.active_bus_info.latitude),
          longitude: Number(this.props.active_bus_info.longitude)
        }}>
        <Animated.Image 
          ref='image' 
          style={{
            flex: 1,
            width: 22, height:22, 
            resizeMode: 'contain',
           // flex:1, height: undefined, width: undefined,
            transform: [
              { rotate: `${this.props.active_bus_info.angle}deg` }
            ]}}
             resizeMode="contain"
          source={require('../../../assets/bus2.png')} />

         
          <MapView.Callout 
            tooltip={true}
            style={{ 
              width: 250, height: 150,
              backgroundColor: '#22313F',
              borderRadius: 8,
              borderWidth: 1,
             }}
            >
            <View style = {{
              alignItems: 'center',
              paddingTop: 15,
              paddingBottom: 15,
              }}>
              <Text style = {{
                fontSize: 15,
                marginTop: 10,
                alignSelf: 'center',
                color: '#FFF',
                fontFamily: 'Montserrat-Bold',
              }}>{`${this.props.active_bus_info.bus} ${this.props.active_bus_info.plate_number} #${this.props.active_bus_info.bus_id}`}</Text>
             <Text style = {{
                fontSize: 12,
                marginTop: 10,
                alignSelf: 'center',
                color: '#FFF',
                fontFamily: 'Montserrat-Regular',
              }}> YOUR BUS </Text>
            </View>
            </MapView.Callout>

        </MapView.Marker>
        } 


      {this.props.myroutes !== null && drivers.length > 0 && this.props.active_bus == null &&
        drivers.map((driver, i) => (
        <MapView.Marker
        key={i}
        anchor={{ x: 0.5, y: 0.5 }}
        zIndex={10}
        style = {{
          flex: 1,
        }}
        coordinate={{
          latitude: Number(driver.latitude),
          longitude: Number(driver.longitude)
        }}>
          <Animated.Image 
          ref='image' 
          style = {{
            flex: 1,
            width: 50,
            height: 20,
            //resizeMode: 'stretch',
            transform: [
              { rotate: `${driver.angle}deg` }
            ]
          }} 
          resizeMode="contain"
          source={require('../../../assets/bus1.png')} />

          <MapView.Callout 
            tooltip={true}
            style={{ 
              width: 250, height: 150,
              backgroundColor: '#22313F',
              borderRadius: 8,
              borderWidth: 1,
             }}
            >
            <View style = {{
              alignItems: 'center',
              paddingTop: 15,
              paddingBottom: 15,
              }}>
              <Text style = {{
                fontSize: 15,
                marginTop: 10,
                alignSelf: 'center',
                color: '#FFF',
                fontFamily: 'Montserrat-Bold',
              }}>{`${driver.bus} ${driver.plate_number} #${driver.bus_id}`}</Text>
             <Text style = {{
                fontSize: 12,
                marginTop: 10,
                alignSelf: 'center',
                color: '#FFF',
                fontFamily: 'Montserrat-Regular',
              }}>Available Sits: {driver.available_sits} </Text>
              {driver.bus_status  &&
              <TouchableOpacity
              style = {{flex: 1, zIndex: 200}}
              onPress={() => this.props.routes == null ? this.props.navigation.navigate('Route') : this.props.navigation.navigate('RouteSingle', { route_id: data.route_id, bus: data.bus_id, from: 'map' })}>
							    <Text style = {{
                  fontSize: 12,
                  marginTop: 10,
                  alignSelf: 'center',
                  color: '#FFF',
                  fontFamily: 'Montserrat-Regular',
                }}>Available</Text>
              </TouchableOpacity>
              }
            </View>
            </MapView.Callout>

        </MapView.Marker>
        
        ))
        
      } 
        </MapView>


        <Modal isVisible={this.props.my_selected && this.props.my_route_single !== null && this.props.payment !== 'null'}>
          <View style={{ flex: 0.9, 
            backgroundColor: '#FFF',
            borderRadius: 20,
            padding: 20,  
          }}> 
          {this.props.my_route_single !== null &&
            <Text style = {{
              color: '#222',
              fontSize: 20,
              fontWeight: 'bold'
            }}>{this.getName(this.props.my_route_single[0].payment_method_of_payment)} Pass</Text>
          }
          <Text style = {{
              color: '#888',
              fontSize: 15,
            }}>Show this to the bus driver in charge of your route</Text>
            
            <Ticket user = {this.props.user.userid}  ticket = {this.props.my_route_single}/>
          </View>
          <View style = {{ flex: 0.1, 
            backgroundColor: 'transparent',
            alignItems: 'center',
            justifyContent: 'center'  
          }}>
          <TouchableOpacity
          onPress = {() => this.props.my_route_selected(false)}
              style = {{
                // position: 'absolute',
                // bottom: 10,
                // alignItems: 'center',
                // zIndex: 1000000,
                //0.51.0
              }}>
              <Text style = {{
                color: '#FFF',
                fontSize: 18,
                fontFamily: "Montserrat-Bold",
              }}>Dismiss</Text></TouchableOpacity>
                

            </View>
        </Modal>
      {(!this.props.my_selected || this.props.payment !== 'active') &&
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
              <Tabs tabBarUnderlineStyle={{
                backgroundColor:'#22A7F0', height: 2, 
             // width: this.props.active_bus == 0 ? '40%' : '90%',
              borderColor: '#FFF', 
              width: this.getWidth(),
               alignSelf: 'center',
                alignContent: 'center', 
                alignItems: 'center', marginLeft: 20}}>
              {this.props.active_bus !== 0 && this.props.active_bus_info !== null && this.props.active_bus_info.trip_stated &&
              <Tab heading="Active Route" tabStyle={{backgroundColor: '#FFF', }} activeTabStyle={{backgroundColor: '#FFF', }} activeTextStyle={{color: '#22A7F0', fontSize: 20, fontFamily: 'Montserrat-Regular'}} textStyle={{color: '#22313F', fontSize: 20, fontFamily: 'Montserrat-Regular'}} >
                  <View style = {{
                    //flex: 0.1,
                   // alignItems: 'center',
                    marginTop:20,
                    marginRight: 0,
                    marginLeft: 10,
                    marginBottom: 40
                  }}>
                  
                    <Text style={styles.olu}>Distance from you: {this.getDistanceFromLatLonInKm(this.props.active_bus_info.latitude,this.props.active_bus_info.longitude,this.props.latitude,this.props.longitude)} KM</Text>
                    <Text style={styles.olu}>Timing: {this.props.active_bus_info.time_to}</Text>
                    <Text style={styles.olu}>Bus: {this.props.active_bus_info.bus} ({this.props.active_bus_info.plate_number})</Text>
                    <Text style={styles.olu}>Driver Name: {this.props.active_bus_info.driver_name}</Text>

                    <Text style={styles.olu}>Extra: {this.props.active_bus_info.extra}</Text>


                  </View>
                         

                  <View style = {{
                   // flex: 0.2,
                    justifyContent: 'space-between',
                    padding: 10,
                    alignItems: 'center',
                   
                    // width: "90%",
                    flexDirection: 'row',
                  }}>
                      <TouchableOpacity
													style = {{
                             backgroundColor: '#F49C00',
                             paddingTop: 5,
                            borderColor: '#F49C00',
                            borderWidth: 1,
                             borderRadius:10,
                             paddingBottom: 5,
                             paddingRight: 10,
                             paddingLeft: 10,
                            // margin: 20,
                            // alignContent: 'center',
                            // justifyContent: 'center',
                            // // width: '40%',
                            // // height: '10%',
													}}
													onPress={() => Communications.phonecall(this.props.active_bus_info.driver_tel, true)}>
													
                          <Text style={{
                              fontSize: 20,
                              fontFamily: 'Montserrat-Regular',
                              color: '#FFF'
                            }}> <Icon style = {{color: '#FFF', paddingRight: 10, fontSize: 20}}
                            name = "call" /> Call Driver</Text>
													</TouchableOpacity>


                          <TouchableOpacity
													style = {
                            {paddingTop: 2,
                            
                             backgroundColor: '#318bfb',
                             paddingTop: 5,
                            borderColor: '#318bfb',
                            borderWidth: 1,
                             borderRadius:10,
                             paddingBottom: 5,
                             paddingRight: 10,
                             paddingLeft: 10,
                         
													}}
													onPress={() => Communications.text(this.props.active_bus_info.driver_tel, true)}>
													
                          <Text style={{
                              fontSize: 20,
                              fontFamily: 'Montserrat-Regular',
                              color: '#FFF'
                            }}> <Icon style = {{color: '#FFF', paddingRight: 10, fontSize: 20}}
                            name = "text" /> Message</Text>
													</TouchableOpacity>


                      </View>
                  
                  </Tab>
              }
             {this.tabOne()}

             {this.tabTwo()}
              
              </Tabs>
              

              </View>
          </Interactable.View>
        </View>
          }

           <AwesomeAlert
          show={this.state.showAlert}
          showProgress={false}
          title="No Card Saved"
          message="You need to add a card to fund your wallet"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Cancel"
          confirmText="Add Card"
          confirmButtonColor="#22313F"
          onCancelPressed={() => {
            this.hideAlert();
          }}
          onConfirmPressed={() => {
            this.props.navigation.navigate("CardView", {from: 'map'})
          }}
        />

				{/* <SnackBar visible={!this.props.network_connected} textMessage="Network Unavailable!" actionHandler={()=> this.reload()} actionText="Try Again" accentColor = '#F49C00'/> */}
        {/* <ProgressDialog 
				visible={(this.props.getting_wallet || this.state.getting_route) && this.props.network_connected} 
				message="Please, wait..."
				/> */}
        <Loader show = {this.state.openLoader} msg = {this.state.msg} close={this.close}  loading = {this.state.isLoading}/> 
      
      </View>
            
    );
  }


}
//<Tab heading="Nearby" tabStyle={{backgroundColor: '#FFF'}} textStyle={{color: '#fff'}} activeTabStyle={{backgroundColor: 'red'}} activeTextStyle={{color: '#fff', fontWeight: 'normal'}}>
              

Map.propTypes = {
  provider: MapView.ProviderPropType,
};
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
    // backgroundColor: '#318bfb',
    backgroundColor: '#22313F',
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
  },
  olu: {
    fontSize: 18,
    fontFamily: 'Montserrat-Regular',
    color: '#22313F',
    padding: 10,
    //paddingTop:5,
    
  }
});

const mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
]

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
    active_bus,
    locationGotten,
    myroutes,
    payment,
    getting_route,
    driversGotten,
    stops,
    nearest_selected,
    wallet,
    wallet_nice, routes,
    nearest_route_single,
    walletRan,
    active_bus_info,
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
    active_bus,
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
    stops,
    match_alert,
    network_connected,
    charge_type,
    raw,
    no_new_match,
    card_exist,
    distance_error,
    getting_distance,
    fetching_prices,
    routes,
    fetch_error,
    active_bus_info,
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
  getMyRoutes, all_route,
  set_active_bus,
  my_route_selected,
  set_active_bus_info,
  resetNetwork,
  getNearByRoutes,
})(Map);
