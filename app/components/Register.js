import React, { useState, useEffect, setState } from 'react';
import { StyleSheet, SafeAreaView, TextInput, Text, View, Button, Alert, ImageBackground, Image, ScrollView } from 'react-native';
import Images from './Images';
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
        <ImageBackground source={Images.background} resizeMode="cover" style={styles.image}>
            <ScrollView contentInsetAdjustmentBehavior="automatic">
            <SafeAreaView style={styles.container}>
                
                    <Image source={Images.logo} style={styles.logo} />
                    <Text style={styles.header}>Paradise Kitchen</Text>
                    <View style={styles.mainLogin}>
                        <View style={styles.formButtons}>
                            <View style={styles.loginBox}>
                                <Button color="black" title="Login" onPress={() => navigation.navigate('Login')}/>
                            </View>
                            <View style={styles.registerBox}>
                                <Button color="white" fontWeight="bold" title="Register"onPress={() =>navigation.navigate('Register')}/>
                            </View>
                        </View>
                        <Text style={styles.subheader}>First Name</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={onChangeFirstName}
                            value={firstName}
                            placeholder="First Name"
                        />
                        <Text style={styles.subheader}>Last Name</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={onChangeLastName}
                            value={lastName}
                            placeholder="Last Name"
                        />
                        <Text style={styles.subheader}>Email</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={onChangeEmail}
                            value={email}
                            placeholder="Email"
                        />
                        <Text style={styles.subheader}>Username</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={onChangeUserName}
                            value={username}
                            placeholder="Username"
                        />
                        <Text style={styles.subheader}>Password</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={onChangePassword}
                            value={password}
                            placeholder="Password"
                            secureTextEntry={true}
                        />
                        <Text style={styles.subheader}>Confirm Password</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={onChangeConfirmPassword}
                            value={confirmPassword}
                            placeholder="Confirm Password"
                            secureTextEntry={true}
                        />
                        <View style={styles.submitButton}>
                            <Button style={styles.login} color="white" title="Register" onPress={() => doRegister({navigation}, firstName, lastName, email, username, password, confirmPassword)}/>
                        </View>
                        
                    </View>
                
            </SafeAreaView>
            </ScrollView>
      </ImageBackground>
    );
};


const styles = StyleSheet.create({
    input: {
        height: 50,
        width:"90%",
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius:10,
    },
    container: {
        alignItems: 'center',
        height:'100%'
    },
    mainLogin: {
        width:'90%',
        backgroundColor:'white',
        alignItems:'center',
        padding:22,
        borderRadius:20,
        marginTop:30,

    },
    logo: {
        width:125,
        height:125
    },
    header: {
        fontSize: 40,
        textAlign: 'center',
        fontWeight:'bold',
    },
    formButtons:{
        marginTop:10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        shadowColor:'black',
        shadowOpacity:0.25,
        shadowRadius:10,
        width:'60%',
    },
    subheader: {
        fontSize: 20,
        textAlign: 'left',
        fontWeight:'bold',
        width:"90%",
        marginTop:20,
        marginBottom:-10
    },
    message: {
        fontSize: 20,
        color: 'green',
        textAlign: 'center',
    },
    loginBox:{
        width:'70%',
        backgroundColor:'white',
        borderTopLeftRadius:20,
        borderBottomLeftRadius:20,
    },
    registerBox:{

        backgroundColor:'orange',
        width:'70%',
        borderRadius:20,
        marginLeft:-16,
        zIndex:99,
    },
    loginButton:{
        color:"#ffffff",
    },
    submitButton:{
        backgroundColor:'orange',
        width:"80%",
        padding:8,
        marginTop:20,
        marginBottom:12,
        borderRadius:20,
    }
  });

export default Register;
