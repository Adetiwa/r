import React, { Component } from "react";
import { View, ActivityIndicator,Dimensions, AsyncStorage, TouchableOpacity, StatusBar, Image, Text} from "react-native";
import { connect } from 'react-redux';

import {  destinationChanged,
          select_vehicle,
          hoverondesc,
          getCurrentLocation,
          get_name_of_loc,
          update_region,
          editUser,
          clearEverything,

        } from '../../actions/Map';
import UserAvatar from 'react-native-user-avatar';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Item,
  Label,
  Input,
  Body,
  Left,
  Right,
  Icon,
  Form
} from "native-base";
import { ProgressDialog } from 'react-native-simple-dialogs';
import SnackBar from 'react-native-snackbar-component';
import Loader from "../../components/loader";

import style from "./style";


/*
<Item floatingLabel>
  <Label>Username</Label>
  <Input value = "adetiwa" />
</Item>
*/

const USER_TOKEN = "user_token";

const { width, height } = Dimensions.get('window');

class Profile extends Component {
  constructor(props) {
       
  super(props);
  this.close = this.close.bind(this);
  this.state = {
    fullname: this.props.user.fullname,
    email: this.props.user.email,
    tel: this.props.user.tel,
    password: '',
    logging_out: false,
    netError: true,
    isLoading: this.props.edit_progress,
    openLoader: this.props.edit_progress,
    msg: null
  }

}


close(e) {
    e.preventDefault()
    this.setState({
      openLoader: false,
      msg: false
    });
  }


async logout(fcm_token) {
  this.setState({ isLoading: true });
  this.setState({ openLoader: true });
  
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
            // this.setState({ logging_out: false });
            let status = responseJson.status;
          
            // this.setState({ netError: true });
            
            if (status === 'success') {
                this.setState({ isLoading: false });
                this.setState({ openLoader: false });
    
              this.finalize();
              //this.props.navigation.navigate('Profile', {name: 'Lucy'})
              //dispatch(NavigationActions.navigate({ routeName: 'Map' }));
            } else {
                this.setState({ isLoading: false });
                this.setState({ msg: 'A server error occured' });
    
            //   this.setState({ logging_out: false });
              
            }
    
          })
          .catch((error) => {
            console.log('erfrferfre '+error);
            // this.setState({ logging_out: false });
            // this.setState({ netError: false });
            this.setState({ isLoading: false });
            this.setState({ msg: 'Network Unavailabe!' });

            
            
        })
  //this.props.clearEverything();
}

finalize() {
//   this.props.navigation.navigate('RealHome');
  this.props.navigation.dispatch(NavigationActions.reset({
    index: 0,
    key: null,
    actions: [NavigationActions.navigate({ routeName: 'RealHome' })]
}))

  const user = AsyncStorage.removeItem(USER_TOKEN);
}

  editProfile() {
    this.props.editUser(this.state.fullname, this.state.email, this.state.tel, this.state.password, this.props.user.token, this.props.user.userid);
  }

  render() {
    return (
      <Container style={style.container}>
       
      
       <Header androidStatusBarColor="#22313F" style = {{borderBottomColor: "#22313F", borderBottomWidth: 1, backgroundColor: "#22313F"}}>
         <Left>
         <TouchableOpacity
								transparent onPress={() => this.props.screenProps.goBack()}
								>
					  <Icon style = {{color : "#FFF", fontSize: 40, fontFamily: 'Montserrat-Regular'}}  size = {40} name= "close" />
                 </TouchableOpacity>

         </Left>
         <Body>
           <Title style = {{color: '#FFF',fontFamily: 'Montserrat-Regular', fontWeight: '100'}}>Profile</Title>

         </Body>
         <Right>
           <Button transparent onPress={() => this.logout(this.props.fcm_token)}>
             <Text style = {{fontSize: 12,fontFamily: 'Montserrat-Regular', color: '#FFF',}}>LOG OUT</Text>
           </Button>
         </Right>

       </Header>

        <Content>
    
        {this.props.user !== null &&
				
          <Form>
            <View
              style = {{
                alignItems: 'center',
                justifyContent: 'center',
                alignContent: 'center',
                marginTop: 20,

              }}
              >
              <TouchableOpacity
              ><UserAvatar
              name={this.props.user.fullname}  src={this.props.user.profile_image} size={50} />
							</TouchableOpacity>
              </View>
              

            <View style = {style.names}>
              <Item style = { {width: '100%'} } floatingLabel>
                <Label>Fullname</Label>
                <Input
                  ref = "fullname"
                  style = {{
                    fontFamily: 'Montserrat-Regular'
                  }}
                  type="text"
                  onChangeText = {(input)=>this.setState({fullname: input})}
                  value = {this.state.fullname} />
              </Item>

            </View>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input
                ref = "email"
                style = {{
                  fontFamily: 'Montserrat-Regular'
                }}
                editable = {false}
                type="email"
                onChangeText = {(input)=>this.setState({email: input})}
                value = {this.state.email}/>
            </Item>
            <Item floatingLabel>
              <Label>Tel</Label>
              <Input
                ref = "tel"
                style = {{
                  fontFamily: 'Montserrat-Regular'
                }}
                type="tel"
                onChangeText = {(input)=>this.setState({tel: input})}
                value = {this.state.tel}/>
            </Item>

            <Item floatingLabel last>
              <Label>Password</Label>
              <Input
              style = {{
                fontFamily: 'Montserrat-Regular'
              }}
                onChangeText = {(input)=>this.setState({password: input})}
                ref = "password"
                secureTextEntry={true}
                 />
            </Item>
          </Form>
        }

            <TouchableOpacity style = {style.panelButton}
              onPress = {() => this.editProfile()} >
                <Text style = {style.panelButtonTitle}>Update</Text>
            </TouchableOpacity>
            {this.props.edit_progress &&
              <ActivityIndicator style = {{
              justifyContent: 'center',
              alignItems: 'center',
            }} />
          }

            <Text
              style = {{
                fontSize: 15,
                marginTop: 10,
                alignSelf: 'center',
                color: '#f62e2e',
                fontFamily: 'Montserrat-Regular',
              }}>{this.props.edit_error}</Text>


        </Content>

        {/* <SnackBar visible={!this.props.network_connected || !this.state.netError} textMessage="Network Unavailable!"/> */}
        {/* <ProgressDialog 
				visible={this.state.logging_out && (this.props.network_connected || this.state.netError)} 
				message="Please, wait..."
                />
                 */}

        <Loader show = {this.state.openLoader} msg = {this.state.msg} close={this.close}  loading = {this.state.isLoading}/> 
        
      </Container>
    );
  }
}



const mapStateToProps = ({ map }) => {
  const { destination, hoveron,
    pickup, vehicle,
    latitude,
    longitude,
    latitudeDelta,
    fcm_token,logging_out,
    longitudeDelta,
    edit_progress,
    network_connected,
    error, region,
    edit_error, user, loading, status } = map;
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
    edit_progress,
    fcm_token,
    edit_error,
    network_connected,
    logging_out,
  };
};

export default connect(mapStateToProps, {
  destinationChanged,
  getCurrentLocation,
  hoverondesc,
  select_vehicle,
  get_name_of_loc,
  clearEverything,
  update_region,
  editUser,

})(Profile);
