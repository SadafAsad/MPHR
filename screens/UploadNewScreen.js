import { SafeAreaView, StyleSheet, Text, Pressable, Alert, TextInput } from 'react-native';
import { useState, useEffect } from "react";
import { auth, db } from '../FirebaseApp';
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs, deleteDoc, doc, getDoc } from "firebase/firestore";
import * as DocumentPicker from 'expo-document-picker';

const UploadNewScreen = ({navigation, route}) => {
    const [petName, setPetName] = useState('');
    const [petOwner, setPetOwner] = useState('');
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    // Not tested yet //
    const [hasError, onHasErrorChanged] = useState(false);
    const [error, onErrorChanged] = useState('');

    const _pickDocument = async () => {
        console.log("Entered")
        const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
        });
        alert(result.uri);
        console.log(result);
	}
    
    return (
        <SafeAreaView style={{backgroundColor:'#fff', flex:1, justifyContent:'center'}}>

            <Text style={{textAlign:'center',marginTop:10, marginLeft:36, marginRight:35, fontSize:25, alignSelf: 'center', fontWeight: 'bold'}}>Upload new Medical Record </Text>

            
                <Text style={{textAlign:'center',marginTop:10, marginLeft:50, marginRight:50, fontSize:13, alignSelf: 'center', color:'dimgray'}}>You can add new Medical Report for your pet from here.
                </Text>

                <Pressable onPress={ 
                //     () => {
                // Alert.alert('Browse Local Files', 'Please confirm.', [  
                //     {text: 'Cancel', onPress: () => console.log('NO Pressed'), style:'cancel'},  
                //     {text: 'Confirm', onPress: () => navigation.goBack()}
                // ]);}
                _pickDocument
                }>
                    <Text style={styles.choosePressable}>Choose File </Text>
                </Pressable>
            

                <Text style={{marginBottom:5, marginLeft:22, marginTop: 20}}>Note</Text>
                <TextInput 
                    style={styles.txtInput}
                    placeholder=""
                    keyboardType=""
                    autoCapitalize="none"
                    multiline={true}
                    numberOfLines={10}
                  
                />
            
            <Pressable onPress={ () => {
                Alert.alert('UPLOAD NEW RECORD', 'Please confirm to upload.', [  
                    {text: 'Cancel', onPress: () => console.log('NO Pressed'), style:'cancel'},  
                    {text: 'Confirm', onPress: () => navigation.goBack()}
                ]);
            }}>
                <Text style={styles.deletePressable}>UPLOAD </Text>
            </Pressable>

            <Pressable onPress={() => {navigation.goBack()}}>
                <Text style={styles.cancelPressable}>CANCEL</Text>
            </Pressable>
           
        </SafeAreaView>
    );
}
  
const styles = StyleSheet.create({
    deletePressable: {
        alignSelf: 'center',
        textAlign: 'center',
        backgroundColor: '#335C67',
        color: '#ffffff',
        marginLeft: 22,
        marginRight: 22,
        marginTop: 22,
        fontSize: 15,
        padding: 15,
        width: '90%',
        fontWeight: 'bold'
    },
    choosePressable: {
        alignSelf: 'center',
        textAlign: 'center',
        backgroundColor: '#335C67',
        color: '#ffffff',
        marginLeft: 22,
        marginRight: 22,
        marginTop: 22,
        fontSize: 13,
        padding: 15,
        width: '25%',
        fontWeight: 'bold',
        borderRadius: 10,
    },
    cancelPressable: {
        alignSelf: 'center',
        textAlign: 'center',
        backgroundColor: '#ffffff',
        color: '#335C67',
        borderColor: '#335C67',
        borderStyle: 'solid',
        borderWidth: 1,
        marginLeft: 22,
        marginRight: 22,
        marginTop: 15,
        marginBottom: 0,
        fontSize: 15,
        padding: 15,
        width: '90%',
        fontWeight: 'bold'
    },
    mainView: {
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center'
    },
    errorStyle: {
        color: '#ff0000',
        alignSelf: 'center',
        marginTop: 22
    },
    txtInput: {
        alignSelf: 'center',
        height: 150,
        width: '90%',
        borderWidth: 1,
        padding: 10,
        borderColor: '#808080',
        textAlignVertical: 'top'
    },
});

export default UploadNewScreen;