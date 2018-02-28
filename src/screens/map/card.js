import React, { Component } from "react";
import { Image , StyleSheet} from 'react-native';
import { Content,View, CardItem, Text,  Body, Badge } from "native-base";
import Icon from 'react-native-vector-icons/FontAwesome';
const word = 'NativeBase is open source and free';
const maxlimit = 30;
export default class CardView extends Component {

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


  render() {
    if (!this.props.av) {
        return (
            <View  style = {{
                  height: 70,
                  backgroundColor: '#f5f5f4',
                  borderRadius: 10,
                  width: '100%',
                  borderColor: '#22A7F0',
                  borderWidth: 1,
                  
                flexDirection: 'row',
                  flex: 1,
                  marginBottom: 10,
                }}>
                  <View style = {{
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignSelf: 'center',
                    flex: 2,
                    padding: 5,
                  }}>
                  <Text style = {{
                    fontSize: 15,
                    color: 'rgba(0,0,0,0.2)',
                  }}>0</Text>
                  
                 
                  </View>
                  <View style = {{
                    flex: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignSelf: 'center',
                  }}>
                  
                    <Text style = {{
                       fontSize: 15,
                       fontWeight: 'bold',
                       color: 'rgba(0,0,0,0.9)',
                    }}>You have no close route!</Text>
                      
      
                   
                  </View>
              </View>
        )
            
    } else {
    return (
      <View  style = {{
            height: 100,
            backgroundColor: '#f5f5f4',
            borderRadius: 10,
            width: '100%',
            borderColor: '#22A7F0',
            borderWidth: 1,
            
            flexDirection: 'row',
            flex: 1,
            marginBottom: 10,
          }}>
            <View style = {{
              alignItems: 'center',
              justifyContent: 'center',
              alignContent: 'center',
              alignSelf: 'center',
              flex: 2,
              padding: 5,
            }}>
            <Text style = {{
              fontSize: 25,
              fontFamily: 'Montserrat-Bold',
              color: '#22313F',
            }}>{this.props.distance}</Text>
             <Text style = {{
              fontSize: 10,
              fontFamily: 'Montserrat-Regular',
              color: '#22313F',
            }}>KM</Text>
             
           
            </View>
            <View style = {{
              flex: 8,
              
            }}>

          <View style = {styles.circelFirst}/>
          <View style = {styles.dot1}/>
          <View style = {styles.dot2}/>
          <View style = {styles.dot3}/>
          <View style = {styles.circelSecond}/>
            
          <View style = {styles.row1}>
											<Text numberOfLines={1} style = {{
												 fontFamily: 'Montserrat-Regular',
												 color: '#22313F',
                         fontSize: 17,}}>
                         {this.props.pickup}
                         </Text>
				
				</View>
        <View style = {styles.row2}>
											<Text numberOfLines={1} style = {{
												 fontFamily: 'Montserrat-Regular',
												 color: '#22313F',
                         fontSize: 17,}}>
                         {this.props.dropoff}
                         </Text>
				
				</View>
            </View>
            
            {this.props.payment  == 'active' &&
            
            
            <View style = {{
              alignItems: 'center',
              justifyContent: 'center',
              alignContent: 'center',
              alignSelf: 'center',
              flex: 2,
              padding: 5,
            }}>
            {/* <Icon style={{ color: "#777", fontSize: 25, width: 30 }}  name = 'barcode' /> */}
            <Image source={require('../../../assets/ticket.png')} />
            </View>
            }
        </View>
      
     
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
    top: 10,
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
  top: 70,
  left: 20
  },
  dot1: {
    position: 'absolute',
    height: 5,
    top: 40,
    left: 28,
    borderColor: '#CCC',
    borderWidth: 1,
  },
  dot2: {
    position: 'absolute',
    height: 5,
    top: 50,
    left: 28,
    borderColor: '#CCC',
    borderWidth: 1,
  },
  dot3: {
    position: 'absolute',
    height: 5,
    top: 60,
    left: 28,
    borderColor: '#CCC',
    borderWidth: 1,
  },
  dot4: {
    position: 'absolute',
    height: 5,
    top: 70,
    left: 28,
    borderColor: '#CCC',
    borderWidth: 1,
  },
  dot5: {
    position: 'absolute',
    height: 5,
    top: 80,
    left: 28,
    borderColor: '#CCC',
    borderWidth: 1,
  },
  row1: {
    marginTop: 10,
    marginLeft: 50,
    justifyContent: 'space-between',
    flexDirection: 'row',
    
},
row2: {
    marginTop: 35,
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
