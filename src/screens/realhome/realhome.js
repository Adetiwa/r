'use strict';
import React, {
  Component
} from 'react';
import { NavigationActions } from 'react-navigation'

import {
  AlertIOS,
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
 TouchableHighlight,
 ActivityIndicator, Keyboard,
  StatusBar, Dimensions, Platform,
  View,
  Image,
  NetInfo,
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import {  
    register,
    network_change,
    loginUser,
    resetNetwork,
    newloginSuccess,
    getAddressPrediction,
    loginSuccess,
        } from '../../actions/Map';
import {
	Container,
	Header,
	Title,
	Content,
	Button,
	Icon,
	List,
	ListItem,
	Left,
	Right,
	Body,
	icon,
	Separator,
} from 'native-base';
import Modal from "react-native-modal";
import StatusBarAlert from 'react-native-statusbar-alert';
import Error2 from '../error2';
import Video from 'react-native-video';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const datas = [];
class RealHome extends Component {
  constructor(props) {
    super(props);
    this.onLoad = this.onLoad.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.onBuffer = this.onBuffer.bind(this);
  }
  state = {
    rate: 1,
    volume: 1,
    muted: true,
    resizeMode: 'cover',
    duration: 0.0,
    currentTime: 0.0,
    controls: false,
    paused: false,
    skin: 'native',
    ignoreSilentSwitch: null,
    isBuffering: false,
    showModal: false,
    type: 'login',
    email: '',
    tel: '',
    fullname: '',
    password: '',
    home: '',
    work: '',
    networkError: false,
    loading: false,
    error: false,
    errorMsg: '',
    on: 'home',
    
};

componentDidMount() {
  //const dispatchConnected = isConnected => this.props.network_change(isConnected);

  NetInfo.isConnected.fetch().then().done(() => {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange)
  });
}

componentWillUnmount() {
  NetInfo.removeEventListener('connectionChange', this.handleConnectionChange)
}


handleConnectionChange = (isConnected) => {
  this.setState({ networkError: !isConnected });
  this.props.network_change(isConnected);
  if (isConnected) {
    this.setState({ error: false });
    this.setState({ errorMsg: '' });
    if (this.state.type == 'home') {
      if (this.state.on == 'home') {
        if (this.state.home.length > 1) {
          this.predict(this.state.home, 'home');
        }
      } else {
        if (this.state.work.length > 1) {
          this.predict(this.state.work, 'work');
        }
      }
    }
  }
  console.log(`is connected: ${this.state.netStatus}`);
}


componentDidUpdate() {

}


clearData() {
	data = [];
}



componentWillUpdate() {
	this.haha();
}


haha() {

	datas = [];
	for (var key in this.props.predictions) {
		if (this.props.predictions.hasOwnProperty(key)) {
			datas.push(this.props.predictions[key]);
		}
	}
}


validateEmail(text){
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
  if(reg.test(text) === false)
  {
    return false;
  } else {
    return true;
  }
}



validatePhone(text) {
    if(text.length != 11) { 
      return false;
    } else {
      if (/^\d{10}/.test(text)) {
        return true;
      } else {
        return false;
      }
    } 
}
getIcon() {
  if (this.state.on == 'home') {
    return (
      <Icon style = {{color: '#CCC',fontSize: 100}} name="home" /> 
    );
  } else {
    return (
      <Icon style = {{color: '#CCC',fontSize: 100}} name="briefcase" /> 
    );
  }
}

predict(text, val) {
    this.props.getAddressPrediction(text);
    if (val == 'home') {
      this.setState({home:text});  
    } else {
      this.setState({work:text});  
    }
    this.setState({on:val});
    
    if (!this.props.network_connected) {
      this.setState({error: true});
      this.setState({networkError: true});
      this.setState({errorMsg: 'Network Error. Check your connection'});
    } else {
      this.setState({networkError: false});
      this.setState({error: false});
      this.setState({errorMsg: ''});
    }
  }

select_suggest(data) {
  if (this.state.on == 'home') {
    this.setState({home: data});
  } else {
    this.setState({work: data});
    datas = [];
  }
}



async login() {
    Keyboard.dismiss();
    this.props.resetNetwork();
    this.setState({loading: true});
    this.setState({networkError: false});
    this.setState({error: false});
    this.setState({errorMsg: ''});
    if (this.state.email == '' || this.state.password == '') {
        this.setState({loading: false});
        this.setState({error: true});
        this.setState({errorMsg: 'Enter input to all fields'});
        
    } else if (!this.validateEmail(this.state.email)) {
        this.setState({loading: false});
        this.setState({error: true});
        this.setState({errorMsg: 'Enter a valid email address'});
       
    } else {
        fetch('https://admin.rova.com.ng/api2/user', {
             method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({loading: false});
                this.setState({networkError: false});
                let status = responseJson.status;
                if (status === 'success') {
                    this.setState({showModal: false});
                    this.props.loginSuccess(responseJson);
                    // this.props.screenProps.navigate('Map');
                    this.props.screenProps.dispatch(NavigationActions.reset({
                        index: 0,
                        key: null,
                        actions: [NavigationActions.navigate({ routeName: 'Map' })]
                    }))
                } else {
                    this.setState({error: true});
                    this.setState({errorMsg: responseJson.msg});
                }
            })
            .catch((error) => {
              this.setState({ loading: false });
              this.setState({ networkError: true });
              console.log(error);
              this.setState({error: true});
              this.setState({errorMsg: 'Network Error. Try again later'});
          })
    }
}

runstuff() {
    if(this.state.type == 'login') {
        return(
            <View style={{
                flex: 1,
            }}> 
            <View  style = {{
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <TouchableOpacity
                        transparent onPress={() => !this.state.loading ? this.setState({showModal: false}) : alert('App busy')}
                        >
                    <Icon style = {{color : "#22313F", fontSize: 40, fontFamily: 'Montserrat-Regular'}}  size = {40} name= "close" />
                </TouchableOpacity>
                

            <Text style = {{
                color: '#22313F',
                fontFamily: 'Montserrat-Regular',
                marginTop: 5,
                fontSize: 20,
            }}>Login to your Rova account</Text>
            </View>
            <View  style = {styles.line}/>
            
            {this.state.error && <Error2 msg = {this.state.errorMsg}/>}

                  <View>
             <TextInput
                underlineColorAndroid={'transparent'}
                autoCapitalize={'none'}
                autoCorrect={false}
                value = {this.state.email}
                autoFocus = {true}
                onChangeText = {(input)=>this.setState({email: input})}
                editable={!this.state.loading}
                placeholder={'Email Address'}
                keyboardType={'email-address'}
                //keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
                placeholderStyle={styles.placeholder}
                enablesReturnKeyAutomatically={false}
                style={this.state.num_error ? styles.error : styles.pinInputStyle}
                onSubmitEditing={(event) => { 
                  this.refs.olumide.focus();
                }}
            />

                <View style = {styles.space}/>
                <TextInput
                ref = 'olumide'
                underlineColorAndroid={'transparent'}
                autoCapitalize={'none'}
                autoCorrect={false}
                value = {this.state.password}
                editable={!this.state.loading}
                onChangeText = {(input)=>this.setState({password: input})}
                placeholder={'Password'}
                secureTextEntry={true}
                placeholderStyle={styles.placeholder}
                enablesReturnKeyAutomatically={false}
                style={this.state.num_error ? styles.error : styles.pinInputStyle}
                onSubmitEditing={(event) => { 
                  this.login()
                }}
            />
         
             <TouchableOpacity 
              disabled={this.state.loading}
                
             onPress = {() => this.login()} style={styles.panelButton}>
             {this.state.loading ?
                <ActivityIndicator  color= '#FFF' style = {{
                    padding: 0,  
                }}/>
                :
                <Text style={styles.panelButtonTitle}>Login</Text>
                }
            </TouchableOpacity>
          
            </View>

        

            </View>
        );
    } else if (this.state.type == 'home') {
        return(
<View style={{
                    flex: 1,
                }}> 
         
                <View  style = {{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>   
                    <TouchableOpacity
                            transparent onPress={() => !this.state.loading ? this.setState({type: 'reg'})  : alert('App busy')}
                            >
                        <Icon style = {{color : "#22313F", fontSize: 40, fontFamily: 'Montserrat-Regular'}}  size = {40} name= "arrow-back" />
                    </TouchableOpacity>
                    

                <Text style = {{
                    color: '#22313F',
                    fontFamily: 'Montserrat-Regular',
                    marginTop: 5,
                    fontSize: 20,
                }}> Enter Home and Work Address </Text>
                </View>
                <View  style = {styles.line}/>
                
                {this.state.error && <Error2 msg = {this.state.errorMsg}/>}

                <View>
                
                <TextInput
                    underlineColorAndroid={'transparent'}
                    autoCapitalize={'none'}
                    autoFocus = {true}
                    autoCorrect={false}
                    isFocused = {() => this.getIcon()}
                    value = {this.state.home}
                    editable={!this.state.loading}
                    onChangeText = {(input)=>this.predict(input, 'home')}
                    placeholder={'Home Address'}
                    placeholderStyle={styles.placeholder}
                    enablesReturnKeyAutomatically={false}
                    style={this.state.num_error ? styles.error : styles.pinInputStyle}
                />
                {this.props.loading_prediction && this.state.on == 'home' &&
                  	<ActivityIndicator style = {{
                  position: 'absolute',
                  top: 10,
                  right: 18,
                }} color = '#22313F' size='small' />
                }
                <View style = {styles.space}/>
                <TextInput
                        underlineColorAndroid={'transparent'}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        value = {this.state.work}
                        //isFocused = {() => this.getIcon()}
                        editable={!this.state.loading}
                        onChangeText = {(input)=>this.predict(input, 'work')}
                        placeholder={'Work Address'}
                        placeholderStyle={styles.placeholder}
                        enablesReturnKeyAutomatically={false}
                        style={this.state.num_error ? styles.error : styles.pinInputStyle}
                    />
                {this.props.loading_prediction  && this.state.on == 'work' &&
                  	<ActivityIndicator style = {{
                  position: 'absolute',
                  top: 78,
                  right: 18,
                }} color = '#22313F' size='small' />
                }

                <View style = {{
                    //backgroundColor: 'red',
                    height: deviceHeight/2,
                    marginTop: 10,
                    marginBottom: 10,
                    alignContent: 'center',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                {/* {this.props.loading_prediction &&
                  //   <ActivityIndicator  color= '#22313F' size='large' style = {{
                  //     padding: 0,  
                  // }}/>
                  //this.getIcon()
                } */}
                	{datas.length > 0 ?
			<List
						style = {{
							width: '100%',
							position: 'absolute',
							top: 0,
							zIndex: 200,
							backgroundColor: '#FFF',
							borderColor: '#CCC',
							//borderRadius: 20,
							borderWidth: 1,
						}}
            dataArray={datas}
            renderRow={data =>
                            <ListItem avatar
                            style = {{
								backgroundColor: '#FFF',
								zIndex: 200,
							
							}} onPress={() => this.select_suggest(data.description)} >
                <Left>
                {this.state.on == 'home' ?
                <Icon style = {{color: '#22313F', marginRight: 10, marginTop: 7, fontSize: 20}} name="home" /> 
                :
                <Icon style = {{color: '#22313F', marginRight: 10, marginTop: 7, fontSize: 20}} name="briefcase" /> 
                }
            </Left>
                <Body>
                  <Text style = {{fontFamily: 'Montserrat', fontSize: 17}}>
                    {data.structured_formatting.main_text}
                  </Text>
                  <Text style = {{fontFamily: 'Montserrat', fontSize: 12}} numberOfLines={1} note>
                    {data.description}
                  </Text>
                </Body>
                
				</ListItem>}
                />
                :
                this.getIcon()
					}
                </View>
               <View style={{position: 'absolute', left: 0, right: 0, top: !this.state.networkError ? (deviceHeight - 180) : (deviceHeight - 240)}}>
               
                <TouchableOpacity
                onPress = {() =>  this.register()}
                 disabled={this.state.loading}
                   
                style = {{
                    height: 50,
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                    backgroundColor: '#22313F',
                }}>   
                  {this.state.loading ?
                    <ActivityIndicator  color= '#FFF' style = {{
                        padding: 0,  
                    }}/>
                    :
                        <Text style = {{
                            color: '#FFF',
                            fontFamily: 'Montserrat-Bold',
                            fontSize: 20,
                        }}> Register </Text>
                    }
                </TouchableOpacity>
            </View>
         
          </View>


                </View>
        );
    } else {
        return (
                <View style={{
                    flex: 1,
                }}> 
         
                <View  style = {{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <TouchableOpacity
                            transparent onPress={() => !this.state.loading ? this.setState({showModal: false}) : alert('App busy')}
                            >
                        <Icon style = {{color : "#22313F", fontSize: 40, fontFamily: 'Montserrat-Regular'}}  size = {40} name= "close" />
                    </TouchableOpacity>
                    

                <Text style = {{
                    color: '#22313F',
                    fontFamily: 'Montserrat-Regular',
                    marginTop: 5,
                    fontSize: 20,
                }}> Create a new Rova account </Text>
                </View>
                <View  style = {styles.line}/>
                
                {this.state.error && <Error2 msg = {this.state.errorMsg}/>}

                <View>
                
                <TextInput
                    underlineColorAndroid={'transparent'}
                    autoCapitalize={'none'}
                    autoFocus = {true}
                    autoCorrect={false}
                    value = {this.state.fullname}
                    editable={!this.state.loading}
                    onChangeText = {(input)=>this.setState({fullname: input})}
                    placeholder={'Full Name'}
                    placeholderStyle={styles.placeholder}
                    enablesReturnKeyAutomatically={false}
                    onSubmitEditing={(event) => { 
                      this.refs.SecondInput.focus(); 
                    }}
                    style={this.state.num_error ? styles.error : styles.pinInputStyle}
                />
                
                <View style = {styles.space}/>
                
                <TextInput
                    ref='SecondInput'
                    underlineColorAndroid={'transparent'}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    value = {this.state.tel}
                    editable={!this.state.loading}
                    onChangeText = {(input)=>this.setState({tel: input})}
                    placeholder={'Phone Number'}
                    keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
                    placeholderStyle={styles.placeholder}
                    enablesReturnKeyAutomatically={false}
                    onSubmitEditing={(event) => { 
                      this.refs.thirdinput.focus(); 
                    }}
                    style={this.state.num_error ? styles.error : styles.pinInputStyle}
                />
                
                <View style = {styles.space}/>
                
                <TextInput
                    ref = 'thirdinput'
                    underlineColorAndroid={'transparent'}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    editable={!this.state.loading}
                    value = {this.state.email}
                    onChangeText = {(input)=>this.setState({email: input})}
                    placeholder={'Email Address'}
                    keyboardType={'email-address'}
                    placeholderStyle={styles.placeholder}
                    enablesReturnKeyAutomatically={false}
                    style={this.state.num_error ? styles.error : styles.pinInputStyle}
                    onSubmitEditing={(event) => { 
                      this.refs.forth.focus(); 
                    }}
                />

                <View style = {styles.space}/>
                <TextInput
                ref = 'forth'
                underlineColorAndroid={'transparent'}
                autoCapitalize={'none'}
                autoCorrect={false}
                value = {this.state.password} 
                editable={!this.state.loading}
                onChangeText = {(input)=>this.setState({password: input})}
                placeholder={'Password'}
                secureTextEntry={true}
                placeholderStyle={styles.placeholder}
                enablesReturnKeyAutomatically={false}
                style={this.state.num_error ? styles.error : styles.pinInputStyle}
                onSubmitEditing={(event) => { 
                  this.reg() 
                }}
            />

            <TouchableOpacity 
             onPress = {() => this.reg()} style={styles.panelButton}>
                <Text style={styles.panelButtonTitle}>Proceed</Text>
            </TouchableOpacity>
            </View>



                </View>
        );
    }
}


reg() {
    if (this.state.email !== '' && this.state.password !== '' && this.state.tel !== ''&& this.state.fullname !== '') {
        if (!this.validateEmail(this.state.email)) {
          this.setState({loading: false});
          this.setState({error: true});
          this.setState({errorMsg: 'Enter a valid email address'});
        } else {
          if (this.state.password.length < 6) {
            this.setState({loading: false});
            this.setState({error: true});
            this.setState({errorMsg: 'Password should be more than 5 characters'});
          } else {
            if (!this.validatePhone(this.state.tel)) {
              this.setState({loading: false});
              this.setState({error: true});
              this.setState({errorMsg: 'Enter a valid phone number'});
            } else {
              this.setState({type: 'home'});
              this.setState({loading: false});
              this.setState({error: false});
              this.setState({errorMsg: ''});
            }
          }
        }
     } else {
        this.setState({loading: false});
        this.setState({error: true});
        this.setState({errorMsg: 'Enter input to all fields'});
    }
}

async register() {
    Keyboard.dismiss();
    this.props.resetNetwork();
    this.setState({loading: true});
    this.setState({networkError: false});
    this.setState({error: false});
    this.setState({errorMsg: ''});
          
    if (this.state.email !== '' && this.state.password !== '' && this.state.tel !== ''&& this.state.fullname !== '') {
        fetch('https://admin.rova.com.ng/api2/register', {
             method: 'POST',
             timeout: 30000,
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                fullname: this.state.fullname,
                tel: this.state.tel,
                email: this.state.email,
                password: this.state.password,
                home: this.state.home,
                work: this.state.work
              })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({loading: false});
                this.setState({networkError: false});
                let status = responseJson.status;
                if (status === 'success') {
                    this.setState({showModal: false});
                    this.props.loginSuccess(responseJson);
                    this.props.navigation.navigate('Map');
                } else {
                    this.setState({error: true});
                    this.setState({errorMsg: responseJson.msg});
                }
            })
            .catch((error) => {
              this.setState({ loading: false });
              this.setState({ networkError: true });
              console.log('Error '+error);
              this.setState({error: true});
              this.setState({errorMsg: 'Network Error. Try again later'});
          })
    } else {
        this.setState({loading: false});
        this.setState({error: true});
        this.setState({errorMsg: 'Enter input to all fields'});
          
    }
}


  onLoad(data) {
    console.log('On load fired!');
    this.setState({duration: data.duration});
  }

  onProgress(data) {
    this.setState({currentTime: data.currentTime});
  }

  onBuffer({ isBuffering }: { isBuffering: boolean }) {
    this.setState({ isBuffering });
  }

  getCurrentTimePercentage() {
    if (this.state.currentTime > 0) {
      return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
    } else {
      return 0;
    }
  }

  renderSkinControl(skin) {
    const isSelected = this.state.skin == skin;
    const selectControls = skin == 'native' || skin == 'embed';
    return (
      <TouchableOpacity onPress={() => { this.setState({
          controls: selectControls,
          skin: skin
        }) }}>
        <Text style={[styles.controlOption, {fontWeight: isSelected ? "bold" : "normal"}]}>
          {skin}
        </Text>
      </TouchableOpacity>
    );
  }

  renderRateControl(rate) {
    const isSelected = (this.state.rate == rate);

    return (
      <TouchableOpacity onPress={() => { this.setState({rate: rate}) }}>
        <Text style={[styles.controlOption, {fontWeight: isSelected ? "bold" : "normal"}]}>
          {rate}x
        </Text>
      </TouchableOpacity>
    )
  }

  renderResizeModeControl(resizeMode) {
    const isSelected = (this.state.resizeMode == resizeMode);

    return (
      <TouchableOpacity onPress={() => { this.setState({resizeMode: resizeMode}) }}>
        <Text style={[styles.controlOption, {fontWeight: isSelected ? "bold" : "normal"}]}>
          {resizeMode}
        </Text>
      </TouchableOpacity>
    )
  }

  renderVolumeControl(volume) {
    const isSelected = (this.state.volume == volume);

    return (
      <TouchableOpacity onPress={() => { this.setState({volume: volume}) }}>
        <Text style={[styles.controlOption, {fontWeight: isSelected ? "bold" : "normal"}]}>
          {volume * 100}%
        </Text>
      </TouchableOpacity>
    )
  }

  renderIgnoreSilentSwitchControl(ignoreSilentSwitch) {
    const isSelected = (this.state.ignoreSilentSwitch == ignoreSilentSwitch);

    return (
      <TouchableOpacity onPress={() => { this.setState({ignoreSilentSwitch: ignoreSilentSwitch}) }}>
        <Text style={[styles.controlOption, {fontWeight: isSelected ? "bold" : "normal"}]}>
          {ignoreSilentSwitch}
        </Text>
      </TouchableOpacity>
    )
  }

  setUp(val) {
    this.setState({type: val});
    this.setState({showModal: true});
    this.setState({error: false});
    this.setState({errorMsg: ''});
   
  }

  renderCustomSkin() {
    const flexCompleted = this.getCurrentTimePercentage() * 100;
    const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;

    return (
      <View style={styles.container}>
        <View style={styles.fullScreen}>
          <Video
            source={require('../../../assets/video.mp4')}
            //source={require('../../../assets/bg.mp4')}
            style={styles.fullScreen}
            rate={this.state.rate}
            paused={this.state.paused}
            volume={this.state.volume}
            muted={this.state.muted}
            ignoreSilentSwitch={this.state.ignoreSilentSwitch}
            resizeMode={this.state.resizeMode}
            onLoad={this.onLoad}
            onBuffer={this.onBuffer}
            onProgress={this.onProgress}
            onEnd={() => { console.log('Done!') }}
            repeat={true}
          />
		  <View style = {{flex: 1, zIndex: 2000,}}>
        

          {/* <View style = {{
              flex: 1,
              justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
          }}>
            <Image source={require('../../../assets/Rova_2.png')} 
            resizeMode="contain"
            style={{
                flex: 1,
                width: 250,  
                resizeMode: 'contain',
            }}
            />
          </View> */}
          <View style = {{
              flex: 1,
              justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
                position: 'absolute',
                 left: 0, 
                 right: 0, 
                 top: 100
          }}>
              <Text style = {{
                fontFamily: 'Montserrat-Bold',
                color: '#22313F',
                fontSize: 30,
                }}> 
                Ride Rova for a stress-free commute experience
              </Text>
        </View>
          
         <View style={{position: 'absolute', left: 0, right: 0, bottom: 0}}>
            {/* <Text style = {{color: 'red'}}>My fixed footer</Text> */}
            <View style = {{
                flexDirection: 'row',
                flex: 1,
            }}>
            <TouchableOpacity
             onPress = {() => this.setUp('login')}
             style = {{
                height: 50,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
                backgroundColor: '#FFF'
                
            }}>
                <Text style = {{
                    color: '#22313F',
                    fontFamily: 'Montserrat-Regular',
                    fontSize: 20,
                }}> Login </Text>
            </TouchableOpacity>

            <TouchableOpacity 
            onPress = {() => this.setUp('reg')}
             style = {{
                  height: 50,
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignContent: 'center',
                  backgroundColor: '#22313F'
                  
            }}>
            <Text style = {{
                    color: '#FFF',
                    fontFamily: 'Montserrat-Regular',
                    fontSize: 20,
                }}> Register </Text>
            </TouchableOpacity>

            </View>
         </View>
        



              <Modal 
              backdropColor = 'white'
              backdropOpacity = {0.95}
              onBackButtonPress = {() => {}}
              style = {{
                // backgroundColor:'transparent',
                // flex: 1
            }}
              isVisible={this.state.showModal}>
                {this.runstuff()}
        </Modal>


      </View>


        
        </View>

      </View>
    );
  }


  render() {
    return this.renderCustomSkin();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  line: {
      backgroundColor: '#CCC',
      borderWidth: 1,
      marginBottom: 20,
  },
  controls: {
    backgroundColor: "transparent",
    borderRadius: 5,
    position: 'absolute',
    bottom: 44,
    left: 4,
    right: 4,
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden',
  },
  innerProgressCompleted: {
    height: 20,
    backgroundColor: '#cccccc',
  },
  innerProgressRemaining: {
    height: 20,
    backgroundColor: '#2C2C2C',
  },
  generalControls: {
    flex: 1,
    flexDirection: 'row',
    overflow: 'hidden',
    paddingBottom: 10,
  },
  skinControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rateControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  volumeControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  resizeModeControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  ignoreSilentSwitchControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  controlOption: {
    alignSelf: 'center',
    fontSize: 11,
    color: "white",
    paddingLeft: 2,
    paddingRight: 2,
    lineHeight: 12,
  },
  nativeVideoControls: {
    top: 184,
    height: 300
  },
  pinInputStyle: {
    backgroundColor: '#FFF',
    height: 50, 
    borderColor: '#BBB', 
    borderWidth: 1,
    fontFamily: "Montserrat-Regular",
    fontSize: 18,
    paddingLeft: 20,
},
space: {
    marginBottom: 10,
},
panelButton: {
    width: '100%',
    marginTop: 50,
    padding: 20,
    borderRadius: 10, 
    alignSelf: 'center',
    backgroundColor: '#22313F',
    alignItems: 'center',
    marginVertical: 10
  },
  panelButtonTitle: {
    fontSize: 20,
    //fontWeight: 'bold',
    color: 'white',
    fontFamily: "Montserrat-Bold",
  },
});



const mapStateToProps = ({ map }) => {
	const {
		work,
		home,
		pickup,
		fullname,
	  loading_prediction,
		email,
		tel,
		password,
    error,
    predictions,
    loading,
    network_connected,
		loadingReg,
		errorReg,
		statusReg,
		status,
		selected_route,
	} = map;
	return {
		work,
		home,
		pickup,
		fullname,
		email,
		tel,
		password,
		error,
		loading,
		loadingReg,
		errorReg,
    status,
	  loading_prediction,
   statusReg,
    predictions,
    selected_route,
    network_connected
	};
  };
export default connect(mapStateToProps, {
	register,
	loginUser,
    resetNetwork,
    loginSuccess,
    network_change,
    newloginSuccess,
    getAddressPrediction,
  })(RealHome);