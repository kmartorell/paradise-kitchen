import React, { useState, useEffect, setState } from 'react';
import { StyleSheet, SafeAreaView, TextInput, Text, View, Button, Alert, Card, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import Images from './Images';
import axios from 'axios';

const SearchRecipes = ({navigation, route}) =>
{ 
    const [search, onChangeSearch] = React.useState('');
    const [results, setResults] = React.useState('');


    const doSearch = async (search) =>
    {
      fetch('https://paradise-kitchen.herokuapp.com/api/searchrecipe', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              text: search,
          })
        })    
        .then(response => response.json())
        .then(json => {
            setResults(json);
        })
        .catch(error => {
          console.error(error);
        });
    };

    const renderCard = (card, index) => {
      return(
        <View>
            <Text>
              {card.name}
            </Text>
            <Text>
              {card.description}
            </Text>
        </View>
      );
    };
    
    useEffect(() => {
      const doSearch = navigation.addListener('focus',() =>
      {
        console.log("Doing Search");
        fetch('https://paradise-kitchen.herokuapp.com/api/searchrecipe', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              text: ' ',
          })
        })    
        .then(response => response.json())
        .then(json => {
            setResults(json);
        })
        .catch(error => {
          console.error(error);
        });
      });
      return doSearch;
    }, [navigation]);

    console.log("Results:",results);


    return(
      <ImageBackground source={Images.background} resizeMode="cover" style={styles.image}>
          <ScrollView style={styles.scrollView} contentInsetAdjustmentBehavior="automatic">
            <SafeAreaView style={styles.container}>
                <Image source={Images.logo} style={styles.logo} />
                <Text style={styles.header}>Paradise Kitchen</Text>
                <View style={styles.mainLanding}>
                  <Text style={styles.subheader}>Search Recipes Here!</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeSearch}
                        value={search}
                        placeholder="Type in a Name, Description, Ingredient or Tag here."
                    />
                    <TouchableOpacity style={styles.buttonStyle} onPress={() => doSearch(search)}>
                        <Text style={styles.buttonText}>Search</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonStyle}>
                        <Text style={styles.buttonText}>Reset</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('Landing', {firstName: route.params.firstName})}>
                        <Text style={styles.buttonText}>Home</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.recipeList}>
                  <Text style={styles.subheader}>Recipe List</Text>
                    { results && 
                      results.map(renderCard)
                    }
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
  buttonStyle:{
    backgroundColor:'orange',
    width:"80%",
    padding:8,
    marginTop:12,
    marginBottom:6,
    borderRadius:20,
  },
  textInputTitle: {
    color: 'black',
    fontSize: 27,
    fontWeight: 'bold',
  },
  textInputStyle: {
    color: 'black',
    fontSize: 15,
    borderWidth: 1,
    height: 50,
    width: '100%',
    marginBottom: 30,
    borderRadius: 10,
    paddingLeft: 10,
  },
  textBottomInputStyle: {
    color: 'black',
    fontSize: 15,
    borderWidth: 1,
    height: 50,
    width: '100%',
    marginBottom: 20,
    borderRadius: 10,
    paddingLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
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
      marginTop:30,
  },
  recipeList: {
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
      textAlign: 'center',
      fontWeight:'bold',
      width:"90%",
      marginTop:20,
  },
  message: {
      fontSize: 20,
      color: 'green',
      textAlign: 'center',
      marginTop:16,
  },
  errorMessage: {
      fontSize: 20,
      color: 'red',
      textAlign: 'center',
  },
  loginBox:{
      backgroundColor:'orange',
      width:'70%',
      borderRadius:20,
      marginRight:-16,
      zIndex:99,
  },
  searchRecipeText: {
    color: 'black',
    fontSize: 15,
    borderWidth: 1,
    height: 50,
    borderRadius: 10,
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
  },
  scrollView: {
    height:'100%'
  },
});
export default SearchRecipes;