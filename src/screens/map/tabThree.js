import React, { Component } from "react";
import { Content, Card,View, CardItem,Icon,List,  Text, Body, Badge } from "native-base";
//import CardView from './card';
import CardView from './../ticket/card';
import { connect } from 'react-redux';
import { TouchableOpacity, StyleSheet, } from 'react-native';
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
  select_my_single_route,
  my_route_selected,
  nearest,
  setPayment,

} from '../../actions/Map';
import ImageLoad from 'react-native-image-placeholder';

const word = 'NativeBase is open source and free';
const maxlimit = 30;



class TabThree extends Component {
  lapsList() {
    for (var i = 0; i < this.props.myroutes.length; i++) {
      var data = this.props.myroutes[i];
      return (
        <TouchableOpacity
        onPress = {() => this.selectShit(data.route_id, data.payment)}>
        <CardView  av = {true} distance = {0.2} word = {data.route} payment = {data.payment}/>
      </TouchableOpacity>
      )
    }
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

  back() {
    this.props.my_route_selected(false);
  }


  selectShit(id, payment) {
  
    var a = this.props.myroutes;
  
    var aFiltered = a.filter(function(elem, index){
      return elem.route_id == id;
    });
    thissingle = aFiltered;
    this.props.select_my_single_route(thissingle);
    this.props.nearest(false);

    if (payment && thissingle[0].payment_status == 'active') {
      this.props.setPayment('active');
    } else if (payment && thissingle[0].payment_status == 'expired') {
      this.props.setPayment('expired');
    } else if (payment && thissingle[0].payment_status == 'pending') {
      this.props.setPayment('pending');
    } else {
      this.props.setPayment('null');
    }
    
    this.props.my_route_selected(true);
    //+
    
  }

  getWord(payment) {
    word = '';
    
     if (payment) {
      word = "View More";
    } else {
      word = "View More";
    }
    return word;
   
  }

  render() {
    if (this.props.myroutes !== null && this.props.myroutes.length > 0) {
      return (
        <Content padder>
        {!this.props.my_selected && 
                       
          			<List

                      dataArray={this.props.myroutes}
                      renderRow={data =>
                      // <ListItem
                      //   button onPress={() => this.props.navigation.navigate('RouteSingle', { route_id: data.route_id })}>

                      //     <Text>{data.route}</Text>
                      //     <Right>
                      //       <Icon name='map' />
                      //     </Right>

                      // </ListItem>
               <TouchableOpacity
								onPress = {() => this.selectShit(data.route_id, data.payment)}>
                {data.payment ?
                    <CardView  av = {true} distance = {data.route_id} payment_amount = {data.payment_amount} expires = {this.getDataDiff(data.date_expired)} active = {this.getDataDiff(data.date_active)} payment_method_of_payment = {data.payment_method_of_payment} word = {data.route} payment = {data.payment_status}/>
                  :
                  <CardView  av = {true} distance = {data.route_id} word = {data.route} payment = {data.payment}/>
                }
                </TouchableOpacity>
                
										
						}
                      />
                    }  

        {this.props.my_selected && this.props.my_route_single !== null && this.props.payment !== 'active'
          && 
          <View style = {{
            flex: 1,
          }}>
        
        
          <TouchableOpacity style = {{flex: 1, backgroundColor: '#FFF', padding: 20, marginTop: 10,
            marginBottom: 60,
          
									}}>
										
										<View style = {styles.circelFirst}/>
										<View style = {styles.dot1}/>
										<View style = {styles.dot2}/>
										<View style = {styles.dot3}/>
                    <View style = {styles.dot4}/>
                    <View style = {styles.dot5}/>
										<View style = {styles.circelSecond}/>
										
										<View style = {styles.row1}>
											<Text style = {{
												 fontFamily: 'Montserrat-Regular',
												 color: '#22313F',
                         fontSize: 20,}}>
                         {this.props.my_route_single[0].pickup}
                         </Text>
				
										</View>
							
										<View style = {styles.row2}>
											<Text style = {{
												 fontFamily: 'Montserrat-Regular',
												 color: '#22313F',
												 fontSize: 20,
											}}>{this.props.my_route_single[0].dropoff} </Text>
										
									
										</View>

         	</TouchableOpacity>

<View style = {{
  flexDirection: 'row',
  flex: 1,
  alignItems: 'center',
}}>
<View style={
              {
                flex: 1,
                
              }
            }>
             <TouchableOpacity
             onPress= {() => this.back()}>
             <Icon style = {{color: '#888'}} name="arrow-back" /> 
             </TouchableOpacity>
               
                 
        </View>
            <TouchableOpacity
             style={
              {
                flex: 8,
                padding: 20,
                borderRadius: 10,
                backgroundColor: '#22313F',
                alignItems: 'center',
                marginVertical: 10
              }
            }
            onPress={() => this.props.routes === null ? this.props.navigation.navigate('Route') : this.props.navigation.navigate('RouteSingle', { route_id: this.props.my_route_single[0].route_id })}>
				   <Text style={{
                    fontSize: 17,
                    fontFamily: 'Montserrat-Regular',
                    color: 'white'
                  }}>{this.getWord(this.props.my_route_single[0].payment)}</Text>
            </TouchableOpacity>
        </View>
       
          </View>
          
        }

        </Content>
      );
    } else {
      return (
        <Content padder>
        
        <CardView  av = {false}/>
        </Content>
      );
    }
  }
}


const styles = StyleSheet.create({
 
  circelFirst: {
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: '#FFF',
    borderRadius: 20,
    borderColor: '#87D37C',
    borderWidth: 5,
    top: 20,
    left: 20
},
circelSecond: {
  position: 'absolute',
  width: 20,
  height: 20,
  backgroundColor: '#FFF',
  //borderColor: '#22A7F0',
  borderColor: '#F05959',
  borderWidth: 5,
  borderRadius: 20,
  top: 100,
  left: 20
  },
  dot1: {
    position: 'absolute',
    height: 5,
    top: 50,
    left: 28,
    borderColor: '#CCC',
    borderWidth: 1,
  },
  dot2: {
    position: 'absolute',
    height: 5,
    top: 60,
    left: 28,
    borderColor: '#CCC',
    borderWidth: 1,
  },
  dot3: {
    position: 'absolute',
    height: 5,
    top: 70,
    left: 28,
    borderColor: '#CCC',
    borderWidth: 1,
  },
  dot4: {
    position: 'absolute',
    height: 5,
    top: 90,
    left: 28,
    borderColor: '#CCC',
    borderWidth: 1,
  },
  dot5: {
    position: 'absolute',
    height: 5,
    top: 90,
    left: 28,
    borderColor: '#CCC',
    borderWidth: 1,
  },
  row1: {
    marginLeft: 50,
    justifyContent: 'space-between',
    flexDirection: 'row',
    
},
row2: {
    marginTop: 30,
    marginLeft: 50,
    justifyContent: 'space-between',
    flexDirection: 'row'
},
pick: {
  fontFamily: 'Montserrat',
  color: '#888',
  paddingLeft: 20,
  paddingRight: 20,
  paddingTop: 10,
  paddingBottom: 10,
  fontSize: 15,
},
line: {
  borderColor: '#EEE',
  borderWidth: 1,
  marginTop: 5
},
cir: {
  width: 15,
  height: 15,
  backgroundColor: '#FFF',
  borderColor: '#22313F',
  borderWidth: 5,
  borderRadius: 20,
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
    myroutes,
	  network_connected,
	  getting_route,
	  suggested_route,
    selected_route,
    nearest_route_single,
    nearest_selected,
    my_selected,
    my_route_single,
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
    selected_route,
    myroutes,
    nearest_route_single,
    nearest_selected,
    my_selected,
    my_route_single,
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
  select_my_single_route,
  my_route_selected,
  nearest,
  setPayment,
  })(TabThree);
  
  