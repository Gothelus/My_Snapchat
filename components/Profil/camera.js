import React from 'react';
import { StyleSheet, Text, View, Button, Modal, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';

export default function Profil(props){
  
  const takePhoto = async()=>{
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync()

    if (permissionResult.granted === null) {
      return <View />;
    }
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return
    }
      const {cancelled, uri} = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
      });
      if(!cancelled){
        props.navigation.navigate("Snap",{image : uri});
      }  
  }

  const takeImage = async()=>{
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (permissionResult.granted === null) {
      return <View />;
    }
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return
    }
      const {cancelled, uri} = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
      });
      if(!cancelled){
        props.navigation.navigate("Snap",{image : uri});
      }  
  }

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#96E4DF', '#4DCFFF']} start={{x: 0, y: 0.5}} end={{x: 1, y: 1}} style={styles.button}>
        <TouchableOpacity
          onPress={()=> props.navigation.navigate("Setting")}>
            <Text style={styles.titre}>Paramètres</Text>
          </TouchableOpacity>
      </LinearGradient>
      <LinearGradient colors={['#96E4DF', '#4DCFFF']} start={{x: 0, y: 0.5}} end={{x: 1, y: 1}} style={styles.button}>
        <TouchableOpacity 
                onPress={ () => takePhoto() }>
        <Text style={ styles.titre }>Prendre une photo</Text>
        </TouchableOpacity>
      </LinearGradient>
      <LinearGradient colors={['#96E4DF', '#4DCFFF']} start={{x: 0, y: 0.5}} end={{x: 1, y: 1}} style={styles.button}>
        <TouchableOpacity
          onPress={()=>takeImage()}>
         <Text style={ styles.titre }>Ouvrir la galerie</Text> 
        </TouchableOpacity>
        </LinearGradient>
    </View>
    )
  }
  const styles = StyleSheet.create({
    titre: {
      fontSize: 23,
      color: "white",
      letterSpacing: 1,
    },
    input: {
      height: 30,
      margin: 15,
      borderBottomWidth: 1,
      width: 200,
      textAlign: "right",
    },

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    button: {
        alignItems: 'center',
        paddingTop: 13,
        paddingBottom: 14,
        paddingRight: 25,
        paddingLeft: 25,
        marginTop: 40,
        marginBottom: 20,
        borderRadius: 25,
    },
    });
  