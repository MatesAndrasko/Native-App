const { TouchableOpacity, SafeAreaView } = require("react-native");
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Linking, Image } from 'react-native';

const HomeScreen =({navigation})=>{
    return(
        <SafeAreaView style={styles.container}>
            <Image style={{width:420, height:500, padding:20}} source={require('../assets/logo.png')} ></Image>
            <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("Scanner")}><Text style={styles.textbutton}>SCAN NOW</Text></TouchableOpacity>
        </SafeAreaView>
    );
}
export default HomeScreen;
const styles = StyleSheet.create({
    container: {
        
        display:'flex',
      flex: 1,
      backgroundColor: '#fff',
      justifyContent:'center',
      alignItems:'center'

    },
    tab:{
        display:'flex',
        flex: 1,
        alignItems:'center',
        borderWidth: 3,
        borderColor: "#A9D6E5",
        margin: 27,
        padding: 17,
        paddingBottom: 25,
        borderRadius: 25,
        borderBottomLeftRadius:0,
        borderTopRightRadius:0,
        flexGrow: 1


    },
    button:{
        backgroundColor: "#468FAF",
        color: "white",
        borderRadius: 5,
        borderWidth: 3,
        borderColor: "#468FAF",
        fontStyle:'normal',
        paddingLeft:30,
        paddingRight:30,
        padding:10
    },
    textbutton:{
        color: "white"
    }
  });