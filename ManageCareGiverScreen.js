import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, FlatList, Pressable, View, Image, TextInput,Alert} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Searchbar } from 'react-native-paper';
import { db } from "./FirebaseApp"
import { collection, doc, getDocs } from "firebase/firestore";
import { useIsFocused } from '@react-navigation/native';


const ManageCareGiverScreen = ({navigation}) => {
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const isFocused = useIsFocused();

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

    const renderItem = ( {item} ) => (
        <Pressable onPress={ () => {
            navigation.navigate("PetProfileScreen", {pet:item.id});
        }
        }>
            <View style={styles.pet}>
                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                    <View style={styles.imgView}>
                        <Image source={require('./assets/paw.png')} style={styles.img}/>
                    </View>
                    <View>
                        <View style={{flexDirection:'row', alignItems:'baseline'}}>
                            <Text style={{marginLeft:20, fontSize:18}}>{item.data().name}</Text>
                            <Text style={{fontSize:14, color:'gray'}}> {getAge(item.data().birthday)}</Text>
                        </View>
                        <Text style={{marginLeft:20, color:'dimgray'}}>Owner:</Text>
                    </View>
                </View>
                <AntDesign name="right" size={20} color='#335C67' style={{marginRight:22}}/>
            </View>
        </Pressable>
    );

    return (
        <SafeAreaView style={{backgroundColor:'#fff', justifyContent:'space-between'}}>
           <View  style={{marginTop:10, marginBottom:10}}> 
            <Searchbar placeholder="Search" onChangeText={(text) => searchFilterFunction(text)} value={search} style={styles.searchBar} />
                
            </View>

            <FlatList
                data={filteredDataSource}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                ItemSeparatorComponent={ItemDivider}
                />

            <Pressable onPress={ () => {
                    // navigation.navigate("CheckMailScreen");
                        //navigation.dispatch(StackActions.replace('CheckMailScreen'))
                        Alert.alert('Adding CAREGIVER', 'Confirm',
                        [  
                            {  
                                text: 'Cancel',  
                                onPress: () => console.log('Cancel Pressed'),  
                                style: 'cancel',  
                            },  
                            {text: 'OK', onPress: () => navigation.navigate("AddCaregiverScreen")},  
                        ]  
                        );
                    }}>
                <Text style={styles.pressableStyle}>ADD CAREGIVER</Text>
            </Pressable>
        </SafeAreaView>
    );
}
  
const styles = StyleSheet.create({
    input: {
        height: 40,
      width: '90%',
      alignSelf: 'center',
      borderWidth: 1,
      paddingLeft: 20,
      margin: 5,
      borderColor: '#009688',
      backgroundColor: '#FFFFFF',
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