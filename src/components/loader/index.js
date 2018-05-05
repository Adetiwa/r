import React, {
    Component,
  } from 'react';
  import {
    ActivityIndicator,
    AppRegistry,
    Dimensions,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    Platform,
    TouchableOpacity,
    TextInput,
    Image,
    View,
  } from 'react-native';
  import * as Animatable from 'react-native-animatable';
  import Icon from 'react-native-vector-icons/Ionicons';

  export default class Loader extends Component {
    constructor (props) {
        super(props);
        
        this.state = {
            show: this.props.show,
        };
    }

    render() {
        if (this.props.show) {
            return (
                <TouchableOpacity
                onPress = {() => this.props.loading && this.props.close}
                style = {{
                    flex: 1,
                    zIndex: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0,
                    position: 'absolute',
                    backgroundColor: 'transparent'
                }}>
                   
                    {!this.props.loading 
                    ?
                    <View style = {{
                        // height: 120,
                        width: 170,
                        alignContent: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderWidth:1,
                        borderColor: 'transparent',
                        backgroundColor: 'rgba(52, 52, 52, 0.9)',
                        borderRadius: 15,
                    }}>
                    <View style = {{
                        paddingTop: 5,
                        paddingRight: 5,
                        paddingLeft:5,
                        paddingBottom: 10,
                    }}>
                     <View style = {{
                        // height: 120,
                        // width: 120,
                        alignContent: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                         <TouchableOpacity
                         onPress = {this.props.close}>
                               <Icon color="#FFF" name="ios-close-outline" size={70} />
                         </TouchableOpacity>
                    </View>
                    <Text style = {{
                        color: '#FFF',
                        textAlign: 'center',
                        fontFamily: 'Montserrat-Regular',
                        fontSize: 19,
                        // padding: 4,
                    }}>{this.props.msg}</Text>
                    </View>
                    </View>
                    :
                    <View style = {{
                        height: 120,
                        width: 120,
                        borderWidth:1,
                        backgroundColor: 'rgba(52, 52, 52, 0.9)',
                        borderRadius: 15,
                    }}>
                    <Image 
                    resizeMode="contain"
                    style={{
                        flex: 1,
                        width: 50, height:50, 
                        resizeMode: 'contain',
                        alignSelf: 'center'
                       }}
                    source={require('../../../assets/loader.gif')} />
                     </View>

                    }


                     </TouchableOpacity>

              )
        } else {
            return null;
        }
     
   
    }
  };
  