import React, { Component } from "react";
import { ImageBackground, View, StatusBar } from "react-native";
import { Container, Button, H3, Text } from "native-base";
import styles from "./styles";
import Screens from './Screens';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
       mounted: true,
    }
  
  }
  componentDidMount() {
    // Hide the status bar
    StatusBar.setHidden(true);
    
  }



  render() {
    const { navigate } = this.props.navigation;
  
    return (
      <Container style = {{
        flex: 1,
      }}>
      {this.state.mounted &&
         <Screens navigation={this.props.navigation}/>
        }
      </Container>
    );
  }
}

export default Home;
