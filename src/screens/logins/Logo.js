import React, { Component, PropTypes } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Animated,Easing, TouchableOpacity, ActivityIndicator,
	Image,
} from 'react-native';
import LottieView from 'lottie-react-native';
import Error2 from '../error2';

import logoImg from '../../../assets/logo.png';

export default class Logo extends Component {
	state = {
		isLoggedIn: false,
		// locked: false,
		// progress: new Animated.Value(0),
  
	  }
	  componentDidMount() {
		// Animated.timing(this.state.progress, {
		//   toValue: 1,
		//   duration: 5000,
		// }).start();
	  }

	render() {
	
			if (this.props.type == 'home') {
				return (
					<View style={styles.container}>
						{/* <Image source={logoImg} style={styles.image} /> */}
						<Text style={styles.text}>Where do you live?</Text>
					</View>
				);
			} else if (this.props.type == 'work') {
				return (
					<View style={styles.container}>
						{/* <Image source={logoImg} style={styles.image} /> */}
						<Text style={styles.text}>Where do you work?</Text>
					</View>
				);
			} else if (this.props.type == 'login') {
				return (
					<View style={styles.container}>
						{/* <Image source={logoImg} style={styles.image} /> */}
						
						<Text style={styles.text}>Login to Rova</Text>	
						{this.props.msg !== '' && <Error2 msg = {this.props.msg}/>}
					</View>
				);
			} else if (this.props.type == 'reg') {
				return (
					<View style={styles.container}>
						{/* <Image source={logoImg} style={styles.image} /> */}
						<Text style={styles.text}>Sign Up</Text>
						{this.props.msg !== '' && <Error2 msg = {this.props.msg}/>}
					</View>
				);
			} else if (this.props.type == 'forgot') {
				return (
					<View style={styles.container}>
						{/* <Image source={logoImg} style={styles.image} /> */}
						<Text style={styles.text}>Forgot Password</Text>
						{this.props.msg !== '' && <Error2 msg = {this.props.msg}/>}
					</View>
				);
			} else if (this.props.type == 'route') {
				
						if (this.props.show) {
							return (
						
							<Text style={{
								color: '#FFF',
								fontSize: 25,
								textAlign: 'center',
								marginBottom: 20,
								//fontWeight: 'bold',
								backgroundColor: 'transparent',
								marginTop: 40,
							}}>{`${this.props.length}  ${this.props.length > 1 ? 'Results' : 'Result' }`}</Text>
						);
					}
					
			} else {
				return (
					<View style={styles.container}/>
				);
			}
		}
		
	
}

const styles = StyleSheet.create({
	container: {
		flex: 3,
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		//width: 80,
		//height: 80,
	},
	text: {
		color: '#FFF',
		fontSize: 30,
		fontFamily: 'Montserrat-Bold',
		//fontWeight: 'bold',
		backgroundColor: 'transparent',
		marginTop: 20,
	},
	text2: {
		color: '#F09B95',
		fontSize: 15,
		fontFamily: 'Montserrat-Regular',
		//fontWeight: 'bold',
		backgroundColor: 'transparent',
		marginTop: 50,
	}
});
