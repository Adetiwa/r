import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Keyboard, Platform, ActivityIndicator, Image, Text, TextInput, Animated, Easing, TouchableOpacity } from 'react-native';
import Interactable from 'react-native-interactable';
import { connect } from 'react-redux';
import ImageLoad from 'react-native-image-placeholder';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import Modal from "react-native-modal";
import Error from '../error';

import {  getCard,from_where,
  all_route,
  onPayment,
  getMyRoutes,
  charge_method,
        } from '../../actions/Map';

import {
	Container,
	Header,
	Title,
	Content,
	Button,
	
	List,
	ListItem,
	Left,
	Right,
	Body,
	icon,
  Separator,
  CheckBox,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Entypo';

import * as Animatable from 'react-native-animatable'
const Screen = Dimensions.get('window');
import { ProgressDialog } from 'react-native-simple-dialogs';
import SnackBar from 'react-native-snackbar-component';
import Loader from "../../components/loader";

var { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

thissingle2 = [];
class RouteSingle extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
  
    this._deltaY = new Animated.Value(0);
    this.state = {
      bounceValue: new Animated.Value(100),
      expanded: false,
      state: 'Money',
      state_norm: "normal",
      charge_type: this.props.charge_type,
      route: null,
      amount: 0,
      selected_amount: 'one_way',
      showModal: false,
      subscribe: false,
      pickup: '',
      dropoff:'',
      showError: false,
      errorMsg: '',
      ticketID: '',
      promocode: '',
      loading: false,
      otp: '',
      msg: '',
      bus: null,
      transaction_reference: '',
      pin: '',
      stateOp: 'pickup',
      isDateTimePickerVisible: false,
      from: 'route',
      network_ish: true,
      //startDay: this.formatDate(new Date()) hh:mm:ss
      startDay: moment(new Date()).format("YYYY-MM-DD"),
      expiry_date: null,
      openLoader: false,
      isLoading: false

    }
  }

  close(e) {
    e.preventDefault()
    this.setState({
      openLoader: false,
      msg: false
    });
  }

  formatDate(date) {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
  
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
  
    return day + '/' + monthNames[monthIndex] + '/' + year;
  }


  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  async _handleDatePicked(date) {
    
    this.setState({startDay: moment(date).format("YYYY-MM-DD")});
    
    this._hideDateTimePicker();

    var curTime = new Date();
    var day = curTime.getDay();
    curTime = parseInt(curTime.getHours() + "" + ("0" + curTime.getMinutes()).substr(-2) + "" + ("0" + curTime.getSeconds()).substr(-2));

    if (this.state.selected_amount == 'one_way') {
        add = 0;
    } else if (this.state.selected_amount == 'day') {
        add = 1;
    } else if (this.state.selected_amount == 'week') {
        add = 5;
    } else if (this.state.selected_amount == 'month') {
        add = 20;
    }
    
    date = moment(date,'YYYY-MM-DD').format('YYYY-MM-DD[T]HH:mm:ss')
    if (add == 0) {
      // if (date.isoWeekday() == 6) {
      //   date = moment(date).add(2, 'day');
      // } else if (date.isoWeekday() == 6) {
      //   date = moment(date).add(1, 'day');
      // } else {
        date = moment(date).add(0, 'day');
      //}
      
    } else {
          while (add > 0) {
            date = moment(date).add(1, 'day');
            // decrease "days" only if it's a weekday.
            if (date.isoWeekday() !== 6 && date.isoWeekday() !== 7) {
              add -= 1;
            }
        }
      }
       this.setState({expiry_date: date.format("YYYY-MM-DD")});
    
  }

  async componentWillMount() {
    this.animatedValue1 = new Animated.Value(0);
    this.animatedValue2 = new Animated.Value(1);


    var chose = this.props.screenProps.state.params.route_id;
    // var from = this.props.navigation.state.params.from;

    var a = this.props.routes;
  
    var aFiltered = a.filter(function(elem, index){
      return elem.route_id == chose;
    });
    thissingle = aFiltered;
    // this.setState({from: from});

    //console.log(thissingle[0].image);
    //console.log("Now state "+ JSON.stringify(this.state));

    if (this.props.network_connected && this.props.myroutes === null) {
      this.runroute(this.props.user.userid);
    } 
  

  }

  getTheFuckOOO() {
    this.props.screenProps.goBack();
}

  componentDidMount() {
    this.setState({amount: thissingle[0].amount_single});
    this.setState({bus: thissingle[0].bus_id});
    
    var curTime = new Date();
    var day = curTime.getDay();
    curTime = parseInt(curTime.getHours() + "" + ("0" + curTime.getMinutes()).substr(-2) + "" + ("0" + curTime.getSeconds()).substr(-2));

    if ((curTime < 140000) && this.state.selected_amount == 'one_way'){
        add = 0;
    } else if ((curTime > 140000) && this.state.selected_amount == 'one_way') {
        add = 1;
    } else if (this.state.selected_amount == 'day') {
        add = 1;
    } else if (this.state.selected_amount == 'week') {
        add = 5;
    } else if (this.state.selected_amount == 'month') {
        add = 20;
    }
    this.addWeekdays(this.state.startDay, add);
  
    var a2 = this.props.myroutes;
  
    var aFiltered2 = a2.filter(function(elem, index){
      return elem.route_id == thissingle[0].route_id;
    });
    thissingle2 = aFiltered2;

}

calcDate(n) {
 
  if (n == 'one_way') {
      add = 0;
  } else if (n == 'day') {
      add = 1;
  } else if (n == 'week') {
      add = 5;
  } else if (n == 'month') {
      add = 20;
  }
  this.addWeekdays(this.state.startDay, add);
}

  onSelect(type){
    this.props.charge_method(type);
    this.callAnimate('Money');
  }

  onToggleSHit() {
    if (this.state.subscribe) {
      this.setState({subscribe: false});
    } else {
      this.setState({subscribe: true});
    }
  }


  callAnimate(t) {
    this.setState({type: t });
    if (!this.state.expanded) {
      this.setState({expanded: true});

      Animated.parallel([
        Animated.timing(this.animatedValue1, {
          toValue: -150,
          duration: 250,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(this.animatedValue2, {
          toValue: -190,
          duration: 250,
          easing: Easing.inOut(Easing.ease),
        }),
      ]).start();
    } else {
      this.setState({expanded: false});
      Animated.parallel([
        Animated.timing(this.animatedValue1, {
          toValue: 0,
          duration: 250,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(this.animatedValue2, {
          toValue: 0,
          duration: 250,
          easing: Easing.inOut(Easing.ease),
        }),
      ]).start();
    }

  }

  stops(tmp_array) {
    return tmp_array.map(function(news, i){
      return(
        <View key={i} style = {{
          flexDirection: 'row',
          marginTop: 15,
        }}>
        <View style = 
        {{
          width: 15,
          height: 15,
          backgroundColor: '#FFF',
          borderColor: '#22313F',
          borderWidth: 5,
          borderRadius: 20,
          marginTop: 3,
        }}/>
        {(tmp_array.length !== i + 1) &&<View style = {{
          position: 'absolute',
          height: 14,
          width: 1,
          backgroundColor: '#777',
          left: 6.5,
          top: 23,
        }}/>
      }
        <Text style = {styles.listText}>{news.stop}</Text>
        </View>
       );
    });
  }

genIncon(type) {
  if (type == "CASH") {
    return(
      <Icon style = {{color: '#22A7F0', paddingRight: 10, fontSize: 20}}
                name = "money" />
    ); 
  } else if (type == "CARD") {
    return (
      <Icon2 style = {{color: '#22A7F0', paddingRight: 10, fontSize: 20}}
                name = "credit-card" /> 
    );
  } else {
    return (
<Icon2 style = {{color: '#22A7F0', paddingRight: 10, fontSize: 20}}
                name = "wallet" /> 
    );
  }
}
                
showusmodal(v) {
  this.setState({stateOp: v});
  this.setState({showModal: true});
}

selecct(name) {
  if (this.state.stateOp == 'pickup') {
    this.setState({pickup: name});
  } else {
    this.setState({dropoff: name});
  }
  this.setState({showModal: false});
}
getAmount(name) {
    this.calcDate(name);

    if (name == "one_way") {
      amount = thissingle[0].amount_single;
    } else if (name == "day") {
      amount = thissingle[0].amount_day;
    } else if (name == "week") {
      amount = thissingle[0].amount_week;
    } else if (name == "month") {
      amount = thissingle[0].amount_month;
    }

    this.setState({amount: amount});
    this.setState({selected_amount: name});

    
    return amount;
  }

  getTheFuckOut() {
    this.props.onPayment(true);
    this.props.navigation.navigate('CardView', { id: thissingle[0].route_id });
  }


  genTicketID() {
    var id = this.props.user.fullname.substring(0,3).toUpperCase() +' '+ this.makeid(4)+ ' '+this.makeid(5) +' '+this.makeid(4)
    this.setState({ticketID: id});
}

addWeekdays(date, days) {
  date = moment(this.state.startDay,'YYYY-MM-DD').format('YYYY-MM-DD[T]HH:mm:ss')
  if (days == 0) {
    date = moment(date).add(0, 'day');
        
  } else {
      while (days > 0) {
        date = moment(date).add(1, 'day');
        // decrease "days" only if it's a weekday.
        if (date.isoWeekday() !== 6 && date.isoWeekday() !== 7) {
            days -= 1;
        }
    }
  }
     // console.log(date.format("YYYY-MM-DD"));
      this.setState({expiry_date: date.format("YYYY-MM-DD")});
   
  }

  async runroute(id) {
    // this.setState({ getting_route: true });
    this.setState({ openLoader: true });
    this.setState({ isLoading: true });
    this.setState({ msg: null });
    this.setState({ network_ish: true });
    
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
            //   this.setState({ getting_route: false });
            //   this.setState({ network_ish: true });
                this.setState({ openLoader: false });
                this.setState({ isLoading: false });
                this.setState({ msg: null });
    
                
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
            //   this.setState({ getting_route: false });
            //   this.setState({ network_ish: false });

              this.setState({ openLoader: true });
              this.setState({ isLoading: false });
              this.setState({ msg: 'Network unavailable!' });
           
    
          })
    //this.props.clearEverything();
  }
  

  enterAction() {
    if (thissingle2.length > 0 && (thissingle2[0].payment_status == 'active' || thissingle2[0].payment_status == 'pending')) {
        // alert("You already have an active or pending ticket for this route");
        this.setState({ openLoader: true });
        this.setState({ isLoading: false });
        this.setState({ msg: "You already have an active or pending ticket for this route" });
     
    } else if ((thissingle2.length > 0 && thissingle2[0].payment_status != 'active' && this.props.charge_type== "CARD")|| (thissingle2.length == 0 && this.props.charge_type== "CARD")) {
      if(this.state.pin == '' || this.state.transaction_reference == '') {
        this.setState({stateOp: 'pin'});
        this.setState({showModal: true});
      } else if (this.state.otp == '' && (this.state.pin != '' && this.state.transaction_reference != '')) {
        this.setState({stateOp: 'show_otp'});
        this.setState({showModal: true});
      } else if ((this.state.otp != '' && this.state.pin != '' || this.state.transaction_reference != '')) {
        this.enter(thissingle[0].route_id);
      }
    } else {
      this.enter(thissingle[0].route_id);
    }
   }

   okayTryNow() {
    if ((this.state.otp != '' && this.state.pin != '' || this.state.transaction_reference != '')) {
      this.enter(thissingle[0].route_id);
    }
   }

  async FundWallet() {
    Keyboard.dismiss();
    if (this.state.pin == '') {
      //alert("Enter your pin");
      this.setState({showModal: false});
      this.setState({ openLoader: true });
      this.setState({ isLoading: false });
      this.setState({ msg: 'Enter your pin' });
                  
    } else {
      this.setState({ network_ish: true });
    
    this.setState({ loading: true });
          fetch('https://admin.rova.com.ng/api2/fund-wallet', {
            method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                amount: Number(this.state.amount)*100,
                pin: this.state.pin,
                email: this.props.user.email,
                user: this.props.user.userid,
                authCode: this.props.flutterwave_token
              })
            })
            .then((response) => response.json())
            .then((responseJson) => {
              console.log("responseJson is "+JSON.stringify(responseJson));
              this.setState({ loading: false });
              this.setState({ network_ish: true });
    
              let status = responseJson.status;
              if (status === 'success') {
                    this.setState({transaction_reference: responseJson.ref});
                    if (responseJson.status_msg == 'send_otp') {
                      this.setState({stateOp: 'show_otp'});
                      //this.setState({showModal: true});
                      this.setState({msg: responseJson.real_status_msg});
                      }
                  } else {
                    this.setState({show: true});
                    this.setState({msg: responseJson.status_msg});
                    
                    //alert(responseJson.status_msg);
                  }
            })
            .catch((error) => {
              this.setState({ loading: false });
              this.setState({ network_ish: false });
    
              console.log(error);
              
          })
        }
  }




  async enter(route) {
    Keyboard.dismiss();
    this.setState({ loading: true });
    this.setState({ network_ish: true });
    this.setState({showModal: false});
    // this.setState({errorMsg: ''});
    // this.setState({msg: ''});
 

    this.setState({openLoader: true});
    this.setState({isLoading: true});
    this.setState({msg: null});

                  
                    
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
                method: this.props.charge_type,
                subscribe: this.state.subscribe,
                amount_original: this.state.amount,
                amount_paid: this.state.amount,
                type: this.state.selected_amount,
                date_active: this.state.startDay,
                date_expire: this.state.expiry_date,
                ticketID: this.state.ticketID,
                pickup: this.state.pickup,
                dropoff: this.state.pickup,
                bus: this.state.bus,
                reference: this.state.transaction_reference,
                otp: this.state.otp
              })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ loading: false });
                // this.setState({ network_ish: true });

                this.setState({isLoading: false});
                
                if (responseJson.status !== 'null') {
                    this.setState({openLoader: false});
                    this.setState({msg: null});
                    
                    this.setState({showError: true});
                    this.setState({errorMsg: 'Success'});
                    
                    this.props.getMyRoutes(responseJson);
                    this.props.navigation.navigate('Ticket', { from: 'route', data: 'new' });
                } else {
                  //alert(responseJson.status_msg);
                  this.setState({openLoader: true});
                  this.setState({isLoading: false});
                
                //   this.setState({showError: true});
                //   this.setState({errorMsg: responseJson.status_msg});
  
                //   console.log(responseJson.status_msg);
                  this.setState({msg: responseJson.status_msg});
                   
                    
                }
                console.log("responseJson is "+JSON.stringify(responseJson));
              })
            .catch((error) => {
              this.setState({ loading: false });
              this.setState({ isLoading: false });
              this.setState({ network_ish: false });
              this.setState({openLoader: true});
              this.setState({msg: 'Network Unavailable!'});

              console.log(error);
              
          })
         
}

