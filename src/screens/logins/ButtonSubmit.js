import React, { Component, PropTypes } from 'react';
import Dimensions from 'Dimensions';
import {
	StyleSheet,
	TouchableOpacity,
	Text,
	Animated,
	Easing,
	Image,
	Alert,
	View,
	ActivityIndicator,
} from 'react-native';
import { NavigationActions } from 'react-navigation'

import { connect } from 'react-redux';

import {  register,
	loginUser,
	resetNetwork,
} from '../../actions/Map';

import { Actions, ActionConst } from 'react-native-router-flux';

import spinner from '../../../assets//loading.gif';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

class ButtonSubmit extends Component {
	constructor() {
		super();

		this.state = {
			isLoading: false,
			//loggedIn: this.props.status
		};

		this.buttonAnimated = new Animated.Value(0);
		this.growAnimated = new Animated.Value(0);
		this._onPress = this._onPress.bind(this);
		this._onPress2 = this._onPress2.bind(this);
	}

	async _onPress() {
		this.props.resetNetwork();
		if (this.props.email !== '' && this.props.password !== '') {
			const awaits = this.props.loginUser(this.props.email, this.props.password);
		}
	}

	async _onPress2() {
		this.props.resetNetwork();
		if (this.props.email !== '' && this.props.password !== '' && this.props.fullname !== '' && this.props.tel !== '') {
			const awaits = this.props.register(this.props.fullname, this.props.tel, this.props.email, this.props.password, this.props.selected_route);
		}
	}
	componentDidUpdate() {
		if (this.props.status) {
					this.props.navigation.navigate('Map');
			} 

			if (this.props.statusReg) {
				this.props.navigation.navigate('Map');
		} 
	}
	checkForLogin() {
		if (this.props.status) {
				this.props.navigation.dispatch(NavigationActions.reset({
					index: 0,
					key: null,
					actions: [NavigationActions.navigate({ routeName: 'Main' })]
				}))
		} else if (!this.props.network_conected || this.state.error !== '') {
			this.buttonAnimated.setValue(0);
		}
	}

	checkForReg() {
		if (this.props.statusReg) {
				this.props.navigation.dispatch(NavigationActions.reset({
					index: 0,
					key: null,
					actions: [NavigationActions.navigate({ routeName: 'Main' })]
				}))
		} else if (!this.props.network_conected || this.state.errorReg !== '') {
			this.buttonAnimated.setValue(0);
		}
	}




	

	_onGrow() {
		Animated.timing(
			this.growAnimated,
			{
				toValue: 1,
				duration: 200,
				easing: Easing.linear
			}
		).start();
	}

