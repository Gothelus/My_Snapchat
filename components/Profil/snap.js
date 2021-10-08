import React from 'react';
import { StyleSheet, Text, SafeAreaView, Button, Modal, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import FlashMessage from 'react-native-flash-message';
import { showMessage, hideMessage } from 'react-native-flash-message';
const getEmoji = require('get-random-emoji');

export default function Snap(props){
  
    const uri = props.route.params.image
    const [users,setUsers] = React.useState([]);
    const [sendTo, setSendTo] = React.useState('none');
    const [duration,setDuration] = React.useState('');
    const [tokenUser,setTokenUser] = React.useState('');

    var data = new FormData()
    let photo = { url: uri}
    data.append("duration",duration);
    data.append("to",sendTo);
    data.append("uri",{uri:photo.url,name:"snap",type:"image/png"});

    const sendSnapHandler = ()=>{
        axios.post("https://snapi-wac.herokuapp.com/snap",data,{
            headers: {
                "Content-Type" : "multipart/form-data",
                "token" : tokenUser,
            }
        })
        .then(response =>{
            console.log("Response :"+response.data);
            console.log("Status :"+response.status);
            console.log("Snap Envoyé");
            alert("Snap envoyé à "+sendTo+" "+getEmoji())
       
        })
        .catch(error =>{
            console.log("Data dans erorr :",data);
            console.log("Error :", error.response.data);
            console.log(error.response.status);
            alert("Il y a eu une erreur lors de l'envoi veuillez réessayer")
        });
      }
    React.useEffect(()=>{getUsers();},[]);

    const getUsers = async()=>{
      const token = await AsyncStorage.getItem("token");
      setTokenUser(token);
      axios.get("https://snapi-wac.herokuapp.com/all",{
        headers:{
          "token":token,
        }
      })
      .then(response =>{
        setUsers(response.data.data);
      })
      .catch(error =>{
        console.log("Error to get users :", error)
      })
    }

  return (
    <SafeAreaView style={style.container}>
      <FlashMessage position='top'></FlashMessage>
        <Text style={style.text}>Contact</Text>
          <Picker
            style={style.select}
            selectedValue={sendTo}
            onValueChange={itemValue => setSendTo(itemValue)}>
              <Picker.Item label="Sélectione un ami" value="none"/>
              {
                users.map((item,index)=>{
                  return <Picker.Item key={index} label={item.email} value={item.email}/>})
              }
          </Picker>
        <Text style={style.text}>Durée</Text>
          <Picker
            style={style.select}
            selectedValue={duration}
            onValueChange={itemValue=>setDuration(itemValue)}>
              <Picker.Item label="Sélectione une durée" value="none"/>
              <Picker.Item label="5" value="5"/>
              <Picker.Item label="10" value="10"/>
              <Picker.Item label="15" value="15"/>
          </Picker>
          <LinearGradient colors={['#96E4DF', '#4DCFFF']} start={{x: 0, y: 0.5}} end={{x: 1, y: 1}} style={style.button}>
            <TouchableOpacity
              onPress={()=>sendSnapHandler()}>
              <Text style={style.titre}>Envoyer le snap</Text>
            </TouchableOpacity>
          </LinearGradient>
    </SafeAreaView>
    )
  }
  const style = StyleSheet.create({
    text:{
        fontSize: 30,
    },
    select:{
      marginTop:50,
      marginBottom:50,
      width: 300
    },
    titre: {
        fontSize: 23,
        color: "white",
        letterSpacing: 1,
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