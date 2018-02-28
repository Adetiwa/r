import React, { Component } from "react";
import { StyleSheet, View, Switch,Text,Keyboard, StatusBar,Platform, Image,  TextInput, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { connect } from 'react-redux';

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


class CardView extends Component {
    constructor(props) {
        super(props);
        this.state = {
          card_num: '',
          month_year: '',
          month: '',
          year: '',
          cvv: '',
          running: false,
          len: 0,
          num_error: false,
          ex_error: false,
          cvv_error: false,
          card_type: null,
          showText: '',
          loading: false,

          from: 'payment'
          
        }
    }

    componentWillMount() {
        var chose = this.props.navigation.state.params.from;
        this.setState({from: chose})

        //var visaCards = creditCardType('4111');
        //console.log(visaCards[0].type);  // 'visa'

    }

    reload() {
        this.validateCard();
    }
    getTheFuck() {
        if (!this.props.card_exist){
            this.props.charge_method('CASH');
        }
        var froom = this.state.from;
        if (froom === "payment") {
            this.props.navigation.navigate('Payment');

        }  else if (froom == 'route') {
            var route_id = this.props.navigation.state.params.id;
            this.props.navigation.navigate('RouteSingle', { route_id: route_id })

          
        } else if(froom == "wallet") {
            if (this.props.card_exist) {
                this.props.navigation.navigate('Wallet');
            } else {
                this.props.navigation.navigate('Payment');
            }
       } else {
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


    formatFunction(inputText) {
        this.setState({month_year: inputText})
        if(this.state.len <= inputText.length) {
            if(inputText.length === 2){
                this.setState({month_year: inputText + " / "})
            } 
            var numberValidation = valid.expirationDate(inputText, 22);

            if (!numberValidation.isValid) {
                this.setState({ex_error: true});
            } else {
                this.setState({ex_error: false});
                this.setState({month: numberValidation.month}); 
                this.setState({year: numberValidation.year}); 
            }

        }
        this.setState({len: inputText.length })
    }


    handleCardNumber(text){
        if (text.length == 0) {
            this.setState({num_error: true});
            this.setState({card_type: null});
            this.setState({card_num: ''});
                
        } else {
            let formattedText = text.split(' ').join('');
            if (formattedText.length > 0) {
            formattedText = formattedText.match(new RegExp('.{1,4}', 'g')).join(' ');
            }
            this.setState({ card_num: formattedText });
            var numberValidation = valid.number(formattedText);

            if (!numberValidation.isPotentiallyValid) {
            this.setState({num_error: true});
            this.setState({card_type: null});
                
            }

            if (numberValidation.card) {
                this.setState({num_error: false});
                this.setState({card_type: numberValidation.card.type});
                
                console.log(numberValidation.card.type); // 'visa'
            }

            //this.stateState({ card_type: creditCardType(formattedText) })
            //console.log(this.state);
            return formattedText;
        }
      }

      changeCVV(text) {
          if (text.length < 3) {
            this.setState({cvv_error: true});
            //this.setState({cvv: ''});
                

          } else {
              this.setState({cvv_error: false});
              this.setState({cvv: text})
          }
      }

      async validate(number, cvv, month, year) {
        Keyboard.dismiss();
        this.setState({ loading: true });
        num = number.replace(/\s/g, '');
                
        fetch('https://admin.rova.com.ng/api2/tokenize', {
          
                method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    number: num,
                    cvv: cvv,
                    expiry_month: month,
                    expiry_year: year,
                    email: this.props.user.email,
                    user: this.props.user.userid
                  })
                })
                .then((response) => response.json())
                .then((responseJson) => {
                  console.log("responseJson is "+responseJson);
                  this.setState({ loading: false });
                  let status = responseJson.status;
                  if (status === 'success') {
                      this.props.hahaCard(responseJson);
                        this.getTheFuck();
                  } else {
                    this.setState({ loading: false });
                    this.setState({show: true});
                    this.setState({showText: responseJson.msg});
                    
                  }
          
                })
                .catch((error) => {
                  this.setState({ loading: false });
                  //this.err
                  console.log(error);
                  
              })
        //this.props.clearEverything();
      }

  
      validateCard() {
          this.setState({show: false});
          this.setState({showText: ""});
          if (this.state.cvv_error || this.state.num_error || this.state.ex_error) {
            this.setState({show: true});
            this.setState({showText: "correct the above errors"});
          } else if (this.state.card_num == '' || this.state.month == '' || this.state.year == '' || this.state.cvv == '') {
            this.setState({show: true});
            this.setState({showText: "input all fields"});
          } else {
              //run code 
              this.validate(this.state.card_num, this.state.cvv, this.state.month, this.state.year);
          }
      }

  render() {
    return (
      <View style={styles.container}>
        
        <Header style = {{borderBottomColor: "#22313F", borderBottomWidth: 1, backgroundColor: "#22313F"}} >
            <Left>
                <TouchableOpacity
                        transparent onPress={() => this.getTheFuck()}>
                <Icon style = {{color : "#FFF", fontSize: 40, fontFamily: 'Montserrat'}}  size = {40} name="close" />
                </TouchableOpacity>

            </Left>

            <Body>
            <Title style = {{color: '#FFFF', fontWeight: '100',fontFamily: 'Montserrat',
									}}>Payment</Title>

            </Body>
            <Right>
            </Right>
        </Header>
        <Content>

    <View style = {{marginTop: 10}} />
      {this.handleImages(this.state.card_type)} 
       <TextInput
                underlineColorAndroid={'transparent'}
                autoCapitalize={'none'}
                autoCorrect={false}
                value = {this.state.card_num}
                onChangeText = {(input)=>this.handleCardNumber(input)}
                placeholder={'Card Number'}
                keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
                placeholderStyle={styles.placeholder}
                enablesReturnKeyAutomatically={false}
                style={this.state.num_error ? styles.error : styles.pinInputStyle}
            />

            <TextInput
                underlineColorAndroid={'transparent'}
                autoCapitalize={'none'}
                autoCorrect={false}
                value = {this.state.month_year}
                maxLength={7}
                onChangeText={(input) => this.formatFunction(input)}
                //onChangeText={(value) => this.inputToValue(value)}
                placeholder={'MM / YY'}
                keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
                placeholderStyle={styles.placeholder}
                enablesReturnKeyAutomatically={false}
                style={this.state.ex_error ? styles.error : styles.pinInputStyle}
            />


<Image source = {require('./icons/002-credit-card.png')} style={styles.searchIcon3} />
<TextInput
                underlineColorAndroid={'transparent'}
                autoCapitalize={'none'}
                autoCorrect={false}
                maxLength={3}
                onChangeText={(value) => this.changeCVV(value)}
                placeholder={'CVV'}
                keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
                //placeholderTextColor ="#3e445f"
                placeholderStyle={styles.placeholder}
                //onEndEditing = { this.verifyCode.bind(this) }
                enablesReturnKeyAutomatically={false}
                style={this.state.cvv_error ? styles.error : styles.pinInputStyle} />

        {this.state.show &&
                <Text style = {styles.textError}>{this.state.showText}</Text>
            }
             
                <TouchableOpacity onPress = {() => this.validateCard()} style={styles.panelButton}>
              <Text style={styles.panelButtonTitle}>Save card</Text>
            </TouchableOpacity>

        </Content>

        <SnackBar visible={!this.props.network_connected} textMessage="Network Unavailable!" actionHandler={()=> this.reload()} actionText="Try Again"/>
				<ProgressDialog 
				visible={this.state.loading} 
				message="Please, wait..."
				/>

      </View>
    );
  }
}

<Text style = {{
								backgroundColor: '#F09B95',
								margin: 10,
								textAlign: 'center',
								fontFamily: "Montserrat",
								//paddingLeft: 50,
								color: '#FFF',
								padding: 10,
								fontSize: 15,
							}}>
							Network Unavailable!
							</Text>


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

   
    searchIcon: {
        position: 'absolute',
        right: 15,
        top: 17,
        zIndex: 2,
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
    onPayment,
    charge_method,
  })(CardView);
  
  