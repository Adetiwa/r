import React, { Component } from "react";
import { Content,View, CardItem, Text, Body, Badge } from "native-base";
import { Image } from 'react-native';

import QRCode from 'react-native-qrcode-svg';
import moment from 'moment';
import * as Animatable from 'react-native-animatable';


export default class Ticket extends Component {
    constructor(props) {
        super(props);
        this.state = {
          card_num: '',
          expiryYear: '',
          expiryMonth: '',
          expiryDay: '',
          activeYear: '',
          activeMonth: '',
          activeDay: '',

          type: '',
          active: null,
          
        }
    }

    formatsh(v) {
        if (v == '01') {
            name = 'Jan';
        } else if (v == '02') {
            name = 'Feb';
        } else if (v == '03') {
            name = 'Mar';
        } else if (v == '04') {
            name = 'Apr';
        } else if (v == '05') {
            name = 'May';
        } else if (v == '06') {
            name = 'Jun';
        } else if (v == '07') {
            name = 'July';
        } else if (v == '08') {
            name = 'Aug';
        } else if (v == '09') {
            name = 'Sep';
        } else if (v == '10') {
            name = 'Oct';
        } else if (v == '11') {
            name = 'Nov';
        } else if (v == '12') {
            name = "Dec";
        } 
        return name;
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
}


    componentDidMount() {
        var dat = this.props.ticket[0].date_expired;
        
        this.setState({type : this.props.ticket[0].payment_status});

        if (this.props.ticket[0].payment_status == 'pending') {
            this.setState({active :this.getDataDiff(this.props.ticket[0].date_active)});
        }

        var month = dat.substring(5, 7);
        var day = dat.substring(8, 10);
        var year = dat.substring(0, 4);

        var dat = this.props.ticket[0].date_active;
        var month2 = dat.substring(5, 7);
        var day2 = dat.substring(8, 10);
        var year2 = dat.substring(0, 4);


        this.setState({expiryMonth: this.formatsh(month)});
        this.setState({expiryDay: day});
        this.setState({expiryYear: year});

        this.setState({activeMonth: this.formatsh(month2)});
        this.setState({activeDay: day2});
        this.setState({activeYear: year2});
        

    }
         
