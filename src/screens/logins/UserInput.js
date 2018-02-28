import React, { Component, PropTypes } from 'react';
import Dimensions from 'Dimensions';
import {
	StyleSheet,
	View,
	TextInput,
	Image,
	ActivityIndicator
} from 'react-native';

export default class UserInput extends Component {
	render() {
		return (
			<View style={styles.inputWrapper}>
				<Image source={this.props.source}
					style={styles.inlineImg} />
				<TextInput style={{
						//backgroundColor: 'rgba(0, 0, 0, 0.5)',
						backgroundColor: '#FFF',
						width: DEVICE_WIDTH - 40,
						height: 40,
						fontSize: 18,
						marginHorizontal: 20,
						paddingLeft: 45,
						borderRadius: 20,
						fontFamily: 'Montserrat-Regular',
						borderColor: 'red',
						borderWidth: this.props.error ? 1 : 0,
						color: '#22313F',
					}}
					value = {this.props.value}
					placeholder={this.props.placeholder}
					secureTextEntry={this.props.secureTextEntry}
					autoCorrect={this.props.autoCorrect}
					autoCapitalize={this.props.autoCapitalize}
					returnKeyType={this.props.returnKeyType}
					onChangeText={this.props.onChangeText}
					placeholderTextColor='#BBB'
					underlineColorAndroid='transparent'/>
					{this.props.loading_prediction && 
					<ActivityIndicator style = {{
						position: 'absolute',
						top: 10,
						right: 40,
					}} color = '#22313F' size='small' />
					}
				
			</View>
		);
	}
}

/*UserInput.propTypes = {
	//source: PropTypes.number.isRequired,
	placeholder: PropTypes.string.isRequired,
	secureTextEntry: PropTypes.bool,
	autoCorrect: PropTypes.bool,
	autoCapitalize: PropTypes.string,
	returnKeyType: PropTypes.string,
};*/

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
	//input: 
	inputWrapper: {
		flex: 1,
	},
	inlineImg: {
		position: 'absolute',
		zIndex: 99,
		width: 22,
		height: 22,
		left: 35,
		top: 9,
	},

});
