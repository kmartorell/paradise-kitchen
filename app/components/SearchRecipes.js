import React, { useState, useEffect, setState } from 'react';
import { StyleSheet, SafeAreaView, TextInput, Text, View, Button, Alert, Image, ImageBackground, TouchableOpacity } from 'react-native';
import Images from './Images';
import axios from 'axios';

const SearchRecipes = ({navigation, route}) =>
{ 

    return(
      <ImageBackground source={Images.background} resizeMode="cover" style={styles.image}>
          <SafeAreaView style={styles.container}>
              <Image source={Images.logo} style={styles.logo} />
              <View style={styles.mainLanding}>
                  <View style={styles.buttonHolder}>
                    <Text style={styles.header}>Search Recipes Here!</Text>
                      <TextInput style = {styles.searchRecipeText} placeholderTextColor='grey' placeholder="Search Name, Description, Ingredient or Tag."/>
                      <TouchableOpacity style={styles.buttonStyle}>
                          <Text style={styles.buttonText}>Search</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.buttonStyle}>
                          <Text style={styles.buttonText}>Reset</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('Landing', {firstName: route.params.firstName})}>
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
      fontSize: 30,
      textAlign: 'center',
      marginBottom: 15,
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
    color: 'black',
    fontSize: 15,
    borderWidth: 1,
    height: 50,
    borderRadius: 10,
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
export default SearchRecipes;