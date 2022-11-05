import { SafeAreaView, StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native';
import { UseTogglePasswordVisibility } from './UseTogglePasswordVisibility';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from './FirebaseApp';
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";

const AddCaregiverScreen = ({navigation, route}) => {
    const [password, onPasswordChanged] = useState('');
    const [hasError, onHasErrorChanged] = useState(false);

    const { passwordVisibility, rightIcon, handlePasswordVisibility } = UseTogglePasswordVisibility();
    const {user} = route.params;

    const deleteAccountPressed = async () => {
        deleteUserPets();
        deleteUserProfile();
        deleteUser();
    }

    const deleteUser = async () => {
        try {
            var user = auth.currentUser;
            await signInWithEmailAndPassword(auth, user.email, password);
            user = auth.currentUser;
            try {
                user.delete()
                .then(() => navigation.reset({index:0, routes:[{name: 'AuthenticationNavigator'}], key:null}))
                .catch((err) => console.log(err));
            } catch(err) {
                console.log('hehe');
                console.log(err.message);
            }
        } catch(err) {
            console.log('this one');
            console.log(err.message);
            onErrorChanged("Your password is incorrect. Please try again.");
            onPasswordChanged("");
            onHasErrorChanged(true);
        }
    }

    const deleteUserProfile = async () => {
        try {
            const docRef = query(collection(db, "profiles"), where("userId", "==",user));
            const querySnapshot = await getDocs(docRef);
            const documents = querySnapshot.docs;
            try {
                await deleteDoc(doc(db, "profiles", documents[0].id));
            } catch (err) {
                console.log(err.message);
            }
        } catch (err) {
            console.log(`${err.message}`);        
        }
    }

    const deleteUserPets = async () => {
        try {
            const docRef = query(collection(db, "pets"), where("userId", "==",user));
            const querySnapshot = await getDocs(docRef);
            const documents = querySnapshot.docs;
            for (let i=0; i<documents.length; i++) {
                try {
                    await deleteDoc(doc(db, "pets", documents[i].id));
                } catch (err) {
                    console.log(err.message);
                }
            }
        } catch (err) {
            console.log(`${err.message}`);        
        }
    }

    return (
        <SafeAreaView style={{backgroundColor:'#fff', flex:1, justifyContent:'center'}}>

            <Text style={{textAlign:'center',marginTop:10, marginLeft:36, marginRight:35, fontSize:20, alignSelf: 'center', fontWeight: 'bold'}}>Are you sure that you want to delete your account?</Text>
            <Text style={{textAlign:'center',marginTop:10, marginLeft:50, marginRight:50, fontSize:13, alignSelf: 'center', color:'dimgray'}}>Attention: 
                <Text style={{color:'gray'}}>This action is irreversible and will erase all the data related to your account and your pets from the My Pet Health Record app.</Text>
            </Text>
            
            <Text style={{marginBottom:5, fontSize:15, marginTop:15, marginLeft:22}}>Password</Text>
            <View style={styles.inputContainer}>
                <TextInput 
                    style={styles.inputField}
                    placeholder="Enter password"
                    keyboardType="default"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={passwordVisibility}
                    onChangeText={onPasswordChanged}
                    value={password}
                />
                <Pressable onPress={handlePasswordVisibility}>
                    <MaterialCommunityIcons name={rightIcon} size={22} color="#232323" />
                </Pressable>
            </View>
            
            <Pressable onPress={ () => {
                Alert.alert('DELETE ACCOUNT', 'Please confirm account deletion.', [  
                    {text: 'Cancel', onPress: () => console.log('NO Pressed'), style:'cancel'},  
                    {text: 'Confirm', onPress: () => deleteAccountPressed()}
                ]);
            }}>
                <Text style={styles.deletePressable}>DELETE ACCOUNT</Text>
            </Pressable>

            <Pressable onPress={() => {navigation.goBack()}}>
                <Text style={styles.cancelPressable}>CANCEL</Text>
            </Pressable>
           
        </SafeAreaView>
    );
}
  
const styles = StyleSheet.create({
    title: {
        // textAlign: 'center',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: '35'
    },
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
    inputContainer: {
        height: 45,
        width: '90%',
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#808080',
        alignSelf: 'center'
    },
    inputField: {
        padding: 10,
        width: '90%'
    },
});

export default AddCaregiverScreen;