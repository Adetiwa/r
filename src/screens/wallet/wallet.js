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
import StatusBarAlert from 'react-native-statusbar-alert';
import Loader from "../../components/loader";

var valid = require('card-validator');
var creditCardType = require('credit-card-type');


class Wallet extends Component {
    constructor(props) {
        super(props);
        this.close = this.close.bind(this);
        
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
          from: 'payment',
          openLoader: false,
          isLoading: false,
          msg: !this.props.network_connected && 'Network Unavailable',   
    
        }
    }

    componentWillMount() {
        // var chose = this.props.navigation.state.params.from;
        // this.setState({from: chose})
    }

    close(e) {
        e.preventDefault()
        this.setState({
          openLoader: false,
          msg: false
        });
      }

    componentDidMount() {
        if (!this.props.card_exist){
            this.props.navigation.navigate('CardView');
        }
    }
    getTheFuck() {
        // var froom = this.state.from;
        // if (froom === "payment") {
        //     this.props.navigation.navigate('Payment');

        // }  else {
        //     this.props.navigation.navigate('Map');

        // }
        this.props.screenProps.goBack();
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
        // this.setState({show: false});
        // this.setState({showText: ""});
        // this.setState({msg: ""});
        this.setState({isLoading: false});
        this.setState({openLoader: false});
        this.setState({msg: null});
        
        if (this.state.amount == 0 || this.state.transaction_reference == '') {
        //   this.setState({show: true});
        //   this.setState({showText: "missing data!"});
            this.setState({isLoading: false});
            this.setState({openLoader: true});
            this.setState({msg:  "missing data!"});
        } else if (this.state.otp == '') {
        //   this.setState({show: true});
        //   this.setState({showText: "Enter the OTP Code"});
            this.setState({isLoading: false});
            this.setState({openLoader: true});
            this.setState({msg:  "Enter the OTP Code"});
        } else {
             //run code 
             console.log(JSON.stringify(this.state));
             console.log("user is "+this.props.user.userid);
             
            this.finanlize(this.state.otp, this.state.transaction_reference);
        }
    }

    async finanlize(otp, ref) {
        Keyboard.dismiss();
        this.setState({isLoading: true});
        this.setState({openLoader: true});
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
                  let status = responseJson.status;
                  if (status === 'success') {
                    this.setState({isLoading: false});
                    this.setState({openLoader: false});
                    this.setState({msg:  null});
                    
                      this.props.hahaWallet(responseJson);
                        this.getTheFuck();
                        
                  } else {
                    this.setState({isLoading: false});
                    this.setState({openLoader: true});
                    this.setState({msg: responseJson.status_msg});
                    
                    // this.setState({ loading: false });
                    // this.setState({show: true});
                    // this.setState({showText: responseJson.status_msg});
                    
                  }
          
                })
                .catch((error) => {
                //   this.setState({ loading: false });
                  this.setState({isLoading: false});
                  this.setState({openLoader: true});
                  this.setState({msg: 'Network Unavailable'});
                 
                  console.log(error);
                  
              })
      }


    submitTransaction() {
        // this.setState({show: false});
        // this.setState({showText: ""});
        
        this.setState({openLoader: false});
        this.setState({msg: null});
       
        //this.setState({msg: ""});
        if (this.state.amount == '' || this.state.pin == '') {
        //   this.setState({show: true});
        //   this.setState({showText: "both fields are important!"});

          this.setState({openLoader: true});
          this.setState({msg: 'Both fields are important!'});
        } else if (this.props.flutterwave_token == 0 || this.props.flutterwave_token == null) {
        
            this.setState({openLoader: true});
            this.setState({msg: 'An error occured while funding your wallet. Please try again later'});
            
        } else {
            //run code 
            this.FundWallet(this.state.amount, this.state.pin);
        }
    }


    async FundWallet(amount, pin) {
        Keyboard.dismiss();
        this.setState({ isLoading: true });
        this.setState({ openLoader: true });
        
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
                            // this.setState({msg: responseJson.real_status_msg});

                            this.setState({ isLoading: false });
                            this.setState({openLoader: true});
                    
                            this.setState({ msg: responseJson.real_status_msg });
                         }
                 } else {
                    this.setState({ isLoading: false });
                    this.setState({openLoader: true});
                    this.setState({msg: responseJson.status_msg});
                    
                  }
          
                })
                .catch((error) => {
                  this.setState({ isLoading: false });
                  this.setState({ openLoader: true });
                  this.setState({ msg: 'Network Unavailable!' });
                  //this.err
                  console.log(error);
                  
              })
        //this.props.clearEverything();
      }



 render() {
    return (
      <View style={styles.container}>
        	<StatusBar backgroundColor='#22313F' barStyle='light-content' />
        
		<StatusBarAlert
					visible={!this.props.network_connected}
					backgroundColor="#ff0033"
					color="#FFF"
					pulse="background"
				>
				<TouchableOpacity
				//onPress = {() => this.reload()}
				>
					<Text style = {{
						fontFamily: 'Montserrat-Regular',
						fontSize: 15,
						color: '#FFF',
						paddingTop: 15,
						paddingRight: 5,
						paddingLeft: 15,
						paddingBottom: 5,
					}}>Network Error. Please check your connection and Retry</Text>
					</TouchableOpacity>
			</StatusBarAlert>
		

        <Header  androidStatusBarColor="#22313F"  style = {{borderBottomColor: "#22313F", borderBottomWidth: 1, backgroundColor: "#22313F"}} >
            <Left>
                <TouchableOpacity
                        transparent onPress={this.state.show_otp ? () => this.setState({show_otp: false}) : () => this.getTheFuck()}>
                <Icon style = {{color : "#FFF", fontSize: 40, fontFamily: 'Montserrat-Regular'}}  size = {40} name={this.state.show_otp ? "arrow-back" : "close"} />
                </TouchableOpacity>

            </Left>

            <Body>
            <Title style = {{color: '#FFF', fontWeight: '100',fontFamily: 'Montserrat-Regular',
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

     {this.state.show &&
                <Text style = {styles.textError}>{this.state.showText}</Text>
            }
            
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
     
              
        {this.state.show &&
                <Text style = {styles.textError}>{this.state.showText}</Text>
            }

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


       
        
      
                <TouchableOpacity onPress = {!this.state.otp ? () => 
                    this.submitTransaction() :  () => 
                    this.validateTransaction()
                    } style = {styles.panelButton}><Text style = {styles.panelButtonTitle}> 
                {this.state.show_otp ? 'Fund Wallet' : 'Continue'}
                 </Text></TouchableOpacity>
        </Content>

        {/* <SnackBar visible={!this.props.network_connected} textMessage="Network Unavailable!"/> */}
    
        <Loader show = {this.state.openLoader} msg = {this.state.msg} close={this.close}  loading = {this.state.isLoading}/> 
          

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
        fontFamily: "Montserrat-Regular",
        fontSize: 20,
        paddingLeft: 20,
    },
    error: {
        backgroundColor: '#FFF',
        height: 50, 
        borderBottomColor: '#ff0033', 
        //borderBottomColor: '#FF9494', 
        borderBottomWidth: 1,
        fontFamily: "Montserrat-Regular",
        fontSize: 20,
        paddingLeft: 20,
    },
    placeholder: { 
        fontFamily: "Montserrat-Regular",
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
        fontFamily: "Montserrat-Regular",
        //alignSelf: 'center',
        justifyContent:'center',
        lineHeight:32,
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 20,
        color: '#AAA'
    },
    textError: {
        backgroundColor: '#F09B95',
        margin: 10,
        textAlign: 'center',
        fontFamily: "Montserrat",
        //paddingLeft: 50,
        color: '#FFF',
        padding: 10,
        fontSize: 15,
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

    panelButton: {
        width: '85%',
        marginTop: 50,
        padding: 20,
        borderRadius: 10, 
        alignSelf: 'center',
        backgroundColor: '#22313F',
        //backgroundColor: '#87D37C',
        //backgroundColor: '#de6d77',
        alignItems: 'center',
        marginVertical: 10
      },
      panelButtonTitle: {
        fontSize: 20,
        //fontWeight: 'bold',
        color: 'white',
        fontFamily: "Montserrat-Regular",
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
  
  