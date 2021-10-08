import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Button, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FlashMessage from 'react-native-flash-message';
import { showMessage, hideMessage } from 'react-native-flash-message';
import Axios from 'axios';
const getEmoji = require('get-random-emoji');
import AsyncStorage from '@react-native-async-storage/async-storage';


export function LoginScreen({ navigation }) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    return (
        <SafeAreaView style={styles.container}>
            <FlashMessage position='top'></FlashMessage>
            <TextInput style={styles.input} onChangeText={setEmail} value={email}></TextInput>
            <TextInput style={styles.input} onChangeText={setPassword} value={password}></TextInput>
            <LinearGradient colors={['#96E4DF', '#4DCFFF']} start={{x: 0, y: 0.5}} end={{x: 1, y: 1}} style={styles.button}>
                <TouchableOpacity onPress={() => { connectWithAxios(email, password, {navigation}); }}>
                    <Text style={styles.textLogin}>CONFIRMER</Text>
                </TouchableOpacity>
            </LinearGradient>
        </SafeAreaView>
    );
}

function connectWithAxios(email, password, {navigation}) {
    console.log("Email rentré lors du login: " + email);
    console.log("Password rentré lors du login: " + password);
    
    const delay = ms => new Promise(res => setTimeout(res, ms));

    Axios.post('https://snapi-wac.herokuapp.com/connection', {
        "email": email,
        "password": password,
    })
    .then(response => {
        console.log("Email:" + response.data.data.email);
        console.log("Token:" + response.data.data.token);
        let message = () => showMessage({
            message: "Connection : SUCCESS ! " + getEmoji(),
            description: "Redirecting...",
            type: "default",
            backgroundColor: "#4DCCC6", // background color
            color: "white", // text color
        });

        const waitBeforeRedirecting = async () => {
            message();
            await AsyncStorage.setItem("token",response.data.data.token);   
            await delay(3000);
            navigation.navigate("Camera");
        }

        return waitBeforeRedirecting();
    })
    .catch(err => {
        console.log(err.response.data.data);
        if (err.response.data.data) {
            let message = () => showMessage({
                message: err.response.data.data,
                type: "default",
                backgroundColor: "#4DCCC6", // background color
                color: "white", // text color
            });
            return message();
        }
    });
}

const styles = StyleSheet.create({
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

    textLogin: {
        fontSize: 23,
        color: "white",
        letterSpacing: 1,
    },
});