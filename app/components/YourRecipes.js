import React, { useState, useEffect, setState } from 'react';
import { StyleSheet, SafeAreaView, TextInput, Text, View, Svg, Path, Button, Alert, Card, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import Images from './Images';
import { decodeToken, isExpired, refresh } from "react-jwt";


const YourRecipes = ({navigation, route}) =>
{ 
    const [results, setResults] = React.useState('');

    var storage = require('../tokenStorage.js');

    const renderCard = (card, index) => {
      return(
        <TouchableOpacity style={styles.cardMain} key={card.id} onPress={() => navigation.navigate('ViewYourRecipes', {recipe: card})}>
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>
                  {card.name.toUpperCase()}
                </Text>
                <Text style={styles.cardTags}>
                  {card.tags.map(i => '+' + i).slice(0,4).join('\n')}
                </Text>
                <Text style={styles.cardDescription}>
                  {card.shortDescription}
                </Text>
              </View>
              <View style={styles.cardButton}>
                <View>
                  <Image source={Images.recipeClickIcon} style={styles.buttonIcon} />
                </View>
              </View>
        </TouchableOpacity>
      );
    };
    
    useEffect(() => {
      const doCreatedPull = navigation.addListener('focus',() =>
      {
        (async () => {
          const token_data = await storage.retrieveToken();
          console.log("Here");
          if(!token_data){
            doLogout();
          }else{
            var user = decodeToken(await storage.retrieveToken());
            fetch('https://paradise-kitchen.herokuapp.com/api/showCreated', {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  userId: user.userId,
                  jwtToken: token_data,
              })
            })
            .then(response => response.json())
            .then(json => {
                setResults(json);
            })
            .catch(error => {
              console.error(error);
            });
          }
        })();
      });
      return doCreatedPull;
    }, [navigation]);

    useEffect(() => {

    }, [results]);

    return(
      <ImageBackground source={Images.background} resizeMode="cover" style={styles.image}>
          <ScrollView style={styles.scrollView} contentInsetAdjustmentBehavior="automatic">
            <SafeAreaView style={styles.container}>
                <Image source={Images.logo} style={styles.logo} />
                <Text style={styles.header}>Paradise Kitchen</Text>
                <View style={styles.mainLanding}>
                  <Text style={styles.subheader}>View Your Created Recipes Here!</Text>
                    <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('Landing')}>
                        <Text style={styles.buttonText}>Home</Text>
                    </TouchableOpacity>
                </View>
                { results && 
                <View style={styles.recipeList}>
                  <Text style={styles.subheader}>Your Recipes</Text>
                    { results.error != "created pull fail" && 
                      results.map(renderCard)
                    }
                    { results.error == "created pull fail" && 
                    <View style={styles.noResultsDiv} >
                      <Text style={styles.noResults}>No Results Found</Text>
                    </View>
                    }
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
    fontSize: 30,
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
      fontSize: 30,
      textAlign: 'center',
      fontWeight:'bold',
      width:"100%",
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
  cardMain: {
    flex:1,
    flexDirection:'row',
    height:160,
    overflow:'hidden',
    margin:6,
    textAlign:'left',
    borderLeftColor:'orange',
    borderLeftWidth:5,
    padding:12,
  },  
  cardTitle: {
    textAlign:'left',
    fontWeight:'bold',
    fontSize:16,

  },
  cardDescription: {
    textAlign:'left',
  },
  cardInfo: {
    flex:15,
    width:'90%'
  },  
  cardButton: {
    flex:1,
    justifyContent:'center',
    paddingLeft:6
  },  
  cardTags: {
    color:'grey',
    width:'100%',
    paddingTop:4,
    paddingBottom:4
  },  
  buttonIcon: {
    marginTop:'auto',
    width:30,
    height:30
  },
  noResults: {
    textAlign:'center',
    justifyContent:'center',
    fontSize:16,
  },  
  noResultsDiv: {
    paddingTop:20,
    textAlign:'center',
    justifyContent:'center',
    width:'100%'
  }  

});
export default YourRecipes;