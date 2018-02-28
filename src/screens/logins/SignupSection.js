import React, { Component, PropTypes } from 'react';
import Dimensions from 'Dimensions';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	TouchableHighlight,
} from 'react-native';

export default class SignupSection extends Component {
	render() {
		if (this.props.show && !this.props.geocoding && this.props.type !== 'route') {
		if (this.props.type == 'login') {
			return (
				<View style={styles.container}>
					<TouchableOpacity
					onPress = {this.props.handler}>
					<Text style={styles.text}>Create Account</Text>
					</TouchableOpacity>
					<TouchableOpacity
					onPress = {this.props.handler6}>
					
					<Text style={styles.text}>Forgot Password?</Text>
					</TouchableOpacity>
				</View>
			);
		} else if (this.props.type == 'forgot') {
			return (
				<View style={styles.container}>
				<TouchableOpacity
				onPress = {this.props.handler2}>
				<Text style={styles.text}>Have an account?</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress = {this.props.handler}>
					<Text style={styles.text}>Create Account</Text>
					</TouchableOpacity>
			</View>
			);
		} else {
			return (
				<View style={styles.container}>
				<TouchableOpacity
				onPress = {this.props.handler2}>
				<Text style={styles.text}>Have an account?</Text>
				</TouchableOpacity>
				<TouchableOpacity
				onPress = {this.props.handler6}>
				
				<Text style={styles.text}>Forgot Password?</Text>
				</TouchableOpacity>
			</View>
			);
		}
		
	}
	 else if (!this.props.network) {
		return (
			<View style={styles.container}>
				<TouchableOpacity
				onPress = {this.props.handler2}>
				<Text style={styles.text}>Have an account?</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress = {this.props.handler}>
					<Text style={styles.text}>Create Account</Text>
					</TouchableOpacity>
			</View>
		);
	}
	 else {
		return (
			<View style={styles.container}/>
		);
	}
  }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		top: 155,
		zIndex: 2,
		width: DEVICE_WIDTH,
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	text: {
		fontSize: 17,
		color: '#22A7F0',
		backgroundColor: 'transparent',
		fontFamily: 'Montserrat-Bold'
	},
});
