import React, { useState, useEffect, setState } from 'react';
import { StyleSheet, SafeAreaView, TextInput, Text, View, Button, Alert, Image, ImageBackground, TouchableOpacity } from 'react-native';
import Images from './Images';
import axios from 'axios';

const Landing = ({navigation, route}) =>
{

  const doLogout = event => 
  {
  event.preventDefault();
      localStorage.removeItem("user_data")
      window.location.href = '/';
  };    

    console.log(route.params.id);
 
    return(
      <ImageBackground source={Images.background} resizeMode="cover" style={styles.image}>
          <SafeAreaView style={styles.container}>
              <Image source={Images.logo} style={styles.logo} />
              <View style={styles.mainLanding}>
                  <Text style={styles.header}>Welcome {route.params.firstName}</Text>
                  <View style={styles.buttonHolder}>
                    <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('SearchRecipes')}>
                      <Text style={styles.buttonText}>Search Recipes</Text>
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
                    <TouchableOpacity style={styles.buttonStyle} onPress={doLogout}>
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
export default Landing;