import React, { Component } from "react";
import { View, Image,Card,NetInfo, TextInput, StatusBar, Dimensions, Platform , TouchableOpacity} from "react-native";
import { connect } from 'react-redux';
import {  getCard,from_where,
	all_route,
	resetNetwork,
	getMyRoutes,
	network_change,
	get_wallet_info
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
	Text,
	Left,
	Right,
	Body,
	icon,
	Separator,
} from 'native-base';
import Notification from 'react-native-in-app-notification';
import TicketO from './../map/ticket';
import CardView from './card';
import StatusBarAlert from 'react-native-statusbar-alert';
import ImageLoad from 'react-native-image-placeholder';
import Modal from "react-native-modal";

import moment from 'moment';

import { ProgressDialog } from 'react-native-simple-dialogs';
import SnackBar from 'react-native-snackbar-component';

import styles from './styles';
import Loader from "../../components/loader";





class Ticket extends Component {
	constructor(props) {
        super(props);
        this.close = this.close.bind(this);
        
		this.state = {
	
		getting_route: false,
		thissingle: [],
		showModal: false,
		payment: '',
		my_selected: false,
        selected: [],
        openLoader: false,
        isLoading: false,
        msg: !this.props.network_connected && 'Network Unavailable'   
  
	
	  }
	}

	
	componentWillMount(){
		this.props.resetNetwork();
	
	
	}


    close(e) {
        e.preventDefault()
        this.setState({
          openLoader: false,
          msg: false
        });
      }
    

  formatDate() {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

  getDataDiff(date) {
	var date1 = new Date(date);
	var date2 = new Date(this.formatDate());
	var timeDiff = Math.abs(date2.getTime() - date1.getTime());
	var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

	 return diffDays;
	}


	  componentDidMount() {
	this.reload();

	NetInfo.isConnected.fetch().then().done(() => {
		NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange)
	});


  	if(this.props.screenProps.state.params) {
      data = this.props.screenProps.state.params.data;
			console.log('data passed is '+JSON.stringify(this.props.screenProps.state.params));
			if(data == 'new') {
					this.notification && this.notification.show({
					title: 'Ticket Purchased',
					message: 'You have successfully purchased a new ticket',
					vibrate: true,
					backgroundColour: '#FFF'
				})
			} else if (data == 'top-up') {
					this.notification && this.notification.show({
					title: 'Ticket Topup',
					message: 'You have successfully added to your existing ticket',
					vibrate: true,
					backgroundColour: '#FFF'
				})
			}
  	 this.props.screenProps.state.params.data = null;
	  }
		
		}

		handleConnectionChange = (isConnected) => {
			this.props.network_change(isConnected);
			if (isConnected) {
				this.reload();
			
			}
			console.log(`is connected: ${this.state.netStatus}`);
		  }


			componentWillUnmount() {
				NetInfo.removeEventListener('connectionChange', this.handleConnectionChange)
			}

			
		async reload() {
			this.props.get_wallet_info(this.props.user.userid);
			if (this.props.network_connected && this.props.myroutes === null) {
				this.runroute(this.props.user.userid);
			} 
			if (this.props.myroutes !== null) {
				if (this.props.myroutes.length > 0) {
				
					var chose = 'expired';
				
					var a = this.props.myroutes;
				
					var aFiltered = a.filter(function(elem, index){
					return elem.payment_status != chose;
					});
					this.setState({thissingle: aFiltered})
					
				}
			}
		}



		async componentWillReceiveProps() {
			if (this.state.thissingle.length == 0) {
				if (this.props.myroutes !== null) {
					if (this.props.myroutes.length > 0) {
					
						var chose = 'active';
					
						var a = this.props.myroutes;
					
						var aFiltered = a.filter(function(elem, index){
						return elem.payment_status == chose;
						});
						this.setState({thissingle: aFiltered})
						
					}
				}
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

		back() {
			this.props.my_route_selected(false);
		  }
		
		
		  selectShit(id, payment) {
		  
			var a = this.state.thissingle;
		  
			var aFiltered = a.filter(function(elem, index){
			  return elem.route_id == id;
			});
			thissingle3 = aFiltered;
			this.setState({selected: thissingle3});
			this.setState({my_selected: true});
		  }

		async runroute(id) {
			this.setState({ getting_route: true });
            this.setState({openLoader: true});
            this.setState({isLoading: true});
            
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
                      this.setState({openLoader: false});
                      this.setState({isLoading: false});
                    
					  this.props.getMyRoutes(responseJson);
					})
					.catch((error) => {
                      this.setState({ getting_route: false });
                      this.setState({isLoading: false});
                      this.setState({msg: 'Network Unavailable'});
                    
				  })
		  }

