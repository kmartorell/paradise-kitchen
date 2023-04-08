import React from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import { useState } from 'react';
import axios from 'axios';

const Landing = ({navigation, route}) =>
{
    console.log(route.params.id);
 
    return(
        <SafeAreaView>
          
          <Text
            style={styles.header}
          >
            Welcome {route.params.firstName}</Text>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
  input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
  },
  header: {
      fontSize: 40,
      textAlign: 'center',
  },
  message: {
      fontSize: 20,
      color: 'green',
      textAlign: 'center',
  }
});
export default Landing;