displayshit() {
  if (this.state.stateOp == 'pickup' || this.state.stateOp == 'dropoff') {
    return (
      <View style={{ flex: 0.5, 
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 20,  
      }}>
        <Text style = {{
            fontFamily: "Montserrat-Regular",
            paddingLeft: 50,
            color: '#22313F',
            paddingTop: 10,
            fontSize: 20,
        }}>
        {this.state.stateOp == 'pickup' ? 'Select Pickup Location' : 'Select Dropoff Location'}
        </Text>
        <View style = {{
            marginTop: 40,
            alignContent: 'center',
            justifyContent: 'center',
        }}>
  <View  style={{ flexDirection: 'column'}}>
   <View style={{ flexDirection: 'row' }}>
       <CheckBox
       color={this.state.stateOp == 'pickup' ? '#87D37C' : '#F05959'}
       style = {{top: 10, zIndex: 2}}
       checked={this.state.stateOp == 'pickup' ?
       (this.state.pickup === thissingle[0].pickup)
       :
       (this.state.dropoff === thissingle[0].pickup)
       }
       onPress={() => this.selecct(thissingle[0].pickup)}
        />
        <TouchableOpacity
       onPress={() => this.selecct(thissingle[0].pickup)}
       ><Text style={{
           color: '#22313F',
           fontFamily: "Montserrat-Regular",
           padding: 10,
           fontSize: 18,
           }}> {thissingle[0].pickup}</Text>
           </TouchableOpacity>
   </View>
   </View>
    {thissingle[0].stops.map((driver, i) => (
   <View key={i}  style={{ flexDirection: 'column'}}>
   <View style={{ flexDirection: 'row' }}>
       <CheckBox
      color={this.state.stateOp == 'pickup' ? '#87D37C' : '#F05959'}
      style = {{top: 10, zIndex: 2}}
       checked={this.state.stateOp == 'pickup' ?
        (this.state.pickup === driver.stop)
        :
        (this.state.dropoff === driver.stop)
        }
        onPress={() => this.selecct(driver.stop)}
        />
       <TouchableOpacity
        onPress={() => this.selecct(driver.stop)}
        ><Text style={{
           color: '#22313F',
           fontFamily: "Montserrat-Regular",
           padding: 10,
           fontSize: 18,
           }}> {driver.stop}</Text>
           </TouchableOpacity>
   </View>
   </View>
    ))}
      <View  style={{ flexDirection: 'column'}}>
   <View style={{ flexDirection: 'row' }}>
       <CheckBox
       color={this.state.stateOp == 'pickup' ? '#87D37C' : '#F05959'}
       style = {{top: 10, zIndex: 2}}
       checked={this.state.stateOp == 'pickup' ?
       (this.state.pickup === thissingle[0].dropoff)
       :
       (this.state.dropoff === thissingle[0].dropoff)
       }
       onPress={() => this.selecct(thissingle[0].dropoff)}
        />
        <TouchableOpacity
       onPress={() => this.selecct(thissingle[0].dropoff)}
       ><Text style={{
           color: '#22313F',
           fontFamily: "Montserrat-Regular",
           padding: 10,
           fontSize: 18,
           }}> {thissingle[0].dropoff}</Text>
           </TouchableOpacity>
   </View>
   </View>



        </View>
      </View>
      );
  } else if (this.state.stateOp == 'show_otp') {
    return (
    <View style={{ flex: 0.6, 
      backgroundColor: '#FFF',
      borderRadius: 10,
      padding: 20,  
    }}>
     {this.state.msg != '' &&
                <Text style = {styles.textError2}>{this.state.msg}</Text>
            }

      <Text style = {{
          fontFamily: "Montserrat-Regular",
          paddingLeft: 50,
          color: '#22313F',
          paddingTop: 10,
          fontSize: 20,
      }}>
      Enter OTP Code
      </Text>
      <View style = {{
          marginTop: 40,
          alignContent: 'center',
          justifyContent: 'center',
      }}>

            

     <TextInput
          underlineColorAndroid={'transparent'}
          autoCapitalize={'none'}
          autoCorrect={false}
          value = {this.state.otp}
          editable={!this.state.loading}
          onChangeText = {(input)=>this.handleCardNumber2(input)}
          placeholder={'ENTER OTP CODE'}
          keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
          placeholderStyle={styles.placeholder}
          enablesReturnKeyAutomatically={false}
          style={styles.pinInputStyle}
      />

      <TouchableOpacity
      onPress = {() => this.okayTryNow()}
      style = {{
          marginTop: 60,
          alignSelf: 'center', width: '70%',
          borderRadius: 10,
          backgroundColor: '#22313F'}}>
        {this.state.loading ?
          <ActivityIndicator  color= '#FFF' style = {{
            padding: 20,  
          }}/>
          :
          <Text style = {{textAlign: 'center',
          fontFamily: "Montserrat-Regular",
          color: '#FFF',
          padding: 10,
          fontSize: 25,
          }}>CONTINUE</Text>
        }
      </TouchableOpacity>
      </View>
    </View>
    );
  } else if (this.state.stateOp == 'pin') {
    return (
    <View style={{ flex: 0.6, 
      backgroundColor: '#FFF',
      borderRadius: 10,
      padding: 20,  
    }}>
    {this.state.msg != '' &&
                <Text style = {styles.textError2}>{this.state.msg}</Text>
            }

      <Text style = {{
          fontFamily: "Montserrat-Regular",
          paddingLeft: 50,
          color: '#22313F',
          paddingTop: 10,
          fontSize: 20,
      }}>
      Enter your PIN
      </Text>
      <View style = {{
          marginTop: 40,
          alignContent: 'center',
          justifyContent: 'center',
      }}>

            

     <TextInput
          underlineColorAndroid={'transparent'}
          autoCapitalize={'none'}
          autoCorrect={false}
          maxLength={4}
          value = {this.state.pin}
          editable={!this.state.loading}
          secureTextEntry ={true}
          onChangeText = {(input)=> this.setState({pin: input})}
          placeholder={'ENTER PIN CODE'}
          keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
          placeholderStyle={styles.placeholder}
          enablesReturnKeyAutomatically={false}
          style={styles.pinInputStyle}
      />

      <TouchableOpacity
      disabled={this.state.loading}
      onPress = {() => this.FundWallet()}
      style = {{
          marginTop: 60,
          alignSelf: 'center', width: '70%',
          borderRadius: 10,
          backgroundColor: '#22313F'}}>
          {this.state.loading ?
          <ActivityIndicator  color= '#FFF' style = {{
            padding: 20,  
          }}/>
          :
          <Text style = {{textAlign: 'center',
          fontFamily: "Montserrat-Regular",
          color: '#FFF',
          padding: 10,
          fontSize: 25,
          }}>CONTINUE</Text>
        }
      </TouchableOpacity>
      </View>
    </View>
    );
  } else if (this.state.stateOp == 'promo_code') {
    return (
    <View style={{ flex: 0.5, 
      backgroundColor: '#FFF',
      borderRadius: 10,
      padding: 20,  
    }}>
      <Text style = {{
          fontFamily: "Montserrat-Regular",
          paddingLeft: 50,
          color: '#22313F',
          paddingTop: 10,
          fontSize: 20,
      }}>
      Enter PROMO Code
      </Text>
      <View style = {{
          marginTop: 40,
          alignContent: 'center',
          justifyContent: 'center',
      }}>

            

     <TextInput
          underlineColorAndroid={'transparent'}
          autoCapitalize={'none'}
          autoCorrect={false}
          value = {this.state.promocode}
          onChangeText = {(input)=>this.handleCardNumber(input)}
          placeholder={'ENTER PROMO CODE'}
          //keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
          placeholderStyle={styles.placeholder}
          enablesReturnKeyAutomatically={false}
          style={styles.pinInputStyle}
      />

      <TouchableOpacity
      style = {{
          marginTop: 60,
          alignSelf: 'center', width: '70%',
          borderRadius: 10,
          backgroundColor: '#22313F'}}>
         {this.state.loading ?
          <ActivityIndicator  color= '#FFF' style = {{
            padding: 20,  
          }}/>
          :
          <Text style = {{textAlign: 'center',
          fontFamily: "Montserrat-Regular",
          color: '#FFF',
          padding: 10,
          fontSize: 25,
          }}>CONTINUE</Text>
        }
      </TouchableOpacity>
      </View>
    </View>
    );
  }
}

