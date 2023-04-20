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
import EditRecipe from './components/EditRecipe'
import ProfilePage from './components/ProfilePage'
import ViewYourRecipes from './components/ViewYourRecipes'
import YourFavorites from './components/YourFavorites'
import ViewYourFavorites from './components/ViewYourFavorites'

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="Login" component={Login} options={{gestureEnabled: false}}/>
        <Stack.Screen name="Register" component={Register} options={{gestureEnabled: false}} />
        <Stack.Screen name="Forgot Password" component={ForgotPassword} options={{gestureEnabled: false}}/>
        <Stack.Screen name="Landing" component={Landing} options={{gestureEnabled: false}}/>
        <Stack.Screen name="SearchRecipes" component={SearchRecipes} options={{gestureEnabled: false}}/>
        <Stack.Screen name="ViewRecipe" component={ViewRecipe} options={{gestureEnabled: false}}/>
        <Stack.Screen name="YourRecipes" component={YourRecipes} options={{gestureEnabled: false}}/>
        <Stack.Screen name="ViewYourRecipes" component={ViewYourRecipes} options={{gestureEnabled: false}}/>
        <Stack.Screen name="YourFavorites" component={YourFavorites} options={{gestureEnabled: false}}/>
        <Stack.Screen name="ViewYourFavorites" component={ViewYourFavorites} options={{gestureEnabled: false}}/>
        <Stack.Screen name="CreateRecipe" component={CreateRecipe} options={{gestureEnabled: false}}/>
        <Stack.Screen name="EditRecipe" component={EditRecipe} options={{gestureEnabled: false}}/>
        <Stack.Screen name="ProfilePage" component={ProfilePage} options={{gestureEnabled: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

