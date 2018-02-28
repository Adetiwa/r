const React = require("react-native");

const { StyleSheet } = React;

export default {
  container: {
    backgroundColor: "#FFF"
  },

  buttons: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  login: {
    justifyContent: "center",
    alignItems: "center",
    borderColor:'#FFF',
    borderWidth: 2,
    padding: 10,
    width: "40%",
    height: 40,
    backgroundColor: "blue",
    marginLeft: 10,
  },
  panelButton: {
    width: '85%',
    marginTop: 50,
    padding: 20,
    borderRadius: 10, 
    alignSelf: 'center',
    backgroundColor: '#22A7F0',
    //backgroundColor: '#87D37C',
    //backgroundColor: '#de6d77',
    alignItems: 'center',
    marginVertical: 10
  },
  panelButtonTitle: {
    fontSize: 20,
    //fontWeight: 'bold',
    color: 'white',
    fontFamily: "Montserrat",
  },
  register: {
    backgroundColor: "red",
    height: 40,
    borderColor:'#FFF',
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    padding: 10,
    marginRight: 10,
    width: "40%",
  },
  names: {
    flexDirection: "row",
    width: "100%",
  },
  signupButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#203CC4',
    padding: 10,
    width: "80%",
    height: 40,
    marginLeft: 10,
  },
  signupText: {
    //color: "#FFF",
    alignText: 'center',
    justifyContent: "center",
    alignItems: "center",

  },
  touch: {
    width: '85%',
    flex: 1,
    height: 45,
    alignSelf: 'center',
    marginTop: 20,
    borderWidth: 3,
    borderColor: '#AAA',
    borderRadius: 6,
},
text: {
    fontFamily: "Montserrat",
    //alignSelf: 'center',
    justifyContent:'center',
    lineHeight:32,
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 20,
    color: '#AAA'
},
  buttonContainer: {
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: '#009AD5',
    width: "70%",
    padding: 10,
  },
  continue: {
    marginTop: 25,
    width: "100%",
    alignItems: "center",
    justifyContent: 'center',

  },
  continueText: {
    color: '#FFF',
    fontFamily: 'Montserrat',
    textAlign: 'center',
  },
};
