import { SafeAreaView, StyleSheet, Text, Pressable, Alert, TextInput, View } from 'react-native';
import { useState, useEffect } from "react";
import { auth, db, storage, uploadBytesResumable, getDownloadURL } from '../FirebaseApp';
import { ref } from 'firebase/storage';
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs, deleteDoc, doc, getDoc } from "firebase/firestore";
import * as DocumentPicker from 'expo-document-picker';

const UploadNewScreen = ({navigation, route}) => {
    const [file, setFile] = useState("");
    const [percent, setPercent] = useState(0);
    const [fileName, setFileName] = useState("");

    const {petID, petName} = route.params;

    const _pickDocument = async () => {
        const file = await DocumentPicker.getDocumentAsync({
            type: "*/*",
            copyToCacheDirectory: true,
        });
        if (file==undefined) { 
            setFile("");
            setFileName("");
         }
        else {
            setFile(file);
            setFileName(file.name);
        };

        if (file!="") {
            const storageRef = ref(storage, `/files/medical-records/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const percent = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
            
                    // update progress
                    setPercent(percent);
                },
                (err) => console.log("ERROR: while uploading file -> " + err),
                () => {
                    // download url
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        console.log(url);
                    });
                }
            );
        }

        alert(result.uri);
        console.log(result);
	}
    
    return (
        <SafeAreaView style={{backgroundColor:'#fff', flex:1, justifyContent:'center'}}>

            <Text>{percent}% DONE</Text>
            <Text style={{textAlign:'center',marginTop:10, marginLeft:25, marginRight:25, fontSize:25, alignSelf: 'center', fontWeight: 'bold'}}>Upload new Medical Record </Text>
            <Text style={{textAlign:'left',marginTop:10, marginLeft:50, marginRight:50, fontSize:13, alignSelf: 'center', color:'dimgray'}}>Upload new medical report for {}
                <Text style={{textDecorationLine:'underline', fontWeight:'bold'}}>{petName}</Text> 
                {} here.
            </Text>

            <Text style={{marginBottom:5, marginLeft:22, marginTop: 20}}>Reason for visit *</Text>
            <TextInput 
                style={styles.txtInput}
                placeholder=""
                keyboardType=""
                autoCapitalize="none"
                multiline={true}
                numberOfLines={10}  
            />

            <View style={{flexDirection:'row', alignItems:'center', alignSelf:'stretch', marginLeft:22, marginTop:22, marginRight:22}}>
                <Pressable onPress={_pickDocument}>
                    <Text style={styles.choosePressable}>CHOOSE FILE</Text>
                </Pressable>

                {fileName=="" && (
                    <Text style={{fontSize:13, color:'dimgray', flexShrink:1}}>Upload Medical Record</Text>
                )}
                {fileName!="" && (
                    <Text style={{fontSize:13, color:'dimgray', flexShrink:1}}>{fileName}</Text>
                )}

            </View>
            
            <Pressable onPress={ () => {
                Alert.alert('UPLOAD NEW RECORD', 'Please confirm to upload.', [  
                    {text: 'Cancel', onPress: () => console.log('NO Pressed'), style:'cancel'},  
                    {text: 'Confirm', onPress: () => navigation.goBack()}
                ]);
            }}>
                <Text style={styles.deletePressable}>ADD MEDICAL RECORD</Text>
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
        textAlign: 'center',
        backgroundColor: '#fff',
        color: '#335C67',
        marginRight: 10,
        fontSize: 13,
        padding: 10,
        borderRadius: 20,
        borderStyle: 'solid',
        borderWidth: 3,
        borderColor:'#335C67',
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
        height: 50,
        width: '90%',
        borderWidth: 1,
        padding: 10,
        borderColor: '#808080',
        textAlignVertical: 'top'
    },
});

export default UploadNewScreen;