handleCardNumber(input) {
    this.setState({promocode: input});
}
handleCardNumber2(input) {
  this.setState({otp: input});
}
      
genTicketID() {
  var id = this.props.user.fullname.substring(0,3).toUpperCase() +' '+ this.makeid(4)+ ' '+this.makeid(5) +' '+this.makeid(4)
  this.setState({ticketID: id});
}

makeid(len) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
  for (var i = 0; i < len; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
  return text;
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

    const animatedStyle2 = {
      transform: [
        { translateY: this.animatedValue2 },
      ],
      //opacity: this.props.hoveron ? 0 : 1,
    }


    return (
      <View style={{
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: 'white',
       // opacity:  ? 0.7 : 1,
      }}>
     
      {this.state.expanded &&
      <View style = {{
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        zIndex: 999
      }}><TouchableOpacity style = {{flex: 1}} onPress = {() => this.callAnimate('Money')}/>
      </View>
    }

        <Animated.View style={[styles.filterContainer, {
          transform: [{
            translateY: this._deltaY.interpolate({
              inputRange: [-130, -50],
              outputRange: [-33, 0],
              extrapolateRight: 'clamp'
            })
          }]
        }]}>
          <Animated.View style={[styles.filterTop, {
            opacity: this._deltaY.interpolate({
              inputRange: [-90, -20],
              outputRange: [0, 1],
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp'
            })
          }]}>
            <TouchableOpacity
            style = {{
              position: 'absolute',
              top: 10,
              left: 10,
            }}
             onPress={() => this.getTheFuckOOO()}>
              <Icon style = {{color : "#FFF", fontSize: 20,}} name="arrow-left" />
            </TouchableOpacity>
          </Animated.View>
          <View style = {styles.circelFirst}/>
          <View style = {styles.dot1}/>
          <View style = {styles.dot2}/>
          <View style = {styles.dot3}/>
          <View style = {styles.circelSecond}/>
          
            <View style={styles.filterField}>
              <Text style={styles.filterFieldText}>{thissingle[0].pickup}</Text>
            </View>
            <Animated.View style={[styles.filterField, {
              opacity: this._deltaY.interpolate({
                inputRange: [-70, -50],
                outputRange: [0, 1],
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp'
              })
            }]}>
              <Text style={styles.filterFieldText}> {thissingle[0].dropoff}</Text>
            </Animated.View>
         
            <Animated.View style={[styles.filterField2, {
              opacity: this._deltaY.interpolate({
                inputRange: [-20, 0],
                outputRange: [0, 1],
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp'
              })
            }]}>
              <TouchableOpacity onPress = {() => this.getAmount('one_way')}
               style = {this.state.selected_amount == 'one_way' ? styles.hrefActive : styles.href}>
                  <Text style={this.state.selected_amount == 'one_way' ? styles.hrefActiveText : styles.hrefText}>One-Way</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress = {() => this.getAmount('day')}
               style = {this.state.selected_amount == 'day' ? styles.hrefActive : styles.href}>
                  <Text style={this.state.selected_amount == 'day' ? styles.hrefActiveText : styles.hrefText}>Day</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress = {() => this.getAmount('week')}
               style = {this.state.selected_amount == 'week' ? styles.hrefActive : styles.href}>
                  <Text style={this.state.selected_amount == 'week' ? styles.hrefActiveText : styles.hrefText}>Week</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress = {() => this.getAmount('month')}
               style = {this.state.selected_amount == 'month' ? styles.hrefActive : styles.href}>
                  <Text style={this.state.selected_amount == 'month' ? styles.hrefActiveText : styles.hrefText}>Month</Text>
              </TouchableOpacity>

             </Animated.View>
        </Animated.View>

        <Interactable.View
          verticalOnly={true}
          snapPoints={[{y: 0}, {y: -130}]}
          boundaries={{top: -200}}
          animatedValueY={this._deltaY}>
          <View style={styles.content}>
            <Text style={styles.panelTitle}>₦{this.state.amount}</Text>
            
              <View style = {{
                flexDirection: 'row',
              //  flex: 1,
                marginBottom: 10,
                justifyContent: 'space-between'
            }}>
                <View style = {{
                    flexDirection: 'column',
                }}>
                <Text style = {{
                  color: '#22313F',
                  paddingLeft: 30,
                 
                  fontSize: 17,
                  textAlign: 'left',
                 // marginHorizontal: 30,
                  fontFamily: "Montserrat-Bold",
                }}>Morning</Text>
                <Text style = {{
                    color: '#22A7F0',
                    fontFamily: "Montserrat-Bold",
                 //   padding: 10,
                    paddingLeft: 30,
                    paddingTop: 10,
                    paddingBottom: 10,
                    
                    textAlign: 'center',
                    fontSize: 15,
                    }}>{thissingle[0].morning}</Text>
                    
                </View>

                <View style = {{
                    flexDirection: 'column',
                }}>
                <Text style = {{
                  color: '#22313F',
                  fontSize: 17,
                  paddingRight: 30,
                 
                  textAlign: 'left',
                  //marginHorizontal: 30,
                  fontFamily: "Montserrat-Bold",
                }}>Evening</Text>
                <Text style = {{
                    color: '#22A7F0',
                    fontFamily: "Montserrat-Bold",
                    paddingRight: 30,
                    paddingTop: 10,
                    paddingBottom: 10,
                    
                 //   padding: 10,
                    textAlign: 'center',
                    fontSize: 15,
                    }}>{thissingle[0].evening}</Text>
                    
                </View>
            </View>


            <View style = {{
                flexDirection: 'row',
              //  flex: 1,
              alignContent: 'center',
                marginBottom: 10,
                justifyContent: 'space-between'
            }}>
            <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite" 
                 style = {{
                    flexDirection: 'column',
                }}>
                <Text style = {{
                  color: '#22313F',
                  fontSize: 17,
                 textAlign: 'left',
                 paddingLeft: 30,
                 
                  //marginHorizontal: 30,
                  fontFamily: "Montserrat-Bold",
                }}>Start Date</Text>
                <TouchableOpacity  onPress = {() => this.setState({isDateTimePickerVisible: true})}><Text style={{color: '#4CAF50',fontSize: 14,
                    color: '#F09B95',
                    fontFamily: "Montserrat-Bold",
                    paddingLeft: 30,
                    paddingTop: 10,
                 paddingBottom: 10,
                 
                    textAlign: 'center',
                    fontSize: 15,
                    }}>
                     <Icon style = {{color : "#F09B95",}}  size = {15} name= "arrow-right" />
           
                    {this.state.startDay}
                    </Text>
                    </TouchableOpacity>
                </Animatable.View>

                <View style = {{
                    flexDirection: 'column',
                }}>
                <Text style = {{
                  color: '#22313F',
                  fontSize: 17,
                  textAlign: 'left',
                  //marginHorizontal: 30,
                  paddingRight: 30,
                 
                  fontFamily: "Montserrat-Bold",
                }}>Expiry Date</Text>
                <Text style = {{
                    color: '#22A7F0',
                    fontFamily: "Montserrat-Bold",
                 //   padding: 10,
                 paddingTop: 10,
                 paddingBottom: 10,
                 
                    paddingRight: 30,
                 
                    //marginLeft: -10,
                    textAlign: 'center',
                    fontSize: 15,
                    }}>{this.state.expiry_date}</Text>
                    
                </View>
            </View>



            <TouchableOpacity
            onPress = {() => this.showusmodal('pickup')}
            style = {{
                    alignItems: 'center',
                    backgroundColor: '#EEE',
                    borderRadius: 15,
                    marginTop: 0,
                    flexDirection: 'row',
                }}>
                <View style  = {styles.realDot1}/>
                <Text style = {styles.pick}> {this.state.pickup == '' ? 'Click to change the pickup point' : this.state.pickup}</Text></TouchableOpacity>
        
        <TouchableOpacity 
         onPress = {() => this.showusmodal('dropoff')}
         style = {{
                    alignItems: 'center',
                    backgroundColor: '#EEE',
                    borderRadius: 15,
                    marginTop: 10,
                   // marginTop: 0,
                    flexDirection: 'row',
                }}>
                <View style  = {styles.realDot2}/>
                <Text style = {styles.pick}> {this.state.dropoff == '' ? 'Click to change the dropoff point' : this.state.dropoff}</Text></TouchableOpacity>
        

           {this.stops(thissingle[0].stops)} 

            <View style = {{
                //zIndex: 10,
                width: '100%',
                height: '10%',
                //flex: 4,
                backgroundColor: '#FFF',
                marginTop: 20,
                borderColor: '#EEE',
                marginBottom: 20,
                borderTopWidth: 1,
                borderBottomWidth: 1,
               // justifyContent: 'center',
                flexDirection: 'row',
                alignItems: 'center',
            }}>

              <View style = {{
                  //alignContent: 'center',                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
                  justifyContent: 'center',
                  //alignItems: 'center',
                  width: '100%',
                  //alignSelf: 'center',
                  padding: 5,
              }}>
                <TouchableOpacity
                onPress = {() => this.callAnimate('Money')}
                style = {{
                  flexDirection: 'row',

                }}>
                {this.genIncon(this.props.charge_type)}
                  <View style = {{
                  justifyContent: 'space-between',
                  flexDirection: 'row'}}>
                    <Text style = {{
                    color: '#43496A', fontSize: 17, fontFamily: "Montserrat-Regular",
                  }}>
                    {this.props.charge_type} 
                  </Text>

                  <Text style = {{
                    color: '#43496A', fontSize: 17,
                    marginHorizontal: 30,
                    fontFamily: "Montserrat-Regular",
                  }}>
                    
                  </Text>
                  </View>
                </TouchableOpacity>
                </View>
           

            </View>
            {this.state.showError && <Error msg = {this.state.errorMsg}/>}
           
            <TouchableOpacity onPress = {() => this.enterAction()} style={styles.panelButton}>
              <Text style={styles.panelButtonTitle}>Book Seat</Text>
            </TouchableOpacity>

            
          </View>
        </Interactable.View>




          {!this.props.card_exist && (this.props.charge_type === 'CARD') && this.getTheFuckOut()}


          <Animated.View
          animation="slideInUp"
          style={[styles.okayokayyy, animatedStyle2, {
            //opacity: this.state.expanded ? 1 : 0
          }]}>
          {this.state.type === 'Money' &&

          <View style = {{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          paddingRight: 20,
          paddingLeft: 20,

          }}>
          <ListItem
          onPress = {() => this.onSelect('CASH')}
          >
          <Icon style = {{color: '#27D9A1', paddingRight: 10, fontSize: 30}}
                name = "money" />
                  <Text style = {{
                    color: '#43496A', fontSize: 25,fontFamily: "Montserrat-Regular",
                  }}> Cash
          </Text>
          <Right>
          {this.props.charge_type == 'CASH' && <Image source = {check}/>}
          </Right>

          </ListItem>
          <ListItem
          onPress = {() => this.onSelect('CARD')}
          
          >
          <Icon2 style = {{color: '#27D9A1', paddingRight: 10, fontSize: 30}}
                  name = "credit-card" />
                    <Text style = {{
                      color: '#43496A', fontSize: 25,fontFamily: "Montserrat-Regular",
                    }}> Card
            </Text>
          <Right>
          {this.props.charge_type == 'CARD' && <Image source = {check}/>}
          </Right>

          </ListItem>
          <ListItem
          onPress = {() => this.onSelect('WALLET')}
          style = {{
            borderBottomWidth: 0
          }}
          >
          <Icon2 style = {{color: '#27D9A1', paddingRight: 10, fontSize: 30}}
                  name = "wallet" />
                    <Text style = {{
                      color: '#43496A', fontSize: 25,fontFamily: "Montserrat-Regular",
                    }}> Wallet
            </Text>
          <Right>
          {this.props.charge_type == 'WALLET' && <Image source = {check}/>}
          </Right>

          </ListItem>
          </View>
          }
          </Animated.View>


          <Modal isVisible={this.state.showModal}>
          {this.displayshit()}
          <View style = {{ flex: 0.1, 
            backgroundColor: 'transparent',
            alignItems: 'center',
            justifyContent: 'center'  
          }}>

          <TouchableOpacity
          onPress = {() => this.setState({showModal: false})}
              >
              <Text style = {{
                color: '#FFF',
                fontSize: 18,
                //fontWeight: 'bold'
                fontFamily: "Montserrat-Bold",
              }}>Dismiss</Text></TouchableOpacity>
                

            </View>
          
        
        </Modal>


          <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={(date) => this._handleDatePicked(date)}
          onCancel={this._hideDateTimePicker}
        />
        
        {/* <ProgressDialog 
          visible={this.state.loading} 
          message="Please, wait..."
          /> */}
        {/* <SnackBar visible={!this.props.network_connected || !this.state.network_ish} textMessage="Network Unavailable!"/> */}
        <Loader show = {this.state.openLoader} msg = {this.state.msg} close={this.close}  loading = {this.state.isLoading}/> 
      

      </View>
    );
  }
}

