import React, { useState, useEffect, setState } from 'react';
import { StyleSheet, SafeAreaView, TextInput, Text, View, Button, Alert, Image, ImageBackground, TouchableOpacity, ScrollView, Keyboard, TouchableWithoutFeedback} from 'react-native';
import Images from './Images';
import axios from 'axios';

const EditRecipe = ({navigation, route}) =>
{
    const [name, onChangeName] = React.useState('');
    const [description, onChangeDescription] = React.useState('');
    const [minutes, onChangeMintues] = React.useState('');
    const [tags, onChangeTags] = React.useState('');
    const [nutrition, onChangeNutrition] = React.useState('');
    const [steps, onChangeSteps] = React.useState('');
    const [ingredients, onChangeIngredients] = React.useState('');
    const [data, setData] = React.useState('');
    const [user, setUser] = React.useState('');
    const [favorited, setFavorited] = React.useState('');
    const [created, setCreated] = React.useState('');
    const [recipe, setRecipe] = React.useState('');

    

    const doEdit = async (name, description, minutes, tags, nutrition, steps, ingredients) =>
    {
      let n_steps;
      let n_ingredients;
      let createdBy;
      let submitted;
      console.log(user);
      name = name.trim();
      tags = tags.replaceAll("\n", "").split(",");
      steps = steps.replaceAll("\n", "").split(",");
      n_steps = steps.length;
      nutrition = nutrition.replaceAll("\n", "").split(",");
      for(let i=0;i<nutrition.length;i++)
        nutrition[i] = parseInt(nutrition[i])
      ingredients = ingredients.replaceAll("\n", "").split(",");
      n_ingredients = ingredients.length;
      createdby = user.id;
      submitted = new Date();
      let recipe = JSON.stringify({
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
            });

            console.log(recipe);
      fetch('https://paradise-kitchen.herokuapp.com/api/updaterecipe', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              id: route.params.recipe.id,
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
      const startEdit = navigation.addListener('focus',() =>
      {
        let tempRecipe = route.params.recipe;
        console.log(tempRecipe);
        tempRecipe.tags = tempRecipe.tags.join(",\n");
        tempRecipe.minutes = tempRecipe.minutes.toString();
        tempRecipe.steps = tempRecipe.steps.join(",\n");
        for(let i=0;i<tempRecipe.nutrition.length;i++)
          tempRecipe.nutrition[i] = tempRecipe.nutrition[i].toString();
        tempRecipe.nutrition = tempRecipe.nutrition.join(",");
        tempRecipe.ingredients = tempRecipe.ingredients.join(",\n");


        if(!route.params.recipe){
            navigation.navigate('Landing', {errormessage:"ERROR: Recipe does not exist anymore"})
        }else{
            setRecipe(route.params.recipe);
            if(route.params.user.favorites.includes(route.params.recipe.id))
              setFavorited(true);
            if(route.params.recipe.createdby.includes(route.params.user.id))
              setCreated(true);
        }

        // Grab user info
        fetch('https://paradise-kitchen.herokuapp.com/api/getUser', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              userId: route.params.user.id,
          })
        })    
        .then(response => response.json())
        .then(json => {
            setUser(json);
        })
        .catch(error => {
          console.error(error);
        });
      });

      return startEdit;
    }, [navigation]);

    useEffect(() => {
      if(data){
          if(data.error == 'update success'){
              navigation.navigate('Landing', {id:user.id, firstName:user.firstName, lastName:user.lastName, email:user.email, login:user.login, favorites:user.favorites, successmessage:"Edit Recipe Successful!", errormessage:""});
          }
          else{
            navigation.navigate('Landing', {id:user.id, firstName:user.firstName, lastName:user.lastName, email:user.email, login:user.login, favorites:user.favorites, successmessage:"", errormessage:"Error Editing Recipe, Please try again."});

          }
      }
    }, [data]);

    useEffect(() => {
      onChangeName(recipe.name);
      onChangeDescription(recipe.description);
      onChangeTags(recipe.tags);
      onChangeMintues(recipe.minutes);
      onChangeNutrition(recipe.nutrition);
      onChangeSteps(recipe.steps);
      onChangeIngredients(recipe.ingredients);
    }, [recipe]);



    return(
      <ImageBackground source={Images.background} resizeMode="cover" style={styles.image}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} contentInsetAdjustmentBehavior="automatic">
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={styles.container}>
                <Image source={Images.logo} style={styles.logo} />
                <View style={styles.mainLanding}>
                  <View style={styles.buttonHolder}>
                    <Text style={styles.header}>Edit Recipe!</Text>

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
                      keyboardType="numeric"
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

                    <TouchableOpacity style={styles.buttonStyle} onPress={() => doEdit(name, description, minutes, tags, nutrition, steps, ingredients)}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('Landing', {firstName: route.params.firstName})}>
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
export default EditRecipe;