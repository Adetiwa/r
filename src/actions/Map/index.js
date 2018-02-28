import { NavigationActions } from 'react-navigation';
import update from "react-addons-update";

//import RNFetchBlob from 'react-native-fetch-blob';
import { Dimensions } from "react-native";

const {width, height} = Dimensions.get("window");
const ASPECT_RATIO = width/height;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGIN_USER,
  NO_INPUT,
  REGISTERING,
  NEW_USER_SUCCESS,
  NEW_USER_ERROR,
  CANCEL_ERROR_MSG,
  NETWORK,
  GEOCODING,


   DESTINATION_INPUT,
   SELECT_VEHICLE,
   GET_USER_LOCATION,
   HOVER_ON_DESTINATION,
   PICKUP_INPUT,
   INPUT_DONE,
   UPDATE_REGION,
   GET_SUGGESTIONS,
   GET_SUGGESTIONS_EMPTY,
   SET_SUGGETION_PICKUP,
   SET_SUGGETION_DEST,
   GEOCODE_ADDRESS_PICKUP,
   GEOCODE_ADDRESS_DEST,
   ERROR_GEOCODING,
   FETCHING_PRICES,
   FETCH_PRICE_GOOD,
   FETCH_PRICE_BAD,
   FETCHING_HISTORY_SINGLE,
   FETCH_HISTORY_GOOD_SINGLE,
   FETCH_HISTORY_EMPTY_SINGLE,
   FETCH_HISTORY_BAD_SINGLE,
   EDIT_NO_INPUT,
   EDITTING_USER,
   EDIT_USER_SUCCESS,
   EDIT_USER_ERROR,
   GETTING_DISTANCE,
   DISTANCE_FETCH_SUCCESS,
   DISTANCE_FETCH_ERROR,
   GETTING_PRICE,
   STORE_PRICE,
   STORE_KM,
   STORE_HR,
   DRAW_ROUTE,
   DRAWING_ROUTE,
   DRAWING_ROUTE_ERROR,
   PICKUP_LONG_LAT_RESET,
   GET_NAME_OF_LOCATION,
   RESET_NETWORK,
   GET_NAME_OF_LOCATION_ERROR,
   SAVE_USER_INFO,
   DROPOFF_LONG_LAT_RESET,
   DISTANCE_FETCH,
   TIME_FETCH,
   SAVE_STATE,
   ORDER_SUBMIT_SUCCESS,
   ERROR_OVERALL,
   RESET,
   CLEAR_MAP_DATA,
   FETCHING_HISTORY,
   FETCH_HISTORY_GOOD,
   FETCH_HISTORY_EMPTY,
   FETCH_HISTORY_BAD,
   SCREEN_SHOT,
   DRAW_ROUTE_RAW,
   STATIC_IMAGE,
   STATIC_IMAGE_SUCCESS,
   STATIC_IMAGE_ERROR,
   SELECT_HISTORY,
   LOGOUT_SUCCESS,
   LOGOUT_FAILURE,
   MATCH_ALERT_ERROR,
   MATCH_ALERT,
   NO_NEW_MATCH,
   SCHEDULE,
   CONNECTING_DRIVER,
   NO_DRIVER,
   DRIVER_AVAILABLE,
   ERROR_NETWORK_DRIVER,
   EMERGENCY,
   CHARGE_TYPE,
   ONPAYMENT,
   CARD_UPDATE,
   VERYFYING_CARD,
   BAD_VERIFY,
   GOOD_VERIFY,
   ERROR_VERIFY,
   CARD_EXIST,
   NO_CARD,
   ERROR_GETTING_CARD,
   CHANGE_TYPE,
   GETTING_PRICE_ON,
   FETCH_PRICE_ERROR,
   FROM_PAYMENT,
   CHANGE_TOKEN,
   SELECT_SUPPORT,
   FETCHING_SUPPORT,
   FETCH_SUPPORT_GOOD,
   FETCH_SUPPORT_EMPTY,
   EMPTY_PREDICTIONS,
   GETTING_PREDICTION,
   DEL_FCM_TOKEN,
   SEND_USER_LOC,
   SEND_USER_LOC_SUCCESS,
   SEND_USER_LOC_NULL,

   CANCEL_TRIP,
   CANCEL_TRIP_FAILED,
   CANCEL_TRIP_SUCCESS,
   CANCELLING_TRIP,
   RESET_CANCEL_MSG,
   LOGGING_OUT,
   GETTING_ROUTE,
   GET_ROUTE,
   
   GETTING_ROUTE_ALL,
   GET_ROUTE_ALL,
   SELECT_ROUTE,
   FULLNAME_CHANGED,
  TEL_CHANGED,
  SET_LONGITUDE,
  SET_LATITUDE,
  GET_MY_ROUTES,
  GETTING_MY_ROUTES,
  SET_NEAREST_ROUTE_SINGLE,
  NEAREST_SELECTED,
  SET_MY_ROUTE_SINGLE,
  MY_ROUTE_SELECTED,
  GETTING_NEARBY_ROUTES,
  GET_NEARBY_ROUTES,
  SET_PAYMENT,
  GET_WALLET,
  GETTING_WALLET,
  SET_STOPS,
  RESET_ROUTE,
  COUPON_ON,
  COUPON,
  NEW_STUFFS
  } from '../types';


  /***** LOGIN / REGISTER  *****/
  export const emailChanged = (text) => {
    return {
      type: EMAIL_CHANGED,
      payload: text
    };
  };

  export const nearest = (data) => {
    return {
      type: NEAREST_SELECTED,
      payload: data
    };
  };

  
  export const telChanged = (text) => {
    return {
      type: TEL_CHANGED,
      payload: text
    };
  };

  export const setLatitude = (val) => {
    return {
      type: SET_LATITUDE,
      payload: val
    };
  };
  
  export const setLongitude = (val) => {
    return {
      type: SET_LONGITUDE,
      payload: val
    };
  };

  export const fullnameChanged = (text) => {
    return {
      type: FULLNAME_CHANGED,
      payload: text
    };
  };
  
  export const passwordChanged = (text) => {
    return {
      type: PASSWORD_CHANGED,
      payload: text
    };
  };
  
  export const selectRoute = (route_id) => {
    return {
      type: SELECT_ROUTE,
      payload: route_id
    };
  };
  
  
  
  export const register = (fullname, tel, email, password, route) => {
    return (dispatch) => {
        //login user
        dispatch({ type: REGISTERING });
        fetch('https://admin.rova.com.ng/api2/register', {
  
          method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              fullname: fullname,
              tel: tel,
              email: email,
              password: password,
              route: route
            })
          })
          .then((response) => response.json())
          .then((responseJson) => {
            dispatch({ type: NETWORK, payload: true });
            
            if (responseJson.status === 'success') {
              dispatch({ type: NEW_USER_SUCCESS, payload: responseJson });
              //dispatch(NavigationActions.navigate({ routeName: 'Map' }));
            } else {
              dispatch({ type: NEW_USER_ERROR, payload: responseJson.msg });
              
            } 
          })
          .catch((error) => {
            dispatch({ type: NETWORK, payload: false });
            dispatch({ type: NEW_USER_ERROR, payload: "An error occured while getting match background" })
          })
      }
  };
  
  
  
  export const loginUser = ( email, password ) => {
      
    if (email === '' || password === '') {
        return (dispatch) => {
          dispatch({ type: NO_INPUT, payload: null });
        }
  
    } else {
      return (dispatch) => {
          //login user
          dispatch({ type: LOGIN_USER });
          fetch('https://admin.rova.com.ng/api2/user', {
  
            method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: email,
                password: password,
              })
            })
            .then((response) => response.json())
            .then((responseJson) => {
              dispatch({ type: NETWORK, payload: true });
              
              console.log(JSON.stringify(responseJson));
              
              
              let status = responseJson.status;
              if (status === 'success') {
                //AsyncStorage.setItem('user_access_token', responseJson.token);
                //var t = AsyncStorage.getItem('user_access_token')
                //console.log("The realest token is "+t);
                dispatch({ type: LOGIN_USER_SUCCESS, payload: responseJson });
               // dispatch(NavigationActions.navigate({ routeName: 'Map' }));
              } else {
                dispatch({ type: LOGIN_USER_ERROR, payload: responseJson })
              }
  
            })
            .catch((error) => {
              console.log("Error LOGIN is "+error);
              dispatch({ type: NETWORK, payload: false });
              //dispatch({ type: LOGIN_USER_ERROR, payload: "something happened o"+ error  })
            })
  
  
      }
  
    }
  
  };

  /****END  OF LOGIN / REGISTER *****/
  

  export const empty_predictions = (val) => {
    return {
      type: EMPTY_PREDICTIONS,
      payload: val
    };
};

  export const from_where = (val) => {
    return {
      type: FROM_PAYMENT,
      payload: val
    };
};

