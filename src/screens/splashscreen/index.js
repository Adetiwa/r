import React, { Component } from "react";
import { Image, View,Platform,Animated,Easing, ActivityIndicator, StatusBar,AsyncStorage,Text, Dimensions } from "react-native";
import { connect } from 'react-redux';
import {  destinationChanged,
          select_vehicle,
          hoverondesc,
          getCurrentLocation,
          get_name_of_loc,
          update_region,
          fetchPrice,
          setUser,
} from '../../actions/Map';
import { NavigationActions } from 'react-navigation'

const {width, height} = Dimensions.get("window");
const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height;


const USER_TOKEN = "user_token";


class SplashPage extends Component {

    state = {
      isLoggedIn: false,
      locked: false
    }


    getToken() {

    }

   
   componentWillMount() {
    // if (Platform.OS !== 'ios') {
    //   this.animatedValue = new Animated.Value(0);
    // } 
 
  }

  async componentDidMount() {

    
        var navigator = this.props.navigator;
          const user = AsyncStorage.getItem(USER_TOKEN)
          .then((data)=> {
            if (data !== null) {
                this.props.setUser(JSON.parse(data));
                // this.props.navigation.navigate('Map');
                this.props.navigation.dispatch(NavigationActions.reset({
                    index: 0,
                    key: null,
                    actions: [NavigationActions.navigate({ routeName: 'Map' })]
                }))
              
            } else {
              try {
              //  this.props.navigation.navigate('RealHome');
                this.props.navigation.dispatch(NavigationActions.reset({
                  index: 0,
                  key: null,
                  actions: [NavigationActions.navigate({ routeName: 'RealHome' })]
              }))
           
              } catch (error) {
              }
            }
          })
    }

    render () {
      
        return (
            <View style={{flex: 1, backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center'}}>
              {/* <StatusBar backgroundColor='#0397dd' barStyle='light-content' /> */}
             
                  <View style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    width: '100%',
                    height: '100%',
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#FFF',
                    zIndex: 100000000,

                  }}>
                  <ActivityIndicator color="#000" style = {{zIndex: 12}} size='small' />
                
                  
                </View>
                
                </View>

        );
    }
}

const mapStateToProps = ({ map }) => {
  const { destination, hoveron,
    pickup, vehicle,
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta,
    error, region, user, loading,emergency, status } = map;
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
    emergency,
  };
};

export default connect(mapStateToProps, {
  destinationChanged,
  getCurrentLocation,
  hoverondesc,
  select_vehicle,
  get_name_of_loc,
  update_region,
  fetchPrice,
  setUser,

})(SplashPage);