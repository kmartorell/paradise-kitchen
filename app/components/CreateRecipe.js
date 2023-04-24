import React, { useState, useEffect, setState } from 'react';
import { StyleSheet, SafeAreaView, TextInput, Text, View, Button, Alert, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import Images from './Images';
import axios from 'axios';

const CreateRecipe = ({navigation, route}) =>
{

  const [timer1, setTimer1] = React.useState('');

  useEffect(() => {
        
    const createPage = navigation.addListener('focus',() =>
    {
      jwtTimeout();
    });
    return createPage;
  }, [navigation]);

  const doLogout = () => {
    jwt = '';
    clearTimeout(timer1);
    navigation.navigate('Login');
  };
  
  const jwtTimeout = () => {
    const id1 = setTimeout(() => doLogout(), 1000 * 60 * 30); /* 1000 milliseconds * 60 seconds in a minute * 30 minutes */
    setTimer1(id1);
  };
  
  const clearTimers = () => {
    clearTimeout(timer1);
  };

    return(
      <ImageBackground source={Images.background} resizeMode="cover" style={styles.image}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <SafeAreaView style={styles.container}>
              <Image source={Images.logo} style={styles.logo} />
              <View style={styles.mainLanding}>
                <View style={styles.buttonHolder}>
                  <Text style={styles.header}>Create New Recipe!</Text>

                  <Text style={styles.textInputTitle}>Recipe Name</Text>
                  <TextInput style = {styles.textInputStyle} placeholderTextColor='grey' placeholder="Enter recipe name"/>

                  <Text style={styles.textInputTitle}>Minutes to Make</Text>
                  <TextInput style = {styles.textInputStyle} placeholderTextColor='grey' placeholder="Enter time in minutes"/>

                  <Text style={styles.textInputTitle}>Tags</Text>
                  <TextInput style = {styles.textInputStyle} placeholderTextColor='grey' placeholder="Enter a tag"/>

                  <Text style={styles.textInputTitle}>Nutrition Information</Text>
                  <TextInput style = {styles.textInputStyle} placeholderTextColor='grey' placeholder="Enter nutrition info"/>

                  <Text style={styles.textInputTitle}>Recipe Steps</Text>
                  <TextInput style = {styles.textInputStyle} placeholderTextColor='grey' placeholder="Enter new step"/>

                  <Text style={styles.textInputTitle}>Ingredients</Text>
                  <TextInput style = {styles.textInputStyle} placeholderTextColor='grey' placeholder="Enter new ingredient"/>

                  <Text style={styles.textInputTitle}>Recipe Description</Text>
                  <TextInput style = {styles.textBottomInputStyle} placeholderTextColor='grey' placeholder="Write a recipe description"/>

                  <TouchableOpacity style={styles.buttonStyle} onPress={() => clearTimers()}>
                      <Text style={styles.buttonText}>Add Recipe</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.buttonStyle} onPress={() => {clearTimers(); navigation.navigate('Landing', {firstName: route.params.firstName})}}>
                      <Text style={styles.buttonText}>Home</Text>
                  </TouchableOpacity>

                </View>
              </View>
          </SafeAreaView>
        </ScrollView>
    </ImageBackground>
  );
};


const styles = StyleSheet.create({
  logo: {
    height: 125,
    width: 125,
    margin: 10,
},
scrollView: {

},
scrollContent: {

},
header: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 30,
},
container: {
  alignItems: 'center',
  height:'100%'
},
mainLanding: {
  width:'80%',
  backgroundColor:'white',
  alignItems:'center',
  padding:22,
  borderRadius: 20,
  marginBottom: 30,
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
  fontSize: 35,
  textAlign: 'center',
},
buttonHolder: {
  alignItems: 'center',
  marginTop: 10,
  width : '100%',
},
});
export default CreateRecipe;