  render() {
        return (
            <View style = {{
                flex: 1,
                backgroundColor: '#FFF',
                borderRadius: 20,
                marginTop: 10,
                shadowColor: '#000000',
                shadowOffset: {
                width: 0,
                height: 3
                },
                shadowRadius: 5,
                shadowOpacity: 1.0,
                flexDirection: 'row',
            }}>
                <View style = {{
                    flex: 4,
                    borderBottomLeftRadius: 20,
                    borderTopLeftRadius: 20,
                    padding: 20,
                    flexDirection: 'row',
                    backgroundColor: '#22313F'
                }}>  
                    <View style = {{
                        flex: 3,
                    }}>
                    <Text style = {{
                        color: '#F49C00',
                        fontSize: 40,
                        fontFamily: 'Montserrat-Regular',
                        //fontWeight: 'bold',
                    }}>{this.state.expiryMonth}</Text>
                    <Text style = {{
                        color: '#F49C00',
                        fontSize: 18,
                        //fontWeight: 'bold',
                        fontFamily: 'Montserrat-Regular',
                    }}>{this.state.expiryYear}</Text>
                    <Text style = {{
                        color: '#F49C00',
                        fontSize: 18,
                        //fontWeight: 'bold',
                        fontFamily: 'Montserrat-Regular',
                    }}>{this.props.ticket[0].route}</Text>
                    {this.props.ticket[0].owning ?
                    <Text style = {{
                        color: '#F49C00',
                        fontSize: 18,
                        //fontWeight: 'bold',
                        fontFamily: 'Montserrat-Bold',
                    }}>OWING {this.props.ticket[0].amount_owing} </Text>
                    :
                    <Text style = {{
                        color: '#F49C00',
                        fontSize: 18,
                        //fontWeight: 'bold',
                        fontFamily: 'Montserrat-Bold',
                    }}>PAID ₦{this.props.ticket[0].payment_amount} </Text>
                    }
                    </View>

                    <View style = {{
                        flex: 1,
                        
                    }}>
                    <Text style = {{
                        color: '#F49C00',
                        fontSize: 30,
                        
                        fontFamily: 'Montserrat-Regular',
                    }}>{this.state.expiryDay}</Text>
                    
                    </View>
                    
                    <View style = {{
                        flex: 1,
                    }}>
                    
                    <Text style = {{
                        color: '#F49C00',
                        transform: [{ rotate: '90deg'}],
                        fontSize: 15,
                        width: 100,
                        marginTop: 40,
                        fontFamily: 'Montserrat-Regular',
                        marginHorizontal: -30,
                        //fontWeight: 'bold',
                    }}> {this.props.ticket[0].payment_status.toUpperCase()}</Text>
                    </View>

                    <View style = {{
                        backgroundColor: this.state.type == 'active' ? '#FFF' : 'background:rgba(0,0,0,0.05)',
                        position: 'absolute',
                         left: 25, 
                         right: 50, 
                         bottom: 60, 
                         width: 200,
                         height: 200,
                         justifyContent: 'center', 
                         alignItems: 'center'
                    }}>
                    {this.state.type == 'active' &&
                       <QRCode
                        //value= {`${this.props.ticket[0].payment_status}` `${this.props.ticket[0].date_expired}`}
                        value = {`${this.props.user} ${this.props.ticket[0].payment_status} ${this.props.ticket[0].payment_method} ${this.props.ticket[0].payment_amount} ${this.props.ticket[0].owning} ${this.props.ticket[0].amount_owing_real}`}
                        size= {180}
                    // color={'red'}
                        //logo={logoFromFile}
                        /> 
                    }
                    </View>
                    {this.state.active != null &&
                     <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite" style = {{
                        position: 'absolute',
                         left: 25, 
                         right: 50, 
                         bottom: 20, 
                         width: 200,
                         justifyContent: 'center', 
                         alignItems: 'center'
                    }}>
                      <Text style = {{
                            fontSize: 15,
                            fontFamily: 'Montserrat-Regular',
                            color: '#FFF',
                        }}> Ticket Active in {this.state.active} {this.state.active > 1 ? 'days' : 'day'} 
                        
                    </Text>
                    </Animatable.View>
                    }


                </View>




                <View style = {{
                    flex: 1,
                    backgroundColor: '#F49C00',
                    borderBottomRightRadius: 20,
                    borderTopRightRadius: 15,
                }}>  
                <Text style = {{
                    transform: [{ rotate: '90deg'}],
                    fontSize: 16,
                    color: '#FFF',
                    fontFamily: 'Montserrat-Regular',
                    zIndex: 100,
                    marginTop: 50,
                }}>{this.state.activeDay}</Text>
                <Text style = {{
                    transform: [{ rotate: '90deg'}],
                    fontSize: 16,
                    color: '#FFF',
                    //fontWeight: 'bold',
                    fontFamily: 'Montserrat-Regular',
                    zIndex: 100,
                    marginTop: 50,
                }}>{this.state.activeMonth}</Text>
                <Text style = {{
                    transform: [{ rotate: '90deg'}],
                    color: '#FFF',
                    fontSize: 16,
                    fontFamily: 'Montserrat-Regular',
                    //fontWeight: 'bold',
                    zIndex: 100,
                    marginTop: 30,
                }}>{this.state.activeYear}</Text>
                <Text style = {{
                    transform: [{ rotate: '90deg'}],
                    color: '#FFF',
                    fontSize: 12,
                    fontFamily: 'Montserrat-Regular',
                    zIndex: 100,
                    marginTop: 50,
                }}> {this.props.ticket[0].payment_method}</Text>
          
                </View>
               
            </View>
            
                
    );
    
  }
  
}

