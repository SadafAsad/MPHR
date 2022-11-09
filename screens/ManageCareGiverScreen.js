import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, FlatList, Pressable, View, Image, TextInput,Alert} from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { Searchbar } from 'react-native-paper';
import { db } from '../FirebaseApp';
import { collection, query, where, getDoc, doc, getDocs } from "firebase/firestore";
import { useIsFocused } from '@react-navigation/native';

const ManageCareGiverScreen = ({navigation, route}) => {
    const [search, setSearch] = useState('');
    const [caregivers, setCaregivers] = useState([]);
    const [caregiversName, setCaregiversName] = useState([]);

    const isFocused = useIsFocused();

    const {pet} = route.params;

    useEffect(()=>{
        getCaregivers();
    }, [isFocused])

    useEffect(()=>{
        getCaregiversName();
    }, [caregivers])

    const getCaregivers = async () => {
        try {
            const docRef = query(collection(db, "caregiving"), where("pet", "==", pet));
            const querySnapshot = await getDocs(docRef);
            const documents = querySnapshot.docs;
            setCaregivers(documents);
        } catch (err) {
            console.log("Getting Pet's Caregivers: " + err.message);        
        }
    }

    const getCaregiversName = async () => {
        var index = 0;
        var names = [];
        while (index<caregivers.length) {
            try {
                const docRef = query(collection(db, "profiles"), where("userId", "==", caregivers[index].data().user));
                const querySnapshot = await getDocs(docRef);
                const documents = querySnapshot.docs;
                names.push({key:index, value:documents[0].data().first_name+" "+documents[0].data().last_name});
            } catch(err) {
                console.log("Getting Caregivers' Names: " + err.message);
            }
            index = index+1;
        }
        setCaregiversName(names);
    }

    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
          const newData = masterDataSource.filter(function (item) {
            const itemData = item.first_name
              ? item.first_name.toUpperCase()
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

    const ItemDivider = () => {
        return (
            <View style={{height: 1, width: "100%", backgroundColor: "#cccccc"}}/>
        )
    }

    const renderItem = ({item}) => (
        <View style={styles.eachRow}>
            <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                <FontAwesome name="user-circle" size={50} color="black"/>
                <View>
                    <Text style={{marginLeft:20, fontSize:18}}>{item.value}</Text>
                    <Text style={{marginLeft:20, color:'dimgray', fontSize:14}}>Caregiver Email</Text>
                </View>
            </View>
            <Pressable onPress={ () => {
                // Remove Caregiver
            }}>
                <MaterialIcons name="link-off" size={28} color='#335C67' style={{alignSelf:'center'}}/>
            </Pressable>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View  style={{marginTop:10, marginBottom:10}}> 
            <Searchbar placeholder="Search" onChangeText={(text) => searchFilterFunction(text)} value={search} style={styles.searchBar} />
                <Pressable onPress={ () => {
                    // navigation.navigate("AddCaregiverScreen");
                }}>
                    <Text style={styles.pressableStyle}>ADD CAREGIVER</Text>
                </Pressable>

            </View>
            <FlatList
                data={caregiversName}
                keyExtractor={item => item.key}
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

export default ManageCareGiverScreen;