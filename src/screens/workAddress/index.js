import React, { Component } from "react";
import { View, ActivityIndicator,Dimensions, AsyncStorage, TouchableOpacity, StatusBar, Image, Text} from "react-native";
import { connect } from 'react-redux';

import {  destinationChanged,
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
          set_suggestion_dest,

        } from '../../actions/Map';
import { ProgressDialog } from 'react-native-simple-dialogs';
import SnackBar from 'react-native-snackbar-component';

import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Item,
  List,
  ListItem,
  Label,
  Input,
  Body,
  Left,
  Right,
  Icon,
  Toast,
  IconNB, 
  Form
} from "native-base";

import style from "./style";


/*
<Item floatingLabel>
  <Label>Username</Label>
  <Input value = "adetiwa" />
</Item>
*/

const USER_TOKEN = "user_token";

const { width, height } = Dimensions.get('window');

const datas = []

class WorkAddress extends Component {
  constructor(props) {
  super(props);
  this.state = {
    work: '',
  }
}

componentDidMount() {

}

componentWillUpdate() {

  this.haha();
}


select_suggest(suggestion) {
          this.props.set_suggestion_dest(suggestion);

      //}
      this.inputter();
  
}




    inputter() {
      if (this.props.destination != '') {
        this.props.geocodeTheAddress_dest(this.props.destination);
        //this.props.getDistance(this.props.pickup, this.props.destination);
        //this.props.getRoute(this.props.pickup, this.props.destination);
        this.props.input_everything();
      }
    }

  haha() {

    datas = [];
    for (var key in this.props.predictions) {
      if (this.props.predictions.hasOwnProperty(key)) {
        //console.log("Thisss!!! "+JSON.stringify(this.props.predictions[key]));
        datas.push(this.props.predictions[key]);
      }

    }
    //console.log(this.props.predictions);

  }

onHomeChange(text) {
  if (this.props.destination != '') {
    this.props.getAddressPrediction(text);
  }
  this.props.destinationChanged(text);
}

  render() {
    return (
      <Container style={style.container}>
        <StatusBar backgroundColor='#009AD5' barStyle='light-content' />

        
        <View style = {{
          flex: 1,
         
          flexDirection: 'column'

        }}>
        <View style = {{
          flex: 1,
          alignSelf: 'center',
          alignContent: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Text style = {{
            textAlign: 'center',
            fontSize: 50,
            fontWeight: "bold",
            //color: '#C04DEE'
          }}> where do you work? </Text>
        </View>
        {this.haha()}
        <View style = {{
          flex: 1,
          padding: 20,
        }}>
          <Content padder>
          <Form>
            <Item inlineLabel
            >
              
              <Input
              value = {this.props.destination}
              autoCorrect={false}
              placeholder = 'Work Address' onChangeText = {this.onHomeChange.bind(this)} />
               {this.props.loading_prediction && 
               <ActivityIndicator style = {{zIndex: 12,}}size='small' />
              }
            </Item>
           
          </Form>
          <List
            dataArray={datas}
            renderRow={data =>
              <ListItem avatar onPress={() => this.select_suggest(data.description)}>
                <Left>
                <Icon style = {{color: '#888', marginRight: 10, marginTop: 7, fontSize: 20}} name="pin" /> 
                </Left>
                <Body onPress={() => this.select_suggest(data.structured_formatting.main_text)}>
                  <Text style = {{fontWeight: 'bold', fontSize: 18}}>
                    {data.structured_formatting.main_text}
                  </Text>
                  <Text numberOfLines={1} note>
                    {data.description}
                  </Text>
                </Body>
                
              </ListItem>}

              />

         
        </Content>
        
        </View>

       
      {this.props.destination !== ''  && !this.props.geocoding && this.props.dropoff_coords != null &&

        <View style = {{
          flex: 1,
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingRight: 100,
          paddingLeft: 100,
          
        }}>
          <Button transparent dark
          onPress = {() => this.props.navigation.goBack()}>
            <Text>Go Back</Text>
          </Button>
          
          <Button transparent dark
          onPress = {() => this.props.navigation.navigate('RouteSearch')}>
            <Text>PROCEED</Text>
          </Button>
        </View>
        }
        
       
      
        </View>
        <SnackBar visible={!this.props.network_connected} textMessage="Network Unavailable!"/>

         <ProgressDialog 
            visible={this.props.geocoding} 
            message="Please, wait..."
        />
      </Container>
    );
  }
}



const mapStateToProps = ({ map }) => {
  const {
    work,
    home,
    pickup,
    input_done,
    hoveron,
    loading,
    status,
    region,
    user,
    predictions,
    geocoding,
    pickup_coords,
    dropoff_coords,
    destination,
    prediction_error,
    pickup_location,
    destination_location,
    loading_prediction,
    error_geoecoding,
    network_connected,
  } = map;
  return {
    work,
    home,
    pickup,
    input_done,
    hoveron,
    loading,
    destination,
    status,
    region,
    user,
    dropoff_coords,
    predictions,
    prediction_error,
    geocoding,
    pickup_coords,
    pickup_location,
    destination_location,
    network_connected,
    loading_prediction,
    error_geoecoding,
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
  set_suggestion_dest,

})(WorkAddress);
