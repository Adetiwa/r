import React from "react";
import { View,StatusBar, Text } from "react-native";
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducers from './src/reducers';
import logger from 'redux-logger';
import App from "./src/App";


export default class App1 extends React.Component {
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk, logger));
    return (
      <Provider store = {store}>
        <View style = {{
          flex: 1,
        }}>
         
          <App/>
        </View>
      </Provider>
    )
  }
}
