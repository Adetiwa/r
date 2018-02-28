import React, { Component } from 'react';
import {
  StyleSheet,   // CSS-like styles
  Text,         // Renders text
  View,          // Container component
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from './Swiper';

export default class Screens extends Component {
  render() {
    
    return (
      <Swiper navigation={this.props.navigation}>
        {/* First screen */}
        <View style={[styles.slide, { backgroundColor: '#C04DEE' }]}>
          <Icon name="ios-bus" {...iconStyles} />
          <Text style={styles.header}>Book Ride Easily</Text>
          <Text style={styles.text}>Get a guaranteed seat daily when you ride with rova. No more queues and struggle for bus.</Text>
        </View>
        {/* Second screen */}
        <View style={[styles.slide, { backgroundColor: '#4AAFEE' }]}>
          <Icon name="ios-cloud-upload" {...iconStyles} />
          <Text style={styles.header}>Track Your Ride</Text>
          <Text style={styles.text}>Monitor drivers location from the map, and also get notify when driver is close to your pick up points</Text>
        </View>
        {/* Third screen */}
        <View style={[styles.slide, { backgroundColor: '#FC515B' }]}>
          <Icon name="ios-heart" {...iconStyles} />
          <Text style={styles.header}>Consistent and Low Price</Text>
          <Text style={styles.text}>In or out of scarcity, and hikes, our prices stay the same daily. You also ssave more when you pay monthly.</Text>
        </View>
      </Swiper>
    );
  }
}

const iconStyles = {
  size: 100,
  color: '#FFFFFF',
};

const styles = StyleSheet.create({
  // Slide styles
  slide: {
    flex: 1,                    // Take up all screen
    justifyContent: 'center',   // Center vertically
    alignItems: 'center',       // Center horizontally
  },
  // Header styles
  header: {
    color: '#FFFFFF',
    fontFamily: 'Avenir',
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  // Text below header
  text: {
    color: '#FFFFFF',
    //fontFamily: 'Avenir',
    fontFamily: 'Montserrat-Regular',
    fontSize: 18,
    marginHorizontal: 40,
    textAlign: 'center',
  },
});