export const network_change = (val) => {
  return {
    type: NETWORK,
    payload: val
  };
};

export const destinationChanged = (text) => {
  return {
    type: DESTINATION_INPUT,
    payload: text
  };
};

export const charge_method = (val) => {
  return {
    type: CHARGE_TYPE,
    payload: val
  };
};

export const save_summary_state = (data) => {
    if ((data.pick_up_name === '') || (data.pick_up_tel === '') || (data.drop_off_name === '') || (data.drop_off_tel === '') || (data.extra === '')) {
        return (dispatch) => {
        dispatch({ type: EDIT_NO_INPUT, payload: null });

        }
    } else {
        return (dispatch) => {
        dispatch({ type: SAVE_STATE, payload: data });
        dispatch(NavigationActions.navigate({ routeName: 'Summary' }));
        }
    }
}

export const clearEverything = (fcm_token) => {
  return(dispatch) => {
    dispatch({ type: LOGGING_OUT, payload: true });
    
    fetch('https://admin.rova.com.ng/api2/deltoken', {

      method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fcm_token: fcm_token,
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        dispatch({ type: LOGGING_OUT, payload: false });
        let status = responseJson.status;
        if (status === 'success') {
          dispatch({ type: LOGOUT_SUCCESS, payload: true });
          //this.props.navigation.navigate('Profile', {name: 'Lucy'})
          //dispatch(NavigationActions.navigate({ routeName: 'Map' }));
        } else {
          dispatch({ type: LOGOUT_FAILURE, payload: false });
          
        }

      })
      .catch((error) => {
        dispatch({ type: NETWORK, payload: false });
        dispatch({ type: LOGOUT_FAILURE, payload: false });
        
    })
  }

};


