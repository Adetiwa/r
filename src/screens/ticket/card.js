import React, { Component } from "react";
import { Image } from 'react-native';
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

getPayStatus(payment) {
  if (payment == "active") {
    return (
      <Text style = {{
                 fontSize: 15,
                 fontFamily: 'Montserrat-Regular',
                 color: 'rgba(0,0,0,0.9)',
              }}> Expires in {this.props.expires} {this.props.expires > 1 ? 'days' : 'day'} 
              
          </Text>
    );
  } else if (payment == 'pending') {
   return (
       <Text style = {{
                 fontSize: 15,
                 fontFamily: 'Montserrat-Regular',
                 color: 'rgba(0,0,0,0.9)',
              }}> Active in {this.props.active} {this.props.active > 1 ? 'days' : 'day'} 
              
          </Text>
    );
  } else {
    return (
       <Text style = {{
            fontSize: 15,
            fontFamily: 'Montserrat-Regular',
            color: 'rgba(0,0,0,0.9)',
         }}> Expired
         
     </Text>
    );
  }
}

getColor(pa) {
  if (pa == 'active') {
    return (
      <View style = {{
                width: 20,
                height: 20,
                backgroundColor: '#FFF',
                borderColor: '#87D37C',
                borderWidth: 5,
                borderRadius: 20,
            }}/>
    );
  } else if (pa == 'pending') {
    return (
      <View style = {{
                width: 20,
                height: 20,
                backgroundColor: '#FFF',
                borderColor: '#F49C00',
                borderWidth: 5,
                borderRadius: 20,
            }}/>
    );
  } else {
    return (
          <View style = {{
                width: 20,
                height: 20,
                backgroundColor: '#FFF',
                borderColor: '#F05959',
                borderWidth: 5,
                borderRadius: 20,
            }} 
            />
    );
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
                    }}>You have no Active Ticket!</Text>
                      
      
                   
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
            {/* <Text style = {{
              fontSize: 15,
              fontFamily: 'Montserrat-Regular',
              color: 'rgba(0,0,0,0.2)',
            }}>{this.props.distance}</Text>
              */}
              
            {this.getColor(this.props.payment)}
            </View>
            <View style = {{
              flex: 8,
              
            }}>
            
              <Text style = {{
                 fontSize: 20,
                 fontFamily: 'Montserrat-Bold',
                // fontWeight: 'bold',
                 color: 'rgba(0,0,0,0.9)',
                 marginTop: 10,
              }}>{ ((this.props.word).length > maxlimit) ?
                (((this.props.word).substring(0,maxlimit-3)) + '...') :
                this.props.word }</Text>
               {this.props.payment &&
           
                <View style={{flexDirection: 'row', padding: 5}}>


          <Text style = {{
                 fontSize: 15,
                 fontFamily: 'Montserrat-Regular',
                 color: 'rgba(0,0,0,0.9)',
              }}>₦{this.props.payment_amount} 
              
          </Text>
          <Text style = {{
                 fontSize: 15,
                 color: 'rgba(0,0,0,0.9)',
              }}> |
              
          </Text>
          {this.getPayStatus(this.props.payment)}

        </View>

        

} 

{this.props.payment == 'active' &&
           
    <View style={{flexDirection: 'row', padding: 5}}>


<Text style = {{
     fontSize: 15,
     fontFamily: 'Montserrat-Regular',
     color: 'rgba(0,0,0,0.9)',
  }}>{this.getName(this.props.payment_method_of_payment)} Ticket
  
</Text>

</View>



} 
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
