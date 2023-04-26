import React, { useState, useEffect, setState } from 'react';
import { StyleSheet, SafeAreaView, TextInput, Text, View, Button, Alert, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import Images from './Images';
import { decodeToken, isExpired, refresh } from "react-jwt";
import axios from 'axios';

const ViewYourRecipes = ({navigation, route}) =>
{
    const [recipe, setRecipe] = React.useState('');
    const [created, setCreated] = React.useState('');
    const [favorited, setFavorited] = React.useState('');
    const [data, setData] = React.useState('');
    const [deleteData, setDeleteData] = React.useState('');

    var storage = require('../tokenStorage.js');

    const favoriteRecipe = async (recipeId) =>
    {
      (async () => {
        // Grab user info
        const token_data = await storage.retrieveToken();
        if(!token_data){
          doLogout();
        }else{

            var user = decodeToken(await storage.retrieveToken());
            fetch('https://paradise-kitchen.herokuapp.com/api/addfavorite', {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  userId: user.userId,
                  recipeId: recipeId,
                  jwtToken: token_data
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

    const unFavoriteRecipe = async (recipeId) =>
    {
      (async () => {
        // Grab user info
        const token_data = await storage.retrieveToken();
        if(!token_data){
          doLogout();
        }else{
          var user = decodeToken(await storage.retrieveToken());
          fetch('https://paradise-kitchen.herokuapp.com/api/removefavorite', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: user.userId,
                recipeId: recipeId,
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

    const deleteRecipe = async (recipeId) =>
    {
      (async () => {
        // Grab user info
        const token_data = await storage.retrieveToken();
        if(!token_data){
            doLogout();
        }else{
          Alert.alert('Confirm Delete', 'Are you sure you want to delete this record?', [
            {text: 'OK', onPress: () =>
                fetch('https://paradise-kitchen.herokuapp.com/api/deleteRecipe', {
                  method: 'POST',
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                      id: recipeId,
                      jwtToken: token_data,
                  })
                })    
                .then(response => response.json())
                .then(json => {
                    setDeleteData(json);
                })
                .catch(error => {
                  console.error(error);
                })
            },
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
          ]);
            }
      })();
    };

    useEffect(() => {
        const setRecipeConst = navigation.addListener('focus',() =>
        {
          (async () => {
            var user = decodeToken(await storage.retrieveToken());
            if(!route.params.recipe){
                navigation.navigate('Landing', {message:"ERROR: Recipe does not exist anymore"})
            }else{
                setRecipe(route.params.recipe);
                if(user.favorites.includes(route.params.recipe.id))
                  setFavorited(true);
                if(route.params.recipe.createdby.includes(user.userId))
                  setCreated(true);
            }
          })();
        });
        return setRecipeConst;
      }, [navigation]);

      useEffect(() => {
        storage.storeToken(data.jwtToken);
        if(data.error == "add favorite success")
          setFavorited(true);
        else if(data.error == "remove favorite success")
          setFavorited(false);
      }, [data]);

      const doLogout = () => {
        AsyncStorage.removeItem("user_data");
        AsyncStorage.removeItem("token_data");
        navigation.navigate('Login');
      };

      useEffect(() => {
        if(deleteData.error == "delete success"){
            storage.storeToken(deleteData.jwtToken);
            navigation.navigate('Landing', {successmessage:"Delete successful"});
        }
      }, [deleteData]);
    return(
      <ImageBackground source={Images.background} resizeMode="cover" style={styles.image}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} contentInsetAdjustmentBehavior="automatic">
          <SafeAreaView style={styles.container}>
              <Image source={Images.logo} style={styles.logo} />
              <View style={styles.mainLanding}>
                <View style={styles.buttonHolder}>
                  <View style={styles.formButtons}>
                    <View style={styles.backDiv}>
                      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('YourRecipes')}>
                            <Text style={styles.backButtonText}>Back</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.favorite}>
                      {favorited &&
                      <TouchableOpacity onPress={() => unFavoriteRecipe(recipe.id)}>
                          <Image source={Images.filledStar} style={styles.icon} />
                      </TouchableOpacity>
                      }
                      {!favorited &&
                      <TouchableOpacity onPress={() => favoriteRecipe(recipe.id)}>
                          <Image source={Images.unfilledStar} style={styles.icon} />
                      </TouchableOpacity>
                      }
                    </View>
                  </View>
                  {created &&
                  <View style={styles.controls}>
                    <TouchableOpacity style={styles.controlButton} onPress={() => navigation.navigate('EditRecipe',{recipe:recipe})}>
                      <Image source={Images.edit} style={styles.editIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.controlButton} onPress={() => deleteRecipe(recipe.id)}>
                      <Image source={Images.delete} style={styles.deleteIcon} />
                    </TouchableOpacity>
                  </View>
                  }
                  <Text style={styles.header}>{recipe.name}</Text>
                  <View style={styles.tagsMain}>
                    <Text style={styles.subHeader}>Tags:</Text>
                    {recipe &&
                      <Text style={styles.tags}>{recipe.tags.join(' | ')}</Text>
                    }
                  </View>

                  <View style={styles.descriptionMain}>
                    <Text style={styles.subHeader}>Description:</Text>
                    <Text style={styles.description}>{recipe.description}</Text>
                  </View>

                  <View style={styles.metaInfo}>
                    <View style={styles.meta}>
                      <Text style={styles.subHeader}>Total Minutes:</Text>
                      <Text style={styles.data}>{recipe.minutes}</Text>
                    </View>
                    <View style={styles.meta}>
                      <Text style={styles.subHeader}>Number Ingredients:</Text>
                      <Text style={styles.data}>{recipe.n_ingredients}</Text>
                    </View>
                    <View style={styles.meta}>
                      <Text style={styles.subHeader}>Number Steps:</Text>
                      <Text style={styles.data}>{recipe.n_steps}</Text>
                    </View>
                  </View>

                  <View style={styles.ingredientsMain}>
                    <Text style={styles.subHeader}>Ingredients List:</Text>
                    {recipe &&
                      <Text style={styles.ingredients}>{recipe.ingredients.map(i => '- ' + i).join('\n')}</Text>

                    }
                  </View>
                  <View style={styles.stepsMain}>
                    <View style={styles.stepsHeader}>
                      <Text style={styles.subHeader}>Steps List:</Text>
                    </View>
                    {recipe &&
                      <Text style={styles.steps}>{recipe.steps.map(i => '- ' + i).join('\n\n')}</Text>

                    }
                  </View>

                  <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('Landing')}>
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
  formButtons:{
    flex:1,
    marginTop:10,
    flexDirection:'row',
    shadowColor:'black',
    shadowRadius:10,
    width:'100%',
  },
  controls: {
    marginLeft:'auto'
  },
  backBox:{
    backgroundColor:'orange',
    width:'40%',
    borderRadius:20,
    zIndex:99,
  },
  backDiv:{
    width:'90%',
    marginRight:-16,
    zIndex:99,
    marginBottom:20,
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
    width:'90%',
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
    fontSize: 25,
    textAlign: 'center',
  },
  buttonHolder: {
    alignItems: 'center',
    marginTop: 10,
    width : '100%',
  },
  subHeader: {
    fontSize:20,
    fontWeight:'bold',
    textAlign:'center'
  },
  tagsMain: {
    alignItems:'center',
    padding:10
  },
  tags: {
    textAlign:'center',
    color:'blue',
    fontWeight:'bold',
    padding:10,
    fontSize:16,
  },
  descriptionMain: {
    alignItems:'center',
    paddingBottom:10,
    width:'100%',
  },
  description: {
    textAlign:'center',
    fontSize:16,
    paddingTop:12,
    paddingBottom:12,
  },
  metaInfo: {
    width:'100%',
    paddingBottom:12,
  },
  meta: {
    flexDirection:'row',
  },
  data: {
    paddingLeft:12,
    color:'red',
    fontSize:20,
    fontWeight:'bold'
  },
  ingredients: {
    paddingTop:6,
    fontSize:16,
  },
  steps: {
    paddingTop:6,
    fontSize:16,
    paddingBottom:10
  },
  ingredientsMain: {
    paddingBottom:12,
    width:'100%',
    paddingTop:12,
  },
  stepsMain: {
    width:'100%'
  },
  stepsHeader: {
    paddingTop:10,
    paddingBottom:10
  },
  icon: {
    width:40,
    height:40,
  },
  backButton:{
    backgroundColor:'orange',
    width:"80%",
    marginBottom:12,
    borderRadius:20,
    alignItems: 'center',
},
backButtonText: {
  color: 'white',
  fontSize: 25,
},
deleteIcon: {
  height:35,
  width:30,
  marginTop:10
},
editIcon:{
  height:35,
  width:35,
},
controlButton:{
  marginLeft:10,
  marginBottom:10,
  marginRight:8,
  marginTop:-8
}
});
export default ViewYourRecipes;