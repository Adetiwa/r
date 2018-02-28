import React, { Component, PropTypes } from 'react';
import {
	StyleSheet,
	TouchableOpacity,
	Text,
	Animated,
	Easing,
	Image,
	Alert,
	View,
} from 'react-native';
import { connect } from 'react-redux';

import {  
	destinationChanged,
	select_vehicle,
	hoverondesc,
	pickupChanged,
	input_everything,
	get_name_of_loc,
	getAddressPrediction,
	geocodeTheAddress_pickup,
	geocodeTheAddress_dest,
	getDistance,empty_predictions,
	getRoute,
	set_suggestion_pick,

} from '../../actions/Map';

import { ProgressDialog } from 'react-native-simple-dialogs';
import SnackBar from 'react-native-snackbar-component';

import Logo from './Logo';
import Form from './Form';
import Wallpaper from './Wallpaper';
import ButtonSubmit from './ButtonSubmit';
import SignupSection from './SignupSection';

class LoginScreen extends Component {
	constructor(props) {
		super(props)
	
		// Bind the this context to the handler function
		this.handler = this.handler.bind(this);
		this.handler2 = this.handler2.bind(this);
		this.handler6 = this.handler6.bind(this);
		this.handler3 = this.handler3.bind(this);
		this.handler4 = this.handler4.bind(this);
		this.handler5 = this.handler5.bind(this);
		this.homeHandler = this.homeHandler.bind(this);

		this.buttonAnimated = new Animated.Value(0);
		this.growAnimated = new Animated.Value(0);
	
		// Set some state
		this.state = {
			type: "home",
			isLoading: false,
		};
	}
	
	homeHandler(e) {
		e.preventDefault()
		this.setState({
			type: 'home'
		})
	  }

	handler(e) {
		e.preventDefault()
		this.setState({
			type: 'reg'
		})
	  }

	  handler2(e) {
		e.preventDefault()
		this.setState({
			type: 'login'
		})
	  }

	  handler6(e) {
		e.preventDefault()
		this.setState({
			type: 'forgot'
		})
	  }
	
	  handler3(e) {
		e.preventDefault()
		this.setState({
			type: 'work'
		})
	  }


	  handler4(e) {
		e.preventDefault()
		this.setState({
			type: 'reg'
		})
	  }

	  handler5(e) {
		e.preventDefault()
		this.setState({
			type: 'route'
		})
	  }
	
	  shows(type) {
		  if (type === 'route') {
			if (this.props.selected_route !== null) {
				return true;
			} else {
				return false;
			}
		 } else if (type === 'work') {
				if (this.props.predictions === null && this.props.destination !== '' && this.props.dropoff_coords !== null) {
					return true
				} else {
					return false
				}
		} else if (type === 'home') {
				if (this.props.predictions === null && this.props.pickup !== '' && this.props.pickup_coords !== null) {
					return true
				} else {
					return false
				}
			} else {
				return true;
			}
		  }

		
	
isLoading2(type) {
	if (type === 'route') {
		if (this.props.getting_route) {
			return true;
		} else {
			return false;
		}
	} else if (type === 'work') {
		if (this.props.geocoding) {
				return true
			} else {
				return false
			}
	} else if (type === 'home') {
			if (this.props.geocoding) {
				return true
			} else {
				return false
		}
		} else if (type === 'login') {
			if (this.props.loading) {
				return true;
			} else {
				return false;
			}
		}
	else if (type === 'reg') {
			if (this.props.loadingReg) {
				return true;
			} else {
				return false;
			}
		}
			else {
			return false;
		}
}

getMessage(t) {
	if (t == 'reg') {
		msg = this.props.errorReg;
	} else if (t == 'login') {
		msg = this.props.error;
	} else {
		msg = '';
	}
	return msg;
}
	  
	
	render() {
		return (
			<Wallpaper>
				<Logo 
				type = {this.state.type}
				msg = {this.getMessage(this.state.type)}
				show = {true}
				length = {this.props.suggested_route !== null ? this.props.suggested_route.length : 0}
				 />
				<Form type = {this.state.type}
					handler4 = {this.handler4}
				/>
				<SignupSection 
				handler = {this.homeHandler} 
				handler2 = {this.handler2} 
				handler6 = {this.handler6} 
				type = {this.state.type} 
				geocoding = {this.props.geocoding}
				network = {this.props.network_connected}
				show = {this.props.predictions === null}
				/>
				<ButtonSubmit 
				handler3 = {this.handler3} 
				handler4 = {this.handler4}
				handler5 = {this.handler5} 
				type = {this.state.type} 
				network = {this.props.network_connected}
				show = {this.shows(this.state.type)} 
				navigation={this.props.navigation}
				isLoading = {this.isLoading2(this.state.type)}  />
				
				<SnackBar visible={!this.props.network_connected} textMessage="Network Unavailable!"/>

				<ProgressDialog 
				visible={(this.props.geocoding || this.props.getting_route || this.props.loading || this.props.loadingReg) && this.props.network_connected} 
				message="Please, wait..."
				/>
			</Wallpaper>
		);
	}
}

const mapStateToProps = ({ map }) => {
	const {
	  work,
	  home,
	  pickup,
	  input_done,
	  hoveron,
	  loading,
	  errorReg,
	  error,
	  status,
	  region,
	  user,
	  predictions,
	  geocoding,
	  pickup_coords,
	  prediction_error,
	  destination,
	  pickup_location,
	  destination_location,
	  loading_prediction,
	  loadingReg,
	  error_geoecoding,
	  dropoff_coords,
	  network_connected,
	  getting_route,
	  suggested_route,
	  selected_route,
	} = map;
	return {
	  work,
	  home,
	  pickup,
	  input_done,
	  hoveron,
	  loading,
	  status,
	  region,
	  errorReg,
	  error,
	  user,
	  predictions,
	  prediction_error,
	  geocoding,
	  pickup_coords,
	  pickup_location,
	  dropoff_coords,
	  destination_location,
	  network_connected,
	  loading_prediction,
	  loadingReg,
	  error_geoecoding,
	  destination,
	  getting_route,
	  suggested_route,
	  selected_route
	};
  };
  
  export default connect(mapStateToProps, {
	destinationChanged,
	select_vehicle,
	hoverondesc,
	pickupChanged,
	input_everything,
	get_name_of_loc,
	getAddressPrediction,
	geocodeTheAddress_pickup,
	geocodeTheAddress_dest,
	getDistance,empty_predictions,
	getRoute,
	set_suggestion_pick,
  
  })(LoginScreen);
  
  