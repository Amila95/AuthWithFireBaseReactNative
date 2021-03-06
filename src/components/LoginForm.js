import React, { Component } from 'react';
import {TextInput, Text} from 'react-native';
import { Button, Card, CardSection, Input, Spinner} from './common'
import firebase from 'firebase';


class LoginForm extends Component {
    state = {
         email: '',
         password:'',
         error:'',
         loading:false
};

    onButtonPress(){
        const {email, password} = this.state;
         this.setState({error:'', loading:true});
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(this.onLoginSuccess())
        .catch(()=>{
            firebase.auth().createUserWithEmailAndPassword(email,password)
            .then(this.onLoginSuccess())
            .catch(()=>{
                  this.onLoginFail();
            })
        });

        
    
    }

    onLoginFail=()=>{
        this.setState({
            error:'Authntication Failed.',
            loading: false
        })

    }
    
    onLoginSuccess =() =>{
        
        this.setState({
            email:'',
            password:'',
            loading:false,
            error:''
        })
    }

    renderButton(){
        if(this.state.loading){
            return <Spinner size="small" />
        }
        return(
            <Button 
                      onPress={this.onButtonPress.bind(this)}
                      >
                          Log In
                      </Button>
        )
    }
    render() {
        return (
          <Card>
              <CardSection>
                  <Input 
                  placeholder="user@gmail.com"
                  lable="Email"
                  value = {this.state.email}
                  onChangeText = {email => this.setState({email:email})}
                  />
                  </CardSection>
                  <CardSection>
                  <Input 
                  secureTextEntry
                  placeholder="password"
                  lable="Password"
                  value = {this.state.password}
                  onChangeText = {password => this.setState({password:password})}
                  />
                  </CardSection>

                    <Text style={styles.errorTextStyle}>
                        {this.state.error}
                    </Text>
                  <CardSection>
                      {this.renderButton()}
                  </CardSection>

          </Card>
        )
    }
}

const styles = {
    errorTextStyle:{
        fontSize:20,
        alignSelf:'center',
        color:'red'
    }
}

export default LoginForm;
