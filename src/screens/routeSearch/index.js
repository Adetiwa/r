import React, { Component } from "react";
import { Image, View,Platform,Animated,Easing, TouchableOpacity, ActivityIndicator, StatusBar,AsyncStorage,Text, Dimensions } from "react-native";
import { connect } from 'react-redux';
import {  
  find_route,
  all_route
} from '../../actions/Map';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Card,
  CardItem,
  Thumbnail,
  Left,
  Body,
  Right,
  DeckSwiper,
  Picker,
  Form
} from "native-base";
import ImageLoad from 'react-native-image-placeholder';
import LottieView from 'lottie-react-native';
const {width, height} = Dimensions.get("window");
const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height;

const logo = require("../../../assets/logo.png");
const cardImage = require("../../../assets/drawer-cover.png");

const USER_TOKEN = "user_token";
const Item = Picker.Item;

class RouteSearch extends Component {

    state = {
      isLoggedIn: false,
      done: false,
      route: true,
      progress: new Animated.Value(0),
      
    }

    
    getCOlor(shit) {
      if (shit === 'ios') {
        return '#FFFFFF';
      } else {
        return '#0397dd';
      }
    }

    
  componentWillMount() {
    this.props.find_route(this.props.pickup_coords.lat, this.props.pickup_coords.lng, this.props.dropoff_coords.lat, this.props.dropoff_coords.lng);
    if (this.props.routes == null) {
      this.props.all_route();
    }
  }

  onValueChange(value) {
  console.log(value);
  }
  async componentDidMount() {
    
    }

    componentWillUnmount() {
      //clearInterval(this._interval);
    }


  

    render () {
      
        return (
            <Container style={{flex: 1, backgroundColor: this.getCOlor(Platform.OS)}}>
              <StatusBar backgroundColor='#0397dd' barStyle='light-content' />
              <Header>
                <Left>
                  <Button transparent onPress={() => this.props.navigation.goBack()}>
                    <Icon name="arrow-back" />
                  </Button>
                </Left>
                <Body>
                  <Title>Routes</Title>
                </Body>
                <Right />
              </Header>
                  <View style={{
                    flex: 1
                   }}>
                  {this.props.getting_route && 
                  <View style = {{
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    flexDirection: 'column'
                  }}>
                  <LottieView style={{
                    width: 400,
                    height: 400,
                  }}  loop
                    source={require('../../../assets/waiting.json')} progress={this.state.progress} />

                    <Text style = {{
                      textAlign: 'center',
                      fontSize: 20,
                      //fontWeight: "bold",
                      //color: '#C04DEE'
                    }}> searching for best route ... </Text>
                    </View>
                  }
                  {!this.props.getting_route && this.props.suggested_route !== null &&
                  <View style = {{
                    flex: 2,
                    padding: 10,
                  }}>
                   <Text style = {{
                     textAlign: 'center',
                     marginTop: 10,
                     marginBottom: 10,
                     fontSize: 20,
                   }}> {`${this.props.suggested_route.length}  ${this.props.suggested_route.length > 1 ? 'Results' : 'Result' }`}</Text>
                  
                  {this.props.suggested_route.length > 0 && 

                      <DeckSwiper
                      ref={mr => (this._deckSwiper = mr)}
                      dataSource={this.props.suggested_route}
                      looping={true}
                      renderEmpty={() =>
                        <View style={{ alignSelf: "center" }}>
                          <Text>Over</Text>
                        </View>}
                      renderItem={item =>
                        <Card style={{ elevation: 3 }}>
                        <TouchableOpacity
                          onPress= {() => console.log('Route selected is'+item.route_id)}
                          >
                          <CardItem>
                            <Left>
                              <Body>
                                <Text>
                                  {item.route}
                                </Text>
                                <Text note>Pickup: {item.pickup}</Text>
                                <Text note>Destination: {item.dropoff}</Text>
                              </Body>
                            </Left>
                          </CardItem>
                          <CardItem cardBody>
                          <ImageLoad
                                style={{
                                  //resizeMode: "cover",
                                  width: null,
                                  flex: 1,
                                  height: 300
                                }}
                                loadingStyle={{ size: 'large', color: 'gray' }}
                                source={{ uri: item.image }}
                            />
                           
                          </CardItem>
                          <CardItem>
                            <Text>
                              {item.name}
                            </Text>
                          </CardItem>
                          <CardItem style={{ paddingVertical: 0, marginTop: -30 }}>
                              <Left>
                                <Button transparent>
                                  <Text>{item.stops.length} Stops</Text>
                                </Button>
                              </Left>
                              <Body>
                                <Button transparent>
                                  <Text>{item.morning}</Text>
                                </Button>
                              </Body>
                              <Right>
                                <Text>{item.evening}</Text>
                              </Right>
                            </CardItem>
                          </TouchableOpacity>
                        </Card>}
                    />
                    }

                  </View>
                  }

              {this.props.routes !== null && 
                  <View style = {{
                                flex: 0.2,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>

                      <Content>
                            <Form>
                              <Picker
                                mode="dropdown"
                                iosHeader="All Routes"
                                iosIcon={<Icon name="ios-arrow-down-outline" />}
                                style={{ width: undefined, alignItems: 'center' }}
                                //selectedValue={this.props.selected}
                                onValueChange={this.onValueChange.bind(this)}
                              >
                              {this.props.routes.map((r, index) => (
                                  <Item label={r.route} key = {r.route_id} value={r.route_id} />
                              
                              ))}
                            </Picker>
                            </Form>
                              </Content>
                        </View>
                  }

                      
                  
                  
                </View>
                </Container>

        );
    }
}

const mapStateToProps = ({ map }) => {
  const { 
    pickup_coords,
    dropoff_coords,
    getting_route,
    suggested_route,
    selected,
    routes,
   } = map;
  return {
    pickup_coords,
    dropoff_coords,
    getting_route,
    suggested_route,
    selected,
    routes,
    
  };
};

export default connect(mapStateToProps, {
  find_route,
  all_route

})(RouteSearch);