export const get_wallet_info = (id) => {
  return(dispatch) => {
    dispatch({ type: GETTING_WALLET, payload: true });
    
    fetch('https://admin.rova.com.ng/api2/check-wallet', {

      method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: id,
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        dispatch({ type: GETTING_WALLET, payload: false });
        dispatch({ type: GET_WALLET, payload: responseJson });
        
      })
      .catch((error) => {
        dispatch({ type: NETWORK, payload: false });
        console.log("Wallet Error "+error);
        dispatch({ type: GETTING_WALLET, payload: false });
        
    })
  }

};
/*
export const clearEverything = () => {
  return {
    type: LOGOUT,
    payload: true
  };
};
*/

export const pickupChanged = (text) => {
  return {
    type: PICKUP_INPUT,
    payload: text
  };
};

export const resetNetwork = () => {
  return {
    type: RESET_NETWORK,
    payload: true
  };
};


export const select_vehicle = (type) => {
  return {
    type: SELECT_VEHICLE,
    payload: type
  };
}
export const saveScreenShot = (uri) => {
  return {
    type: SCREEN_SHOT,
    payload: uri,
  }
}

export const hoverondesc = () => {
  return {
    type: HOVER_ON_DESTINATION,
    payload: true,
  };
}


export const selectHistory = (history_id) => {
  return {
    type: SELECT_HISTORY,
    payload: history_id,
  };
}


export const newStuffs = (history_id) => {
  return {
    type: NEW_STUFFS,
    payload: history_id,
  };
}


export const selectSupport = (support_id) => {
  return {
    type: SELECT_SUPPORT,
    payload: support_id,
  };
}



export const setUser = (user) => {
  return {
    type: SAVE_USER_INFO,
    payload: user,
  };
}

export const setDate = (date) => {
  return {
    type: SCHEDULE,
    payload: date,
  };
}

export const input_everything = () => {
  return {
    type: INPUT_DONE,
    payload: true,
  }
}

export const update_region = (region) => {
  return {
    type: UPDATE_REGION,
    payload: region,
  }
}

export const set_suggestion_dest = (suggestion) => {
  return {
    type: SET_SUGGETION_DEST,
    payload: suggestion,
  }
}
export const set_suggestion_pick = (suggestion) => {
  return {
    type: SET_SUGGETION_PICKUP,
    payload: suggestion,
  }
}

export const clearSomethings = () => {
  return {
    type: CLEAR_MAP_DATA,
    payload: null,
  }
}

export const getCurrentLocation = () => {
  return(dispatch) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
          console.log("Current pos is "+position);
          dispatch({
            type: GET_USER_LOCATION,
            payload: position
          })
          /*dispatch({
            type: UPDATE_REGION,
            payload: position
          })
          dispatch({type: GET_NAME_OF_LOCATION, payload: address })
          */
        },
      (error) => console.log(error.message),
      {enableHighAccuracy: false,
         timeout: 20000,
         maximumAge: 1000
       }
    )
  }
}


