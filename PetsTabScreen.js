import { StyleSheet, Text, SafeAreaView, Pressable, FlatList, View, Image, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Searchbar } from 'react-native-paper';
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged,signOut } from "firebase/auth"
import { auth, db, firebaseApp } from './FirebaseApp';
import { collection, query, where, getDocs, Firestore } from "firebase/firestore";

const PetsTabScreen = ({navigation}) => {
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState('')
    let petId = String;

    // useEffect(() => {
    //     getPetList()
    //     // setFilteredDataSource(pets);
    //     // setMasterDataSource(pets);
    // }, []);

    const pets = [
        {id: 1, name: "Bacon", birthday: "2022-03-12"},
        {id: 2, name: "Leila", birthday: "2022-09-01"},
        {id: 3, name: "Honey", birthday: "2022-03-31"}
    ];

    useEffect(()=>{
        const listener = onAuthStateChanged(auth, (userFromFirebaseAuth) => {
        
        if (userFromFirebaseAuth) {
            console.log("userFromFirebaseAuth.uid is:" + userFromFirebaseAuth.email) 
            
            setLoggedInUser(userFromFirebaseAuth.email) 
            
        }
        else {
            setLoggedInUser(null)
            console.log("No user signed in")
        }
        })
        getPetList();
        return listener
    }, [])

    

    const getPetList = async () => {
        try{
            
            console.log("loggedInUser is : " + loggedInUser);

            
            if(loggedInUser == "george@gmail.com"){
                petId = "ARDH73UDUolpCYOrlpHt";
            }
            else if(loggedInUser == "sadaf@gmail.com"){
                petId = "YF4WbLiLreezP72q6xHv";
            }

           
            let querySnapshot = await getDocs(collection(db, "profiles", petId, "pet_list"));
            // console.log(db);
            console.log("loggedInUser is : " + loggedInUser)
            let documents = querySnapshot.docs
            console.log(documents.length);
            for(let i = 0; i < documents.length; i++){
                const currDocument = documents[i] 
                console.log(`ID: ${currDocument.id}`)
                console.log(currDocument.data())
                console.log("------")
            }
            setFilteredDataSource(documents);
            setMasterDataSource(documents);
            

        } catch(err){
            console.log(`${err.message}`);
        }
    }

    const onChangeSearch = query => setSearchQuery(query);

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


    function getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        var month = 0;
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
            month = birthDate.getMonth();
        }
        else {
            month = m
        }
        if (age===0) {
            return `${month}mon`;
        }
        else {
            return `${age}yr${month}mon`;
        }
    }

    const renderItem = ( {item} ) => (
        <Pressable onPress={ () => {
            navigation.navigate("PetProfileScreen", {pet: item});
        }
        }>
            <View style={styles.pet}>
                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                    <Image source={require('./assets/pet-icon-2.png')} style={styles.img}/>
                    <View>
                        <View style={{flexDirection:'row', alignItems:'baseline'}}>
                            <Text style={{marginLeft:20, fontSize:18}}>{item.data().name}</Text>
                            <Text style={{fontSize:14}}> - age: {getAge(item.data().birthday)}</Text>
                        </View>
                        <Text style={{marginLeft:20}}>Caretakers:</Text>
                    </View>
                </View>
                <AntDesign name="right" size={20} color='#335C67' style={{marginRight:22}}/>
            </View>
        </Pressable>
    );

    const ItemDivider = () => {
        return (
            <View style={{height: 1, width: "100%", backgroundColor: "#cccccc"}}/>
        )
    }

   
    
   

    return (
        <SafeAreaView style={styles.container}>
            <View  style={{marginTop:10, marginBottom:50}}> 
            <Searchbar placeholder="Search" onChangeText={(text) => searchFilterFunction(text)} value={search} style={styles.searchBar} />
                <Pressable onPress={ () => {
                    // navigation.navigate("CheckMailScreen");
                        //navigation.dispatch(StackActions.replace('CheckMailScreen'))
                        Alert.alert('Adding new pet', 'Confirm',
                        [  
                            {  
                                text: 'Cancel',  
                                onPress: () => console.log('Cancel Pressed'),  
                                style: 'cancel',  
                            },  
                            {text: 'OK', onPress: () => navigation.navigate("CreatePetProfile")},  
                        ]  
                        );
                    }}>
                        <Text style={styles.deletePressable}>Add New Pet</Text>
                </Pressable>

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
    pet: {
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
    deletePressable: {
        alignSelf: 'center',
        textAlign: 'center',
        backgroundColor: '#335C67',
        color: '#ffffff',
        marginLeft: 22,
        marginRight: 22,
        marginTop: 22,
        fontSize: 18,
        padding: 15,
        width: '90%',
    },
    searchBar: {
        width: '90%',
        alignSelf: 'center'
    }
});

export default PetsTabScreen;
