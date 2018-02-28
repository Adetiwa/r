import React, { Component } from "react";
import { View, Image,Card, TextInput, StatusBar, Dimensions, Platform , TouchableOpacity} from "react-native";
import { connect } from 'react-redux';
import {  getCard,from_where,
	all_route,
	resetNetwork,
	getMyRoutes,
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
import TicketO from './../map/ticket';
import CardView from './card';

import ImageLoad from 'react-native-image-placeholder';
import Modal from "react-native-modal";

import moment from 'moment';

import { ProgressDialog } from 'react-native-simple-dialogs';
import SnackBar from 'react-native-snackbar-component';

import styles from './styles';





	//placeholder: { uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAA8CAMAAACuCk+GAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAVFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU4H24AAAAG3RSTlMAAlmy6iLM6cv2fiMDWvU6t3/r5vyF+fohfeVV8k2lAAAAAWJLR0QAiAUdSAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAOZJREFUWMPtmMkKwzAMRO04W+1sbZx0mf//zxZCyKHSoVimLWiOc5gHkg2SjFF9Ilu4EokqXWG5/KpOTd9UV0x+I5MPNCTBtsDJhy6tyl3wJ6ClqtQDwyjRyXEAesKfAC+Rb8wZmAj7AgQZQABmwn41J7H+uzog0gCZfC5K6o1uUoACFMABsv9kBShAAQpQgAIU8D+AZd0Hh3XhnCRAPEaTlXOSAO/DD+n8MCB7iY6WXhfO+d4zzbvGyi3iN3oRn4C7DMDTp4Tsx5Ds5xwT5A5STDOD1EmNfSy2cI+YFh5n17NHQRWpJ41VnnzHRkzBAAAAAElFTkSuQmCC" },
	const master=  "data:image/png;base64,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";
	const visa= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAA8CAMAAACuCk+GAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACOlBMVEUAAAAtSZAtSZAtSZAtSZAtSZAtSZAtSZAtSZAtSZAtSZAtSZAtSZAtSZD3rQD3rQD3rQD3rQD3rQD3rQD3rQD3rQD3rQD3rQD3rQD3rQD3rQAtSZDw8vXo6/HEzN62wNezvdXByt3h5e2otNBPZ6IyTZJvgrLq7fLv8fVLY580T5RJYZ5Ua6Sxu9Rdc6kvS5EuSpDHzuDQ1uRQZ6Kns8/d4euXpcegrMvBydx4ird+j7rm6fBlea3L0uJacKd/kLqGlr5zhbS4wtinss9hdqs1UJTt7/NWbaVKYp/i5u5YbqaNncLS2OaqttE4U5Z9j7qap8iTocV5i7dGX51ccql5i7jr7vNjd6wvSpHn6vCbqMlkea3u8fRtgbHb3+rj5+7Hz+CVo8ZPZqE+WJk7VZdid6tVa6VgdatCW5ueq8uMm8HU2eZne642UZWfrMtrf7B2ibbu8PQ5VJZ3ibYwTJLZ3umqtdG1v9euudO3wdhMZKBpfa/l6O9sf7CAkbvg5O12iLZmeq1xhLO8xdrl6e+cqckzTpO+x9tFXp1ugbLU2ufk5+++xtvO1eRSaaNNZaFwg7NzhrTDy94/WJmWpMaBkrzGzt+ZpsiQn8Pp7PE6VJeirs1sgLExTJKhrsyKmsCksM5DXJujr81yhbSdqsre4uvV2+cyTpNccaiOncKDlL20vtZFXpxfdaqvutONnMKyvNWCk7xfdKp9jrlEXZxCXJvW2+iRoMSlsc6mss/I0ODc4ev3rQAAAAAMBkDUAAAAG3RSTlMAAlmy6iLM6ctat+vm/Pzr5rdaAssj6cxZsuV/0XjnAAAAAWJLR0QAiAUdSAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAwJJREFUWMPtlvlXTVEUx1/zgNRrkrO9eFRXr0hSkkSjEEL1EJJkjqQQChGiRGTITIbMU8Y/zt7n3J5a67Q4dfqB9fYPZ+99z9nfz71nWtdicZuKeXh6ebNRmreXp8dw+j6+o1UX5uszjL6fHn3G/KQED39d+oz5y2YpQJ8+YwESQKBOQKAEME4nYLwEoFOfTRhrAJMAQKu5AW7A/w+YYoueOs0+UsD0GeIwxsTG8dyYiUm8HRzoEuhB4qzZ1J+UMIf3J8+lLEXlC+alOjgijWfzKUwHO7kFABkLXfdBJu9fxOMstSkyFlNRLI+XCK1scjlg5Lr08/KpO1MkBYprEJeHRUspKozHaBnAcpJZAUXkVq5aXbxm7To+ssSc0FLFRS7DIud6DDZQeRHARhIuh02U8sk3NlO7BflOelahCNhKRTYMKtFvKwWjCv12gOqB56alYrpjJza7FAEVTBTZyO8G2GP6veT31eSbw8ppO+Tsx+aAIqD2IBaVANShO1QP0EDChwGOiCl3RIthR2mxM4qxbVQEwDEsqobjtNgnMG0i2WYMTpp7qI6v6imMTkMLLdgZRcBZLGrNTyOtc5gWoD/P1za1VRAuYNJG65sNF5PQXVIEtJNIewc2lw3ctjEYdIqe+it827CrAHRcunA96LBfUwQYXVh03Vxq6KbgxkBfN20bdhNu3aYz0tPTQ+9xRxEAnVh0l7aM6zT83p33KL0PDwb/SDxUBTwyC5soeUybCS+/J4X869LFvdEx5FelVxHwVJQlJVNiXqVt7NnzrBd9lfww2G1D/4VeKgLgFS97TWGzeWE2DNJL45/lTHlD1ojhW1VAHdd5R6F5lcJ7l3x8DfTSzvogxn7EsEwVwF/3E78UzKsUEnPzuPznvn6ALxR9FWO/YVhlKAKkVtvf3fL9xx+HjRzwl+YGuAH/JuCnVhtrQJAEMFEnIFgCCNEJCJEArDoBVgkgNEyfflioBGAJj9ClHxFukVp4pB79yGH0cZYmRU0OGp14UHCUNdTiNhX7Bbf1q/9SR3AWAAAAAElFTkSuQmCC";
	const american= "data:image/png;base64,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";
	const diners = "data:image/png;base64,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";
	const discover="data:image/png;base64,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";
	const jcb= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAA8CAMAAACuCk+GAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACKFBMVEUAAADw8vXw8vXw8vXw8vXw8vXw8vXw8vXw8vXw8vXw8vXw8vXw8vXw8vXw8vXw8vXw8vXq7/OMv9g3lMALfrMEerHv7e/kn5HaVzrVMw3ULQbt8fG32aWFw2FruD1ntjfX5e4wkb7t3t3ZUzTj7OKCwlwvkL7v7e7ZUjOBwlyGvNfknY622aU0kr/aVjiFw2AKfbPVNA5tuUDXORXaSSfaSCbWOBOcyuDu9vqAvNjZRyTplYH1zcP98/H////21c3urZ7dWjz4/Pbc7tGaznqm0OOJwNrrn43++/r++fj43NX318/76ufokHvr9eTw+Oubz3z88/DlgGnWNA/YPhvjdl3zxLnoj3qw2ZfV68f//f3eXkHVMgyExF3R6cPzxbtxu0R5v0/J5bj9/v2QyWzrnYv+//7Y7MuLx2bW7MrZ7c72+/Pd79KIxmOt1OZ7udZ2vUv0+vH5/Pd7wFIUgrYOf7To8/hVpcrb7tCq1o/y+PubyuBInsYQgLUhibq12Ojg7/YNf7Tlf2jXPRrzw7jojnmJxmT6/fml1In9/v7n8vjk8ff+/v/j8PY0lMDrn47+/Pv++Pf429T31s766eX1+vL3+/Tu9+lyu0V1ttSo0eTR5vHx+Pvt9vm83Opws9P1zsX99PL99fPurp/y+e/I5LYMfrMVg7bXOxcPgLRqtzs2k7+Cwl3kno+z16CAwVrs8O8ykr7Z5u6BwVvh7OGNwNiEw18AAAD0L/0fAAAAEHRSTlMAAlmy6iLM6ctat+vm/CPlqVgOuQAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAJySURBVFjD7dj3UxNBFAfwhNCCJG6Ao1yUA0SJiihyNpAg2FFjxV6CPfaGHSv2XmLvDXvXv899ubnJ3Zs9x8vujaOT7y93s3f7PjO7l53Jc7nSsRN3hieTcCbTk+G2qp+VzVtdS3aWRf0cMfUJyWEK7lxR9QnJZa2SV1x9QrwMIE8kkMcA+ogE8hmAyPrE5zRA/gQIFBQWSXpgoLiktEzWAwPBfv3LFT22gYpKyRA6UDVANoQOVA9UDLELBAZJZqAmJJuB4GCFBxgiIWCojIBahQsYhoE6DAznA0ZgoB4DI/kACQMyBpQ08H8CDao6arRYYMxYmnEANDaNbw5DmlsmtFIgrKdt4iQOYDKUmEKBqdPgbnr7jJn0MksDIpHI7IQxRwAA17nz5tPVWdCxcJEGwNIshgdLxABLl+lbvDwJrIAXVooBVpm+IjoQjUY7V9PrmrVigHUY0LJ+w0YRm8wCYrHYps1U2LI1dWAbANstlgj2YMdOerNrt21gj1a/ay8A+36zycp+eOOAbeDgocPdknTkKMw+dlz/TE/AZ3qyo+dUEjh9Bp6ctQ3QSefOX7gIky9dhqPiylW4v3b9xs3kDy0ej99K7PPtO7aBu/fuP4CpDx897tbOosamJ08T1Z61PDcdFeEXLztT2+RXvb1d5sPutaqqDf/0cZ0G/h7wBgP1GHjLB7zDQB0G3vMBBRj4gIGPXEBlAAGhGgR8+swDfPlKzECoipiBb99JykBR4Y8AMQJlpSXFxAiU/6wNEtsAZ5wGWH9jHf8j7ngrwfFmiOPtHJdfXEPK72LGL6qlZlE/0RTs6+Mr7sv3eC2bgukw8wukXZVzVZH6VAAAAABJRU5ErkJggg==";
	const cvc="data:image/png;base64,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";
	const cvc_amex= "data:image/png;base64,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";


class Ticket extends Component {
	constructor(props) {
		super(props);
		this.state = {
	
		getting_route: false,
		thissingle: [],
		showModal: false,
		payment: '',
		my_selected: false,
		selected: [],
	
	  }
	}

	
	componentWillMount(){
		this.props.resetNetwork();
		this.props.get_wallet_info(this.props.user.userid);
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
	//console.log(date2);
  }

	  componentDidMount() {
			if (this.props.network_connected && this.props.myroutes === null) {
				this.runroute(this.props.user.userid);
			} 
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
			//this.props.select_my_single_route(thissingle);
			
			// if (payment && thissingle[0].payment_status == 'active') {
			//   this.props.setPayment('active');
			// } else if (payment && thissingle[0].payment_status == 'expired') {
			//   this.props.setPayment('expired');
			// } else if (payment && thissingle[0].payment_status == 'pending') {
			//   this.props.setPayment('pending');
			// } else {
			//   this.props.setPayment('null');
			// }
			//this.props.my_route_selected(true);
			//+
			
		  }

		async runroute(id) {
			this.setState({ getting_route: true });
			
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
					  //console.log('Rova res is '+JSON.stringify(responseJson));
					  //this.props.saveRoute(responseJson)
					  this.setState({ getting_route: false });
					  this.props.getMyRoutes(responseJson);
					//   if (responseJson.length !== 0) {
					// 	var pickup = responseJson[0].pickup;
					// 	var dropoff = responseJson[0].dropoff;
					// 	var waypoints = responseJson[0].stops.map((point) => {
					// 	  return point.stop;
					// 	}).join("|");
						
					// 	this.props.getRoute(pickup, dropoff, waypoints);
					// 	//
					//    }
					})
					.catch((error) => {
					  this.setState({ getting_route: false });
					  
				  })
			//this.props.clearEverything();
		  }

	render() {
		return (
			<Container style={styles.container}>
		<StatusBar backgroundColor='#22313F' barStyle='light-content' />
        
	
		<Header style = {{borderBottomColor: "#22313F", borderBottomWidth: 1, backgroundColor: "#22313F"}} >
			<Left>
			<TouchableOpacity
								transparent onPress={() => this.props.navigation.goBack()}
								>
					  <Icon style = {{color : "#FFF", fontSize: 40, fontFamily: 'Montserrat'}}  size = {40} name= "close" />
                 </TouchableOpacity>

			</Left>

			<Body>
			<Title style = {{color: '#FFF',  fontFamily: 'Montserrat'}}>Active Tickets</Title>

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
								<CardView  av = {true} distance = {data.route_id} payment_amount = {data.payment_amount} expires = {this.getDataDiff(data.date_expired)} payment_method_of_payment = {data.payment_method_of_payment} word = {data.route} payment = {data.payment_status}/>
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
            
            <TicketO ticket = {this.state.selected}/>
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
							onPress={() => this.props.navigation.navigate('Edit', { ticket: this.state.selected[0].route_id, from: 'ticket' })}
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
        <SnackBar visible={!this.props.network_connected} textMessage="Network Unavailable!"/>
        <ProgressDialog 
				visible={this.state.getting_route && this.props.network_connected} 
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
	getMyRoutes,
  })(Ticket);
