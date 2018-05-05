import React, { Component } from "react";
import { View, Image, TextInput,WebView, StatusBar, Dimensions, Platform , TouchableOpacity} from "react-native";
import { connect } from 'react-redux';
import { ProgressDialog } from 'react-native-simple-dialogs';
import SnackBar from 'react-native-snackbar-component';
import StatusBarAlert from 'react-native-statusbar-alert';

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
import Loader from "../../components/loader";



const Screen = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 75
  }
class Charter extends Component {
	constructor(props) {
        super(props);
        this.close = this.close.bind(this);
  
		this.state = {
		 
		  loading: true,
          loadingError: false,
          isLoading: true,
          openLoader: true,
          msg: null
		}
	  
	  }
	componentWillMount(){
	 }

     close(e) {
        e.preventDefault()
        this.setState({
          openLoader: false,
          msg: false
        });
      }

      
	  componentDidMount() {
		  //this.reload();
	  }
	  ShowError() {
		this.setState({msg: "Network unavailable"})
		this.setState({isLoading: false})
	  }


	render() {
		return (
			<Container style={{flex: 1, backgroundColor: '#FFF'}}>
	<StatusBar backgroundColor="#22313F" barStyle="light-content" />
	<StatusBarAlert
					visible={this.state.loadingError}
					backgroundColor="#ff0033"
					color="#FFF"
					pulse="background"
				>
					<Text style = {{
						fontFamily: 'Montserrat-Regular',
						fontSize: 15,
						color: '#FFF',
						paddingTop: 15,
						paddingRight: 5,
						paddingLeft: 15,
						paddingBottom: 5,
					}}>Network unavailable. Please check your connection.</Text>
			</StatusBarAlert>    
				<Header style = {{borderBottomColor: "#22313F", borderBottomWidth: 1, backgroundColor: "#22313F"}} >
					<Left>
					<TouchableOpacity
								transparent onPress={() => this.props.screenProps.goBack()}
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

			
				<WebView
						source={{uri: 'https://rova.com.ng/charter'}}
						style={{
							flex: 1
						}}
						onLoadEnd = {() => this.setState({openLoader: false})}
						onLoad = {() => this.setState({isLoading: true})}
						onError = {() => this.ShowError()} 
					/>

				{/* <ProgressDialog 
				visible={this.state.loading} 
				message="Please, wait..."
                /> */}
                
                <Loader show = {this.state.openLoader} msg = {this.state.msg} close={this.close}  loading = {this.state.isLoading}/> 
        
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
	  network_connected,
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
	  network_connected,
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
