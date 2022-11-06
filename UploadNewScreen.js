import { SafeAreaView, StyleSheet, Text, Pressable, Alert } from 'react-native';
import { useState, useEffect } from "react";
import { auth, db } from './FirebaseApp';
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs, deleteDoc, doc, getDoc } from "firebase/firestore";

const UploadNewScreen = ({navigation, route}) => {
    const [petName, setPetName] = useState('');
    const [petOwner, setPetOwner] = useState('');
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    // Not tested yet //
    const [hasError, onHasErrorChanged] = useState(false);
    const [error, onErrorChanged] = useState('');
    //

    const {pet} = route.params;

    useEffect(()=>{
        const listener = onAuthStateChanged(auth, (userFromFirebaseAuth) => {
        if (userFromFirebaseAuth) {
            setLoggedInUser(userFromFirebaseAuth);
        }
        else {
            setLoggedInUser(null);
        }
        })
        return listener
    }, [])

    useEffect(()=>{
        async function getPetData() {
            const docRef = doc(db, "pets", pet);
            const pet_data = await getDoc(docRef);
            setPetName(pet_data.data().name);
            setPetOwner(pet_data.data().owner);
        }
        getPetData();
    }, [])

    useEffect(()=>{
        if (loggedInUser!=null && petOwner!='') {
            if (loggedInUser.uid==petOwner) {setIsOwner(true)}
        }
    }, [loggedInUser, petOwner])

    const deletePetPressed = async () => {
        if (isOwner){
            deleteAllCaregivers();
            await deleteDoc(doc(db, "pets", pet))
            .then(() => navigation.pop(3))
            .catch((err) => {
                console.log(err.message);
                onErrorChanged(err.message);
                onHasErrorChanged(true);
            });
        }
        else {
            const docRef = query(collection(db, "caregiving"), where("user", "==", loggedInUser.uid), where("pet", "==", pet));
            const querySnapshot = await getDocs(docRef);
            const documents = querySnapshot.docs;
            await deleteDoc(doc(db, "caregiving", documents[0].id))
            .then(() => navigation.pop(3))
            .catch((err) => {
                console.log(err.message);
                onErrorChanged(err.message);
                onHasErrorChanged(true);
            });
        }
    }

    const deleteAllCaregivers = async () => {
        try {
            const docRef = query(collection(db, "caregiving"), where("pet", "==", pet));
            const querySnapshot = await getDocs(docRef);
            const documents = querySnapshot.docs;
            for (let i=0; i<documents.length; i++) {
                try {
                    await deleteDoc(doc(db, "caregiving", documents[i].id));
                } catch (err) {
                    console.log(err.message);
                }
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <SafeAreaView style={{backgroundColor:'#fff', flex:1, justifyContent:'center'}}>

            <Text style={{textAlign:'center',marginTop:10, marginLeft:36, marginRight:35, fontSize:20, alignSelf: 'center', fontWeight: 'bold'}}>Upload new Medical Record
                
            </Text>

            
                <Text style={{textAlign:'left',marginTop:10, marginLeft:50, marginRight:50, fontSize:13, alignSelf: 'center', color:'dimgray'}}>Attention: 
                    <Text style={{color:'gray'}}></Text>
                    <Text style={{color:'gray'}}>{"\n"}{"\n"}All of your pet's caregivers will lose access if deleted.</Text>
                </Text>
            

            { hasError && (
                <Text style={styles.errorStyle}>{error}</Text>
            )}
            
            <Pressable onPress={ () => {
                Alert.alert('UPLOAD NEW RECORD', 'Please confirm to upload.', [  
                    {text: 'Cancel', onPress: () => console.log('NO Pressed'), style:'cancel'},  
                    {text: 'Confirm', onPress: () => deletePetPressed()}
                ]);
            }}>
                <Text style={styles.deletePressable}>UPLOAD
                    <Text style={{textTransform:'uppercase'}}> {petName}</Text>
                </Text>
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
    }
});

export default UploadNewScreen;