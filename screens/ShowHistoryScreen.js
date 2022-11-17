import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, FlatList, Pressable, View } from 'react-native';
import { MaterialIcons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { Searchbar } from 'react-native-paper';
import { db } from '../FirebaseApp';
import { collection, query, where, getDoc, doc, getDocs } from "firebase/firestore";
import { useIsFocused } from '@react-navigation/native';

const ShowHistoryScreen = ({navigation, route}) => {
    const [records, setRecords] = useState([]);

    const isFocused = useIsFocused();

    const {petId, petName} = route.params;

    useEffect(()=>{
        navigation.setOptions({title:petName+' Medical Records'})
        getRecords();
    }, [isFocused])

    const getRecords = async () => {
        try {
            const docRef = query(collection(db, "history"), where("pet", "==", petId));
            const querySnapshot = await getDocs(docRef);
            const documents = querySnapshot.docs;
            setRecords(documents);
        } catch (err) {
            console.log("Getting Pet's Records: " + err.message);        
        }
    }

    const ItemDivider = () => {
        return (
            <View style={{height: 1, width: "100%", backgroundColor: "#cccccc"}}/>
        )
    }

    const renderItem = ({item}) => (
        <View style={styles.eachRow}>
            <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                <MaterialCommunityIcons name="file-pdf-box" size={45} color="#335C67" />
                <View>
                    <Text style={{marginLeft:20, fontSize:15, fontWeight:'bold'}}>{item.data().reason}</Text>
                    <Text style={{marginLeft:20, color:'dimgray', fontSize:14}}>At: {item.data().clinic}</Text>
                    <Text style={{marginLeft:20, color:'dimgray', fontSize:14}}>Uploaded at: {item.data().date}</Text>
                </View>
            </View>
            <Pressable onPress={ () => {}}>
                <MaterialIcons name="link-off" size={28} color='#335C67' style={{alignSelf:'center'}}/>
            </Pressable>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={records}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                ItemSeparatorComponent={ItemDivider}
            />
        </SafeAreaView>
    );
}
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    eachRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        marginBottom: 15,
        marginRight: 22,
        marginLeft: 22,
        alignItems: 'center'
    },
    pressableStyle: {
        alignSelf: 'center',
        textAlign: 'center',
        backgroundColor: '#335C67',
        color: '#fff',
        // backgroundColor: '#ffffff',
        // color: '#335C67',
        // borderColor: '#335C67',
        // borderStyle: 'solid',
        // borderWidth: 1,
        marginLeft: 22,
        marginRight: 22,
        marginTop: 22,
        fontSize: 15,
        padding: 15,
        width: '90%',
        fontWeight: 'bold'
    },
    searchBar: {
        width: '90%',
        alignSelf: 'center',
        elevation: 1
    }
});

export default ShowHistoryScreen;
