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
    textAlign: 'center',
  },
};
