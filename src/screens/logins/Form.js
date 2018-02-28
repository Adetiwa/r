import React, { Component, PropTypes } from 'react';
import Dimensions from 'Dimensions';
import {
	StyleSheet,
	KeyboardAvoidingView,
	View,
	ActivityIndicator,
	TouchableOpacity,
	Image,
	Animated,
	Easing,
	Text,
} from 'react-native';
import Icon2 from 'react-native-vector-icons/Ionicons';
import CardView from '../map/card';
import { connect } from 'react-redux';
import ImageLoad from 'react-native-image-placeholder';
import LottieView from 'lottie-react-native';
import {  destinationChanged,
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
					set_suggestion_dest,
					find_route,
					all_route,
					selectRoute,
					telChanged,
					emailChanged,
					fullnameChanged,
					passwordChanged,
} from '../../actions/Map';

import {
	Container,
	Header,
	Title,
	Content,
	Button,
	Item,
	List,
	ListItem,
	Label,
	Input,
	Body,
	Left,
	Right,
	Icon,
	Toast,
	IconNB, 
	DeckSwiper,
	Card,
	CardItem,
	Picker,
  
	
	} from "native-base";

import UserInput from './UserInput';
import ButtonSubmit from './ButtonSubmit';
import SignupSection from './SignupSection';

import usernameImg from '../../../assets/username.png';
import passwordImg from '../../../assets/password.png';
import eyeImg  from '../../../assets/eye_black.png';

const datas = [];
//const Item = Picker.Item;

class Form extends Component {
	constructor(props) {
    super(props);
    this.state = {
			showPass: true,
			press: false,
			homeError: false,
			isLoggedIn: false,
      done: false,
      route: true,
			progress: new Animated.Value(0),
			
			fullname: '',
			email: '',
			tel: '',
			password: '',
			route: this.props.selected_route,
			logging_out: false,
      
		};
		this.showPass = this.showPass.bind(this);
	}

showPass() {
  this.state.press === false ? this.setState({ showPass: false, press: true }) :this.setState({ showPass: true, press: false });
}

  componentDidMount() {
	
	}

  onValueChange(value) {
		console.log(value);
		}

componentWillUpdate() {

	this.haha();
	if (this.props.type == 'route') {
	
}
	
}


select_suggest(suggestion, type) {
	if (type === 'dest') {
		this.props.set_suggestion_dest(suggestion);
		this.inputter(type);
	} else {
		this.props.set_suggestion_pick(suggestion);
		this.inputter(type)
	}
}

clearData() {
	data = [];
}

inputter(t) {
	if (t !== 'dest') {
      if (this.props.pickup != '') {
        this.props.geocodeTheAddress_pickup(this.props.pickup);
        this.props.input_everything();
			}
		} else {
			if (this.props.destination != '') {
        this.props.geocodeTheAddress_dest(this.props.destination);
        this.props.input_everything();
			}
		}
  }

haha() {

	datas = [];
	for (var key in this.props.predictions) {
		if (this.props.predictions.hasOwnProperty(key)) {
			datas.push(this.props.predictions[key]);
		}
	}
	//console.log(this.props.predictions);
}


onHomeChange(text) {
  this.setState({ homeError: false })
  if (this.props.pickup != '') {
    this.props.getAddressPrediction(text);
  }
  this.props.pickupChanged(text);
}

onWorkChange(text) {
  this.setState({ homeError: false })
  if (this.props.destination != '') {
    this.props.getAddressPrediction(text);
  }
  this.props.destinationChanged(text);
}

