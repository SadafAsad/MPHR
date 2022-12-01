import { SafeAreaView, StyleSheet, Text, Pressable, Alert, TextInput, StatusBar, View } from 'react-native';
import { useState, useEffect } from "react";
import { auth, db } from '../FirebaseApp';
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs, deleteDoc, doc, getDoc } from "firebase/firestore";
import * as MailComposer from 'expo-mail-composer';
import * as ImagePicker from 'expo-image-picker';

const ShareMedicalRecordScreen = ({navigation, route}) => {
    const [petName, setPetName] = useState('');
    const [petOwner, setPetOwner] = useState('');
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    // Not tested yet //
    const [hasError, onHasErrorChanged] = useState(false);
    const [error, onErrorChanged] = useState('');

    // for send mail with attachment
    const [status, setStatus] = useState(null);
    const [email, setEmail] = useState(null);

    //const {pet} = route.params;

    useEffect(()=>{
        async function getPetData() {
            const docRef = doc(db, "pets", pet);
            const pet_data = await getDoc(docRef);
            setPetName(pet_data.data().name);
            // setPetOwner(pet_data.data().owner);
        }
        getPetData();
    }, [])

    const sendEmail = async(file) => {
        console.log("inside sendMail function")
        var options = {}
        if(file.length < 1){
          options = {
            subject: "Sharing Medical Report with attachment",
            recipients: [email],
            body: "Enter email body here..."
          }
        }else{
          options = {
            subject: "Sharing Medical Report with attachment",
            recipients: [email],
            body: "Enter email body here...",
            attachments: file
          }
        }
        let promise = new Promise((resolve, reject) => {
            console.log("inside promise...")
            console.log("email recieved: " + email)
          MailComposer.composeAsync({subject: 'Sharing Medical Report',
          body: 'Sharing Medical Report',
          recipients: [email],
          isHtml: true})
          .then((result) => {
            console.log("result is : " + result)
            resolve(result)
          })
          .catch((error) => {
            console.log("we got error : " + error)
            reject(error)
          })

        })
    
        promise.then(
            
          result => setStatus("Status: email " + result.status),
          error => setStatus("Status: email " + error.status)
        )
      }
    
    return (
        <SafeAreaView style={{backgroundColor:'#fff', flex:1, justifyContent:'center'}}>

            <Text style={{textAlign:'center',marginTop:10, marginLeft:36, marginRight:35, fontSize:25, alignSelf: 'center', fontWeight: 'bold'}}>Who do you want to share Medical History with?</Text>

            
                <Text style={{textAlign:'center',marginTop:10, marginLeft:50, marginRight:50, fontSize:13, alignSelf: 'center', color:'dimgray'}}>Please enter the destination email and we will send the most up-to-date medical history as an attachment.
                </Text>

                <Text style={{marginBottom:5, marginLeft:22, marginTop:30}}>Email</Text>
            <TextInput 
                style={styles.input}
                placeholder="Enter email address"
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={setEmail}
                value={email}
            />
            
            <Pressable onPress={ () => {
                Alert.alert('SEND NEW RECORD', 'Please confirm to send.', [  
                    {text: 'Cancel', onPress: () => console.log('NO Pressed'), style:'cancel'},  
                    //{text: 'Confirm', onPress: () => navigation.goBack()}
                    {text: 'Confirm', onPress: () => sendEmail([])}
                ]);
            }}>
                <Text style={styles.deletePressable}>SEND MEDICAL RECORD </Text>
            </Pressable>

            <Pressable onPress={() => {navigation.goBack()}}>
                <Text style={styles.cancelPressable}>CANCEL</Text>
            </Pressable>
            
            {status !== null &&
            <View style={{borderWidth: 2, borderColor: 'black', margin:20, padding: 10}}>
                <Text>{status}</Text>
            </View>
            }
            <StatusBar style="auto" />
           
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
    input: {
        alignSelf: 'center',
        height: 45,
        width: '90%',
        borderWidth: 1,
        padding: 10,
        borderColor: '#808080',
        borderRadius: '0%',
    },
});

export default ShareMedicalRecordScreen;