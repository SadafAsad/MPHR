import { StyleSheet, Text, SafeAreaView, Pressable, FlatList, View, Image, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import { auth, db } from './FirebaseApp';
import { onAuthStateChanged,signOut } from "firebase/auth"
import { collection, query, where, getDocs } from "firebase/firestore";


const SettingScreen = ({navigation}) => {
    const [userData, setUserData] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState('');
    
    // const settingOptions = [
    //     {id: 1, name: "Edit Profile", component: "EditProfileScreen"},
    //     {id: 2, name: "Edit Address", component: "EditAddressScreen"},
    //     {id: 3, name: "Change password", component: "ChangePasswordScreen"},
    //     {id: 4, name: "Delete Account", component: "DeleteAccountScreen"},
    //     {id: 5, name: "Notifications", component: "NotificationsSettingScreen"}

    // ];

    // const logoutPressed = async () => {
    //     try {
    //         await signOut(auth) 
    //         navigation.reset({index:0, routes:[{name: 'AuthenticationNavigator'}], key:null}); 
    //     } catch (err) {
    //         console.log(`Logout failed: ${err.message}`);
    //     }
    // }

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
    }, [loggedInUser])

    const getUserDetails = async () => {
        try {
            const docRef = query(collection(db, "profiles"), where("userId", "==",loggedInUser.uid));
            const querySnapshot = await getDocs(docRef);
            const userProfile = querySnapshot.docs[0];
            const user = [
                userProfile.data().first_name+' '+userProfile.data().last_name,
                loggedInUser.email,
                userProfile.data().phone_number,
                userProfile.data().address_1+', '+userProfile.data().city+', '+userProfile.data().province+' '+userProfile.data().postal_code
            ]
            setUserData(user);
        } catch (err) {
            console.log(err.message);      
        }
    }

    // const renderDetails = ( {item} ) => (
        
    //         <View style={styles.pet}>
    //             <View>
    //             <View style={{flexDirection:'column', marginLeft:20, alignItems:'baseline'}}>
    //                         <Text style={{fontSize:18, fontWeight:'bold'}}>{item.data().first_name}{` `}{item.data().last_name}</Text>
    //                         <Text style={{fontSize:14}}>{item.data().email}</Text>
    //                         <Text style={{fontSize:14}}>{item.data().address_1}</Text>
    //                         <Text style={{fontSize:14}}>{item.data().city}{` `}{item.data().province}{`, `}{item.data().country}</Text>
    //                         <Text style={{fontSize:14}}>{item.data().phone_number}</Text>
    //                     </View> 
                    
    //             </View>
               
    //         </View>
      
    // )

    // const renderItem = ( {item} ) => (
    //     <Pressable onPress={() => {
    //         navigation.navigate(item.component)
    //     }}>
    //         <View style={styles.pet}>
    //             <View>
    //                 <Text style={{marginLeft:20, fontSize:18}}>{item.name}</Text>
    //             </View>
    //             <AntDesign name="right" size={20} color='#335C67' style={{marginRight:20}}/>
    //         </View>
    //     </Pressable>
    // )

    // const ItemDivider = () => {
    //     return (
    //         <View style={{height: 1, width: "100%", backgroundColor: "#cccccc"}}/>
    //     )
    // }
    
    return (
        <SafeAreaView style={styles.container}>
            
            <View style={styles.mainView}>
                <FontAwesome name="user-circle" size={60} color="black"/>
                <View style={{flex:1, margin: 10, paddingLeft: 30}}>
                    <Text style={{fontWeight:'bold'}}>{userData[0]}</Text>
                    <Text style={{color:'dimgray', fontWeight:'bold'}}>Email: 
                        <Text style={{color:'gray', fontWeight:'normal'}}>{userData[1]}</Text>
                    </Text>
                    <Text style={{color:'dimgray', fontWeight:'bold'}}>Phone: 
                        <Text style={{color:'gray', fontWeight:'normal'}}>{userData[2]}</Text>
                    </Text>
                    <Text style={{color:'dimgray', fontWeight:'bold'}}>Addres: 
                        <Text style={{color:'gray', fontWeight:'normal'}}>{userData[3]}</Text>
                    </Text>
                </View>
            </View>

            <View>
                <Pressable onPress={ () => {navigation.navigate("EditProfileScreen")}}>
                    <Text style={styles.pressableStyle}>EDIT PROFILE</Text>
                </Pressable>
                <Pressable onPress={ () => {navigation.navigate("EditAddressScreen")}}>
                    <Text style={styles.pressableStyle}>EDIT ADDRESS</Text>
                </Pressable>
                <Pressable onPress={ () => {navigation.navigate("ChangePasswordScreen")}}>
                    <Text style={styles.pressableStyle}>CHANGE PASSWORD</Text>
                </Pressable>
                <Pressable onPress={ () => {navigation.navigate("DeleteAccountScreen")}}>
                    <Text style={styles.pressableStyle}>DELETE ACCOUNT</Text>
                </Pressable>
            </View>
            {/* <FlatList style={{marginTop:0}}
                data={settingOptions}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                ItemSeparatorComponent={ItemDivider}
            />

            <View  style={{marginTop:0, marginBottom:10}}> 
                <Pressable onPress={ () => {
                        Alert.alert('Contact Us', 'Confirm',
                        [  
                            {  
                                text: 'Cancel',  
                                onPress: () => console.log('Cancel Pressed'),  
                                style: 'cancel',  
                            },  
                            {text: 'OK', onPress: () => console.log('OK Pressed')},  //console.log('OK Pressed')
                        ]  
                        );
                    }}>
                        <Text style={styles.deletePressable}>Contact Us</Text>
                </Pressable>

                <Pressable onPress={ () => {
                        Alert.alert('Signing Out', 'Confirm',
                        [  
                            {  
                                text: 'Cancel',  
                                onPress: () => console.log('Cancel Pressed'),  
                                style: 'cancel',  
                            },  
                            {text: 'OK', onPress:logoutPressed},
                        ]  
                        );
                    }}>
                        <Text style={styles.deletePressable}>Sign Out</Text>
                </Pressable>
            </View> */}
        </SafeAreaView>
    );

}
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    // pet: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     marginTop: 15,
    //     marginBottom: 15,
    //     alignItems: 'center'
    // },
    mainView: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        padding: 22
        
    },
    // deletePressable: {
    //     alignSelf: 'center',
    //     textAlign: 'center',
    //     backgroundColor: '#335C67',
    //     color: '#ffffff',
    //     marginLeft: 22,
    //     marginRight: 22,
    //     marginTop: 10,
    //     fontSize: 18,
    //     padding: 15,
    //     width: '90%',
    // },
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
        padding: 12,
        width: '90%',
        fontWeight: 'bold'
    },
});

export default SettingScreen;