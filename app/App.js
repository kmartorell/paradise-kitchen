import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './components/Login';
import Register from './components/Register'
import Landing from './components/Landing'
import ForgotPassword from './components/ForgotPassword'
import SearchRecipes from './components/SearchRecipes'
import YourRecipes from './components/YourRecipes'
import ViewRecipe from './components/ViewRecipe'
import CreateRecipe from './components/CreateRecipe'
import ProfilePage from './components/ProfilePage'
import ViewYourRecipes from './components/ViewYourRecipes'
import YourFavorites from './components/YourFavorites'

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Forgot Password" component={ForgotPassword} />
        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="SearchRecipes" component={SearchRecipes} />
        <Stack.Screen name="ViewRecipe" component={ViewRecipe} />
        <Stack.Screen name="YourRecipes" component={YourRecipes} />
        <Stack.Screen name="ViewYourRecipes" component={ViewYourRecipes} />
        <Stack.Screen name="YourFavorites" component={YourFavorites} />
        <Stack.Screen name="CreateRecipe" component={CreateRecipe} />
        <Stack.Screen name="ProfilePage" component={ProfilePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

