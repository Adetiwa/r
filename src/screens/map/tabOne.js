import React, { Component } from "react";
import { Content, Card,View, CardItem,Icon,List,  Text, Body, Badge } from "native-base";
import CardView from './card';
import { connect } from 'react-redux';
import { TouchableOpacity, StyleSheet } from 'react-native';
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
  select_nearest,
  newStuffs,
  nearest,

} from '../../actions/Map';
import ImageLoad from 'react-native-image-placeholder';

const word = 'NativeBase is open source and free';
const maxlimit = 30;
const available = true;


thissingle = [];
class TabOne extends Component {
  lapsList() {
    if (this.props.nearbyroutes.length === 0) {
      <CardView  av = {false} distance = {0} />
    } else {
      for (var i = 0; i < this.props.nearbyroutes.length; i++) {
        var data = this.props.nearbyroutes[i];
        return (
          <TouchableOpacity
          onPress = {() => this.selectShit(data.route_id)}>
          <CardView  av = {true} distance = {data.distance} word = {data.route}/>
        </TouchableOpacity>
        )
      }
    }
    
  }



  selectShit(id) {
    var a = this.props.nearbyroutes;
    var aFiltered = a.filter(function(elem, index){
      return elem.route_id == id;
    });
    thissingle = aFiltered;
    this.props.select_nearest(thissingle);
    this.props.nearest(true);

    if (thissingle.length > 0) {
      console.log('haha');
      var waypoints = thissingle[0].stops.map((point) => {
        return point.stop;
        }).join("|");
    
      
        this.props.getRoute(thissingle[0].pickup, thissingle[0].dropoff, waypoints);
        this.props.newStuffs(thissingle[0])
          
    }
    
}

  back() {
    this.props.nearest(false);
  }

  render() {
    if (this.props.nearbyroutes.length > 0) {
      return (
        <Content padder>
        {!this.props.nearest_selected && 
          <List

                   dataArray={this.props.nearbyroutes}
                   renderRow={data =>
                   
            <TouchableOpacity
             onPress = {() => this.selectShit(data.route_id)}>
                <CardView  av = {true} distance = {data.distance} word = {data.route} pickup = {data.pickup} dropoff = {data.dropoff}/>
             </TouchableOpacity>
             
                 
         }
         />
        }  
        {this.props.nearest_selected && this.props.nearest_route_single !== null 
          && 
          <View style = {{
            flex: 1,
          }}>
        
        
          <TouchableOpacity style = {{flex: 1, backgroundColor: '#FFF', padding: 20, marginTop: 10,
            marginBottom: 20,
          
									}}>
										
										<View style = {styles.circelFirst}/>
										<View style = {styles.dot1}/>
										<View style = {styles.dot2}/>
										<View style = {styles.dot3}/>
                  	<View style = {styles.circelSecond}/>
										
										<View style = {styles.row1}>
                      <Text 
                      numberOfLines={1}
                      style = {{
												 fontFamily: 'Montserrat-Regular',
												 color: '#22313F',
                         fontSize: 20,}}>
                         {this.props.nearest_route_single[0].pickup}
                         </Text>
				
										</View>
							
										<View style = {styles.row2}>
                      <Text
                      numberOfLines={1}
                       style = {{
												 fontFamily: 'Montserrat-Regular',
												 color: '#22313F',
												 fontSize: 20,
											}}>{this.props.nearest_route_single[0].dropoff} </Text>
										
									
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
            onPress={() => this.props.routes === null ? this.props.navigation.navigate('Route') : this.props.navigation.navigate('RouteSingle', { route_id: this.props.nearest_route_single[0].route_id })}>
				   <Text style={{
                    fontSize: 17,
                    fontFamily: 'Montserrat-Regular',
                    color: 'white'
                  }}>View More</Text>
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
  top: 80,
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
    nearbyroutes,
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
    nearbyroutes,
    nearest_selected,
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
  select_nearest,
  nearest,
  newStuffs,
  })(TabOne);
  
  