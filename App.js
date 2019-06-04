/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './src/components/common';
import LoginForm from './src/components/LoginForm';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export default class App extends Component {
  state = {
    loggedIn: null
  };

  componentWillMount(){
    firebase.initializeApp({
      apiKey: 'AIzaSyCxfLzYtq6B0BwEk-OFGcZXIgSXU_OghbY',
      authDomain: 'authtification-9575e.firebaseapp.com',
      databaseURL: 'https://authtification-9575e.firebaseio.com',
      projectId: 'authtification-9575e',
      storageBucket: 'authtification-9575e.appspot.com',
      messagingSenderId: '714498851098',
      appId: '1:714498851098:web:4d213c321001c8d1'
    });
    
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        this.setState({loggedIn: true});
      }else{
        this.setState({loggedIn: false});
      }
    });

    
  }
  renderContent() {
    switch(this.state.loggedIn){
      case true:
        return (
      <Button onPress={()=> firebase.auth().signOut()}>Log Out</Button>
        
        );
      case false:
        return <LoginForm />
        case null:
        return <Spinner size="large" />
      default:
        return <LoginForm />
    }
   }

 

  render() {
    return (
      <View >
        <Header />
        {this.renderContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
