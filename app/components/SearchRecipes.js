import React, { useState, useEffect, setState } from 'react';
import { StyleSheet, SafeAreaView, TextInput, Text, View, Button, Alert, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import Images from './Images';
import axios from 'axios';

const SearchRecipes = ({navigation, route}) =>
{ 
    const [search, onChangeSearch] = React.useState('');
    const [initiallySearched, onChangeInitialSearch] = useState(0);
    const [results, setResults] = React.useState('');

    const renderCard = (card, index) => {
      return(
        <Card>
          <Card.Body>
            <Card.Title>
              {card.title}
            </Card.Title>
            <Card.Text>
              {card.text}
            </Card.Text>
          </Card.Body>
        </Card>
      );
    };
    
    useEffect(() => {
      const doSearch = async(text) =>
      {
        console.log("Doing Search");
        fetch('https://paradise-kitchen.herokuapp.com/api/searchrecipe', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              text: text,
          })
        })    
        .then(response => response.json())
        .then(json => {
            setResults(json);
        })
        .catch(error => {
          console.error(error);
        });
    
        console.log("Results");
        console.log(results);
        onChangeInitialSearch(1);
      };
      doSearch(' ');
    }, []);


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
                    <View style={styles.submitButton}>
                        <Button style={styles.login} color="white" title="Search" onPress={() => doSearch({navigation}, search)}/>
                    </View>
                </View>

                <View style={styles.recipeList}>
                  <Text style={styles.subheader}>Recipe List</Text>
                    <View style={styles.recipeCard}>
                    </View>
                </View>
            </SafeAreaView>
          </ScrollView>
      </ImageBackground>
  );
};

    {/* return(
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
    </ImageBackground> */}



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