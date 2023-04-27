import React, { useState, useEffect, setState } from 'react';
import { StyleSheet, SafeAreaView, TextInput, Text, View, Button, Alert, Image, ImageBackground, TouchableOpacity, ScrollView, Keyboard, TouchableWithoutFeedback} from 'react-native';
import Images from './Images';
import { decodeToken, isExpired, refresh } from "react-jwt";


const CreateRecipe = ({navigation, route}) =>
{

    const [name, onChangeName] = React.useState('');
    const [description, onChangeDescription] = React.useState('');
    const [minutes, onChangeMintues] = React.useState('');
    const [tags, onChangeTags] = React.useState('');
    const [nutrition, onChangeNutrition] = React.useState('');
    const [steps, onChangeSteps] = React.useState('');
    const [ingredients, onChangeIngredients] = React.useState('');
    const [data, setData] = React.useState('');

    var storage = require('../tokenStorage.js');
    

    const doCreate = async (name, description, minutes, tags, nutrition, steps, ingredients) =>
    {
      
      (async () => {
        // Grab user info
        const token_data = await storage.retrieveToken();
        if(!token_data){
          doLogout();
        }else{
          var user = decodeToken(await storage.retrieveToken());let n_steps;
          let n_ingredients;
          let createdby;
          let submitted;
          console.log(user);
          tags = tags.replaceAll("\n", "").split(",");
          steps = steps.replaceAll("\n", "").split(",");
          minutes = parseInt(minutes);
          n_steps = steps.length;
          nutrition = nutrition.replaceAll("\n", "").split(",");
          for(let i=0;i<nutrition.length;i++)
            nutrition[i] = parseInt(nutrition[i])
          ingredients = ingredients.replaceAll("\n", "").split(",");
          n_ingredients = ingredients.length;
          createdby = user.userId;
          submitted = new Date();
          fetch('https://paradise-kitchen.herokuapp.com/api/addRecipe', {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  name: name,
                  description: description,
                  minutes: minutes,
                  tags: tags,
                  nutrition: nutrition,
                  steps: steps,
                  ingredients: ingredients,
                  n_ingredients: n_ingredients,
                  n_steps: n_steps,
                  createdby: createdby,
                  submitted: submitted,
                  jwtToken: token_data,
              })
            })    
            .then(response => response.json())
            .then(json => {
                setData(json);
            })
            .catch(error => {
              console.error(error);
            });
          }
      })();  
    };
  
    useEffect(() => {
      if(data){
        storage.storeToken(data.jwtToken.accessToken);
          if(data.error == 'success'){
              navigation.navigate('Landing', {successmessage:"Create Recipe Successful!", errormessage:""});
          }
          else{
            navigation.navigate('Landing', {successmessage:"", errormessage:"Error Creating Recipe, Please try again."});

          }
      }
    }, [data]);

    return(
      <ImageBackground source={Images.background} resizeMode="cover" style={styles.image}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} contentInsetAdjustmentBehavior="automatic">
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={styles.container}>
                <Image source={Images.logo} style={styles.logo} />
                <View style={styles.mainLanding}>
                  <View style={styles.buttonHolder}>
                    <Text style={styles.header}>Create New Recipe!</Text>

                    <Text style={styles.textInputTitle}>Recipe Name</Text>
                    <TextInput 
                      style = {styles.textInputStyle} 
                      placeholderTextColor='grey'  
                      multiline = {true} 
                      numberOfLines = {2}  
                      onChangeText={onChangeName}
                      value={name}
                      placeholder="Enter recipe name"/>

                    <Text style={styles.textInputTitle}>Recipe Description</Text>
                    <TextInput 
                      style = {styles.textInputStyleDescription} 
                      placeholderTextColor='grey'  
                      multiline = {true} 
                      numberOfLines = {4} 
                      onChangeText={onChangeDescription}
                      value={description}
                      placeholder="Enter Description"/>

                    <Text style={styles.textInputTitle}>Minutes to Make</Text>
                    <TextInput 
                      style = {styles.textInputStyle} 
                      placeholderTextColor='grey' 
                      onChangeText={onChangeMintues}
                      value={minutes}
                      placeholder="Enter time in minutes"/>

                    <Text style={styles.textInputTitle}>Tags</Text>
                    <Text style={styles.subTitle}>Seperated with commas</Text>
                    <TextInput 
                      style = {styles.textInputStyleTags} 
                      placeholderTextColor='grey' 
                      multiline = {true} 
                      numberOfLines = {4}
                      onChangeText={onChangeTags}
                      value={tags}
                      placeholder="Enter Tags"/>

                    <Text style={styles.textInputTitle}>Nutrition Information</Text>
                    <Text style={styles.subTitle}>List as: Calories, Total Fat, Sugar, Sodium, Protein, Saturated Fat</Text>
                    <TextInput 
                      style = {styles.textInputStyleNutrition} 
                      placeholderTextColor='grey' 
                      multiline = {true}
                      numberOfLines = {4}
                      onChangeText={onChangeNutrition}
                      value={nutrition}
                      placeholder="Calories, Total Fat, Sugar, Sodium, Protein, Saturated Fat"/>

                    <Text style={styles.textInputTitle}>Recipe Steps</Text>
                    <TextInput 
                      style = {styles.textInputStyleSteps} 
                      placeholderTextColor='grey' 
                      multiline = {true} 
                      numberOfLines = {50}
                      onChangeText={onChangeSteps}
                      value={steps}
                      placeholder="Enter Steps"/>

                    <Text style={styles.textInputTitle}>Ingredients</Text>
                    <TextInput 
                      style = {styles.textInputStyleIngredients} 
                      placeholderTextColor='grey' 
                      multiline = {true} 
                      numberOfLines = {50}
                      onChangeText={onChangeIngredients}
                      value={ingredients} 
                      placeholder="Enter Ingredients"/>

                    <TouchableOpacity style={styles.buttonStyle} onPress={() => doCreate(name, description, minutes, tags, nutrition, steps, ingredients)}>
                        <Text style={styles.buttonText}>Add Recipe</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('Landing')}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>

                  </View>
                </View>
            </SafeAreaView>
          </TouchableWithoutFeedback>
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
  fontSize: 26,
  fontWeight: 'bold',
  marginBottom:10,
},
subTitle: {
  marginBottom:10,
},
textInputStyle: {
  color: 'black',
  fontSize: 15,
  borderWidth: 1,
  height: 50,
  width: '100%',
  marginBottom: 40,
  borderRadius: 10,
  paddingLeft: 10,
},
textInputStyleNutrition: {
  color: 'black',
  fontSize: 15,
  borderWidth: 1,
  height: 75,
  width: '100%',
  marginBottom: 40,
  borderRadius: 10,
  paddingLeft: 10,
},
textInputStyleTags: {
  color: 'black',
  fontSize: 15,
  borderWidth: 1,
  height: 150,
  width: '100%',
  marginBottom: 40,
  borderRadius: 10,
  paddingLeft: 10,
},
textInputStyleSteps: {
  color: 'black',
  fontSize: 15,
  borderWidth: 1,
  height: 300,
  width: '100%',
  marginBottom: 40,
  borderRadius: 10,
  paddingLeft: 10,
},
textInputStyleIngredients: {
  color: 'black',
  fontSize: 15,
  borderWidth: 1,
  height: 300,
  width: '100%',
  marginBottom: 40,
  borderRadius: 10,
  paddingLeft: 10,
},
textInputStyleDescription: {
  color: 'black',
  fontSize: 15,
  borderWidth: 1,
  height: 100,
  width: '100%',
  marginBottom: 40,
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
  fontSize: 25,
  textAlign: 'center',
},
buttonHolder: {
  alignItems: 'center',
  marginTop: 10,
  width : '100%',
},
});
export default CreateRecipe;