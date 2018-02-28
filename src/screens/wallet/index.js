import React, { Component } from "react";
import { StyleSheet, View, Switch,Text,Keyboard, StatusBar,Platform, Image,  TextInput, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import Modal from "react-native-modal";

import {  destinationChanged,
    select_vehicle,
    hoverondesc,
    getCurrentLocation,
    get_name_of_loc,
    update_region,
    fetchPrice,
    getDistance,
    hahaCard,
    calculatePrice,
    StorePrice,
    submitOrder,
    updateCard,
    reset,
    verifyCard,
    hahaWallet,
    onPayment,
    charge_method,

  } from '../../actions/Map';
import {
	Container,
	Header,
	Title,
	Content,
	Button,
	Icon,
	List,
	ListItem,
	Left,
	Right,
	Body,
	icon,
  Separator,
  CheckBox,
} from 'native-base';
import { ProgressDialog } from 'react-native-simple-dialogs';
import SnackBar from 'react-native-snackbar-component';

var valid = require('card-validator');
var creditCardType = require('credit-card-type');
import placeholder from "../form/placeholder";


class Wallet extends Component {
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
          from: 'payment'
        }
    }

    componentWillMount() {
        var chose = this.props.navigation.state.params.from;
        this.setState({from: chose})
    }

    componentDidMount() {
        if (!this.props.card_exist){
            this.props.navigation.navigate('CardView', { from: 'wallet' });
        }
    }
    getTheFuck() {
        var froom = this.state.from;
        if (froom === "payment") {
            this.props.navigation.navigate('Payment');

        }  else {
            this.props.navigation.navigate('Map');

        }
    }

    handleImages(ty) {
        if (ty == null) {
            return (
                <Image source = {require('./icons/001-credit-card-1.png')} style={styles.searchIcon} />
            );
        } else if (ty == 'visa') {
            return (
                <Image source = {require('./icons/stp_card_visa.png')} style={styles.searchIcon} />
            );
        } else if(ty == 'master-card') {
            return (
                <Image source = {require('./icons/stp_card_mastercard.png')} style={styles.searchIcon} />
            );
        } else {
            return (
                <Image source = {require('./icons/stp_card_unknown.png')} style={styles.searchIcon} />
            );
        }
    }

    handleCardNumber(input) {
        this.setState({amount: input});
    }

    formatFunction(input) {
        this.setState({pin: input});
    }

    handleOptCode(input) {
        this.setState({otp: input});
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

    async finanlize(otp, ref) {
        Keyboard.dismiss();
        this.setState({ loading: true });
       
        fetch('https://admin.rova.com.ng/api2/submit-otp', {
          
                method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    otp: otp,
                    ref: ref,
                    user: this.props.user.userid,
                  })
                })
                .then((response) => response.json())
                .then((responseJson) => {
                  console.log("responseJson is "+JSON.stringify(responseJson));
                  this.setState({ loading: false });
                  let status = responseJson.status;
                  if (status === 'success') {
                      this.props.hahaWallet(responseJson);
                        this.getTheFuck();
                        
                  } else {
                    this.setState({ loading: false });
                    this.setState({show: true});
                    this.setState({showText: responseJson.status_msg});
                    
                  }
          
                })
                .catch((error) => {
                  this.setState({ loading: false });
                  console.log(error);
                  
              })
      }


    submitTransaction() {
        this.setState({show: false});
        this.setState({showText: ""});
        if (this.state.amount == '' || this.state.pin == '') {
          this.setState({show: true});
          this.setState({showText: "both fields are important!"});
        } else if (this.props.flutterwave_token == 0 || this.props.flutterwave_token == null) {
            this.setState({show: true});
            this.setState({showText: "wow, there is an error with your card. Try again later :("});
        } else {
            //run code 
            this.FundWallet(this.state.amount, this.state.pin);
        }
    }


    async FundWallet(amount, pin) {
        Keyboard.dismiss();
        this.setState({ loading: true });
       
        fetch('https://admin.rova.com.ng/api2/fund-wallet', {
          
                method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    amount: amount*100,
                    pin: pin,
                    email: this.props.user.email,
                    user: this.props.user.userid,
                    authCode: this.props.flutterwave_token
                  })
                })
                .then((response) => response.json())
                .then((responseJson) => {
                  console.log("responseJson is "+JSON.stringify(responseJson));
                  this.setState({ loading: false });
                  let status = responseJson.status;
                  if (status === 'success') {
                      //this.props.hahaWallet(responseJson);
                        //this.getTheFuck();
                        this.setState({transaction_reference: responseJson.ref});
                        if (responseJson.status_msg == 'send_otp') {
                            this.setState({show_otp: true});
                        }
                        
                  } else {
                    this.setState({ loading: false });
                    this.setState({show: true});
                    this.setState({showText: responseJson.status_msg});
                    
                  }
          
                })
                .catch((error) => {
                  this.setState({ loading: false });
                  //this.err
                  console.log(error);
                  
              })
        //this.props.clearEverything();
      }



 render() {
    return (
      <View style={styles.container}>
        
        <Header style = {{borderBottomColor: "#22313F", borderBottomWidth: 1, backgroundColor: "#22313F"}} >
            <Left>
                <TouchableOpacity
                        transparent onPress={this.state.show_otp ? () => this.setState({show_otp: false}) : () => this.getTheFuck()}>
                <Icon style = {{color : "#FFF", fontSize: 40, fontFamily: 'Montserrat'}}  size = {40} name={this.state.show_otp ? "arrow-back" : "close"} />
                </TouchableOpacity>

            </Left>

            <Body>
            <Title style = {{color: '#FFF', fontWeight: '100',fontFamily: 'Montserrat',
									}}>Wallet</Title>

            </Body>
            <Right>
            <TouchableOpacity
            style = {{
              borderWidth: 1,
              borderColor: "#22313F",
              borderRadius: 4,
              backgroundColor: '#FFF',
              padding: 5,
            }}>
            
              <Text style = {{fontFamily: 'Montserrat-Regular'}}
                ><Icon style = {{fontSize: 18,}} name = "add"/> {this.props.wallet_nice}</Text></TouchableOpacity>
          </Right>
        </Header>
        <Content>

    <View style = {{marginTop: 10}} />
    {!this.state.show_otp &&
    
    <View>
       <TextInput
                underlineColorAndroid={'transparent'}
                autoCapitalize={'none'}
                autoCorrect={false}
                value = {this.state.amount}
                onChangeText = {(input)=>this.handleCardNumber(input)}
                placeholder={'Amount (₦)'}
                keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
                placeholderStyle={styles.placeholder}
                enablesReturnKeyAutomatically={false}
                style={this.state.num_error ? styles.error : styles.pinInputStyle}
            />

{this.handleImages(this.state.card_type)} 
          <TextInput
                underlineColorAndroid={'transparent'}
                autoCapitalize={'none'}
                autoCorrect={false}
                value = {this.state.pin}
                maxLength={4}
                onChangeText={(input) => this.formatFunction(input)}
                //onChangeText={(value) => this.inputToValue(value)}
                placeholder={'Your Card Pin'}
                secureTextEntry={true}
                keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
                placeholderStyle={styles.placeholder}
                enablesReturnKeyAutomatically={false}
                style={this.state.pin_error ? styles.error : styles.pinInputStyle}
            />
            </View>
    }

    {this.state.show_otp &&
     <View>
     <TextInput
              underlineColorAndroid={'transparent'}
              autoCapitalize={'none'}
              autoCorrect={false}
              value = {this.state.otp}
              onChangeText = {(input)=>this.handleOptCode(input)}
              placeholder={'Enter OPT CODE'}
              keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
              placeholderStyle={styles.placeholder}
              enablesReturnKeyAutomatically={false}
              style={this.state.num_error ? styles.error : styles.pinInputStyle}
          />
    </View>
    }


       
        
        
        {this.state.show &&
                <Text style = {styles.textError}>{this.state.showText}</Text>
            }
                <TouchableOpacity onPress = {!this.state.otp ? () => 
                    this.submitTransaction() :  () => 
                    this.validateTransaction()
                    } style = {styles.panelButton}><Text style = {styles.panelButtonTitle}> 
                {this.state.show_otp ? 'Fund Wallet' : 'Continue'}
                 </Text></TouchableOpacity>
        </Content>

        <SnackBar visible={!this.props.network_connected} textMessage="Network Unavailable!"/>
        <ProgressDialog 
				visible={this.state.loading && this.props.network_connected} 
				message="Please, wait..."
				/>

      </View>
    );
  }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    pinInputStyle: {
        backgroundColor: '#FFF',
        height: 50, 
        borderBottomColor: '#DDD', 
        borderBottomWidth: 1,
        fontFamily: "Montserrat",
        fontSize: 20,
        paddingLeft: 20,
    },
    error: {
        backgroundColor: '#FFF',
        height: 50, 
        borderBottomColor: '#ff0033', 
        //borderBottomColor: '#FF9494', 
        borderBottomWidth: 1,
        fontFamily: "Montserrat",
        fontSize: 20,
        paddingLeft: 20,
    },
    placeholder: { 
        fontFamily: "Montserrat",
        fontSize: 240,
    },
    touch: {
        width: '85%',
        flex: 1,
        height: 45,
        alignSelf: 'center',
        marginTop: 20,
        borderWidth: 3,
        borderColor: '#AAA',
        borderRadius: 6,
    },
    text: {
        fontFamily: "Montserrat",
        //alignSelf: 'center',
        justifyContent:'center',
        lineHeight:32,
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 20,
        color: '#AAA'
    },
    textError: {
        // fontFamily: "Montserrat-Light",
        // //alignSelf: 'center',
        // marginTop: 20,
        // justifyContent:'center',
        // alignItems: 'center',
        // textAlign: 'center',
        // fontSize: 15,
        // color: '#ff0033'
        backgroundColor: '#F09B95',
        margin: 10,
        textAlign: 'center',
        fontFamily: "Montserrat",
        //paddingLeft: 50,
        color: '#FFF',
        padding: 10,
        fontSize: 15,
    },

    panelButton: {
        width: '85%',
        marginTop: 50,
        padding: 20,
        borderRadius: 10, 
        alignSelf: 'center',
        backgroundColor: '#22A7F0',
        //backgroundColor: '#87D37C',
        //backgroundColor: '#de6d77',
        alignItems: 'center',
        marginVertical: 10
      },
      panelButtonTitle: {
        fontSize: 20,
        //fontWeight: 'bold',
        color: 'white',
        fontFamily: "Montserrat",
      },
   
    searchIcon: {
        position: 'absolute',
        right: 15,
        top: 70,
        zIndex: 2,
    },

  

    searchIcon3: {
        position: 'absolute',
        right: 15,
        top: 120,
        zIndex: 2,
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
      distanceInHR,
      load,
      prices,
      order_info,
      card,
      pickup_coords,
      card_exist,
      dropoff_coords,
      type,
      wallet_nice,
      onpayment,card_status,
      charge_type,
      edit_progress,
      screenshot,from_payment, network_connected,
      scheduled,
      order_success,flutterwave_token,transaction_id,
      error_submitting_order,
      error, region, user, distance_info, loading,emergency, status } = map;
    return {
      destination,
      pickup,
      vehicle,
      onpayment,
      error,
      distanceInKM,
      distanceInHR,
      hoveron,
      distance_info,
      loading,
      card_exist,
      region,
      user,
      status,
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta,
      emergency,
      prices,
      estimated_price,
      order_info,
      pickup_coords,
      dropoff_coords,
      type,
      scheduled,card_status,
      order_success,
      card,load,
      charge_type,
      error_submitting_order,
      edit_progress,
      screenshot,
      wallet_nice,
      flutterwave_token,
      network_connected,
      transaction_id,from_payment,
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
    calculatePrice,
    StorePrice,
    updateCard,
    reset,
    hahaCard,
    verifyCard,
    submitOrder,
    hahaWallet,
    onPayment,
    charge_method,
  })(Wallet);
  
  