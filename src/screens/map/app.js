import React, { Component } from 'react';
import { View, Image, NetInfo,  Dimensions, Animated, PermissionsAndroid,
  Platform, TextInput,
  
  AsyncStorage,Easing, StatusBar, StyleSheet, Text, TouchableWithoutFeedback, TouchableOpacity} from "react-native";

  import { connect } from 'react-redux';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';

import { ProgressDialog } from 'react-native-simple-dialogs';
import SnackBar from 'react-native-snackbar-component';

import Modal from "react-native-modal";

import Ticket from './ticket';

import Interactable from 'react-native-interactable';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import {  destinationChanged,
  select_vehicle,
  hoverondesc,
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
    }
}

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
  }
  
  async  reload() {
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

    
      //send driver location server every 5 seconds
      //this.props.sendLocation(this.props.user.d_id, this.props.latitude, this.props.longitude);
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
          // drivers.push(result);
          drivers = this.snapshotToArray(snapshot);
          
      }
     });

  }

  snapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;
        //if (item.route_id == 4) {
          returnArr.push(item);
          //}
    });

    return returnArr;
};


  async runroute(id) {
    this.setState({ getting_route: true });
    
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
              //console.log('Rova res is '+JSON.stringify(responseJson));
              //this.props.saveRoute(responseJson)
              this.setState({ getting_route: false });
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
                //
               }
            })
            .catch((error) => {
              this.setState({ getting_route: false });
              
          })
    //this.props.clearEverything();
  }
  
  

componentDidMount() {
  
    
    isMounted = true;
    this.reload();
    
   
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
    this.notificationListener.remove();
    
    //this.setState({mounted: false})
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

  render() {
    return (
      <View style={styles.container}>

          <Header style = {{borderBottomColor: "#22313F", borderBottomWidth: 1, backgroundColor: '#22313F'}}>
          <StatusBar backgroundColor="#22313F" barStyle="dark-content" />
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon style = {{color: '#FFF'}} name="menu" />
            </Button>
          </Left>
          <Body>
            <Text style = {{fontFamily: 'Montserrat-Bold', color: '#FFF'}}>ROVA</Text>
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
            onPress={this.props.card_exist ? () => this.props.navigation.navigate('Wallet', {from: 'map'}) : () => alert("Kindly add a card first")}
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
        loadingEnabled={true}
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
          {this.props.myroutes !== null && 
          <MapView.Marker
              coordinate={{
                latitude: this.props.nearest_selected ? Number(this.props.nearest_route_single[0].pickup_coords_lat) : Number(this.props.myroutes[0].pickup_coords_lat),
                longitude: this.props.nearest_selected ? Number(this.props.nearest_route_single[0].pickup_coords_lng) : Number(this.props.myroutes[0].pickup_coords_lng),
              }}
              onPress = {() => this.props.nearest_selected ?  this.okayokay(this.props.nearest_route_single[0].pickup_coords_lat, this.props.nearest_route_single[0].pickup_coords_lng) : this.okayokay(this.props.myroutes[0].pickup_coords_lat, this.props.myroutes[0].pickup_coords_lng)}
            
              >
               <View style = {{
            width: 10,
            height: 10,
            borderRadius: 10,
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: this.getRandomColor(),
          }}
            ><View style = {{
            width: 5,
            height: 5,
            borderRadius: 5,
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
                fontFamily: 'Montserrat',
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
            width: 10,
            height: 10,
            borderRadius: 10,
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: this.getRandomColor(),
          }}
            ><View style = {{
            width: 5,
            height: 5,
            borderRadius: 5,
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
                fontFamily: 'Montserrat',
              }}>ETA: {stop.duration.text} </Text>
               <Text style = {{
                fontSize: 12,
                marginTop: 10,
                alignSelf: 'center',
                color: '#FFF',
                fontFamily: 'Montserrat',
              }}>Distance: {stop.distance.text} </Text>
              
            </View>
            </MapView.Callout>
            </MapView.Marker>
          ))
      }
      {this.props.myroutes !== null && drivers.length > 0 &&
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
              {/* <Text style = {{
                fontSize: 12,
                marginTop: 10,
                alignSelf: 'center',
                color: '#FFF',
                fontFamily: 'Montserrat',
              }}>Bus condition: {this.conditionFetch(Number(driver.bus_condition))} </Text> */}
              <Text style = {{
                fontSize: 12,
                marginTop: 10,
                alignSelf: 'center',
                color: '#FFF',
                fontFamily: 'Montserrat',
              }}>Available Sits: {driver.available_sits} </Text>
              
              {driver.bus_status  &&
              <TouchableOpacity
              style = {{flex: 1, zIndex: 200}}
              onPress={() => this.props.navigation.navigate('RouteSingle', { route_id: data.route_id, bus: data.bus_id, from: 'map' })}>
							    <Text style = {{
                  fontSize: 12,
                  marginTop: 10,
                  alignSelf: 'center',
                  color: '#FFF',
                  fontFamily: 'Montserrat',
                }}>Available</Text>
              </TouchableOpacity>
              }
            </View>
            </MapView.Callout>

        </MapView.Marker>
        
        ))
        
      } 
        </MapView>


        <Modal isVisible={this.props.my_selected && this.props.my_route_single !== null && this.props.payment === 'active'}>
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
            
            <Ticket ticket = {this.props.my_route_single}/>
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
              <Tabs tabBarUnderlineStyle={{backgroundColor:'#22A7F0', height: 2, width: '40%', alignSelf: 'center', alignContent: 'center', alignItems: 'center', marginLeft: 20}}>
              {this.props.nearbyroutes !== null &&
              <Tab heading="Nearby" tabStyle={{backgroundColor: '#FFF', }} activeTabStyle={{backgroundColor: '#FFF', }} activeTextStyle={{color: '#22A7F0', fontSize: 20, fontFamily: 'Montserrat-Regular'}} textStyle={{color: '#22313F', fontSize: 20, fontFamily: 'Montserrat-Regular'}} >
              <TabOne navigation={this.props.navigation} />
              </Tab>
              }
              {this.props.myroutes  !== null &&
                <Tab heading="My Trips" tabStyle={{backgroundColor: '#FFF'}}  activeTabStyle={{backgroundColor: '#FFF'}} activeTextStyle={{color: '#22A7F0', fontSize: 20, fontFamily: 'Montserrat-Regular'}} textStyle={{color: '#22313F', fontSize: 20, fontFamily: 'Montserrat-Regular'}} >
              <TabThree navigation={this.props.navigation} />
              </Tab>
              }
              </Tabs>
              

              </View>
          </Interactable.View>
        </View>
          }
				<SnackBar visible={!this.props.network_connected} textMessage="Network Unavailable!" actionHandler={()=> this.reload()} actionText="Try Again" accentColor = '#F49C00'/>
        <ProgressDialog 
				visible={(this.props.getting_wallet || this.state.getting_route) && this.props.network_connected} 
				message="Please, wait..."
				/>
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
    locationGotten,
    myroutes,
    payment,
    getting_route,
    driversGotten,
    stops,
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
  resetNetwork,
  getNearByRoutes,
})(Map);
