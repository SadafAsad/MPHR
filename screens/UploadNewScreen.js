import { SafeAreaView, StyleSheet, Text, Pressable, Alert, TextInput, View, ActivityIndicator } from 'react-native';
import { useState } from "react";
import { db, storage } from '../FirebaseApp';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from "firebase/firestore";
import * as DocumentPicker from 'expo-document-picker';

const UploadNewScreen = ({navigation, route}) => {
    const [fileName, setFileName] = useState("Upload Medical Record");
    const [blobFile, setBlobFile] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [reason, setReason] = useState("");

    const {petId, petName} = route.params;

    const _pickDocument = async () => {
        const file = await DocumentPicker.getDocumentAsync({
            // type: "*/*",
            // copyToCacheDirectory: true,
        });

        if (file.type==='cancel') {
            setFileName("Upload Medical Record");
        }
        else {
            const fetched_file = await fetch(file.uri);
            const blob_file = await fetched_file.blob();
            setFileName(file.name);
            setBlobFile(blob_file);
        };
	}

    const addDocumentPressed = async () => {
        const storageRef = ref(storage, `/medical-records/${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, blobFile);

        uploadTask.on(
            "state_changed",
            () => {
                setLoading(true);
            },
            (err) => console.log("ERROR: while uploading file -> " + err),
            async () => {
                setLoading(false);

                // download url
                await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log(url);
                    addToHistory(url);
                });
            }
        );
    }

    const addToHistory = async (url) => {
        const today = new Date();
        try {
            const history = {
                pet:petId,
                record:url,
                reason:reason,
                date:today.getFullYear()+"-"+today.getMonth()+"-"+today.getDate(),
                clinic:"TBA"
            };
            const insertedHistory = await addDoc(collection(db, "history"), history);
            navigation.pop();
        }
        catch (err) {
            console.log(`${err.message}`);
        }
    }
    
    return (
        <SafeAreaView style={{backgroundColor:'#fff', flex:1, justifyContent:'center'}}>

            { isLoading && (
                <View style={{marginLeft:22, marginRight:22, alignSelf:'center', alignItems:'center', marginBottom:22, fontWeight:'bold'}}>
                    <ActivityIndicator animating={true} size="small" color="#335C67"/>
                    <Text style={{color:'dimgray'}}>Uploading in progress</Text>
                </View>
            )}

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
                onChangeText={setReason}
                value={reason} 
            />

            <View style={{flexDirection:'row', alignItems:'center', alignSelf:'stretch', marginLeft:22, marginTop:22, marginRight:22}}>
                <Pressable onPress={_pickDocument}>
                    <Text style={styles.choosePressable}>CHOOSE FILE</Text>
                </Pressable>
                <Text style={{fontSize:13, color:'dimgray', flexShrink:1}}>{fileName}</Text>
            </View>
            
            <Pressable onPress={ () => {
                Alert.alert('ADD MEDICAL RECORD', 'Please confirm adding medical record.', [  
                    {text: 'Cancel', onPress: () => console.log('NO Pressed'), style:'cancel'},  
                    {text: 'Confirm', onPress: () => addDocumentPressed()}
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