export const get_name_of_loc = (lat, long) => {
  //Required parameters
    return(dispatch) => {
    var api_key = "AIzaSyBh4rucFuUaLSmWD2SLoRwxdM3WFQbsyyM";
    fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+long+'&key='+api_key, {

      method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then((response) => response.json())
      .then((responseJson) => {
        dispatch({ type: NETWORK, payload: true });
        let status = responseJson.status;
        if (status === 'OK') {
          //responseJson.predictions.fi
          var a = responseJson.results;
          var address = a[0].formatted_address;

          dispatch({type: GET_NAME_OF_LOCATION, payload: address })
          dispatch({ type: NETWORK, payload: true });
          //this.props.navigation.navigate('Profile', {name: 'Lucy'})
          //dispatch(NavigationActions.navigate({ routeName: 'Map' }));
        } else {
          dispatch({ type: GET_NAME_OF_LOCATION_ERROR, payload: "" });
        }

      })
      .catch((error) => {
        dispatch({ type: NETWORK, payload: false });
        dispatch({ type: GET_NAME_OF_LOCATION, payload: "" })
      })
  }
}



export const geocodeTheAddress_pickup = (address) => {
  //edRequired parameters
    return(dispatch) => {
    dispatch({ type: GEOCODING, payload: true });
    var api_key = "AIzaSyBh4rucFuUaLSmWD2SLoRwxdM3WFQbsyyM";
    fetch('https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&region=NG&key='+api_key, {

      method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then((response) => response.json())
      .then((responseJson) => {
        dispatch({ type: NETWORK, payload: true });
        
        let status = responseJson.status;
        dispatch({ type: GEOCODING, payload: false });
    
        if (status === 'OK') {
          //responseJson.predictions.fi
          //dispatch({ type: GEOCODE_ADDRESS_PICKUP, payload: responseJson.results});
          var a = responseJson.results;
          var long_lat = a[0].geometry.location;
          console.log('NEw - Long - Lat - is -'+ JSON.stringify(long_lat));

          dispatch({type: PICKUP_LONG_LAT_RESET, payload: long_lat });
        
        } else {
          dispatch({ type: ERROR_GEOCODING, payload: responseJson.status });
        }

      })
      .catch((error) => {
        dispatch({ type: NETWORK, payload: false });
        dispatch({ type: GEOCODING, payload: false });
    
        dispatch({ type: ERROR_GEOCODING, payload: "ERROR GEOCODING" })
      })
  }
}

export const geocodeTheAddress_dest = (address) => {
  //Required parameters
    return(dispatch) => {
    dispatch({ type: GEOCODING, payload: true });
    var api_key = "AIzaSyBh4rucFuUaLSmWD2SLoRwxdM3WFQbsyyM";
    fetch('https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&region=NG&key='+api_key, {

      method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then((response) => response.json())
      .then((responseJson) => {
        dispatch({ type: NETWORK, payload: true });
        dispatch({ type: GEOCODING, payload: false });
    
        let status = responseJson.status;
        if (status === 'OK') {
          //responseJson.predictions.fi
          //dispatch({ type: GEOCODE_ADDRESS_PICKUP, payload: responseJson.results});
          var a = responseJson.results;
          var long_lat = a[0].geometry.location;
          dispatch({type: DROPOFF_LONG_LAT_RESET, payload: long_lat })
          //this.props.navigation.navigate('Profile', {name: 'Lucy'})
          //dispatch(NavigationActions.navigate({ routeName: 'Map' }));
        } else {
          dispatch({ type: ERROR_GEOCODING, payload: responseJson.status });
        }
        

      })
      .catch((error) => {
        dispatch({ type: NETWORK, payload: false });
        dispatch({ type: GEOCODING, payload: false });
    
        dispatch({ type: ERROR_GEOCODING, payload: "Error geocoding" })
      })
  }
}

function cleanString(input) {
  input = input.replace(/ /g, '-'); // Replaces all spaces with hyphens.

   return input.replace(/[^A-Za-z0-9\-]/g, ''); // Removes special chars.
}

/***** Predictions *****/

export const getAddressPrediction = (input) => {
        return(dispatch) => {
          dispatch({ type: GETTING_PREDICTION, payload: true });
          //dispatch({ type: EMPTY_PREDICTIONS, payload: true });
          
          //Required parameters
          var api_key = "AIzaSyCCcOcMglhvXnRsniygV44jmi5QzMdfyVI";
          fetch('https://maps.googleapis.com/maps/api/place/autocomplete/json?input='+cleanString(input)+'&libraries=places&region=NG&language=pt_BR&key='+api_key, {

            method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            })
            .then((response) => response.json())
            .then((responseJson) => {
              dispatch({ type: NETWORK, payload: true });
              dispatch({ type: GETTING_PREDICTION, payload: false });
              
              let status = responseJson.status;
              if (status !== 'ZERO_RESULTS') {
                //responseJson.predictions.fi
                dispatch({ type: GET_SUGGESTIONS, payload: responseJson.predictions });
                //this.props.navigation.navigate('Profile', {name: 'Lucy'})
                //dispatch(NavigationActions.navigate({ routeName: 'Map' }));
              } else {
                dispatch({ type: GET_SUGGESTIONS_EMPTY, payload: responseJson.predictions });
              }

            })
            .catch((error) => {
              dispatch({ type: GETTING_PREDICTION, payload: false });
              
              dispatch({ type: NETWORK, payload: false });
              dispatch({ type: GET_SUGGESTIONS_EMPTY, payload: "Error" })
            })
        }
      }
    


/***** End ****/



export const getHistory = (userid) => {
    return (dispatch) => {
        dispatch({ type: FETCHING_HISTORY });
        fetch('https://admin.rova.com.ng/api2/history', {

          method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userid: userid,
            })
          })
          .then((response) => response.json())
          .then((responseJson) => {
            dispatch({ type: NETWORK, payload: true });
            
            if (responseJson.status === 'null') {
              dispatch({ type: FETCH_HISTORY_EMPTY, payload: responseJson });
            } else {
              dispatch({ type: FETCH_HISTORY_GOOD, payload: responseJson });
            }
          })
          .catch((error) => {
            dispatch({ type: NETWORK, payload: false });
            dispatch({ type: FETCH_HISTORY_BAD, payload: "Error occured getting history" })
          })
      }
  };



export const find_route = (pickup_lat, pickup_lng, dropoff_lat, dropoff_lng) => {
  return (dispatch) => {
      //login user
      dispatch({ type: GETTING_ROUTE });
      fetch('https://admin.rova.com.ng/api2/find-route', {

        method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            pickup_lat: pickup_lat,
            pickup_lng: pickup_lng,
            dropoff_lat: dropoff_lat,
            dropoff_lng: dropoff_lng
          })
        })
        .then((response) => response.json())
        .then((responseJson) => {
          dispatch({ type: NETWORK, payload: true });
          
          dispatch({ type: GET_ROUTE, payload: responseJson });

        })
        .catch((error) => {
          dispatch({ type: NETWORK, payload: false });
        })
    }
};

export const all_route = () => {
  return (dispatch) => {
      //login user
      dispatch({ type: GETTING_ROUTE_ALL, payload: true });
      fetch('https://admin.rova.com.ng/api2/all-route', {

        method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        })
        .then((response) => response.json())
        .then((responseJson) => {
          dispatch({ type: NETWORK, payload: true });
          
          dispatch({ type: GET_ROUTE_ALL, payload: responseJson });

        })
        .catch((error) => {
          console.log("Route Error is "+ error);
          dispatch({ type: GETTING_ROUTE_ALL, payload: false });
      
          dispatch({ type: NETWORK, payload: false });
        })
    }
};



  export const getsupport = () => {
    return (dispatch) => {
        //login user
        dispatch({ type: FETCHING_SUPPORT });
        fetch('https://admin.rova.com.ng/api2/support', {

          method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
             // userid: userid,
            })
          })
          .then((response) => response.json())
          .then((responseJson) => {
            dispatch({ type: NETWORK, payload: true });
            
            if (responseJson.status === 'null') {
              dispatch({ type: FETCH_SUPPORT_EMPTY, payload: responseJson });
            } else {
              dispatch({ type: FETCH_SUPPORT_GOOD, payload: responseJson });
            }
          })
          .catch((error) => {
            dispatch({ type: FETCH_SUPPORT_BAD, payload: "Error occured getting history" });
            dispatch({ type: NETWORK, payload: false });
       
          })
      }
  };



  export const coupon = (coupon, userid) => {
    return (dispatch) => {
        //login user
        console.log(coupon);
        dispatch({ type: COUPON_ON, payload: true });
        dispatch({ type: NETWORK, payload: true });
        dispatch({ type: COUPON, payload: '' });
        if (coupon == '' || coupon == null) {
          dispatch({ type: COUPON_ON, payload: false });
          dispatch({ type: COUPON, payload: 'Enter a coupon code first' });
          
        } else {  
          
          fetch('https://admin.rova.com.ng/api2/coupon', {

            method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                user: userid,
                coupon: coupon
              })
            })
            .then((response) => response.json())
            .then((responseJson) => {
              dispatch({ type: NETWORK, payload: true });
              dispatch({ type: COUPON_ON, payload: false });
          
              if (responseJson.status === 'null') {
                dispatch({ type: COUPON, payload: responseJson.status_msg });
              } else {
                dispatch({ type: GET_WALLET, payload: responseJson });
                dispatch({ type: COUPON, payload: responseJson.status_msg });
              }
              console.log("Coupon Error 1 "+ JSON.stringify(responseJson));

            })
            .catch((error) => {
              dispatch({ type: NETWORK, payload: false });
              dispatch({ type: COUPON_ON, payload: false });
              console.log("Coupon Error 2 "+ JSON.stringify(responseJson));
              
            })
        }
      }
  };



  export const getThisHistory = (id) => {
    return (dispatch) => {
        //login user
        dispatch({ type: FETCHING_HISTORY_SINGLE });
        fetch('https://admin.rova.com.ng/api2/singlehistory', {

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
            dispatch({ type: NETWORK, payload: true });
            
            if (responseJson.status === 'null') {
              dispatch({ type: FETCH_HISTORY_EMPTY_SINGLE, payload: responseJson });
            } else {
              dispatch({ type: FETCH_HISTORY_GOOD_SINGLE, payload: responseJson });
              //console.log(JSON.stringify(responseJson));
            }
          })
          .catch((error) => {
            dispatch({ type: NETWORK, payload: false });
            dispatch({ type: FETCH_HISTORY_BAD_SINGLE, payload: "History error" })
          })
      }
  };


  export const getMyRoutes = (date) => {
    return {
      type: GET_MY_ROUTES,
      payload: date,
    };
  }
  
  export const select_nearest = (date) => {
    return {
      type: SET_NEAREST_ROUTE_SINGLE,
      payload: date,
    };
  }

  export const select_my_single_route = (date) => {
    return {
      type: SET_MY_ROUTE_SINGLE,
      payload: date,
    };
  }

  

  export const my_route_selected = (data) => {
    return {
      type: MY_ROUTE_SELECTED,
      payload: data,
    };
  }
  

  
  export const setPayment = (data) => {
    return {
      type: SET_PAYMENT,
      payload: data,
    };
  }
  
  
  /*export const getMyRoutes = (id) => {
    return (dispatch) => {
        //login user
        dispatch({ type: GETTING_MY_ROUTES, payload: true });
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
            dispatch({ type: NETWORK, payload: true });
            dispatch({ type: GETTING_MY_ROUTES, payload: false });
            dispatch({ type: GET_MY_ROUTES, payload: responseJson });
             if (responseJson.length !== 0) {
              var pickup = responseJson[0].pickup;
              var dropoff = responseJson[0].dropoff;
              var waypoints = responseJson[0].stops.map((point) => {
                return encodeURI(point.stop);
              }).join("|");
              
              //getRoute(pickup, dropoff, waypoints);
             }
           })
          .catch((error) => {
            dispatch({ type: NETWORK, payload: false });
            dispatch({ type: GETTING_MY_ROUTES, payload: false });
            console.log('An error occured '+ error);
            //console.warn(error.responseText);
          })
      }
  };*/