const check = require("../../../assets/success.png");


const styles = StyleSheet.create({
  container: {
   
    //backgroundColor: 'rgba(0,0,0,0.8)'
  },
  filterContainer: {
    //backgroundColor: '#278485',
    backgroundColor: '#22313F',
    paddingTop: 10
  },
  filterTop: {
    height: 36
  },
  filterUp: {
    marginLeft: 24,
    width: 26,
    height: 26
  },
  filterField: {
    height: 40,
    backgroundColor: '#22313F',
    //backgroundColor: '#3a969a',
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 4,
    justifyContent: 'center'
  },

  filterField2: {
    height: 40,
    //backgroundColor: '#3a969a',
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 4,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },

  href: {
    backgroundColor: '#FFF',
    borderRadius: 4,
    paddingBottom: 5,
    paddingTop: 5,
    paddingLeft: 15,
    paddingRight: 15,
    alignContent: 'center',
    alignItems: 'center', 
    justifyContent: 'center',
  },

  hrefText: {
    color: '#777',
    //color: '#3a969a',
    fontSize: 15,
    //fontWeight: '500',
    fontFamily: "Montserrat-Bold",
  
  },

  hrefActive: {
    backgroundColor: '#22A7F0',
    borderRadius: 4,
    paddingBottom: 5,
    paddingTop: 5,
    paddingLeft: 15,
    paddingRight: 15,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },

  hrefActiveText: {
    color: '#FFF',
    fontSize: 15,
    //fontWeight: '500',
    fontFamily: "Montserrat-Bold",
  
  },

  filterFieldText: {
    color: '#FFF',
    //color: 'white',
    fontSize: 20,
    paddingLeft: 20,
    fontFamily: "Montserrat-Bold",
    //fontWeight: '500',
    marginLeft: 30
  },
  content: {
    padding: 20,
    backgroundColor: 'white'
  },
  panelTitle: {
    fontSize: 30,
    marginBottom: 10,
    height: 35,
    textAlign: 'center',
    fontFamily: "Montserrat-Bold",
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
    backgroundColor: '#22313F',
    //backgroundColor: '#87D37C',
    //backgroundColor: '#de6d77',
    alignItems: 'center',
    marginVertical: 10
  },
  panelButtonTitle: {
    fontSize: 17,
    //fontWeight: 'bold',
    color: 'white',
    fontFamily: "Montserrat-Bold",
  },
  photo: {
    width: Screen.width-40,
    height: 190,
    marginBottom: 20
  },
  okayokayyy: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#FFF',
    borderTopWidth:1,
    borderTopColor: '#777',
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    elevation: 2,
  
    zIndex: 1000,
    top: height,
    left: 0,
    right: 0,
    height: 190,
    //alignItems: 'center',
    justifyContent: 'space-between',
  },
  listText: {
    fontSize: 15,
    marginLeft: 20,
    color: '#22313F',
    fontFamily: "Montserrat-Regular",
    marginBottom: 5,
  },
  listIcon: {
    width: 7,
    height: 7,
    backgroundColor: '#111',
  },

  green: {
    width: 7,
    height: 7,
    backgroundColor: '#de6d77',
    borderRadius: 7
  },

  yellow: {
    width: 7,
    height: 7,
    backgroundColor: 'yellow',
    borderRadius: 7
  },
  circelFirst: {
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: '#FFF',
    borderRadius: 20,
    borderColor: '#87D37C',
    borderWidth: 5,
    top: 55,
    zIndex: 2,
    left: 20
},
circelSecond: {
  position: 'absolute',
  width: 20,
  height: 20,
  backgroundColor: '#FFF',
  //borderColor: '#22A7F0',
  borderColor: '#F05959',
  borderWidth: 5,
  borderRadius: 20,
  top: 105,
  zIndex: 2,
  left: 20
  },
  dot1: {
      position: 'absolute',
      height: 5,
      top: 80,
      zIndex: 2,
      left: 28,
      borderColor: '#FFF',
      borderWidth: 1,
  },
  dot2: {
      position: 'absolute',
      height: 5,
      top: 90,
      zIndex: 2,
      left: 28,
      borderColor: '#FFF',
      borderWidth: 1,
  },
  dot3: {
      position: 'absolute',
      height: 5,
      top: 100,
      zIndex: 2,
      left: 28,
      borderColor: '#FFF',
      borderWidth: 1,
  },
  pick: {
    fontFamily: 'Montserrat-Regular',
    color: '#888',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 15,
},
dot2: {
  position: 'absolute',
  height: 5,
  top: 90,
  zIndex: 2,
  left: 28,
  borderColor: '#FFF',
  borderWidth: 1,
},
pinInputStyle: {
  backgroundColor: '#FFF',
  height: 50, 
  borderColor: '#EEE', 
  borderWidth: 1,
  fontFamily: "Montserrat-Regular",
  fontSize: 20,
  paddingLeft: 20,
},
dot2: {
  position: 'absolute',
  height: 5,
  top: 90,
  zIndex: 2,
  left: 28,
  borderColor: '#FFF',
  borderWidth: 1,
},
realDot1: {
  width: 10,
  height: 10,
  backgroundColor: '#87D37C',
  //borderColor: '#22A7F0',
  //borderColor: '#87D37C',
  //borderWidth: 5,
  borderRadius: 20,
  margin: 10,
},
realDot2: {
  width: 10,
  height: 10,
  backgroundColor: '#F05959',
  //borderColor: '#22A7F0',
  borderRadius: 20,
  margin: 10,
},
touch: {
  width: '85%',
  height: 45,
  alignSelf: 'center',
  marginTop: 20,
  borderWidth: 1,
  borderColor: '#2B8E2F',
  borderRadius: 36,
  alignSelf: 'center',
  alignItems: 'center',
},
   textError2: {
        backgroundColor: '#22A7F0',
        margin: 15,
        textAlign: 'center',
        fontFamily: "Montserrat-Regular",
        //paddingLeft: 50,
        color: '#FFF',
        padding: 10,
        fontSize: 15,
    },
});



