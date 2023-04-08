import React, { useState, useEffect, setState } from 'react';
import { StyleSheet, SafeAreaView, TextInput, Text, View, Button, Alert } from 'react-native';
import axios from 'axios';

const Login = ({navigation, route}) =>
{
    if(!route.params){
        route.params = {message:''};
    }
    const [username, onChangeUserName] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const [data, setData] = React.useState('');

    const doLogin = async ({navigation}, username,password) =>
    {
        fetch('https://paradise-kitchen.herokuapp.com/api/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: username,
                    password: password,
                })
    
            })    
            .then(response => response.json())
            .then(json => {
                setData(json);
            })
            .catch(error => {
              console.error(error);
            });
    };

    useEffect(() => {
        if(data){
            if(data["id"] != -1)
                navigation.navigate('Landing', {id:data['id'], firstName:data['firstName'], lastName:data['lastName'], email:data['email'], login:data['login'], favorites:data['favorites']});
            else
                createInvalidLoginAlert();
        }
    }, [data]);




    const createInvalidLoginAlert = () =>{
        Alert.alert('Login Failed', 'Your username or password is incorrect.\n Please try again.', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);

        onChangeUserName('');
        onChangePassword('');

    };


 
    return(
        <SafeAreaView>
        <Text
            style={styles.header}
        >
            Paradise Kitchen</Text>
        <Text
            style={styles.message}
        >
            {route.params.message}</Text>
        <TextInput
            style={styles.input}
            onChangeText={onChangeUserName}
            value={username}
            placeholder="User Name"
        />
        <TextInput
            style={styles.input}
            onChangeText={onChangePassword}
            value={password}
            placeholder="Password"
            secureTextEntry={true}
        />
        <Button title="Login"onPress={() => doLogin({navigation}, username,password)}/>
        <Button title="Register"onPress={() =>navigation.navigate('Register')}/>

      </SafeAreaView>
    );
};



const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    header: {
        fontSize: 40,
        textAlign: 'center',
    },
    message: {
        fontSize: 20,
        color: 'green',
        textAlign: 'center',
    }
  });

export default Login;