export const fetchPrice = (vehicle, emergency) => {
  if (vehicle === '' || emergency === '') {
      //return (dispatch) => {
      //  dispatch({ type: NO_INPUT, payload: null });
      //}

  } else {
    return (dispatch) => {
        //login user
        dispatch({ type: FETCHING_PRICES });
        fetch('https://admin.rova.com.ng/api2/price', {

          method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              vehicle: vehicle,
              emergency: emergency,
            })
          })
          .then((response) => response.json())
          .then((responseJson) => {
            dispatch({ type: NETWORK, payload: true });
            
            let status = responseJson.status;
            if (status === 'success') {
              dispatch({ type: FETCH_PRICE_GOOD, payload: responseJson });
              //this.props.navigation.navigate('Profile', {name: 'Lucy'})
              //dispatch(NavigationActions.navigate({ routeName: 'Map' }));
            } else {
              dispatch({ type: FETCH_PRICE_BAD, payload: responseJson })
            }

          })
          .catch((error) => {
            dispatch({ type: FETCH_PRICE_ERROR, payload: true })
            dispatch({ type: NETWORK, payload: false });
            
          })


    }

  }

};


export const editUser = (fullname, email, tel, password, token, userid) => {
  if ((email === '') || (fullname === '') || (tel === '') || (password === '') || (token === '') || (userid === '')) {
      return (dispatch) => {
        dispatch({ type: EDIT_NO_INPUT, payload: null });
      }

  } else {
    return (dispatch) => {
        //login user
        dispatch({ type: EDITTING_USER });
        fetch('https://admin.rova.com.ng/api2/edit', {

          method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              fullname: fullname,
              tel: tel,
              email: email,
              password: password,
              token: token,
              userid: userid,
            })
          })
          .then((responsee) => responsee.json())
          .then((responseeJson) => {
            dispatch({ type: NETWORK, payload: true });
            
            let status = responseeJson.status;
            if (status === 'success') {
              dispatch({ type: EDIT_USER_SUCCESS, payload: responseeJson });
              //this.props.navigation.navigate('Profile', {name: 'Lucy'})
            } else {
              dispatch({ type: EDIT_USER_ERROR, payload: responseeJson })
            }

          })
          .catch((error) => {
            dispatch({ type: NETWORK, payload: false });
            dispatch({ type: EDIT_USER_ERROR, payload: "Error editting" })
          })


    }

  }

};


