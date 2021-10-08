import React from 'react';
import { StyleSheet, Text, View, Button, Modal, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

class SnapSee extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            image : [],
            route : props.route.params.snap_id,
            duration : props.route.params.duration
         }
    }

    async ImageSee(){
        const delay = ms => new Promise(res => setTimeout(res, ms));
        var token = await AsyncStorage.getItem('token');
        axios.get("https://snapi-wac.herokuapp.com/snap/"+this.state.route,{
            headers:{
                "token":token
            }
        })
        .then(response=>{
            console.log(response.data);
            console.log(response.status);
            this.setState({image: response.data.data})

            let SuppSnap =()=>(
                axios.post("https://snapi-wac.herokuapp.com/seen",{
                    "id":this.state.route
                },{ headers:{
                        "Content-Type" : "application/json",
                        "token": token}})
                .then(response=>{
                    console.log(response.data);
                    console.log(response.status);
                    console.log("Snap Supprimé")
                })
                .catch(error=>{
                    console.log('Error : ', error);
                    console.log("Error :", error.response.data);
                })
            )
            const WaitFinishSnap=async()=>{
                await delay(this.state.duration*1000)
                SuppSnap();
                this.props.navigation.navigate("SnapList");
            }
            return WaitFinishSnap();
        })
        .catch(error=>{
            console.log('Error : ', error);
            console.log("Error :", error.response.data);
            console.log(error.response.status);

            let SuppSnap =()=>(
                axios.post("https://snapi-wac.herokuapp.com/seen",{
                    "id":this.state.route
                },{ headers:{
                        "Content-Type" : "application/json",
                        "token": token}})
                .then(response=>{
                    console.log(response.data);
                    console.log(response.status);
                    console.log("Snap Supprimé")
                })
                .catch(error=>{
                    console.log('Error : ', error);
                    console.log("Error :", error.response.data);
                })
            )
            const WaitFinishSnap=async()=>{
                await delay(this.state.duration*1000)
                SuppSnap();
                this.props.navigation.navigate("SnapList");
            }
            return WaitFinishSnap();
        })
    }
    componentDidMount() {
        this.ImageSee();
    }

    render (){
        return(
            <View>
            <Text>Snap reçu</Text>
            {
           this.state.image.map((item, index) => (
               <Image source={item.form}/>
           ))
            }
        </View>
        )
      }
}

export default SnapSee