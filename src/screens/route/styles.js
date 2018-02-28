const React = require("react-native");

const { StyleSheet } = React;

export default {
  container: {
    backgroundColor: "#FFF"
  },
  text: {
    alignSelf: "center",
    marginBottom: 7
  },
  mb: {
    marginBottom: 15
  },
  circelFirst: {
		position: 'absolute',
		width: 20,
		height: 20,
		backgroundColor: '#FFF',
		borderRadius: 20,
		borderColor: '#87D37C',
		borderWidth: 5,
		top: 20,
		left: 20
	},
	circelSecond: {
	  position: 'absolute',
	  width: 20,
	  height: 20,
	  backgroundColor: '#FFF',
	  //borderColor: '#22A7F0',
	  borderColor: '#F05959',
	  borderWidth: 5,
	  borderRadius: 20,
	  top: 70,
	  left: 20
	  },
	  dot1: {
		  position: 'absolute',
		  height: 5,
		  top: 50,
		  left: 28,
		  borderColor: '#CCC',
		  borderWidth: 1,
	  },
	  dot2: {
		  position: 'absolute',
		  height: 5,
		  top: 60,
		  left: 28,
		  borderColor: '#CCC',
		  borderWidth: 1,
	  },
	  dot3: {
		  position: 'absolute',
		  height: 5,
		  top: 70,
		  left: 28,
		  borderColor: '#CCC',
		  borderWidth: 1,
    },
    row1: {
      marginLeft: 50,
      justifyContent: 'space-between',
      flexDirection: 'row',
      
  },
  row2: {
      marginTop: 30,
      marginLeft: 50,
      justifyContent: 'space-between',
      flexDirection: 'row'
  },
};
