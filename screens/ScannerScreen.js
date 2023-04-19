import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Linking, TouchableOpacity, Image} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ScannerScreen =({navigation})=>{
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
  
    useEffect(() => {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);
  
    const handleBarCodeScanned = async ({ type, data }) => {
      setScanned(true);
      Linking.openURL(data);
      try {
        const history = JSON.parse(await AsyncStorage.getItem('QR_HISTORY')) || [];
        history.unshift(data);
        if (history.length > 5) {
          history.pop();
        }
        await AsyncStorage.setItem('QR_HISTORY', JSON.stringify(history));
      } catch (error) {
        console.log(error);
      }
    };
  
    if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
  
    return (
      <View style={styles.container}>
          <View style={styles.navbar}>
            <TouchableOpacity style={styles.next} onPress={() => navigation.navigate('Home')}><Image style={{width:60, height: 60, margin: 10 }} source={require('../assets/return_icon.jpg')}></Image></TouchableOpacity>
            <Text style={styles.textstyle}>JUST SCAN</Text>
            <TouchableOpacity style={styles.next} onPress={() => navigation.navigate('Recent')}><Text style={styles.textstyle}>Recent</Text></TouchableOpacity>
        </View>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        {scanned && (
          <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
        )}
      </View>
    );
  }
  export default ScannerScreen;
  
  const styles = StyleSheet.create({
    container: {
      display:'flex',
      flex: 1,
      backgroundColor:"#A9D6E5",
      flexDirection: 'column',
      backgroundColor: "white"
    },
    navbar:{
      backgroundColor:"#468FAF",
      flexDirection: 'row',
      alignItems:'center',
      marginTop: 40,
      width: "100%",
      zIndex: 100,
      margin:0,
      justifyContent:'space-between'

  },
  next:{
    zIndex: 100
  },
  textstyle:{
    fontWeight:'bold',
    margin:10,
    fontSize: 20
  }

  });