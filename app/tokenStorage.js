import AsyncStorage from '@react-native-async-storage/async-storage';


  export const storeToken = async (tok) => {
    try {
        await AsyncStorage.setItem('token_data', tok.accessToken)
    } catch (e) {
      // saving error
    }
  }

  export const retrieveToken = async () => {
    try {
      var ud = await AsyncStorage.getItem('token_data')
      console.log("ud: ", ud);
      if(value !== null) {
        // value previously stored
      }
    } catch(e) {
      // error reading value
    }
    return ud;
  }
  
