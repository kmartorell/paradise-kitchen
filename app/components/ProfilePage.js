import React, { useState, useEffect, setState } from 'react';
import { StyleSheet, SafeAreaView, TextInput, Text, View, Button, Alert, Image, ImageBackground, TouchableOpacity } from 'react-native';
import Images from './Images';
import { decodeToken, isExpired} from "react-jwt";


const ProfilePage = ({navigation, route}) =>
{
  const [firstName, onChangeFirstName] = React.useState('');
  const [lastName, onChangeLastName] = React.useState('');
  const [email, onChangeEmail] = React.useState('');
  const [login, onChangeLogin] = React.useState('');
  var storage = require('../tokenStorage.js');

  useEffect(() => {
          
    const profPage = navigation.addListener('focus',() =>
    {
        (async () => {
          // Grab user info
          const token_data = await storage.retrieveToken();
          if(!token_data){
              doLogout();
          }else{
              var user = decodeToken(await storage.retrieveToken());
              console.log(user);
              onChangeFirstName(user.firstName);
              onChangeLastName(user.lastName);
              onChangeEmail(user.email);
              onChangeLogin(user.login);
          }
        })();
    });
    return profPage;
  }, [navigation]);

  const doLogout = () => {
    AsyncStorage.removeItem("user_data");
    AsyncStorage.removeItem("token_data");
    navigation.navigate('Login');
  };


  return(
    <ImageBackground source={Images.background} resizeMode="cover" style={styles.image}>
        <SafeAreaView style={styles.container}>
            <Image source={Images.logo} style={styles.logo} />
            <View style={styles.mainLanding}>
                <View style={styles.buttonHolder}>
                  <Text style={styles.header}>Profile Page!</Text>
                  <Text style={styles.profileSubheader}>Name: {firstName} {lastName}</Text>
                  <Text style={styles.profileSubheader}>Email: {email}</Text>
                  <Text style={styles.profileSubheader}>Username: {login}</Text>
                    <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('Landing')}>
                        <Text style={styles.buttonText}>Home</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
  </ImageBackground>
);
};


const styles = StyleSheet.create({
  logo: {
      height: 125,
      width: 125,
      margin: 10,
  },
  header: {
      fontSize: 40,
      textAlign: 'center',
  },
  container: {
    alignItems: 'center',
    height:'100%'
  },
  mainLanding: {
    width:'90%',
    backgroundColor:'white',
    alignItems:'center',
    padding:22,
    borderRadius:20,
  },
  message: {
      fontSize: 20,
      color: 'green',
      textAlign: 'center',
  },
  profileSubheader: {
    fontSize: 20,
    paddingBottom: 10,
    color: 'black',
    textAlign: 'center',
},
  buttonStyle:{
    backgroundColor:'orange',
    width:"80%",
    padding:8,
    marginTop:20,
    marginBottom:12,
    borderRadius:20,
  },
  searchRecipeText: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 35,
    textAlign: 'center',
  },
  buttonHolder: {
    alignItems: 'center',
    marginTop: 10,
    width : '100%',
},
});
export default ProfilePage;