	render() {
		if(this.props.type === 'login') {
			return (
			<KeyboardAvoidingView behavior='padding'
				style={{
					flex: this.props.type == 'login'? 1: 2,
					alignItems: 'center',	
				}}>
				<UserInput source={usernameImg}
					placeholder='Email'
					autoCapitalize={'none'}
					returnKeyType={'done'}
					value = {this.props.email}
			  	onChangeText = {(input)=>this.props.emailChanged(input)}
          autoCorrect={false} />
				<UserInput source={passwordImg}
					secureTextEntry={this.state.showPass}
					placeholder='Password'
					value = {this.props.password}
			  	onChangeText = {(input)=>this.props.passwordChanged(input)}
          returnKeyType={'done'}
					autoCapitalize={'none'}
					autoCorrect={false} />
					<TouchableOpacity
						activeOpacity={0.7}
						style={styles.btnEye}
						onPress={this.showPass}
					>
				<Icon2 name="ios-eye" style={styles.iconEye} />
          
						</TouchableOpacity>
			</KeyboardAvoidingView>
		);
	} else if(this.props.type === 'forgot') {
		return (
		<KeyboardAvoidingView behavior='padding'
			style={{
				flex: this.props.type == 'login'? 1: 2,
				alignItems: 'center',	
			}}>
			<UserInput source={usernameImg}
				placeholder='Email'
				autoCapitalize={'none'}
				returnKeyType={'done'}
				value = {this.props.email}
				onChangeText = {(input)=>this.props.emailChanged(input)}
				autoCorrect={false} />
			</KeyboardAvoidingView>
	);
} else if (this.props.type === 'reg') {
		return(
		<KeyboardAvoidingView behavior='padding'
				style={{
					flex: this.props.type == 'login'? 1: 2,
					alignItems: 'center',	
				}}>
				<UserInput 
					placeholder='Fullname'
					autoCapitalize={'none'}
					value = {this.props.fullname}
			  	onChangeText = {(input)=>this.props.fullnameChanged(input)}
          returnKeyType={'done'}
					autoCorrect={false} />
				<UserInput 
					placeholder='Email'
					autoCapitalize={'none'}
					value = {this.props.email}
			  	onChangeText = {(input)=>this.props.emailChanged(input)}
          returnKeyType={'done'}
					autoCorrect={false} />
				<UserInput 
					placeholder='Tel'
					autoCapitalize={'none'}
					value = {this.props.tel}
			  	returnKeyType={'done'}
					onChangeText = {(input)=>this.props.telChanged(input)}
          autoCorrect={false} />
					
				<UserInput source={passwordImg}
					secureTextEntry={this.state.showPass}
					placeholder='Password'
					returnKeyType={'done'}
					value = {this.props.password}
			  	onChangeText = {(input)=>this.props.passwordChanged(input)}
          autoCapitalize={'none'}
					autoCorrect={false} />
					<TouchableOpacity
						activeOpacity={0.7}
						style={{
								position: 'absolute',
								top: this.props.type == 'login' ? 60 : 145,
								right: 28,
							  
						}}
						onPress={this.showPass}
					>
					<Icon2 name="ios-eye" style={styles.iconEye} />
          
					</TouchableOpacity>
			</KeyboardAvoidingView>
		);
	} else if(this.props.type === 'home') {
		return (
		<KeyboardAvoidingView behavior='padding'
			style={{
				flex: this.props.type == 'login'? 1: 2,
				alignItems: 'center',	
			}}>
			<UserInput
				placeholder='Home Address'
				autoCapitalize={'none'}
				onChangeText = {this.onHomeChange.bind(this)}
				onBlur={this.clearData()}
				returnKeyType={'done'}
				autoCorrect={false} 
				value = {this.props.pickup}
			  error = {this.state.homeError}			
				loading_prediction = {this.props.pickup != '' && this.props.loading_prediction}/>
				
	{datas.length > 0 && 
			<List
						style = {{
							width: '88%',
							position: 'absolute',
							top: 50,
							zIndex: 200,
							backgroundColor: '#FFF',
							borderColor: '#22313F',
							borderRadius: 20,
							borderWidth: 1,
						}}
            dataArray={datas}
            renderRow={data =>
							<ListItem avatar
							style = {{
								backgroundColor: '#FFF',
								zIndex: 200,
							
							}} onPress={() => this.select_suggest(data.description, 'pickup')} >
                <Left>
                <Icon style = {{color: '#22313F', marginRight: 10, marginTop: 7, fontSize: 20}} name="pin" /> 
                </Left>
                <Body>
                  <Text style = {{fontFamily: 'Montserrat', fontSize: 17}}>
                    {data.structured_formatting.main_text}
                  </Text>
                  <Text style = {{fontFamily: 'Montserrat', fontSize: 12}} numberOfLines={1} note>
                    {data.description}
                  </Text>
                </Body>
                
				</ListItem>}
	         />
					}

		</KeyboardAvoidingView>
		);
	}  else if(this.props.type === 'work') {
		return (
		<KeyboardAvoidingView behavior='padding'
			style={{
				flex: this.props.type == 'login'? 1: 2,
				alignItems: 'center',	
			}}>
			<UserInput
				placeholder='Work Address'
				autoCapitalize={'none'}
				onChangeText = {this.onWorkChange.bind(this)}
				onBlur={this.clearData()}
				returnKeyType={'done'}
				autoCorrect={false} 
				value = {this.props.destination}
			  error = {this.state.homeError}			
				loading_prediction = {this.props.destination != '' && this.props.loading_prediction}/>
				
				{datas.length > 0 && 
			<List
						style = {{
							width: '88%',
							position: 'absolute',
							top: 50,
							zIndex: 200,
							backgroundColor: '#FFF',
							borderColor: '#CCC',
							borderRadius: 20,
							borderWidth: 1,
						}}
            dataArray={datas}
            renderRow={data =>
							<ListItem avatar
							style = {{
								backgroundColor: '#FFF',
								zIndex: 200,
							
							}} onPress={() => this.select_suggest(data.description, 'dest')} >
                <Left>
                <Icon style = {{color: '#22313F', marginRight: 10, marginTop: 7, fontSize: 20}} name="pin" /> 
                </Left>
                <Body>
                  <Text style = {{fontFamily: 'Montserrat', fontSize: 17}}>
                    {data.structured_formatting.main_text}
                  </Text>
                  <Text style = {{fontFamily: 'Montserrat', fontSize: 12}} numberOfLines={1} note>
                    {data.description}
                  </Text>
                </Body>
                
				</ListItem>}
	         />
					}

		</KeyboardAvoidingView>
	);
	}	 else if (this.props.type === 'route') {
		if (this.props.suggested_route === null && this.props.selected_route === null) {
			this.props.find_route(this.props.pickup_coords.lat, this.props.pickup_coords.lng, this.props.dropoff_coords.lat, this.props.dropoff_coords.lng);
		}
		return (
			
		     <View style={{
										flex: 4,
										//height: '70%'
										//padding: 10,
										
									
                   }}>
                  {!this.props.getting_route && this.props.suggested_route !== null &&
                  <View style = {{
                    flex: 2,
										padding: 20,
										borderRadius: 20,
										backgroundColor: '#FFF',
                  }}>
                  
                  {this.props.suggested_route.length > 0 && 

														<List

																		dataArray={this.props.suggested_route}
																		renderRow={data =>
																		
															<TouchableOpacity
															onPress = {() => this.props.selectRoute(data.route_id)}>
																	<CardView  av = {true} distance = {data.distance} word = {data.route} pickup = {data.pickup} dropoff = {data.dropoff}/>
															</TouchableOpacity>
															
																	
													}
													/>
										}
										
										{this.props.suggested_route.length === 0 && 

											<TouchableOpacity style = {{
												height: '27%'
											}}>
												<CardView  av = {false}/>
											</TouchableOpacity>
										}
										
											<TouchableOpacity onPress = {this.props.handler4}>
													<Text style = {{
														color: '#22A7F0',
														textAlign: 'center',
														marginTop: this.props.suggested_route.length === 0 ? 80 : 0,
														fontSize: 20,
														fontFamily: 'Montserrat-Regular'
													}}>Skip</Text>
											</TouchableOpacity>

                  </View>
									
									}
									{this.props.getting_route &&
                  <View style = {{
                    flex: 2,
										padding: 20,
										borderRadius: 20,
										backgroundColor: '#FFF',
										alignContent: 'center',
										justifyContent: 'center',
                  }}>
									
									<ActivityIndicator  color= '#22313F'/>
                  
									
                  </View>
									
                  }
     
                </View>
		);
	}
	}
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
	container: {
		
	},
	btnEye: {
    position: 'absolute',
    top: 55,
    right: 28,
  },
  iconEye: {
	width: 25,
	marginTop: 5,
	height: 25,
	fontSize: 30,
	color: '#22313F',
   // tintColor: 'rgba(0,0,0,0.2)',
  },
});


const mapStateToProps = ({ map }) => {
	const {
	  work,
	  home,
	  pickup,
	  input_done,
	  hoveron,
	  loading,
	  status,
	  region,
	  user,
	  predictions,
	  geocoding,
		pickup_coords,
		destination,
	  prediction_error,
	  pickup_location,
	  destination_location,
	  loading_prediction,
		error_geoecoding,
		dropoff_coords,
		getting_route,
		suggested_route,
		network_connected,
		selected_route,
	} = map;
	return {
	  work,
	  home,
	  pickup,
		input_done,
		destination,
	  hoveron,
	  loading,
	  status,
	  region,
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
		error_geoecoding,
		getting_route,
		suggested_route,
		selected_route,
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
	set_suggestion_dest,
	find_route,
	all_route,
	selectRoute,
	telChanged,
	emailChanged,
	fullnameChanged,
	passwordChanged,
  })(Form);
  