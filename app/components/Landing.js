import React, { useState, useEffect, setState } from 'react';
import { StyleSheet, SafeAreaView, TextInput, Text, View, Button, Alert, Image, ImageBackground, TouchableOpacity } from 'react-native';
import Images from './Images';
import axios from 'axios';

const Landing = ({navigation, route}) =>
{

  useEffect(() => {
    const openLanding = navigation.addListener('focus',() =>
    {

      jwtTimeout();

      // Grab user info
      var _ud = localStorage.getItem('user_data');
      var ud = JSON.parse(_ud);
      var userId = ud.id;
      var firstName = ud.firstName;
      var lastName = ud.lastName;
      var email = ud.email;
      var favorites = ud.favorites;
    });
    return openLanding;
  }, [navigation]);

  const doLogout = () => {
    localStorage.removeItem("user_data");
    navigation.navigate('Login');
  };
    return(
      <ImageBackground source={Images.background} resizeMode="cover" style={styles.image}>
          <SafeAreaView style={styles.container}>
              <Image source={Images.logo} style={styles.logo} />
              <View style={styles.mainLanding}>
                  <Text style={styles.header}>Welcome {user.firstName}</Text>
                  <View style={styles.buttonHolder}>
                  <Text style={styles.errorMessage}>{route.params.message}</Text>
                  <Text style={styles.errorMessage}>{route.params.errormessage}</Text>
                  <Text style={styles.successMessage}>{route.params.successmessage}</Text>
                    <TouchableOpacity style={styles.firstButtonStyle} onPress={() => navigation.navigate('SearchRecipes')}>
                      <Text style={styles.buttonText}>Search Recipes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('YourFavorites')}>
                      <Text style={styles.buttonText}>Your Favorites</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('YourRecipes')}>
                      <Text style={styles.buttonText}>Your Recipes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('CreateRecipe')}>
                      <Text style={styles.buttonText}>Create Recipe</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('ProfilePage')}>
                      <Text style={styles.buttonText}>Profile Page</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonStyle} onPress={() => {doLogout()}}>
                      <Text style={styles.buttonText}>Log Out</Text>
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
  firstButtonStyle:{
    backgroundColor:'orange',
    width:"80%",
    padding:8,
    marginBottom:12,
    borderRadius:20,
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
  errorMessage: {
    fontSize: 20,
    color: 'red',
    textAlign: 'center',
    marginTop:10,
  },
  successMessage: {
    marginTop:-20,
    fontSize: 20,
    color: 'green',
    textAlign: 'center',
    marginBottom:20,
  },
  buttonText: {
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
  },
  buttonHolder: {
    alignItems: 'center',
    width : '100%',
},
});
export default Landing;