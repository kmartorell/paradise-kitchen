import React, { useState, useEffect, setState } from 'react';
import { StyleSheet, SafeAreaView, TextInput, Text, View, Button, Alert } from 'react-native';
import axios from 'axios';

const Register = ({navigation}) =>
{
    const [firstName, onChangeFirstName] = React.useState('');
    const [lastName, onChangeLastName] = React.useState('');
    const [email, onChangeEmail] = React.useState('');
    const [username, onChangeUserName] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const [confirmPassword, onChangeConfirmPassword] = React.useState('');
    const [data, setData] = React.useState('');

    const doRegister = async ({navigation}, firstName, lastName, email, username, password, confirmPassword) =>
    {
        if(password == confirmPassword){
            fetch('https://paradise-kitchen.herokuapp.com/api/register', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
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
        }else{
            createPasswordsNotMatchAlert();
        }
    };

    useEffect(() => {
        if(data){
            if(data["error"] == 'success')
                navigation.navigate('Login', {message:"Successfully Registered! Please sign in."});
        }
    }, [data]);

    const createPasswordsNotMatchAlert = () =>{
        Alert.alert('Register Failed', 'Your passwords must match.\n Please try again.', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
    };




 
    return(
        <SafeAreaView>
        <Text
            style={styles.header}
        >
            Paradise Kitchen</Text>
        <TextInput
            style={styles.input}
            onChangeText={onChangeFirstName}
            value={firstName}
            placeholder="First Name"
        />
        <TextInput
            style={styles.input}
            onChangeText={onChangeLastName}
            value={lastName}
            placeholder="Last Name"
        />
        <TextInput
            style={styles.input}
            onChangeText={onChangeEmail}
            value={email}
            placeholder="Email"
        />
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
        <TextInput
            style={styles.input}
            onChangeText={onChangeConfirmPassword}
            value={confirmPassword}
            placeholder="Confirm Password"
            secureTextEntry={true}
        />
        <Button title="Register"onPress={() => doRegister({navigation}, firstName, lastName, email, username, password, confirmPassword)}/>
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
    }
  });

export default Register;
