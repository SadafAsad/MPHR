import { StyleSheet, Text, SafeAreaView, Pressable, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import { auth, db } from '../FirebaseApp';
import { onAuthStateChanged } from "firebase/auth"
import { collection, query, where, getDocs } from "firebase/firestore";
import { useIsFocused } from '@react-navigation/native';

const SettingScreen = ({navigation}) => {
    const [userData, setUserData] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState('');
    const [userProfileToSend, setUserProfileToSend] = useState(null);

    const isFocused = useIsFocused();

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
        getUserDetails();
    }, [loggedInUser, isFocused])

    const getUserDetails = async () => {
        try {
            const docRef = query(collection(db, "profiles"), where("userId", "==",loggedInUser.uid));
            const querySnapshot = await getDocs(docRef);
            const userProfile = querySnapshot.docs[0];
            setUserProfileToSend(userProfile.id);
            if (userProfile.data().address_2===''){
                const user = [
                    userProfile.data().first_name+' '+userProfile.data().last_name,
                    loggedInUser.email,
                    userProfile.data().phone_number,
                    userProfile.data().address_1+', '+userProfile.data().city+', '+userProfile.data().province+' '+userProfile.data().postal_code
                ]
                setUserData(user);
            }
            else {
                const user = [
                    userProfile.data().first_name+' '+userProfile.data().last_name,
                    loggedInUser.email,
                    userProfile.data().phone_number,
                    userProfile.data().address_2+', '+userProfile.data().address_1+', '+userProfile.data().city+', '+userProfile.data().province+' '+userProfile.data().postal_code
                ]
                setUserData(user);
            }
        } catch (err) {
            console.log(err.message);      
        }
    }
    
    return (
        <SafeAreaView style={styles.container}>
            
            <View style={styles.mainView}>
                <FontAwesome name="user-circle" size={60} color="black" style={{marginRight:10}}/>
                <View style={{flex:1, margin: 10}}>
                    <Text style={{fontWeight:'bold', fontSize:17}}>{userData[0]}</Text>
                    <Text style={{color:'dimgray', fontWeight:'bold'}}>Email: 
                        <Text style={{color:'gray', fontWeight:'normal'}}> {userData[1]}</Text>
                    </Text>
                    <Text style={{color:'dimgray', fontWeight:'bold'}}>Phone: 
                        <Text style={{color:'gray', fontWeight:'normal'}}> {userData[2]}</Text>
                    </Text>
                    <Text style={{color:'dimgray', fontWeight:'bold'}}>Address: 
                        <Text style={{color:'gray', fontWeight:'normal'}}> {userData[3]}</Text>
                    </Text>
                </View>
            </View>

            <Text style={{alignSelf:'center', fontWeight:'bold', fontSize:16}}>Account</Text>

            <View>
                <Pressable onPress={ () => {navigation.navigate("EditProfileScreen", {userProfile: userProfileToSend})}}>
                    <Text style={styles.pressableStyle}>EDIT PROFILE</Text>
                </Pressable>
                <Pressable onPress={ () => {navigation.navigate("EditAddressScreen", {userProfile: userProfileToSend})}}>
                    <Text style={styles.pressableStyle}>EDIT ADDRESS</Text>
                </Pressable>
                <Pressable onPress={ () => {navigation.navigate("ChangePasswordScreen")}}>
                    <Text style={styles.pressableStyle}>CHANGE PASSWORD</Text>
                </Pressable>
                <Pressable onPress={ () => {navigation.navigate("DeleteAccountScreen", {user: loggedInUser.uid})}}>
                    <Text style={styles.pressableStyle}>DELETE ACCOUNT</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );

}
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    mainView: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        padding: 22
        
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
        marginTop: 10,
        fontSize: 15,
        padding: 15,
        width: '90%',
        fontWeight: 'bold'
    },
});

export default SettingScreen;