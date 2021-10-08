import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

class SnapList extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
           snaps : []
        }
    }

    alertItemDuration = (item) => {
        alert('Snap displayed for ' + item.duration + ' seconds');
        console.log(item.snap_id)
        console.log(item.duration)
        this.props.navigation.navigate("SnapSee",{snap_id : item.snap_id , duration : item.duration});
    }

    async ReceiveSnap(){
        var token = await AsyncStorage.getItem('token');        
        axios.get("https://snapi-wac.herokuapp.com/snaps",{
            headers:{
                "token":token,
            }
        })
        .then(response=>{
            console.log(response.data.data)
            this.setState({snaps: response.data.data})
        })
        .catch(error=>{
            console.log('Error : ', error);
            console.log("Error :", error.response.data);
            console.log(error.response.status);
        })
    }

    componentDidMount() {
        this.ReceiveSnap();
    }

  render (){
    return(
        <View style={style.container}>
        <Text style={style.text}>Snaps reçus</Text>
        {
            
           this.state.snaps.map((item, index) => (
            <LinearGradient colors={['#96E4DF', '#4DCFFF']} start={{x: 0, y: 0.5}} end={{x: 1, y: 1}} style={style.button}>
               <TouchableOpacity
                    key={ item.from }
                    onPress={ () => this.alertItemDuration(item) }
                >
                    <Text style={ style.titre }>{ item.from }</Text>
                </TouchableOpacity>
            </LinearGradient>
           ))
        }
    </View>
    )
  }
  }
  const style = StyleSheet.create({
    text:{
        fontSize: 30,
    },  
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
  
export default SnapList
