import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, FlatList, Pressable, View, Image, TextInput,} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { db } from "../FirebaseApp"
import { collection, doc, getDocs } from "firebase/firestore";

const VetsScreen = ({navigation, route}) => {
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);

    useEffect(() => {
        getVetList()
            // setFilteredDataSource(vets);
            // setMasterDataSource(vets);
    }, []);

    const getVetList = async () => {
        try {
            let querySnapshot = await getDocs(collection(db, "vet_list"));

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
    
    const vets = [
        {id: 1, name: "Merck Animal Health", address: "16750 route Transcanadienne\nKirkland, Quebec H9H 4M7"},
        {id: 2, name: "Parliament Animal Hospital", address: "584 Parliament St.\nToronto, Ontario M4X 1P8"}
    ];

    const vetSelected = (vet) => {
        const vetData = {
            id: vet.id,
            name: vet.data().name,
            street: vet.data().street_address,
            city: vet.data().city_address
        }
        route.params.onSelect({selectedVet: vetData});
        navigation.goBack();
    }

    const renderItem = ( {item} ) => (
        <Pressable onPress={ () => {
            //maybe add navigation for details (not yet confirmed)
            vetSelected(item);
        }
        }>
            <View style={styles.vet}>
                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                    <Image source={require('../assets/physical-examination-1.png')} style={styles.img}/>
                    <View>
                        <View style={{flexDirection:'column', marginLeft:20, alignItems:'baseline'}}>
                            <Text style={{fontSize:18, fontWeight:'bold'}}>{item.data().name}</Text>
                            <Text style={{fontSize:14}}>{item.data().street_address}</Text>
                            <Text style={{fontSize:14}}>{item.data().city_address}</Text>
                            <Text style={{fontSize:14}}>+1 {item.data().phone_number}</Text>
                        </View> 
                    </View>
                </View>
                {/* arrow right icon */}
                <AntDesign name="right" size={20} color='#335C67' style={{marginRight:22}}/>
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
              console.log("itemData is : " + itemData);  
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
            {/* <Text>Vets Tab Screen!</Text>    */}
            <TextInput
                style={styles.textInputStyle}
                onChangeText={(text) => searchFilterFunction(text)}
                value={search}
                underlineColorAndroid="transparent"
                placeholder="Search Here"
            />
            {/* Vet Lists */}
            <View style={styles.addVetView}>
                <Text  onPress={() => navigation.navigate("AddVetClinicsScreen")} style={styles.addVetText}>Didn't find your clinic?</Text> 
               
            </View>
            
            <FlatList
                data={filteredDataSource}
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
    vet: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        marginBottom: 15,
        alignItems: 'center'
    },
    img: {
        marginLeft: 22,
        width: 60,
        height: 60,
        borderRadius: '100%',
        borderWidth: 1,
        borderColor: 'black',
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

export default VetsScreen;
