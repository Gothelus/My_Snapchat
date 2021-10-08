import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export function HomeScreen({ navigation }) {
    return (
      <View style={styles.container}>
        <LinearGradient colors={['#96E4DF', '#4DCCC6']} start={{x: 0, y: 0.9}} end={{x: 1, y: 1}} style={styles.button}>
          <TouchableOpacity onPress={() => navigation.navigate('Connexion')}>
            <Text style={styles.textLogin}>CONNECTE  TOI</Text>
          </TouchableOpacity>
        </LinearGradient>

        <LinearGradient colors={['#96E4DF', '#4DCFFF']} start={{x: 0, y: 0.9}} end={{x: 2, y: 2}} style={styles.button}>
          <TouchableOpacity onPress={() => navigation.navigate('Inscription')}>
            <Text style={styles.textRegister}>... OU INSCRIS TOI</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  button: {
    alignItems: 'center',
    paddingTop: 13,
    paddingBottom: 14,
    paddingRight: 25,
    paddingLeft: 25,
    marginBottom: 20,
    borderRadius: 25,
  },

  textLogin: {
    fontSize: 23,
    color: "white",
    letterSpacing: 1,
  },

  textRegister: {
    fontSize: 14,
    color: "white",
    letterSpacing: 1,
  }
});