export const getDistance = (pickup, destination) => {

    return (dispatch) => {
        //login user
        dispatch({ type: GETTING_DISTANCE, payload: true });
        var api_keey = "AIzaSyAOV8tYnxNbd37Ds9NmwF6mSjpy78kFdkg";

        fetch('https://maps.googleapis.com/maps/api/distancematrix/json?origins='+pickup+'&destinations='+destination+'&mode=driving&region=NG&fare=NGN&language=en-EN&key='+api_keey, {
          method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },

          })
          .then((response) => response.json())
          .then((responseJson) => {
            let status = responseJson.status;
            if (status === 'OK') {
              dispatch({ type: NETWORK, payload: true });
              
              dispatch({ type: DISTANCE_FETCH_SUCCESS, payload: responseJson.rows });
              var a = responseJson.rows;
              var distance = a[0].elements[0].distance.value;
              var time = a[0].elements[0].duration.value;
              dispatch({ type: DISTANCE_FETCH, payload: Math.ceil(Number(distance/1000)) });
              dispatch({ type: TIME_FETCH, payload: Math.ceil(Number(time/60)) });

            } else {
              dispatch({ type: DISTANCE_FETCH_ERROR, payload: responseJson })
            }

          })
          .catch((error) => {
            dispatch({ type: NETWORK, payload: false });
            
            dispatch({ type: DISTANCE_FETCH_ERROR, payload: "Error getting distance" })
          })


    }
};



export const getStaticImage = (route) => {

      return (dispatch) => {
          //login user
          var api_key = "AIzaSyDz8hAJiNiqCVaoNaNcJC8GyxgU_2u6tXA";
          url = 'https://maps.googleapis.com/maps/api/staticmap?size=960x400&path=enc:'+route+'&key='+api_key;

          dispatch({ type: STATIC_IMAGE_SUCCESS, payload: url });

       }
  };





export const calculatePrice = (km, hr, price_per_km, price_per_hr, emergency) => {
  return (dispatch) => {

    dispatch({ type: GETTING_PRICE_ON, payload: price });
    var km_num = Number(km);
    var hr_num = Number(hr);
    var num_price_per_km = Number(price_per_km);
    var num_price_per_hr = Number(price_per_hr);
    var num_emergency = Number(emergency);

    var price = (km_num * num_price_per_km) + (hr_num + num_price_per_hr) + num_emergency;
    dispatch({ type: GETTING_PRICE, payload: price });
    dispatch({ type: STORE_KM, payload: Math.ceil(km_num) });
    dispatch({ type: STORE_HR, payload: Math.ceil(hr_num*60) });
  }
}

export const updateCard = (card) => {
  return {
    type: CARD_UPDATE,
    payload: card,
  }
}

export const StorePrice = (price) => {
  return {
    type: STORE_PRICE,
    payload: price,
  }
}

export const onPayment = (val) => {
  return {
    type: ONPAYMENT,
    payload: val,
  };
};

export const StoreKm = (km) => {
  return {
    type: STORE_KM,
    payload: km,
  }
}
export const StoreHr = (hr) => {
  return {
    type: STORE_HR,
    payload: hr,
  }
}

export const reset = () => {
  return {
    type: RESET,
    payload: null,
  }
}
export const change_type = (val) => {
  return {
    type: CHANGE_TYPE,
    payload: val,
  }
}
export const setEmergency = (data) => {
  return {
    type: EMERGENCY,
    payload: data,
  }
}

export const hahaCard = (data) => {
  return {
    type: CARD_EXIST,
    payload: data,
  }
}

