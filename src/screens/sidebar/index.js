import React, { Component } from "react";
import { Image, StatusBar, Linking } from "react-native";
import {  destinationChanged,
          select_vehicle,
          hoverondesc,
          getCurrentLocation,
          get_name_of_loc,
          update_region,

        } from '../../actions/Map';
import { connect } from 'react-redux';
import {
	Content,
	Text,
	List,
	ListItem,
	Container,
	Left,
	Right,
	Badge,
	Button,
	View,
	StyleProvider,
	getTheme,
	variables,
} from "native-base";
import UserAvatar from 'react-native-user-avatar';

//import Entypo from 'react-native-vector-icons/Entypo';
//import Icon from 'react-native-vector-icons/EvilIcons';
// import Feather from 'react-native-vector-icons/Feather';
 import Icon from 'react-native-vector-icons/FontAwesome';
// import Foundation from 'react-native-vector-icons/Foundation';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Octicons from 'react-native-vector-icons/Octicons';
// import Zocial from 'react-native-vector-icons/Zocial';
// import EntypoGlyphs from 'react-native-vector-icons/glyphmaps/Entypo';
// import EvilIconsGlyphs from 'react-native-vector-icons/glyphmaps/EvilIcons';
// import FeatherGlyphs from 'react-native-vector-icons/glyphmaps/Feather';
// import FontAwesomeGlyphs from 'react-native-vector-icons/glyphmaps/FontAwesome';
// import FoundationGlyphs from 'react-native-vector-icons/glyphmaps/Foundation';
// import IoniconsGlyphs from 'react-native-vector-icons/glyphmaps/Ionicons';
// import MaterialIconsGlyphs from 'react-native-vector-icons/glyphmaps/MaterialIcons';
// import MaterialCommunityIconsGlyphs from 'react-native-vector-icons/glyphmaps/MaterialCommunityIcons';
// import OcticonsGlyphs from 'react-native-vector-icons/glyphmaps/Octicons';
// import ZocialGlyphs from 'react-native-vector-icons/glyphmaps/Zocial';


import styles from "./style";


const datas = [
	{
		name: "Home",
		route: "Map",
		icon: "bookmark-o",
		bg: "#C5F442",
	},
	{
		name: "Route",
		route: "Route",
		icon: "map-o",
		bg: "#DA4437",

	},
	{
		name: "Tickets",
		route: "Ticket",
		icon: "barcode",
		bg: "#4DCAE0",
	},
	{
		name: "Charter",
		route: "Charter",
		icon: "hashtag",
		bg: "#477EEA",

	},
	{
		name: "Payments",
		route: "Payment",
		icon: "credit-card",
		bg: "#477EEA",

	},
	{
		name: "Profile",
		route: "Profile",
		icon: "user-o",
		bg: "#C5F442",
	},

];

class SideBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			shadowOffsetWidth: 1,
			shadowRadius: 4,
		};
	}

	render() {
		return (
			<Container>
				<StatusBar backgroundColor='#22313F' barStyle='light-content' />
				{this.props.user !== null &&

				<View style = {{
					backgroundColor: '#22313F',
					flex: 4,
					justifyContent: "center",
					borderBottomWidth: 1,
					  borderBottomColor: '#EEE',
					  alignContent: 'center',
				}}>

							
								<Text style = {{
									color: '#FFF',
									fontFamily: 'Montserrat',
									fontSize: 20,
									alignSelf: 'center',
									textAlign: 'center',
								}}>{this.props.user.fullname}</Text>

							<Text style = {{
									color: '#FFF',
									marginTop: 10,
									fontFamily: 'Montserrat',
									fontSize: 15,
									alignSelf: 'center',
									textAlign: 'center',
								}}>{this.props.wallet_nice}</Text>
								<Text style = {{
									color: '#EEE',
									marginTop: 10,
									fontFamily: 'Montserrat',
									fontSize: 12,
									alignSelf: 'center',
									textAlign: 'center',
								}}>Wallet Balance</Text>




			</View>
				}
				{this.props.user !== null &&

			<View style = {{
				flex: 7
			}}>
				<Content bounces={false} style={{ flex: 1, backgroundColor: "#fff", top: 20 }}>



					<List

						dataArray={datas}
						renderRow={data =>
							<ListItem button noBorder onPress={() => this.props.navigation.navigate(data.route)}>
								<Left>
									<Icon active name={data.icon} style={{ color: "#22313F", fontSize: 25, width: 30 }} />
									<Text style={styles.text}>
										{data.name}
									</Text>
								</Left>
								{data.types &&
									<Right style={{ flex: 1 }}>
										<Badge
											style={{
												borderRadius: 3,
												height: 25,
												width: 72,
												backgroundColor: data.bg,
											}}
										>
											<Text style={styles.badgeText}>{`${data.types} Types`}</Text>
										</Badge>
									</Right>}
							</ListItem>}
					/>
				</Content>
			</View>
				}
				<View style = {{
	flex: 1,
}}>


</View>
				{this.props.user !== null &&



<View style = {{
				flex: 1,
			}}>
			<ListItem
        style = {{
          borderBottomWidth: 0,
        }}
        //onPress={() => this.props.navigation.navigate('Map')}
        onPress={ ()=>{ Linking.openURL('http://rova.com.ng/')}}>
        <Left>
          <Icon
                style = {{color: "#777", fontSize: 18}}
                name='bus'
              />

            <Text style = {{
              color: '#777',
			  fontSize: 12,
			  fontFamily: 'Montserrat',
			  textAlign: 'right',
              borderBottomWidth: 0,
            }}>Partner with Rova</Text>
          </Left>



			</ListItem>

			</View>
				}


{this.props.user !== null &&



<View style = {{
				flex: 1,
			}}>
			<ListItem
        style = {{
          borderBottomWidth: 0,
        }}
        onPress={() => this.props.navigation.navigate('TC')}>
        <Left>
		<Icon
                style = {{color: "#777", fontSize: 18}}
                name='copyright'
              />

            <Text style = {{
              color: '#777',
              fontSize: 12,
			  textAlign: 'right',
			  fontFamily: 'Montserrat',
			  borderBottomWidth: 0,
            }}>Legal</Text>
          </Left>



			</ListItem>

			</View>
				}
				
			</Container>
		);
	}
}

const mapStateToProps = ({ map }) => {
  const { destination, hoveron,
    pickup, vehicle,
    latitude,
    longitude,
	latitudeDelta,
	wallet_nice,
    longitudeDelta,
    error, region, user, loading, status } = map;
  return {
    destination,
    pickup,
    vehicle,
    error,
    hoveron,
    loading,
    region,
    user,
    status,
    latitude,
    longitude,
    latitudeDelta,
	longitudeDelta,
	wallet_nice,
  };
};

export default connect(mapStateToProps, {
  destinationChanged,
  getCurrentLocation,
  hoverondesc,
  select_vehicle,
  get_name_of_loc,
  update_region,

})(SideBar);
