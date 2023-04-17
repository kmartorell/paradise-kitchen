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
    const [code, onChangeCode] = React.useState('');
    const [confirmPassword, onChangeConfirmPassword] = React.useState('');
    const [data, setData] = React.useState('');
    const [emailData, setEmailData] = React.useState('');
    const [showRegister, setShowRegister] = useState(true);
    const [showEmail, setShowEmail] = useState(false);
    const [showVerify, setShowVerify] = useState(false);

    let minm = 100000;
    let maxm = 999999;
    const emailCode =  Math.floor(Math.random() * (maxm - minm + 1)) + minm;

    const showEmailForm = async({navigation}, firstName, lastName, email, username, password, confirmPassword) =>
    {
        // Hide Main form
        setShowRegister(false);
        // Open Verify Form
        setShowEmail(true);
        // API call to Verify
        console.log("Verification code is: ", emailCode);
        fetch('https://paradise-kitchen.herokuapp.com/api/verifyEmail', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email:email,
                    emailCode:emailCode
                })
    
            })    
            .then(response => response.json())
            .then(json => {
                setEmailData(json);
            })
            .catch(error => {
            console.error(error);
            });
    };
    const doVerifyEmail = async(code) =>
    {
        // Check if code is correct.
        if(code == emailData.emailCode){
            setShowEmail(false);
            setShowVerify(true);
        }else{
            console.log("Codes do not match");
            console.log(emailCode);
            console.log(code);
            createCodesNotMatchAlert();
        }
    };

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
        if(emailData){
            if(emailData["error"] == 'success'){
                console.log("User successfully sent an email.");
            }else{
                console.log("Failed to send email.")
            }
        }
    }, [emailData]);

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
    const createCodesNotMatchAlert = () =>{
        Alert.alert('Verification Failed', 'The verification code you entered does not match', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);

        onChangeCode('');

    };

    return(
        <ImageBackground source={Images.background} resizeMode="cover" style={styles.image}>
            <ScrollView style={styles.scrollView} contentInsetAdjustmentBehavior="automatic">
                
                <SafeAreaView style={styles.container}>
                        <Image source={Images.logo} style={styles.logo} />
                        <Text style={styles.header}>Paradise Kitchen</Text>
                        {/* Register Form */}
                        { showRegister && 
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
                                <Button style={styles.login} color="white" title="Register" onPress={() => showEmailForm({navigation}, firstName, lastName, email, username, password, confirmPassword)}/>
                            </View>
                        </View>
                        }

                        {/* Email Form */}
                        { showEmail && 
                        <View style={styles.emailForm}>
                            <Text style={styles.verifyemailmessage}>An email was sent to verify your email.</Text>
                            <Text style={styles.subheader}>Input Code From Email Below</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={onChangeCode}
                                value={code}
                                placeholder="Verification Code"
                            />
                            <View style={styles.submitButton}>
                                <Button style={styles.login} color="white" title="Confirm Email" onPress={() => doVerifyEmail(code)}/>
                            </View>
                        </View>
                        }

                        {/* Verification Succesfull */}
                        { showVerify && 
                        <View style={styles.verification}>
                            <Text style={styles.confirmedText}>Email confirmed! Click below to finish register.</Text>
                            <View style={styles.submitButton}>
                                <Button style={styles.login} color="white" title="Register" onPress={() => doRegister({navigation}, firstName, lastName, email, username, password, confirmPassword)}/>
                            </View>
                        </View>
                        }
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
    scrollView: {
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
    verification: {
        width:'90%',
        backgroundColor:'white',
        alignItems:'center',
        padding:22,
        borderRadius:20,
        marginTop:30,
        marginBottom:250,

    },
    emailForm: {
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
    confirmedText: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight:'bold',
        color:'green',
        width:"90%",
        marginTop:20,
    },
    verifyemailmessage: {
        fontSize: 14,
        textAlign: 'left',
        width:"90%",
        marginTop:20,
        marginBottom:-10,
        color:'green',
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