export const hahaWallet = (data) => {
  return {
    type: GET_WALLET,
    payload: data,
  }
}

//get ROutes


function decode (t,e) {
  for(var n,o,u=0,l=0,r=0,d= [],h=0,i=0,a=null,c=Math.pow(10,e||5);u<t.length;){a=null,h=0,i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;
    while(a>=32);
    n=1&i?~(i>>1):i>>1,h=i=0;
    do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);o=1&i?~(i>>1):i>>1,l+=n,r+=o,d.push([l/c,r/c])}return d=d.map(function(t){return{latitude:t[0],longitude:t[1]}})
}



export const getRoute = (pickup, destination, waypoints) => {
  return (dispatch) => {
  dispatch({type: RESET_ROUTE, payload: true });
  dispatch({ type: DRAWING_ROUTE, payload: true });
  const mode = 'driving'; // 'walking';
  //const origin = pickup;
  //const destination = destination;
  const APIKEY = 'AIzaSyDazSY71rPfUy_eOP_p_6PWPhYX2HLzajQ';
  const url = 'https://maps.googleapis.com/maps/api/directions/json?origin='+pickup+'&destination='+destination+'&waypoints='+waypoints+'&region=NG&key='+APIKEY+'&mode='+mode;
  
  fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        
        dispatch({ type: NETWORK, payload: true });
        dispatch({ type: DRAWING_ROUTE, payload: false });
  
          if (responseJson.routes.length) {
              dispatch({type: DRAW_ROUTE_RAW, payload: responseJson.routes[0].overview_polyline.points });
              dispatch({ type: DRAW_ROUTE, payload: decode(responseJson.routes[0].overview_polyline.points) }); // definition below
              dispatch({ type: SET_STOPS, payload: responseJson.routes[0].legs }); // definition below

          }
      }).catch(e => {
        console.log('Error is '+e);
        dispatch({ type: NETWORK, payload: false });
        dispatch({ type: DRAWING_ROUTE, payload: false });
  
        dispatch({ type: DRAWING_ROUTE_ERROR });

      }
    );
  }
}




export const submitOrder = (user, pickup, destination, emergency, order_info, pickup_coords, dropoff_coords, type, scheduled, amount, km, min, screenshot, base, toll, emergency_cost, vehicle, charge_type, flutterwave_token, transaction_id) => {
  if ((pickup === '') || (destination === '') || (pickup_coords === '') || (dropoff_coords === '') || (amount === 0)) {
      return (dispatch) => {
        dispatch({ type: ERROR_OVERALL, payload: null });
      }

  } else {
    return (dispatch) => {
        //login user
        dispatch({ type: EDITTING_USER });
        fetch('https://admin.rova.com.ng/api2/submit-orders', {

          method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user: user,
              pickup: pickup,
              destination: destination,
              emergency: emergency,
              pickup_coords_lat: pickup_coords.lat,
              dropoff_coords_lat: dropoff_coords.lat,
              pickup_coords_lng: pickup_coords.lng,
              dropoff_coords_lng: dropoff_coords.lng,
              type: type,
              scheduled: scheduled,
              amount: amount,
              pickup_tel: order_info.pick_up_tel,
              dropoff_tel: order_info.drop_off_tel,
              pickup_name: order_info.pick_up_name,
              dropoff_name: order_info.drop_off_name,
              extra: order_info.extra,
              km: km,
              min: min,
              screenshot: screenshot,
              base: base,
              toll: toll,
              emergency_cost: emergency_cost,
              vehicle:vehicle,
              charge_type: charge_type,
              flutterwave_token:flutterwave_token,
              transaction_id: transaction_id


            })
          })
          .then((responsee) => responsee.json())
          .then((responseeJson) => {
            dispatch({ type: NETWORK, payload: true });
            
            let status = responseeJson.status;
            if (status === 'Successful') {
              dispatch({ type: ORDER_SUBMIT_SUCCESS, payload: responseeJson });
              console.log(JSON.stringify(responseeJson));
              //this.props.navigation.navigate('Profile', {name: 'Lucy'})
            } else {
              dispatch({ type: ERROR_OVERALL, payload: responseeJson });
              console.log(JSON.stringify(responseeJson));
            }

          })
          .catch((error) => {
            dispatch({ type: NETWORK, payload: false });
            
            
            dispatch({ type: ERROR_OVERALL, payload: "error submitting order" })
          })
        }

  }

};

export const getCard = (user) => {
  //var array = card.expiry.split('/');
  return (dispatch) => {
      //login user
      fetch('https://admin.rova.com.ng/api2/get-card', {
        method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: user,
          })
        })
        .then((response) => response.json())
        .then((responseJson) => {
          dispatch({ type: NETWORK, payload: true });
          
          if (responseJson.has_card) {
            dispatch({ type: CARD_EXIST, payload: responseJson });
            console.log(JSON.stringify(responseJson));
          } else {
            dispatch({ type: NO_CARD, payload: responseJson });
            console.log(JSON.stringify(responseJson));
          }
        })
        .catch((error) => {
          dispatch({ type: NETWORK, payload: false });
          
          dispatch({ type: ERROR_GETTING_CARD, payload: "An error occured while getting card" })
        })
    }
};


