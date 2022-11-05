import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, FlatList, Pressable, View, Image, TextInput,Alert} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { db } from "./FirebaseApp"
import { collection, doc, getDocs } from "firebase/firestore";


const AddVetClinicsScreen = ({navigation}) => {
    

    return (
        <SafeAreaView style={{backgroundColor:'#fff', justifyContent:'space-between'}}>
           <Text style={{marginBottom:5, marginLeft:22, marginTop:30}}>Veterinary Clinic Name</Text>
            <TextInput 
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                // onChangeText={onPetnameChanged}
                // value={pet_name}
            />

            <Pressable onPress={ () => {
                    // navigation.navigate("CheckMailScreen");
                        //navigation.dispatch(StackActions.replace('CheckMailScreen'))
                        Alert.alert('Adding VET CLINIC', 'Confirm',
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
                <Text style={styles.pressableStyle}>ADD VET CLINIC</Text>
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
});

export default AddVetClinicsScreen;