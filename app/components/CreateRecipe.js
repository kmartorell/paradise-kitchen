import React, { useState, useEffect, setState } from 'react';
import { StyleSheet, SafeAreaView, TextInput, Text, View, Button, Alert, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import Images from './Images';
import axios from 'axios';

const CreateRecipe = ({navigation, route}) =>
{

  const [numTagInputs,setTagInputs] = React.useState(0);
  const [numNutritionInputs,setNutritionInputs] = React.useState(0);
  const [numStepInputs,setStepInputs] = React.useState(0);
  const [numIngredientInputs,setIngredientInputs] = React.useState(0);

  const decrementTagInputs = () => {
     if(numTagInputs > 0)
     {
      setTagInputs(val=>val-1);
     }
  };

  const decrementNutritionInputs = () => {
    if(numNutritionInputs > 0)
    {
     setNutritionInputs(val=>val-1);
    }
 };

  const decrementStepInputs = () => {
    if(numStepInputs > 0)
    {
    setStepInputs(val=>val-1);
    }
  };

  const decrementIngredientInputs = () => {
    if(numIngredientInputs > 0)
    {
    setIngredientInputs(val=>val-1);
    }
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

                  {[...Array(numTagInputs).keys()].map(key=>
                  {
                    return <TextInput  key={key} placeholderTextColor='grey' placeholder="Enter a tag" style={styles.textInputStyle}/>
                  })}

                  <View style={styles.buttonRow}>
                      <TouchableOpacity style={styles.buttonRowStyle} onPress={()=>setTagInputs(val=>val+1)}>
                          <Text style={styles.buttonRowText}>Add Tag</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.buttonRowStyle} onPress={()=>decrementTagInputs()}>
                          <Text style={styles.buttonRowText}>Remove Tag</Text>
                      </TouchableOpacity>
                  </View>

                  <Text style={styles.textInputTitle}>Nutrition Information</Text>
                  <TextInput style = {styles.textInputStyle} placeholderTextColor='grey' placeholder="Enter nutrition info"/>

                  {[...Array(numNutritionInputs).keys()].map(key=>
                  {
                    return <TextInput  key={key} placeholderTextColor='grey' placeholder="Enter nutrition info" style={styles.textInputStyle}/>
                  })}

                  <View style={styles.buttonRow}>
                      <TouchableOpacity style={styles.buttonRowStyle} onPress={()=>setNutritionInputs(val=>val+1)}>
                          <Text style={styles.buttonRowText}>Add Info</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.buttonRowStyle} onPress={()=>decrementNutritionInputs()}>
                          <Text style={styles.buttonRowText}>Remove Info</Text>
                      </TouchableOpacity>
                  </View>

                  <Text style={styles.textInputTitle}>Recipe Steps</Text>
                  <TextInput style = {styles.textInputStyle} placeholderTextColor='grey' placeholder="Enter new step"/>

                  {[...Array(numStepInputs).keys()].map(key=>
                  {
                    return <TextInput  key={key} placeholderTextColor='grey' placeholder="Enter new step" style={styles.textInputStyle}/>
                  })}

                  <View style={styles.buttonRow}>
                      <TouchableOpacity style={styles.buttonRowStyle} onPress={()=>setStepInputs(val=>val+1)}>
                          <Text style={styles.buttonRowText}>Add Step</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.buttonRowStyle} onPress={()=>decrementStepInputs()}>
                          <Text style={styles.buttonRowText}>Remove Step</Text>
                      </TouchableOpacity>
                  </View>


                  <Text style={styles.textInputTitle}>Ingredients</Text>
                  <TextInput style = {styles.textInputStyle} placeholderTextColor='grey' placeholder="Enter new ingredient"/>

                  {[...Array(numIngredientInputs).keys()].map(key=>
                  {
                    return <TextInput  key={key} placeholderTextColor='grey' placeholder="Enter new ingredient" style={styles.textInputStyle}/>
                  })}

                  <View style={styles.buttonRow}>
                      <TouchableOpacity style={styles.buttonRowStyle} onPress={()=>setIngredientInputs(val=>val+1)}>
                          <Text style={styles.buttonRowText}>Add Item</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.buttonRowStyle} onPress={()=>decrementIngredientInputs()}>
                          <Text style={styles.buttonRowText}>Remove Item</Text>
                      </TouchableOpacity>
                  </View>

                  <Text style={styles.textInputTitle}>Recipe Description</Text>
                  <TextInput style = {styles.textBottomInputStyle} placeholderTextColor='grey' placeholder="Write a recipe description"/>

                  <TouchableOpacity style={styles.buttonStyle}>
                      <Text style={styles.buttonText}>Add Recipe</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('Landing', {firstName: route.params.firstName})}>
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
buttonRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
},
buttonRowStyle:{
  backgroundColor:'orange',
  width: "50%",
  padding: 8,
  marginTop: 0,
  marginBottom: 30,
  borderRadius: 20,
},
buttonRowText: {
  color: 'white',
  fontSize: 18,
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