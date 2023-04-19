import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Linking,View, FlatList, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RecentScreen = ({navigation}) => {
  const [history, setHistory] = useState([]);
    function handleOnClick(data){
        try{
            Linking.openURL(data);
        }
        catch(error){
            console.log(error);
        }
    }
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await AsyncStorage.getItem('QR_HISTORY');
        if (data) {
          setHistory(JSON.parse(data));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchHistory();
  }, []);

  return (

    <View style={styles.container}>

        <View style={styles.navbar}>

            <TouchableOpacity style={styles.next} onPress={() => navigation.navigate('Scanner')}><Image style={{width:75, height: 75, margin: 10 }} source={require('../assets/return_icon.jpg')}></Image></TouchableOpacity>
            <Text style={styles.textstyle}>Recent Scanned QRs</Text>
        </View>

      <FlatList
        style={styles.list}
        data={history}
        renderItem={({ item }) => <TouchableOpacity style={styles.tab} onPress={() => handleOnClick(item)}><Text>{item}</Text></TouchableOpacity>}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

export default RecentScreen;

const styles = StyleSheet.create({
  container: {
    display:"flex",
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tab:{
    color: "white",
    borderRadius: 5,
    borderWidth: 3,
    borderColor: "#468FAF",
    backgroundColor:"468FAF",
    fontStyle:'normal',
    paddingLeft:30,
    paddingRight:30,
    padding:10,
    margin: 10
  },
  list:{
    display:'flex',
    flexDirection:'column',
    backgroundColor:"468FAF",

  },
  navbar:{
    backgroundColor:"#468FAF",
    flexDirection: 'row',
    alignItems:'center',
    marginTop: 40,
    width: "100%",
    zIndex: 100,
    margin:0,

},
next:{
  zIndex: 100
},
textstyle:{
    justifyContent:'center',
    fontWeight: 'bold',
    fontSize: 20
}
});