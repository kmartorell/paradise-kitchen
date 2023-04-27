import React, { useState, useEffect, setState } from 'react';
import { StyleSheet, SafeAreaView, TextInput, Text, View, Button, Alert, ImageBackground, Image, ScrollView, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Images from './Images';


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
    const [message, setMessage] = React.useState('');
    const [inputBorderColor, setBorderColor] = React.useState('black');
    const [showRegister, setShowRegister] = useState(true);
    const [showEmail, setShowEmail] = useState(false);
    const [showVerify, setShowVerify] = useState(false);

    let minm = 100000;
    let maxm = 999999;
    const emailCode =  Math.floor(Math.random() * (maxm - minm + 1)) + minm;

    const showEmailForm = async({navigation}, firstName, lastName, email, username, password, confirmPassword) =>
    {
        if(!firstName || !lastName || !email || !username || !password || !confirmPassword){
                console.log("Fields are missing");
                setMessage('Some fields are missing.\nPlease try again.');
                setBorderColor('red');
        }else{
            setBorderColor('black');
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
            if (reg.test(email) === false) {
                console.log("Email is Not Correct");
                setMessage('Email is not valid.\nPlease try again.');
                onChangeEmail('');    
                setBorderColor('red');
            }
            else {
                if(password == confirmPassword){
                    console.log("Email is Correct");
                    // Hide Main form
                    setShowRegister(false);
                    setMessage('');

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
                }else{
                    setMessage('Your passwords must match.\nPlease try again.');
                    setBorderColor('red');
                    onChangePassword('');
                    onChangeConfirmPassword('');
                }
            }
        }
    };
    const doVerifyEmail = async(code) =>
    {
        setBorderColor('black');
        // Check if code is correct.
        if(code == emailData.emailCode){
            setShowEmail(false);
            setShowVerify(true);
        }else{
            console.log("Codes do not match");
            console.log(emailCode);
            console.log(code);
            setBorderColor('red');
            onChangeCode('');
            setMessage('The verification code you entered does not match.\nPlease try again.');
        }
    };

    const doRegister = async ({navigation}, firstName, lastName, email, username, password, confirmPassword) =>
    {
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

    const getBorderColor = () =>{
        return inputBorderColor;
    }

    return(
        <ImageBackground source={Images.background} resizeMode="cover" style={styles.image}>
            <ScrollView style={styles.scrollView} contentInsetAdjustmentBehavior="automatic">
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}> 
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
                                <Text style={styles.message}>{message}</Text>
                                <Text style={styles.subheader}>First Name</Text>
                                <TextInput
                                    style={[styles.input, {borderColor:getBorderColor()}]}
                                    onChangeText={onChangeFirstName}
                                    value={firstName}
                                    placeholder="First Name"
                                />
                                <Text style={styles.subheader}>Last Name</Text>
                                <TextInput
                                    style={[styles.input, {borderColor:getBorderColor()}]}
                                    onChangeText={onChangeLastName}
                                    value={lastName}
                                    placeholder="Last Name"
                                />
                                <Text style={styles.subheader}>Email</Text>
                                <TextInput
                                    style={[styles.input, {borderColor:getBorderColor()}]}
                                    onChangeText={onChangeEmail}
                                    value={email}
                                    placeholder="Email"
                                />
                                <Text style={styles.subheader}>Username</Text>
                                <TextInput
                                    style={[styles.input, {borderColor:getBorderColor()}]}
                                    onChangeText={onChangeUserName}
                                    value={username}
                                    placeholder="Username"
                                />
                                <Text style={styles.subheader}>Password</Text>
                                <TextInput
                                    style={[styles.input, {borderColor:getBorderColor()}]}
                                    onChangeText={onChangePassword}
                                    value={password}
                                    placeholder="Password"
                                    secureTextEntry={true}
                                />
                                <Text style={styles.subheader}>Confirm Password</Text>
                                <TextInput
                                    style={[styles.input, {borderColor:getBorderColor()}]}
                                    onChangeText={onChangeConfirmPassword}
                                    value={confirmPassword}
                                    placeholder="Confirm Password"
                                    secureTextEntry={true}
                                />
                                <View style={styles.submitButton}>
                                    <Button style={styles.login} color="white" title="Register" onPress={() => showEmailForm({navigation}, firstName, lastName, email, username, password, confirmPassword)}/>
                                </View>
                                <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('Login')}>
                                    <Text style={styles.buttonText}>Home</Text>
                                </TouchableOpacity>
                            </View>
                            }

                            {/* Email Form */}
                            { showEmail && 
                            <View style={styles.emailForm}>
                                <Text style={styles.verifyemailmessage}>An email was sent to verify your email.</Text>
                                <Text style={styles.subheader}>Input Code From Email Below</Text>
                                <Text style={styles.message}>{message}</Text>
                                <TextInput
                                    style={[styles.input, {borderColor:getBorderColor()}]}
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
                </TouchableWithoutFeedback>
            </ScrollView>
      </ImageBackground>
    );
};


const styles = StyleSheet.create({
    input:{
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
    buttonStyle:{
        backgroundColor:'orange',
        width:"80%",
        padding:8,
        marginTop:20,
        marginBottom:12,
        borderRadius:20,
      },
      buttonText: {
        color: 'white',
        fontSize: 25,
        textAlign: 'center',
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
        color: 'red',
        textAlign: 'center',
        marginTop:20,
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
