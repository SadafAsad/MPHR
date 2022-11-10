import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, FlatList, Pressable, View, Image, TextInput, Alert} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { db } from "../FirebaseApp"
import { collection, doc, getDocs } from "firebase/firestore";



const ShowHistoryScreen = ({navigation, route}) => {
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);

    useEffect(() => {
        getMedRecList()
            
    }, []);

    const getMedRecList = async () => {
        try {
            let querySnapshot = await getDocs(collection(db, "med_records_list"));

            let documents = querySnapshot.docs

            // FOR TESTING PURPOSES
            // for (let i = 0; i < documents.length; i++) {
            //     const currDocument = documents[i]
            //     console.log(`ID: ${currDocument.id}`)
            //     console.log(currDocument.data())
            //     console.log("------")
            // }

            setFilteredDataSource(documents);
            setMasterDataSource(documents);

        } catch (err) {
            console.log(`${documents.id}`)    
            console.log(`${err.message}`)        
        }
    }
    
    const medRecords = [
        {id: 1, name: "Merck Animal Health", address: "16750 route Transcanadienne\nKirkland, Quebec H9H 4M7"},
        {id: 2, name: "Parliament Animal Hospital", address: "584 Parliament St.\nToronto, Ontario M4X 1P8"}
    ];

    const medRecSelected = (medRecords) => {   //medRecordSelected
        const medData = {
            id: medRecords.id,
            name: medRecords.data().name,
            upload_date: medRecords.data().upload_date,
            location: medRecords.data().location
        }
        route.params.onSelect({selectedMedRecords: medData});
        navigation.goBack();
    }

    const downloadRecordPressed = async () => {
        console.log("Download pressed...")
        
    }

    const renderItem = ( {item} ) => (
        <Pressable onPress={ () => {
            //maybe add navigation for details (not yet confirmed)
            
            medRecSelected(item);
        }
        }>
            <View style={styles.vet}>
                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                    <Image source={require('../assets/pdf2.png')} style={styles.img}/>
                    <View>
                        <View style={{flexDirection:'column', marginLeft:20, alignItems:'baseline'}}>
                            <Text style={{fontSize:18, fontWeight:'bold', marginBottom: 5}}>{item.data().name}</Text>
                            <Text style={{fontSize:12}}><Text style={{fontSize:12,fontWeight:'bold', color:'#335C67'}}>At: </Text> {item.data().location}</Text>
                            <Text style={{fontSize:12}}><Text style={{fontSize:12,fontWeight:'bold', color:'#335C67'}}>uploaded at: </Text>{item.data().upload_date}</Text>
                            
                        </View> 
                    </View>
                    
                </View>

                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'flex-end', marginRight: 10}}>
                    <Pressable onPress={ () => {
                        navigation.navigate("ShareMedicalRecordScreen", {pet:item.key});
                    }}>
                        <Image source={require('../assets/share.png')} style={styles.icon}/>

                    </Pressable>
                    <Pressable onPress={ () => {
                        console.log("download pressed")  
                        Alert.alert(`DOWNLOAD RECORD`, 'Please confirm record download.', [  
                            {text: 'Cancel', onPress: () => console.log('NO Pressed'), style:'cancel'},  
                            {text: 'Confirm', onPress: () => downloadRecordPressed()}
                        ]);
                    }}>
                        <Image source={require('../assets/download.png')} style={styles.icon}/>

                    </Pressable>
                    <Pressable onPress={ () => {
                        navigation.navigate("DeleteMedicalRecordsScreen", {pet:item.key});
                    }}>
                        <Image source={require('../assets/delete.png')} style={styles.icon}/>

                    </Pressable>
                    
                    {/* <Image source={require('../assets/download.png')} style={styles.icon}/>
                    <Image source={require('../assets/delete.png')} style={styles.icon}/> */}
                    </View>
                
            </View>
        </Pressable>
    );

    const ItemDivider = () => {
        return (
            <View style={{height: 1, width: "100%", backgroundColor: "#cccccc"}}/>
        )
    }

    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
          const newData = masterDataSource.filter(function (item) {
            const itemData = item.data().name
              ? item.data().name.toUpperCase()
              : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
          });
          setFilteredDataSource(newData);
          setSearch(text);
        } else {
          setFilteredDataSource(masterDataSource);
          setSearch(text);
        }
      };

    return (
        <SafeAreaView style={styles.container}>
            
            <View style={styles.vet}>
            <FlatList
                data={filteredDataSource}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                ItemSeparatorComponent={ItemDivider}
            />
            </View>
            
        </SafeAreaView>
    );
}
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    vet: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        marginBottom: 15,
        alignItems: 'center'
    },
    img: {
        marginLeft: 22,
        width: 50,
        height: 50,
        borderRadius: '10%',
        borderWidth: 1,
        borderColor: '#335C67',
    },
    icon: {
        alignItems: 'flex-end',
        marginLeft: 10,
        width: 30,
        height: 30,
        // borderRadius: '10%',
        // borderWidth: 1,
        // borderColor: '#335C67',
    },
    textInputStyle: {
      height: 40,
      width: '90%',
      alignSelf: 'center',
      borderWidth: 1,
      paddingLeft: 20,
      margin: 5,
      borderColor: '#009688',
      backgroundColor: '#FFFFFF',
    },
    addVetText: {
        alignSelf: 'center',
        color:'#335C67',
        fontWeight: 'bold',
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
        textDecorationColor: "#335C67",
        marginTop: 5
    },
    addVetView: {
        padding: 10
    }
});

export default ShowHistoryScreen;
