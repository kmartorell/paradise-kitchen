import React, { useState, useEffect, setState } from 'react';
import { StyleSheet, SafeAreaView, TextInput, Text, View, Button, Alert, Image, ImageBackground, ScrollView} from 'react-native';
import Images from './Images';
import axios from 'axios';

const ForgotPassword = ({navigation}) =>
{
    const [email, onChangeEmail] = React.useState('');
    const [login, onChangeLogin] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [inputBorderColor, setBorderColor] = React.useState('black');
    const [data, setData] = React.useState('');

    const doForgotPassword = async ({navigation}, email, login, styles) =>
    {
        setBorderColor('black');
        setMessage('');
        if(!email || !login){
            setMessage('Some fields are missing.\nPlease try again.');
            setBorderColor('red');
        }else{
            fetch('https://paradise-kitchen.herokuapp.com/api/forgotPassword', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    login: login,
                })
    
            })    
            .then(response => response.json())
            .then(json => {
                setData(json);
            })
            .catch(error => {
              console.error(error);
            });
        }
    };

    useEffect(() => {
        if(data){
            if(data.error == 'success'){
                navigation.navigate('Login', {message:"Password email sent. Please check your email."});
            }else{
                setMessage('The email/username you typed in does not match anything in our records.\nPlease try again.');
                setBorderColor('red');
                onChangeEmail('');
                onChangeLogin('');
            }
        }
    }, [data]);

    const getBorderColor = () =>{
        return inputBorderColor;
    };
 
    return(
        <ImageBackground source={Images.background} resizeMode="cover" style={styles.image}>
            <ScrollView style={styles.scrollView} contentInsetAdjustmentBehavior="automatic">
                <SafeAreaView style={styles.container}>
                    <Image source={Images.logo} style={styles.logo} />
                    <Text style={styles.header}>Forgot Password</Text>
                    <View style={styles.mainLogin}>
                        <View style={styles.formButtons}>
                            <View style={styles.backBox}>
                                <Button color="white" title="Back" onPress={() => navigation.navigate('Login')}/>
                            </View>
                        </View>
                        <Text style={styles.message}>{message}</Text>
                        <Text style={styles.subheader}>Email</Text>
                        <TextInput
                            style={[styles.input, {borderColor:getBorderColor()}]}
                            onChangeText={onChangeEmail}
                            value={email}
                            placeholder="Email"
                        />
                        <Text style={styles.subheader}>Login</Text>
                        <TextInput
                            style={[styles.input, {borderColor:getBorderColor()}]}
                            onChangeText={onChangeLogin}
                            value={login}
                            placeholder="Login"
                        />
                        <View style={styles.submitButton}>
                            <Button style={styles.login} color="white" title="Login"onPress={() => doForgotPassword({navigation}, email, login, styles)}/>
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
        marginBottom:250,

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
        alignItems:'left',
        justifyContent:'left',
        shadowColor:'black',
        shadowOpacity:0.25,
        shadowRadius:10,
        width:'90%',
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
        color: 'red',
        textAlign: 'center',
    },
    backBox:{
        backgroundColor:'orange',
        width:'40%',
        borderRadius:20,
        marginRight:-16,
        zIndex:99,
        marginBottom:10,
    },
    registerBox:{
        width:'70%',
        backgroundColor:'white',
        borderTopRightRadius:20,
        borderBottomRightRadius:20,
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

export default ForgotPassword;