const mapStateToProps = ({ map }) => {
	const { destination, hoveron,
	  pickup, vehicle,
	  latitude,
	  longitude,
	  latitudeDelta,
	  longitudeDelta,
	  estimated_price,
	  distanceInKM,
	  selected,
	  distanceInHR,
	  last_4,
	  card_exist, card_type,
    prices,
    flutterwave_token,
    history,
    myroutes,
    done,
    routes,
    charge_type,
    history_single,
    getting_route,
    network_connected,
	  error, region, user, distance_info, loading,emergency, status } = map;
	return {
		last_4,
		card_exist,
	  destination,
	  pickup,
	  vehicle,
	  error,
	  distanceInKM,
    distanceInHR,
    flutterwave_token,
    network_connected,
	  hoveron,
	  distance_info,
	  loading,
	  region,
	  user,
	  status,
	  latitude,
    longitude,
    myroutes,
	  selected,
	  latitudeDelta,
	  longitudeDelta,
	  emergency,
	  prices,
	  done,
	  estimated_price,
	  history_single,
	  history,
    card_type,
    getting_route,
    routes,
    charge_type,
	};
  };

  export default connect(mapStateToProps, {
	getCard,from_where, all_route, charge_method, onPayment, getMyRoutes,
  })(RouteSingle);
  