	render() {
		return (
			<Container style={styles.container}>
		<StatusBar backgroundColor='#22313F' barStyle='light-content' />
        
		<StatusBarAlert
					visible={!this.props.network_connected}
					backgroundColor="#ff0033"
					color="#FFF"
					pulse="background"
				>
				<TouchableOpacity
				onPress = {() => this.reload()}
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

		<Header androidStatusBarColor="#22313F" style = {{borderBottomColor: "#22313F", borderBottomWidth: 1, backgroundColor: "#22313F"}} >
			
				
				<Left>
			<TouchableOpacity
								transparent onPress={() => this.props.screenProps.goBack()}
								>
					  <Icon style = {{color : "#FFF", fontSize: 40, fontFamily: 'Montserrat-Regular'}}  size = {40} name= "close" />
                 </TouchableOpacity>

			</Left>

			<Body>
			<Title style = {{color: '#FFF',  fontFamily: 'Montserrat-Regular'}}>Active Tickets</Title>

          </Body>
          <Right>
            
          </Right>
				</Header>
				<Content style = {{
					backgroundColor: '#FFF',
					padding: 20,
				}}>
			
					{this.state.getting_route === false &&
					this.state.thissingle.length > 0 &&
                       
          			<List

                      dataArray={this.state.thissingle}
                      renderRow={data =>
            	<TouchableOpacity
								onPress = {() => this.selectShit(data.route_id, data.payment)}>
								<CardView  av = {true} distance = {data.route_id} payment_amount = {data.payment_amount} expires = {this.getDataDiff(data.date_expired)}  active = {this.getDataDiff(data.date_active)}  payment_method_of_payment = {data.payment_method_of_payment} word = {data.route} payment = {data.payment_status}/>
							</TouchableOpacity>
										  
										
						}
                      />
          }
          {this.state.getting_route === false &&
					this.state.thissingle.length === 0 &&
		  
					<CardView  av = {false}/>
				
				}
 	{this.state.thissingle !== null && this.state.selected.length > 0 &&
          <Modal isVisible={this.state.my_selected && this.state.selected !== null}>
          <View style={{ flex: 0.9, 
            backgroundColor: '#FFF',
            borderRadius: 20,
            padding: 20,  
          }}> 
          {this.state.selected.length > 0 &&
            <Text style = {{
              color: '#222',
              fontSize: 20,
              fontWeight: 'bold'
            }}>{this.getName(this.state.selected[0].payment_method_of_payment)} Pass</Text>
          }
          <Text style = {{
              color: '#888',
              fontSize: 15,
            }}>Show this to the bus driver in charge of your route</Text>
            
            <TicketO user = {this.props.user.userid} ticket = {this.state.selected}/>
          </View>
          <View style = {{ flex: 0.1, 
            backgroundColor: 'transparent',
            alignItems: 'center',
						justifyContent: 'space-between',
						flexDirection: 'row',
          }}>
          <TouchableOpacity
          onPress = {() => this.setState({my_selected: false })}
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

							<TouchableOpacity
							onPress={() => this.props.navigation.navigate('Edit', { ticket: this.state.selected[0].route_id })}
							//onPress={() => console.log('h')}
							style = {{
              
              }}>
              <Text style = {{
                color: '#FFF',
                fontSize: 18,
                fontFamily: "Montserrat-Bold",
              }}>Top-up</Text></TouchableOpacity>
                

            </View>
        </Modal>
 }


				</Content>
			
        {/* <SnackBar visible={!this.props.network_connected} textMessage="Network Unavailable!"/> */}
        {/* <ProgressDialog 
				visible={this.state.getting_route && this.props.network_connected} 
				message="Please, wait..."
                />
                 */}
                <Loader show = {this.state.openLoader} msg = {this.state.msg} close={this.close}  loading = {this.state.isLoading}/> 
          
				<Notification ref={(ref) => { this.notification = ref; }} />
			</Container>
		);
	}
}

//const menu = require("../../../img/MENU.png");
//const menu_white = require("../../../img/MENU_WHITE.png");

const mapStateToProps = ({ map }) => {
	const { destination, hoveron,
	  pickup, vehicle,
	  latitude,
	  longitude,
	  latitudeDelta,
	  longitudeDelta,
	  myroutes,
	  estimated_price,
	  distanceInKM,
	  selected,
	  distanceInHR,
	  last_4,
	  card_exist, card_type,
	  prices,
	  history,
    done,
    routes,
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
    network_connected,
	  hoveron,
	  distance_info,
	  loading,
	  region,
	  user,
	  status,
	  latitude,
	  longitude,
	  selected,
	  latitudeDelta,
	  longitudeDelta,
	  emergency,
	  prices,
	  myroutes,
	  done,
	  estimated_price,
	  history_single,
	  history,
    card_type,
    getting_route,
    routes,
	};
  };

  export default connect(mapStateToProps, {
	getCard,from_where, all_route,
	resetNetwork,
	get_wallet_info,
	network_change,
	getMyRoutes,
  })(Ticket);