export const verifyCard = (card, user) => {
  //var array = card.expiry.split('/');
  return (dispatch) => {
      //login user
      dispatch({ type: VERYFYING_CARD });
      fetch('https://admin.rova.com.ng/api2/tokenize', {

        method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            number: card.values.number,
            expiry: card.values.expiry,
            cvc: card.values.cvc,
            name: card.values.name,
            user: user,
            type: card.values.type
          })
        })
        .then((response) => response.json())
        .then((responseJson) => {
          dispatch({ type: NETWORK, payload: true });
          
          if (responseJson.status !== 'success') {
            dispatch({ type: BAD_VERIFY, payload: responseJson });
            console.log(JSON.stringify(responseJson));
          } else {
            dispatch({ type: GOOD_VERIFY, payload: responseJson });
            console.log(JSON.stringify(responseJson));
          }
        })
        .catch((error) => {
          dispatch({ type: NETWORK, payload: false });
          
          dispatch({ type: ERROR_VERIFY, payload: "An error occured while verifying card" })
        })
    }
};


export const getNearByRoutes = (lat, long) => {
  return (dispatch) => {
      dispatch({ type: GETTING_NEARBY_ROUTES, payload: true });
      fetch('https://admin.rova.com.ng/api2/nearest-route', {

        method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            lat: lat,
            lng: long
          })
        })
        .then((response) => response.json())
        .then((responseJson) => {
          dispatch({ type: NETWORK, payload: true });
        
            dispatch({ type: GET_NEARBY_ROUTES, payload: responseJson });
          
        })
        .catch((error) => {
          dispatch({ type: NETWORK, payload: false });
          console.log('Nearby Error '+error)
          
        })
    }
};




export const getNewMatch = (id) => {
  return (dispatch) => {
      //login user
      //dispatch({ type: FETCHING_HISTORY_SINGLE });
      fetch('https://admin.rova.com.ng/api2/new-order', {

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
          dispatch({ type: NETWORK, payload: true });
          
          if (responseJson.status === 'null') {
            dispatch({ type: NO_NEW_MATCH, payload: true });
            console.log(JSON.stringify(responseJson));
          } else {
            dispatch({ type: MATCH_ALERT, payload: responseJson });
            dispatch({ type: NO_NEW_MATCH, payload: false });
            console.log(JSON.stringify(responseJson));
          }
        })
        .catch((error) => {
          dispatch({ type: NETWORK, payload: false });
          dispatch({ type: MATCH_ALERT_ERROR, payload: "An error occured while getting match background" })
        })
    }
};

export const getDriver = (id) => {
  return (dispatch) => {
      //login user
      dispatch({ type: CONNECTING_DRIVER, payload: "Connecting you to an available driver!" });
      fetch('https://admin.rova.com.ng/api2/driver', {

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
          dispatch({ type: NETWORK, payload: true });
          
          if (responseJson.status === 'null') {
            dispatch({ type: NO_DRIVER, payload: "NO DRIVER IS AVAILABLE AT THE MOMENT :(" });
             } else {
            dispatch({ type: DRIVER_AVAILABLE, payload: responseJson });
             }
        })
        .catch((error) => {
          dispatch({ type: NETWORK, payload: false });
          dispatch({ type: ERROR_NETWORK_DRIVER, payload: "AN ERROR OCCURED. PROBABLY YOUR NETWORK" })
        })
    }
};



export const onChangeToken = (user, token, device) => {
  return (dispatch) => {
      //login user
      dispatch({ type: CHANGE_TOKEN, payload: token });
      fetch('https://admin.rova.com.ng/api2/fcm-change-token', {

        method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: user,
            token: token,
            device: device,
          })
        })
        .then((response) => response.json())
        .then((responseJson) => {
          dispatch({ type: NETWORK, payload: true });
          
          console.log("FCMMMMMMMMMMMMMMMMMMMM ! "+ " User - " + user + " " + JSON.stringify(responseJson));
        })
        .catch((error) => {
          dispatch({ type: NETWORK, payload: false });
          console.log('Token Error '+error)
          //dispatch({ type: ERROR_NETWORK_DRIVER, payload: "AN ERROR OCCURED. PROBABLY YOUR NETWORK" })
        })
    }
};



export const cancelTrip = (order, user, driver) => {
  return (dispatch) => {
      //login user
      dispatch({ type: CANCELLING_TRIP, payload: true });
      fetch('https://admin.rova.com.ng/api2/reject', {

        method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            order: order,
            user: user,
            driver: driver,
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log("Status is "+responseJson[0].status);
          
          if ((responseJson[0].status === 'success') || (responseJson[0].status_code === 200)){
            dispatch({ type: CANCEL_TRIP_SUCCESS, payload: responseJson[0].status_msg });
            dispatch({ type: FETCH_HISTORY_GOOD, payload: responseJson });
          } else {
             dispatch({ type: CANCEL_TRIP_FAILED, payload: "An error occured on the server" });
          
         }
        })
        .catch((error) => {
          dispatch({ type: CANCEL_TRIP_FAILED, payload: "Network Error!" });
          //dispatch({ type: ERROR_NETWORK_DRIVER, payload: "AN ERROR OCCURED. PROBABLY YOUR NETWORK" })
        })
    }
};


  
export const resetCancelMessage = (b) => {
  return {
    type: RESET_CANCEL_MSG,
    payload: b
  };
};
