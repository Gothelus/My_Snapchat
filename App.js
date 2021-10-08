import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';

import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FlashMessage } from 'react-native-flash-message';
import { HomeScreen } from './components/HomeScreen/homescreen';
import { LoginScreen } from './components/LoginScreen/loginscreen';
import { RegisterScreen } from './components/RegisterScreen/registerscreen';
import Snap from './components/Profil/snap'
import Profil from './components/Profil/camera'
import SnapList from './components/Profil/snaplist';
import SnapSee from './components/Profil/snapsee'
import Setting from './components/Profil/setting'

const Stack = createStackNavigator();

export default function App() {
 
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Connexion" component={LoginScreen} />
        <Stack.Screen name="Inscription" component={RegisterScreen} />
        <Stack.Screen name="Camera" component={Profil} options={{headerShown:false}}/>
        <Stack.Screen name="Snap" component={Snap}/>
        <Stack.Screen name="Setting" component={Setting}/>
        <Stack.Screen name="SnapList" component={SnapList}/>
        <Stack.Screen name="SnapSee" component={SnapSee}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain"
  },
});

/*
fetch("https://snapi-wac.herokuapp.com/");
const [selectedImage, setSelectedImage] = React.useState(null);

let openImagePickerAsync = async () => {
  let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (permissionResult.granted === false) {
    alert("Permission to access camera roll is required!");
    return;
  }

  let pickerResult = await ImagePicker.launchImageLibraryAsync();
  console.log(pickerResult);

  if (pickerResult.cancelled === true) {
    return;
  }

  setSelectedImage({ localUri: pickerResult.uri });
};

if (selectedImage !== null) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: selectedImage.localUri }}
        style={styles.thumbnail}
      />
    </View>
  );
}

return (
  <View style={styles.container}>
    <Text>Hello world</Text>
    <StatusBar style="auto" />

    <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
      <Text style={styles.buttonText}>Pick a photo</Text>
    </TouchableOpacity>
  </View>
);
*/