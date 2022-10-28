import { StyleSheet, Text, SafeAreaView, Pressable, FlatList, View, Image, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Card } from 'react-native-paper'
import { FontAwesome } from '@expo/vector-icons';
import { StackActions } from '@react-navigation/native';
import { useEffect, useState } from "react";
import CheckBox from "expo-checkbox";
import { UseTogglePasswordVisibility } from './UseTogglePasswordVisibility';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { auth, db, firebaseApp } from './FirebaseApp';
import { onAuthStateChanged,signOut } from "firebase/auth"
import { collection, query, where, getDocs, Firestore } from "firebase/firestore";
//import { db } from "./FirebaseApp"
//import { collection, doc, getDocs } from "firebase/firestore";


const SettingScreen = ({navigation}) => {
    const [input, setInput] = useState('');
    const [userData, setUserData] = useState('');
    const [isLoggedIn,setIsLoggedIn] = useState(false)
    const [loggedInUserId, setLoggedInUserId] = useState('')
    const [listToRender, setListToRender] = useState([])
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    

    // const docRef = doc(db, "profiles", "ARDH73UDUolpCYOrlpHt");
    // const docSnap = (async() => { await getDoc(docRef); } );

    // if (docSnap.exists()) {
    //     console.log("Document data:", docSnap.data());
    //   } else {
    //     // doc.data() will be undefined in this case
    //     console.log("No such document!");
    //   }



    // useEffect(() => {
    //     db.collection('profiles').onSnapshot(snapshot => {

    //     })

    // }, []);

    const logoutPressed = async () => {
        try {
            await signOut(auth)
            navigation.dispatch(StackActions.popToTop());          
        } catch (err) {
            console.log(`Logout failed: ${err.message}`);
        }
    }

    useEffect(()=>{

        const listener = onAuthStateChanged(auth, (userFromFirebaseAuth) => {
              
          if (userFromFirebaseAuth) {
            console.log('userFromFirebaseAuth: ', userFromFirebaseAuth.email);
            setLoggedInUserId(userFromFirebaseAuth.email)
            setIsLoggedIn(true)
          }
          else {
            setIsLoggedIn(false)
            setLoggedInUserId(null);
            console.log('userFromFirebaseAuth: ', setIsLoggedIn.email);
          }
        })
        return listener
      },[])



    useEffect(() => {
        getUserDetails();
            
    }, []);

    const getUserDetails = async () => {
        try {
            // const listener = onAuthStateChanged(auth, (userFromFirebaseAuth) => {
              
            //     if (userFromFirebaseAuth) {
            //       console.log('userFromFirebaseAuth: ', userFromFirebaseAuth.email);
            //       setLoggedInUserId(userFromFirebaseAuth.email)
            //       setIsLoggedIn(true)
            //     }
            //     else {
            //       setIsLoggedIn(false)
            //       setLoggedInUserId(null);
            //       console.log('userFromFirebaseAuth: ', setIsLoggedIn.email);
            //     }
            //   })
              
            let querySnapshot = await getDocs(collection(db, "profiles"));

            let documents = querySnapshot.docs;

            //FOR TESTING PURPOSES
            // for (let i = 0; i < documents.length; i++) {
            //     const currDocument = documents[i]
            //     console.log(`ID: ${currDocument.id}`)
            //     console.log(currDocument.data())
            //     console.log("------")
            // }
             console.log(`documents.email is: ${documents[0].data().email}`);
            for (let i = 0; i < documents.length; i++) {
                if(documents[i].data().email == loggedInUserId){
                    setUserData(documents);
                    console.log('doc is: ', loggedInUserId);
                    console.log('doc: ', documents[i].data().email)
                    console.log('doc: ', documents[i].data().first_name)
                }
            }
            //setUserData(documents);
            console.log('length: ', userData.data().first_name);

        } catch (err) {
            console.log(`${documents.id}`)    
            console.log(`${err.message}`)        
        }
    }


    const renderDetails = ( {item} ) => (
        
            <View style={styles.pet}>
                <View>
                <View style={{flexDirection:'column', marginLeft:20, alignItems:'baseline'}}>
                            <Text style={{fontSize:18, fontWeight:'bold'}}>{item.data().first_name}{` `}{item.data().last_name}</Text>
                            <Text style={{fontSize:14}}>{item.data().email}</Text>
                            <Text style={{fontSize:14}}>{item.data().address_1}</Text>
                            <Text style={{fontSize:14}}>{item.data().city}{` `}{item.data().province}{`, `}{item.data().country}</Text>
                            <Text style={{fontSize:14}}>{item.data().phone_number}</Text>
                        </View> 
                    
                </View>
               
            </View>
      
    );
    

    // useEffect(() => { 
    //    getUserInfo();
    // });
   

    //getUserDetails();

    const settingOptions = [
        {id: 1, name: "Edit Profile", component: "EditProfileScreen"},
        {id: 2, name: "Edit Address", component: "EditAddressScreen"},
        {id: 3, name: "Change password", component: "ChangePasswordScreen"},
        {id: 4, name: "Delete Account", component: "DeleteAccountScreen"},
        {id: 5, name: "Notifications", component: "NotificationsSettingScreen"}

    ];
    
    const renderItem = ( {item} ) => (
        <Pressable onPress={() => {
            navigation.navigate(item.component)
        }}>
            <View style={styles.pet}>
                <View>
                    <Text style={{marginLeft:20, fontSize:18}}>{item.name}</Text>
                    
                </View>
                <AntDesign name="right" size={20} color='#335C67' style={{marginRight:20}}/>
            </View>
        </Pressable>
    );
    
    const ItemDivider = () => {
        return (
            <View style={{height: 1, width: "100%", backgroundColor: "#cccccc"}}/>
        )
    }
    
    return (
        <SafeAreaView style={styles.container}>
            
            <View style={{flex:2, margin: 20, paddingLeft: 0,}}>

            <Text style={{marginTop: 10, marginBottom:10, textAlign: 'center', fontWeight: 'bold', fontSize: 30}}>Account</Text>
            <View style={styles.mainView}>
            
            <FontAwesome name="user-circle" size={60} color="black"/>
            <View style={{flex:1, margin: 10, paddingLeft: 30}}>
            {/* <Text style={{fontSize:18, fontWeight:'bold'}}>{userData.first_name}</Text> */}
            <FlatList
                data={userData}
                keyExtractor={item => item.id}
                renderItem={renderDetails}
                ItemSeparatorComponent={ItemDivider}
            />
                {/* <Text style={{marginTop: 10}}><FlatList data={listToRender} keyExtractor={(item) => {return item.data().uid}}
            renderItem={ renderDetails } /></Text>  
                {/* {renderDetails} */}
                {/* {userData ? userData.first_name || 'Test' : 'Test'} {userData ? userData.last_name || 'User' : 'User'} */}
                {/* <Text style={{marginTop: 10}}>Owner Email</Text>
                <Text style={{marginTop: 10}}>Owner Phone</Text>
                <Text style={{marginTop: 10}}>Owner Address</Text> */} 
                </View>
            </View>
            
            </View>
            

            <FlatList style={{marginTop:0}}
                data={settingOptions}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                ItemSeparatorComponent={ItemDivider}
                />

            <View  style={{marginTop:0, marginBottom:10}}> 
                <Pressable onPress={ () => {
                    // navigation.navigate("CheckMailScreen");
                        //navigation.dispatch(StackActions.replace('CheckMailScreen'))
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
                     //navigation.navigate('Login')
                        //navigation.dispatch(StackActions.replace('CheckMailScreen'))
                        Alert.alert('Signing Out', 'Confirm',
                        [  
                            {  
                                text: 'Cancel',  
                                onPress: () => console.log('Cancel Pressed'),  
                                style: 'cancel',  
                            },  
                            {text: 'OK', onPress:logoutPressed},  //navigation.navigate("Login")
                        ]  
                        );
                    }}>
                        <Text style={styles.deletePressable}>Sign Out</Text>
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
    pet: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        marginBottom: 15,
        alignItems: 'center'
    },
    mainView: {
        borderRadius: 5,
        borderWidth: 1,
        margin: 10,
        paddingLeft:50,
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        alignSelf: 'center',
        
    },
    deletePressable: {
        alignSelf: 'center',
        textAlign: 'center',
        backgroundColor: '#335C67',
        color: '#ffffff',
        marginLeft: 22,
        marginRight: 22,
        marginTop: 10,
        fontSize: 18,
        padding: 15,
        width: '90%',
    },
});

export default SettingScreen;