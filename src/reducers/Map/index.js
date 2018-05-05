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


  DESTINATION_INPUT,
  SELECT_VEHICLE,
  GET_USER_LOCATION,
  HOVER_ON_DESTINATION,
  PICKUP_INPUT,
  INPUT_DONE,
  GET_NAME_OF_LOCATION,
  GET_NAME_OF_LOCATION_ERROR,
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
  EDIT_NO_INPUT,
  EDITTING_USER,
  EDIT_USER_ERROR,
  EDIT_USER_SUCCESS,
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
  FETCHING_HISTORY_SINGLE,
  FETCH_HISTORY_GOOD_SINGLE,
  FETCH_HISTORY_EMPTY_SINGLE,
  FETCH_HISTORY_BAD_SINGLE,
  SCREEN_SHOT,
  DRAW_ROUTE_RAW,
  STATIC_IMAGE,
  STATIC_IMAGE_SUCCESS,
  STATIC_IMAGE_ERROR,
  SELECT_HISTORY,
  SELECT_SUPPORT,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
  MATCH_ALERT_ERROR,
  MATCH_ALERT,
  NO_NEW_MATCH,
  SCHEDULE,
  CONNECTING_DRIVER,
  NO_DRIVER,
  DRIVER_AVAILABLE,
  ERROR_NETWORK_DRIVER,
  EMERGENCY,
  CARD_UPDATE,
  ONPAYMENT,
  CHARGE_TYPE,
  VERYFYING_CARD,
  BAD_VERIFY,
  GOOD_VERIFY,
  ERROR_VERIFY,
  CARD_EXIST,
  NETWORK,
  NO_CARD,
  ERROR_GETTING_CARD,
  CHANGE_TYPE,
  GETTING_PRICE_ON,
  FETCH_PRICE_ERROR,
  FROM_PAYMENT,
  CHANGE_TOKEN,
  FETCHING_SUPPORT,
  FETCH_SUPPORT_GOOD,
  FETCH_SUPPORT_EMPTY,
  EMPTY_PREDICTIONS,
  GETTING_PREDICTION,
  DEL_FCM_TOKEN,
  SEND_USER_LOC,
  SEND_USER_LOC_SUCCESS,
  SEND_USER_LOC_NULL,
  SET_ACTIVE_BUS_INFO,
  CANCEL_TRIP_FAILED,
  CANCEL_TRIP_SUCCESS,
  CANCELLING_TRIP,
  RESET_CANCEL_MSG,
  GEOCODING,
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
  RESET_ROUTE,
  GETTING_NEARBY_ROUTES,
  GET_NEARBY_ROUTES,
  SET_ACTIVE_BUS,
  SET_PAYMENT,
  GET_WALLET,
  GETTING_WALLET,
  SET_STOPS,
  RESET_NETWORK,
  COUPON_ON,
  COUPON,
  NEW_STUFFS,
   } from '../../actions/types';

import { Dimensions } from "react-native";
const {width, height} = Dimensions.get("window");
const ASPECT_RATIO = width/height;

const LATITUDE_DELTA = 0.03;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;



