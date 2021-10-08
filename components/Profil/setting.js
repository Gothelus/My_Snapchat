import React from 'react';
import { StyleSheet, Text, View, Button, Modal, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

class Setting extends React.Component{
    
    constructor(props) {
        super(props)
    }

    logout(){
        AsyncStorage.removeItem("token");
        this.props.navigation.navigate("Home")
    }

    render(){
        return(
            <View style={styles.container}>
                <LinearGradient colors={['#96E4DF', '#4DCFFF']} start={{x: 0, y: 0.5}} end={{x: 1, y: 1}} style={styles.button}>
                    <TouchableOpacity
                    onPress={()=>this.logout()}
                    >
                    <Text style={ styles.titre }>Déconnexion</Text>
                    </TouchableOpacity>
                </LinearGradient>
                <LinearGradient colors={['#96E4DF', '#4DCFFF']} start={{x: 0, y: 0.5}} end={{x: 1, y: 1}} style={styles.button}>
                    <TouchableOpacity
                    onPress={()=>this.props.navigation.navigate("SnapList")}
                    >
                        <Text style={ styles.titre }>Voir les Snaps reçus</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        )
    }
}

export default Setting

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
  