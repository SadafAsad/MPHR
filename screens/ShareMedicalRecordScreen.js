import { SafeAreaView, StyleSheet, Text, Pressable, Alert, TextInput, StatusBar, View } from 'react-native';
import { useState, useEffect } from "react";
import { auth, db } from '../FirebaseApp';
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs, deleteDoc, doc, getDoc, orderBy } from "firebase/firestore";
import * as MailComposer from 'expo-mail-composer';
import * as ImagePicker from 'expo-image-picker';
import * as Print from 'expo-print';
import { useIsFocused } from '@react-navigation/native';


const ShareMedicalRecordScreen = ({navigation, route}) => {
    
    const [petOwner, setPetOwner] = useState('');
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    // Not tested yet //
    const [hasError, onHasErrorChanged] = useState(false);
    const [error, onErrorChanged] = useState('');

    //const [recordPdf, setRecordPdf] = useState('');
   
    // for send mail with attachment
    const [status, setStatus] = useState(null);
    const [email, setEmail] = useState(null);
    const [recordPdf, setRecordPdf] = useState(null);

    //const {pet} = route.params;

    const {pet} = route.params;
    const isFocused = useIsFocused();

    const {petName, petId, setPetName} = route.params;
    var index = 0;
    
    useEffect(()=>{
        async function getPetData() {
            const docRef = doc(db, "pets", pet);
            const pet_data = await getDoc(docRef);
            setPetName(pet_data.data().name);
            console.log("pet name is: " + petId);
            // setPetOwner(pet_data.data().owner);
            getRecords();
        }
        getPetData();
    }, [isFocused, recordPdf])

    const getRecords = async () => {
      console.log("inside get records... ");
      
      try {
        console.log("pet name is: " + petId);
          const docRef = query(collection(db, "history"), where("pet", "==", petId), orderBy("date", "desc"));
          const pet_pdf = await getDocs(docRef);
          const documents = pet_pdf.docs;
          console.log("documents is: " + documents[index].data().record);
          setRecordPdf(documents[index].data().record);
          console.log("Getting Pet's pdf: " + documents[index].data().record);
      } catch (err) {
          console.log("Getting Pet's Records: " + err.message);        
      }
  }

  useEffect(()=>{
    
    getRecords();
    
  }, [isFocused, recordPdf])

  // for attaching file with thw mail. Start ------

    const sendEmail = async() => {
        console.log("inside sendMail function")
        // console.log("file.length is: " + file.length)
        getRecords();

        var options = {}
        // if(file.length <= 0){
          
            console.log("inside sendMail with attachment")
            console.log("pet's pdf is: " + recordPdf);
          options = {
            subject: "Sharing Medical Report with attachment",
            recipients: [email],
            // body: "https://firebasestorage.googleapis.com/v0/b/mphr-fall2022.appspot.com/o/medical-records%2FSugar-%231-MR.pages?alt=media&token=caf569f2-6010-4ce8-93a8-c190baeb14de"
            body: "Hello, <br><br> Please refer to the below link for "+ petName +"'s Medical report.<br> Click on the link for the full view of the report:<br>  " + recordPdf + "<br><br> Thanks",
          }
        // }else{
        //     console.log("inside sendMail with attachment function")
        //   options = {
        //     subject: "Sharing Medical Report with attachment",
        //     recipients: [email],
        //     body: "Please refer to the attached pdf",
        //     attachments: file,
        //   }
        // }
        let promise = new Promise((resolve, reject) => {
          console.log("inside promise...")
          console.log("email recieved: " + email)
          MailComposer.composeAsync({subject: options.subject,
          body: options.body,
          recipients: [email],
          attachments: options.attachments,
          isHtml: true})
          .then((result) => {
            console.log("result is : " + result)
            resolve(result)
          })
          .catch((error) => {
            console.log("we got error : " + error.message)
            reject(error)
          })

        })
    
        promise.then(
            
          result => setStatus("Email is " + result.status + "!!"),
          error => setStatus("Email is " + error.status + "!!")
        )
    }
    // for attaching file with thw mail. End ------

    // ---- for attaching image with thw mail. Start ------

    const sendEmailWithAttachment = async() => {
        //get the email. 
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: false,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.cancelled) {
          console.log(result.uri)
          sendEmail([result.uri]);
        }else{
          sendEmail()
        }
    
      }
    // for attaching image with thw mail. End ------

    return (
        <SafeAreaView style={{backgroundColor:'#fff', flex:1, justifyContent:'center'}}>

            <Text style={{textAlign:'center',marginTop:10, marginLeft:36, marginRight:35, fontSize:25, alignSelf: 'center', fontWeight: 'bold'}}>Who do you want to share <Text style={{ fontWeight:'bold'}}>{petName}</Text>'s Medical History with?</Text>

            
                <Text style={{textAlign:'center',marginTop:10, marginLeft:50, marginRight:50, fontSize:13, alignSelf: 'center', color:'dimgray'}}>Please enter the destination email and we will send the most up-to-date medical history as an attachment.
                </Text>

                <Text style={{marginBottom:5, marginLeft:22, marginTop:30,}}>Email</Text>
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
                    {text: 'Confirm', onPress: () => sendEmail()},
                    //{text: 'Confirm', onPress: () => sendEmailWithAttachment()}
                ]);
            }}>
                <Text style={styles.deletePressable}>SEND MEDICAL RECORD </Text>
            </Pressable>

            <Pressable onPress={() => {navigation.goBack()}}>
                <Text style={styles.cancelPressable}>CANCEL</Text>
            </Pressable>
            
            {status !== null &&
            <View style={styles.statusView}>
                <Text style={styles.statusBar}>{status}</Text>
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
    statusView: {
      
    },
    statusBar: {
      alignSelf: 'center',
      textAlign: 'center',
      backgroundColor: '#335C67',
      color: '#ffffff',
      marginLeft: 22,
      marginRight: 22,
      marginTop: 22,
      fontSize: 15,
      padding: 15,
      borderRadius: 5,
      width: '75%',
      fontWeight: 'bold',
      
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