const INITIAL_STATE =
  {
    home: '',
    work: '',
    fullname: '',
    email: '',
    password: '',
    tel: '',
    wallet: 0,
    wallet_nice: '₦0.00',
    walletRan: false,
    nearbyroutes: null,
    getting_route: false,
    suggested_route: null,
    loading: false,
    error: '',
    active_bus_info: null,
    status: false,
    loadingReg: false,
    errorReg: '',
    statusReg: false,
    stops: [],
    getting_wallet: false,
    driversGotten: false,
    locationSent: false,
    locationGotten: false,
    destination: '',
    pickup: '',
    geocoding: false,
    hoveron: false,
    userLocation: null,
    vehicle: 'scooter',
    input_done: false,
    routes: null,
    loading: false,
    error: '',
    nearbydriver: null,
    latitude: 6.4549,
    longitude: 3.4246,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
    user: null,
    status: false,
    statusReg: false,
    region: {},
    location_name: '',
    current_hover: '',
    predictions: null,
    payment: '',
    prediction_error: '',
    pickup_location: '',
    destination_location: '',
    error_geoecoding: '',
    fetching_prices: false,
    per_km: 0,
    per_hr: 0,
    emergency_cost: 0,
    toll_gate: 0,
    base_price: 0,
    fetch_error: '',
    emergency: false,
    edit_progress: false,
    edit_error: '',
    edit_success: false,
    getting_distance: false,
    distance_info: {},
    distance_error: false,
    estimated_price: 0,
    fetch_price_error: false,
    distanceInKM: 0,
    distanceInHR: 0,
    route: [],
    route_set: false,
    pickup_coords: null,
    dropoff_coords: null,
    type: 'normal',
    order_info: {
      drop_off_name: '',
      drop_off_tel: '',
      extra: '',
    },
    getting_coupon: false,
    prices: {
      base_price: null,
      per_km:null,
      per_hr: null,
    },
    proceed: false,
    running: false,
    order_success: false,
    error_submitting_order: false,
    scheduled: null,
    done: false,
    history: {},
    support: null,
    //history_single,
    fetching: false,
    history_empty: false,
    history_error: false,
    support_empty: false,
    support_error: false,
    screenshot: null,
    raw: null,
    selected: null,
    selected_support: null,
    selected_route: null,
    history_single: null,
    history_empty_single: null,
    match_alert: null,
    no_new_match: true,
    match_error: '',
    driver_message: '',
    driver_available: false,
    driver_error: false,
    driver_matched: null,
    charge_type: 'CASH',
    transaction_id: null,
    card: null,
    flutterwave_token: null,
    onpayment: false,
    load: false,
    card_status: null,
    card_exist: false,
    card_type: '',
    last_4: 0,
    from_payment: false,
    fcm_token: null,
    network_connected: true,
    loading_prediction: false,

    cancelling: false,
    cancel_msg: '',
    logging_out: false,
    myroutes: null,
    nearest_selected: false,
    nearest_route_single: null,
    my_route_single: null,
    my_selected: false,
    coupon_message: '',
    new_coords: null,
    changed: false,
    active_bus: 0,

}

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch(action.type) {
    case NEW_STUFFS:
      return {...state, new_coords: action.payload, changed: true };
    case REGISTERING:
    return { ...state, loadingReg: true, errorReg: '' };
  case NEW_USER_SUCCESS:
    return { ...state,
      ...INITIAL_STATE,
       user: action.payload,
       statusReg: true,

    };
    
  case SET_ACTIVE_BUS:
    return {...state, active_bus: action.payload };
  case SET_ACTIVE_BUS_INFO:
    return {...state, active_bus_info: action.payload };
  case COUPON_ON:
    return {...state, getting_coupon: action.payload };
  case COUPON:
   return {...state, coupon_message: action.payload };
  case SET_STOPS: 
    return { ...state, stops: action.payload };
  case RESET_NETWORK:
    return {...state, network_connected: action.payload };
  case NEAREST_SELECTED:
    return {...state, nearest_selected: action.payload };
  case SET_NEAREST_ROUTE_SINGLE:
    return {...state, nearest_route_single: action.payload };
  
  case MY_ROUTE_SELECTED:
    return {...state, my_selected: action.payload };
  
  case SET_MY_ROUTE_SINGLE:
    return {...state, my_route_single: action.payload };

    case GETTING_MY_ROUTES:
    return {...state, getting_route: action.payload };
  case SET_LONGITUDE: 
    return {...state, longitude: action.payload };
  case SET_LATITUDE: 
    return {...state, latitude: action.payload, locationGotten: true };
 case GET_MY_ROUTES:
    return {...state, myroutes: action.payload };
  case CANCEL_ERROR_MSG: 
      return { ...state, error: '' };
  case NEW_USER_ERROR:
    return { ...state, errorReg: action.payload, loadingReg: false };
  case EMAIL_CHANGED:
    return { ...state, email: action.payload };
  case PASSWORD_CHANGED:
    return { ...state, password: action.payload };
  case TEL_CHANGED:
    return { ...state, tel: action.payload };
  case FULLNAME_CHANGED:
    return { ...state, fullname: action.payload };

  case LOGIN_USER_SUCCESS:
  return { ...state,
        ...INITIAL_STATE,
         user: action.payload,
         status: true,

  };
  case RESET_ROUTE:
    return {...state, route_set: false};
  case GETTING_WALLET: 
    return {...state, getting_wallet: action.payload };
  case GET_WALLET: 
  return {...state, walletRan: true, wallet: action.payload.wallet, wallet_nice: action.payload.wallet_nice };
  
  case LOGIN_USER_ERROR:
    return { ...state, error: "Authentication Failed",loading: false };
  case LOGIN_USER:
    return { ...state, loading: true, error: '' };
  case NO_INPUT:
    return {...state, loading: false, error: 'Email and password is needed'};
  case SELECT_ROUTE:
    return {...state, selected_route: action.payload };
  case GETTING_ROUTE:
    return { ...state, getting_route: true };
  case GET_ROUTE:
    return {...state, suggested_route: action.payload,  getting_route: false };
  case GET_NEARBY_ROUTES: 
    return {...state, nearbyroutes: action.payload };
  case  GETTING_ROUTE_ALL:
    return { ...state, getting_route: action.payload };
  case GET_ROUTE_ALL:
    return {...state, routes: action.payload, getting_route: false };
 case GETTING_PREDICTION:
    return {...state, loading_prediction: action.payload };
  case NETWORK: 
    return {...state, network_connected: action.payload };
  case CHANGE_TOKEN:
    return { ...state, fcm_token: action.payload };
  case FROM_PAYMENT:
    return {...state, from_payment: action.payload };
  case CHANGE_TYPE:
    return {...state, type: action.payload, scheduled: null};
  case SET_PAYMENT:
    return {...state, payment: action.payload };
  case CARD_EXIST:
    return {...state,
      last_4: action.payload.last_4,
      flutterwave_token: action.payload.token,
      transaction_id: action.payload.trans_id,
      card_type: action.payload.type,
      card_exist: true };
  case NO_CARD:
    return {...state, card_exist: false };
  case VERYFYING_CARD:
      return {...state, card_status: '', load: true };
 case ERROR_GETTING_CARD:
      return {...state, card_status: action.payload,
        load: false, card_exist: false };
  case BAD_VERIFY:
      return {...state, card_status: action.payload.msg,
        load: false };
    case GOOD_VERIFY:
      return {...state,
      last_4: action.payload.last_4,
      flutterwave_token: action.payload.token,
      card_type: action.payload.type,
      card_exist: true, card_status: action.payload.msg,
      transaction_id: action.payload.transaction_id,
      load: false };
    case ERROR_VERIFY:
    return {...state, card_status: action.payload,
      load: false };

    case CARD_UPDATE:
      return { ...state, card: action.payload };
    case ONPAYMENT:
      return { ...state, onpayment: true };
    case CHARGE_TYPE:
      return { ...state, charge_type: action.payload };
    case EMERGENCY:
      return {...state, emergency: action.payload};
    case CONNECTING_DRIVER:
      return { ...state, driver_message: action.payload };
    case NO_DRIVER:
      return { ...state, driver_message: action.payload, driver_available: false, };
    case DRIVER_AVAILABLE:
      return { ...state, driver_matched: action.payload, driver_message: action.payload.driver.toUpperCase()+' HAS BEEN ASSIGNED TO YOU :)', driver_available: true };
    case ERROR_NETWORK_DRIVER:
      return { ...state, driver_message: action.paylod, driver_error: true };
    case MATCH_ALERT:
      return { ...state, match_alert: action.payload };
    case MATCH_ALERT_ERROR:
      return { ...state, match_error: action.payload };
    case NO_NEW_MATCH:
      return { ...state, no_new_match: action.payload };
    case DESTINATION_INPUT:
      return { ...state,
        current_hover: 'destination',
        destination: action.payload };
    case SCHEDULE:
        return { ...state, scheduled: action.payload, type: 'scheduled'  };
    case SELECT_VEHICLE:
      return { ...state, vehicle: action.payload };
    case HOVER_ON_DESTINATION:
      return { ...state, hoveron: true, route_set: false };
    case PICKUP_INPUT:
      return { ...state,
        pickup: action.payload,
        home: action.payload,
        predictions: null,
        current_hover: 'pickup',
      };
    case EMPTY_PREDICTIONS: 
        return {...state, predictions: null};
    case NEW_USER_SUCCESS:
      return { ...state,
        ...INITIAL_STATE,
         user: action.payload,
         statusReg: true,

      };
    case LOGIN_USER_SUCCESS:
      return { ...state,
            ...INITIAL_STATE,
             user: action.payload,
             status: true,
           };
    case INPUT_DONE:
      return {...state, hoveron: false, input_done: true, predictions: null };
    case GET_USER_LOCATION:
     return {
       ...state,
         latitude: action.payload.coords.latitude,
         longitude: action.payload.coords.longitude,
         latitudeDelta: LATITUDE_DELTA,
         longitudeDelta: LONGITUDE_DELTA,
         locationGotten: true,

         region: {
           latitude: action.payload.coords.latitude,
           longitude: action.payload.coords.longitude,
           latitudeDelta: LATITUDE_DELTA,
           longitudeDelta: LONGITUDE_DELTA,
         }

       };
    case GET_NAME_OF_LOCATION:
      return { ...state,
        location_name: action.payload,
        pickup: action.payload,
        //pickup: action.payload,
      };
    case SAVE_USER_INFO:
      return { ...state, user: action.payload };
    case GET_NAME_OF_LOCATION_ERROR:
    return { ...state,
      location_name: action.payload,
      pickup: action.payload,
      //pickup: action.payload,
    };
    case UPDATE_REGION:
      return { ...state,
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
        latitudeDelta: action.payload.latitudeDelta,
        longitudeDelta: action.payload.longitudeDelta,
        region: action.payload,
    };
    case GET_SUGGESTIONS:
      return { ...state, predictions: action.payload };
    case GET_SUGGESTIONS_EMPTY:
      return {...state,
              predictions: {},
              prediction_error: "no location found"
            };
    case SET_SUGGETION_PICKUP:
      return { ...state,
              pickup: action.payload,
            };
    case SET_SUGGETION_DEST:
      return { ...state,
              destination: action.payload,
            };
    case GEOCODE_ADDRESS_PICKUP:
      return {
              ...state,
              pickup_location: action.payload,
            };
    case GEOCODE_ADDRESS_DEST:
      return {
            ...state,
            destination_location: action.payload,
          };
    case ERROR_GEOCODING:
        return {
            ...state,
            error_geoecoding: 'Error geocoding data',
          };

  case FETCHING_PRICES:
          return { ...state,
            fetching_prices: true,
            emergency_cost: 0,
            fetch_price_error: false,
          };
    case FETCH_PRICE_GOOD:
          return { ...state,
            per_km: action.payload.per_km,
            per_hr: action.payload.per_hr,
            emergency_cost: action.payload.emergency,
            toll_gate: action.payload.toll_gate,
            base_price: action.payload.base_price,
            prices: action.payload,
            fetch_error: false,
            fetching_prices: false,

          };
    case FETCH_PRICE_BAD:
          return {
            ...state,
            per_km: action.payload.per_km,
            per_hr: action.payload.per_hr,
            emergency_cost: action.payload.emergency,
            toll_gate: action.payload.toll_gate,
            base_price: action.payload.base_price,
            fetch_error: true,
            fetching_prices: false,
          };
    case FETCH_PRICE_ERROR:
        return {
          ...state, fetch_price_error: action.payload,
          fetching_prices: false,
        }
    case SAVE_STATE:
          return {
            ...state,
            order_info: action.payload,
            edit_error: '',
            proceed: true,
    };
    case EDIT_NO_INPUT:
        return { ...state, edit_error: 'All inputs are required' };
    case EDITTING_USER:
        return {...state,
          edit_error: '',
          edit_progress: true };
    case EDIT_USER_ERROR:
        return {...state,
          edit_success: false,
           edit_progress: false,
          edit_error: action.payload.status };
    case EDIT_USER_SUCCESS:
        return {...state,
            edit_success: true,
            edit_progress: false,
            user: action.payload,
            edit_error: '',
           };

    case GETTING_DISTANCE:
      return { ...state, getting_distance: true };
    case DISTANCE_FETCH_SUCCESS:
      return { ...state,
        distance_info: action.payload,
        getting_distance: false,
        distance_error: false,
       };
    case DISTANCE_FETCH_ERROR:
      return { ...state,
        distance_info: action.payload,
        distance_error: true,
        getting_distance: false,
      };
    case GETTING_PRICE:
      return { ...state,
        estimated_price: action.payload };
    case GETTING_PRICE_ON:
        return { ...state, estimated_price: 0 };
    case STORE_PRICE:
      return {...state, estimated_price: action.payload };
    case STORE_KM:
      return {...state, distanceInKM: action.payload };
    case STORE_HR:
        return {...state, distanceInHR: action.payload };
    case DRAW_ROUTE:
        return { ...state, route: action.payload, route_set: true };
    case DRAWING_ROUTE:
        return { ...state, route: action.payload, running: action.payload};
    case DRAWING_ROUTE_ERROR:
        return { ...state, route: action.payload };
    case GEOCODING:
        return { ...state,
          geocoding: true,
    };
    case PICKUP_LONG_LAT_RESET:
        return { ...state,
          geocoding: false,
          latitude: action.payload.lat,
          longitude: action.payload.lng,
          pickup_coords: action.payload,
    };
    case DISTANCE_FETCH:
      return { ...state, distanceInKM: action.payload };
    case TIME_FETCH:
      return { ...state,  distanceInHR: action.payload };
    case DROPOFF_LONG_LAT_RESET:
    return { ...state,
      dropoff_coords: action.payload,
      geocoding: false,
    };
    case ORDER_SUBMIT_SUCCESS:
        return { ...state, order_success: true,
           error_submitting_order: false,
           edit_progress: false,
           done: false,
          };
    case ERROR_OVERALL:
      return { ...state,
        edit_progress: false,
        error_submitting_order: true };
    case RESET:
      return { ...state, error_submitting_order: false };
    case CLEAR_MAP_DATA:
      return { ...state,
        done: true,
        destination: '',
        pickup: '',
        hoveron: false,
        userLocation: null,
        vehicle: 'scooter',
        input_done: false,
        loading: false,
        error: '',
        raw: '',
        status: false,
        region: {},
        location_name: '',
        current_hover: '',
        predictions: null,
        prediction_error: '',
        pickup_location: '',
        destination_location: '',
        error_geoecoding: '',
        fetching_prices: false,
        fetch_error: false,
        emergency: false,
        edit_progress: false,
        edit_error: '',
        edit_success: false,
        getting_distance: false,
        distance_info: {},
        distance_error: false,
        estimated_price: null,
        distanceInKM: 0,
        screenshot: '',
        distanceInHR: 0,
        route: [],
        route_set: false,
        pickup_coords: {},
        dropoff_coords: null,
        type: 'normal',
        order_info: {
          drop_off_name: '',
          drop_off_tel: '',
          extra: '',
        },
        prices: {
          base_price: null,
          per_km:null,
          per_hr: null,
        },
        proceed: false,
        order_success: false,
        error_submitting_order: false,
        scheduled: null,
        history: {},
        history_empty: false,
        selected: null,
        history_single: null,
        history_empty_single: null,
        match_alert: null,
        no_new_match: true,
        support_empty: false,
        match_error: '',
        driver_message: '',
        driver_available: false,
        driver_error: false,
        driver_matched: null,
        charge_type: 'CASH',
        onpayment: false,
        load: false,

      };
     case SCREEN_SHOT:
      return {...state, screenshot: action.payload };

    case DRAW_ROUTE_RAW:
      return { ...state, raw: action.payload };
    case STATIC_IMAGE_SUCCESS:
      return { ...state, screenshot: action.payload };
    case STATIC_IMAGE_ERROR:
      return { ...state, screenshot: action.payload };
    case FETCHING_HISTORY:
      return { ...state, fetching: true, history_empty: false };
    case FETCH_HISTORY_GOOD:
      return { ...state, history: action.payload, fetching: false, };
    case FETCH_HISTORY_EMPTY:
      return { ...state, history_empty: true, fetching: false, };
    case FETCHING_SUPPORT:
      return { ...state, fetching: true, support_empty: false };
    case FETCH_SUPPORT_GOOD:
      return { ...state, support: action.payload, fetching: false, };
    case FETCH_SUPPORT_EMPTY:
      return { ...state, support_empty: true, fetching: false, };
   
      case FETCH_HISTORY_BAD:
      return { ...state, history_error: true, fetching: false, };
    case FETCHING_HISTORY_SINGLE:
      return { ...state, fetching: true };
    case FETCH_HISTORY_GOOD_SINGLE:
      return { ...state, history_single: action.payload };
    case FETCH_HISTORY_EMPTY_SINGLE:
      return { ...state, history_empty_single: true };
    case FETCH_HISTORY_BAD_SINGLE:
      return { ...state, history_error: true };
    case SELECT_HISTORY:
      return { ...state, selected: action.payload };
    case SELECT_SUPPORT:
      return { ...state, selected_support: action.payload };
    case SEND_USER_LOC_SUCCESS:
    return { ...state, nearbydriver: action.payload,
        driversGotten: true };
    case SEND_USER_LOC:
      return { ...state, driversGotten: true };
    case SEND_USER_LOC_NULL:
        return {...state, nearbydriver: {},driversGotten: true };
    case LOGOUT_SUCCESS:
      return { ...state, ...INITIAL_STATE };
    case LOGOUT_SUCCESS:
      return { ...state, logging_out: false };
    case LOGGING_OUT:
      return {...state, logging_out: true };
    case CANCELLING_TRIP:
      return {...state, cancelling: true, cancel_msg: ''};
    case CANCEL_TRIP_SUCCESS:
      return {...state,cancelling: false, cancel_msg: action.payload };
    case CANCEL_TRIP_FAILED:
      return {...state, cancelling: false, cancel_msg: action.payload };
    case RESET_CANCEL_MSG:
      return {...state, cancel_msg: ''};
    default:
          return state;
    }
  console.log(state);
}