	render() {
		const changeWidth = this.buttonAnimated.interpolate({
	    inputRange: [0, 1],
	    outputRange: [DEVICE_WIDTH - MARGIN, MARGIN]
	  });
	  const changeScale = this.growAnimated.interpolate({
	    inputRange: [0, 1],
	    outputRange: [1, MARGIN]
	  });

	  if (this.props.show){
		if (this.props.type == 'login') {
			return (
				<View style={styles.container}>
					<Animated.View style={{width: changeWidth}}>
						<TouchableOpacity style={styles.button}
							disable = {(this.props.email === '' ||this.props.password === '') && this.props.loading}
							onPress={this._onPress}
							activeOpacity={1} >
								{this.props.loading ?
									<ActivityIndicator  color= '#FFF' style = {{
										padding: 20,  
									  }}/>
									  :
									<Text style={styles.text}>LOGIN</Text>
								}
						</TouchableOpacity>
						<Animated.View style={[ styles.circle, {transform: [{scale: changeScale}]} ]} />
					</Animated.View>
				</View>
			);
		} else if(this.props.type == 'forgot') {
			return (
				<View style={styles.container}>
					<Animated.View style={{width: changeWidth}}>
						<TouchableOpacity style={styles.button}
							disable = {(this.props.email === '' ||this.props.password === '') && this.props.loading}
							onPress={this._onPress}
							activeOpacity={1} >
								{this.props.loading && this.props.network ?
									<ActivityIndicator  color= '#FFF' style = {{
										padding: 20,  
									  }}/>
									  :
									<Text style={styles.text}>CONTINUE</Text>
								}
						</TouchableOpacity>
						<Animated.View style={[ styles.circle, {transform: [{scale: changeScale}]} ]} />
					</Animated.View>
				</View>
			);
		} else if (this.props.type == 'reg') {
			return (
				<View style={styles.container}>
					{/* {this.checkForLogin2()} */}
					<Animated.View style={{width: changeWidth}}>
						<TouchableOpacity style={styles.button}
							onPress={this._onPress2}
							disable = {(this.props.email === '' || this.props.password === '' || this.props.fullname === '' || this.props.tel === '') && this.props.loadingReg}
							activeOpacity={1} >
								{this.props.loadingReg && this.props.network ?
									<ActivityIndicator  color= '#FFF' style = {{
										padding: 20,  
									  }}/>
									:
									<Text style={styles.text}>REGISTER</Text>
								}
						</TouchableOpacity>
						<Animated.View style={[ styles.circle, {transform: [{scale: changeScale}]} ]} />
					</Animated.View>
				</View>
			);
		} else if (this.props.type == 'home') {
			return (
				<View style={styles.container}>
					<Animated.View style={{width: changeWidth}}>
						<TouchableOpacity style={styles.button}
							onPress = {this.props.handler3}
							activeOpacity={1} >
								{this.props.isLoading && this.props.network ?
									<ActivityIndicator  color= '#FFF' style = {{
										padding: 20,  
									  }}/>
									  :
									<Text style={styles.text}>CONTINUE</Text>
								}
						</TouchableOpacity>
						<Animated.View style={[ styles.circle, {transform: [{scale: changeScale}]} ]} />
					</Animated.View>
				</View>
			);
		} else if (this.props.type == 'work') {
			return (
				<View style={styles.container}>
					<Animated.View style={{width: changeWidth}}>
						<TouchableOpacity style={styles.button}
							onPress = {this.props.handler5}
							activeOpacity={1} >
								{this.state.isLoading && this.props.network ?
									<ActivityIndicator  color= '#FFF' style = {{
										padding: 20,  
									  }}/>
									  :
									<Text style={styles.text}>CONTINUE</Text>
								}
						</TouchableOpacity>
						<Animated.View style={[ styles.circle, {transform: [{scale: changeScale}]} ]} />
					</Animated.View>
				</View>
			);
		} else if (this.props.type == 'route') {
			return (
				<View style={styles.container2}>
					<Animated.View style={{width: changeWidth}}>
						<TouchableOpacity style={styles.button}
							onPress = {this.props.handler4}
							activeOpacity={1} >
								{this.state.isLoading && this.props.network ?
								<ActivityIndicator  color= '#FFF' style = {{
									padding: 20,  
								  }}/>
								  :
									<Text style={styles.text}>CONTINUE</Text>
								}
						</TouchableOpacity>
						<Animated.View style={[ styles.circle, {transform: [{scale: changeScale}]} ]} />
					</Animated.View>
				</View>
			);
		}
	}  else {
		return (
			<View style={styles.container}/>
		);
	}
	}
}

const styles = StyleSheet.create({
	container2: {
		flex: 1,
		top: -55,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	container: {
		flex: 1,
		top: -95,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#22A7F0',
		height: MARGIN,
		borderRadius: 20,
		zIndex: 100,
	},
	circle: {
		height: MARGIN,
		width: MARGIN,
		marginTop: -MARGIN,
		borderWidth: 1,
		borderColor: '#22A7F0',
		borderRadius: 100,
		alignSelf: 'center',
		zIndex: 99,
		backgroundColor: '#22A7F0',
	},
	text: {
		color: '#FFF',
		backgroundColor: 'transparent',
		fontFamily: 'Montserrat-Bold'
	},
	image: {
		width: 24,
		height: 24,
	},
})







const mapStateToProps = ({ map }) => {
	const {
		work,
		home,
		pickup,
		fullname,
		email,
		tel,
		password,
		error,
		loading,
		loadingReg,
		errorReg,
		statusReg,
		status,
		selected_route,
	} = map;
	return {
		work,
		home,
		pickup,
		fullname,
		email,
		tel,
		password,
		error,
		loading,
		loadingReg,
		errorReg,
		status,
		statusReg,
		selected_route,
	};
  };

export default connect(mapStateToProps, {
	register,
	loginUser,
	resetNetwork,
  })(ButtonSubmit);
  