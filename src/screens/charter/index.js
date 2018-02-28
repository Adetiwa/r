import React, { Component } from "react";
import { View, Image, TextInput,WebView, StatusBar, Dimensions, Platform , TouchableOpacity} from "react-native";
import { connect } from 'react-redux';
import { ProgressDialog } from 'react-native-simple-dialogs';
import SnackBar from 'react-native-snackbar-component';

import {  getCard,from_where,

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



const Screen = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 75
  }
class Charter extends Component {
	constructor(props) {
		super(props);
		this.state = {
		 
		  loading: true,
		  loadingError: false,
		}
	  
	  }
	componentWillMount(){
	 }

	  componentDidMount() {
		  //this.reload();
	  }
	  ShowError() {
		this.setState({loadingError: true})
		this.setState({loading: false})
	  }


	render() {
		return (
			<Container style={{flex: 1, backgroundColor: '#FFF'}}>
	<StatusBar backgroundColor="#22313F" barStyle="light-content" />
              
				<Header style = {{borderBottomColor: "#22313F", borderBottomWidth: 1, backgroundColor: "#22313F"}} >
					<Left>
					<TouchableOpacity
								transparent onPress={() => this.props.navigation.goBack()}
								>
					  <Icon style = {{color : "#FFF", fontSize: 40, fontFamily: 'Montserrat'}}  size = {40} name= "close" />
                 </TouchableOpacity>

					</Left>

					<Body>
            <Title style = {{color: '#FFF',  fontFamily: 'Montserrat'}}>Charter</Title>

          </Body>
          <Right>
          </Right>
		</Header>

        <Content style = {{
            flex: 1
        }}>
			
            {/* <Text style = {{
                justifyContent: 'center',
                alignSelf: 'center',
                textAlign: 'center',
                alignItems: 'center',
                alignContent: 'center',
                fontSize: 40,
                flex: 1,
                marginVertical: (Screen.height)/2.2,
                color: '#777',
                fontFamily: 'Montserrat'
			}}> COMING SOON</Text> */}
				<WebView
						source={{uri: 'https://rova.com.ng/charter'}}
						style={{
							flex: 1
						}}
						onLoadEnd = {() => this.setState({loading: false})}
						onLoad = {() => this.setState({loading: false})}
						onError = {() => this.ShowError()} 
					/>
				</Content>

				<SnackBar visible={!this.props.network_connected || this.state.loadingError} textMessage="Network Unavailable!"/>
				<ProgressDialog 
				visible={this.state.loading} 
				message="Please, wait..."
				/>
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
	  estimated_price,
	  distanceInKM,
	  wallet_nice,
	  selected,
	  distanceInHR,
	  last_4,
	  card_exist, card_type,
	  prices,
	  history,
	  done,
	  history_single,
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
	  done,
	  estimated_price,
	  wallet_nice,
	  history_single,
	  history,
	  card_type,
	};
  };

  export default connect(mapStateToProps, {
	getCard,from_where,
  })(Charter);
