import { SafeAreaView, StyleSheet, Text, View, Pressable, Image, FlatList, Alert } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons'; 
import { useEffect, useState } from 'react';
import { db } from '../FirebaseApp';
import { collection, query, where, getDoc, doc, getDocs, orderBy } from "firebase/firestore";
import { useIsFocused } from '@react-navigation/native';

const PetProfileScreen = ({navigation, route}) => {
    const [pet_name, setPetName] = useState('');
    const [pet_birthday, setPetBirthday] = useState('');
    const [caregivers, setCaregivers] = useState([]);
    const [ownerName, setOwnerName] = useState('');
    const [profileImg, setProfileImg] = useState("https://firebasestorage.googleapis.com/v0/b/mphr-fall2022.appspot.com/o/images%2FNo_image_available.svg.png?alt=media&token=a28a2c69-fbfb-4ac7-8cb4-c6729f3c6de8");
    const [caregiversName, setCaregiversName] = useState([]);
    const [lastUpload, setLastUpload] = useState(null);
    const [lastUploadDate, setLastUploadDate] = useState("");
    const [lastUploadAt, setLastUploadAt] = useState("");
    const [lastUploadReason, setLastUploadReaosn] = useState("");
    const [hasMedRec, setHasMedRec] = useState(false);

    const {pet} = route.params;
    const isFocused = useIsFocused();

    useEffect(()=>{
        navigation.setOptions({
            title:'Pet Profile',
            headerRight: () => (
                <Pressable onPress={ () => {
                    navigation.navigate("PetSettingScreen", {pet:pet});
                }}>
                    <Ionicons name="settings-sharp" size={24} color='#335C67'/>
                </Pressable>
            )
        })
    }, [isFocused])

    useEffect(()=>{
        async function getPetData() {
            const docRef = doc(db, "pets", pet);
            const pet_data = await getDoc(docRef);
            setPetName(pet_data.data().name);
            setPetBirthday(pet_data.data().birthday);
            getOwnerName(pet_data.data().owner);
            if(pet_data.data().petImgFile != null){
                setProfileImg(pet_data.data().petImgFile);
            }
        }
        getPetData();
        getCaregivers();
        getLastUpload();
    }, [isFocused])

    useEffect(()=>{
        getCaregiversName();
    }, [caregivers])

    const getLastUpload = async () => {
        const docRef = query(collection(db, "history"), where("pet", "==", pet), orderBy("date", "desc"));
        const querySnapshot = await getDocs(docRef);
        const documents = querySnapshot.docs;
        if (documents.length==0){
            setLastUpload(null);
            setLastUploadDate("");
            setLastUploadAt("");
            setLastUploadReaosn("");
        }
        else {
            setHasMedRec(true);
            setLastUpload(documents[0]);
            const date = new Date(documents[0].data().date.toDate());
            setLastUploadDate(date.toDateString());
            setLastUploadAt(documents[0].data().clinic);
            setLastUploadReaosn(documents[0].data().reason);
        }
    }

    const getOwnerName = async (owner_id) => {
        const userProfileDocRef = query(collection(db, "profiles"), where("userId", "==", owner_id));
        const userProfileQuerySnapshot = await getDocs(userProfileDocRef);
        const userProfileDocument = userProfileQuerySnapshot.docs;
        setOwnerName(userProfileDocument[0].data().first_name+" "+userProfileDocument[0].data().last_name);
    }

    const getCaregivers = async () => {
        try {
            const docRef = query(collection(db, "caregiving"), where("pet", "==", pet));
            const querySnapshot = await getDocs(docRef);
            const documents = querySnapshot.docs;
            setCaregivers(documents);
        } catch (err) {
            console.log("Getting User's Pets: " + err.message);        
        }
    }

    const getCaregiversName = async () => {
        var index = 0;
        var names = [];
        while (index<caregivers.length) {
            try {
                const docRef = query(collection(db, "profiles"), where("userId", "==", caregivers[index].data().user));
                const querySnapshot = await getDocs(docRef);
                const documents = querySnapshot.docs;
                names.push({key:index, value:documents[0].data().first_name+" "+documents[0].data().last_name});
            } catch(err) {
                console.log(err.message);
            }
            index = index+1;
        }
        setCaregiversName(names);
    }

    function getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        var month = 0;
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
            month = birthDate.getMonth();
        }
        else {
            month = m
        }
        if (age===0) {
            return `${month} months`;
        }
        else {
            return `${age} years ${month} months`;
        }
    }

    const renderItem = ({item}) => (
        <View style={{flexDirection:'row'}}>
            <FontAwesome name="user-circle" size={15} color="black" style={{marginRight:5}}/>
            <Text style={{color:'gray', fontWeight:'normal'}}>{item.value}</Text>
        </View>
    )

    return (
        <SafeAreaView style={{backgroundColor:'#fff', flex:1}}>
            <View style={styles.mainView}>
                <View style={styles.imgView}>
                    <Image source={{uri:profileImg}} style={styles.img}/>
                </View>
                <View style={{flex:1, marginLeft:10}}>
                    <Text style={{fontWeight:'bold', fontSize:17}}>{pet_name}</Text>
                    <Text style={{color:'dimgray', fontWeight:'bold'}}>Age: 
                        <Text style={{color:'gray', fontWeight:'normal'}}> {getAge(pet_birthday)}</Text>
                    </Text>
                    <Text style={{color:'dimgray', fontWeight:'bold'}}>Owner: 
                        <Text style={{color:'gray', fontWeight:'normal'}}> {ownerName}</Text>
                    </Text>
                </View>
            </View>

            {caregivers.length!=0 && (
                <View style={{paddingLeft:22, paddingRight:22, marginTop:10}}>
                    <Text style={{color:'dimgray', fontWeight:'bold', marginBottom:5}}>Caregivers: </Text>
                    <FlatList
                        data={caregiversName}
                        keyExtractor={item => item.key}
                        renderItem={renderItem}
                    />
                </View>
            )}

            <Text style={{alignSelf:'center', fontWeight:'bold', fontSize:16, marginTop:20}}>Medical Records</Text>

            { hasMedRec && (
                <View style={{marginTop:20}}>
                    <View style={styles.rowView}>
                        <MaterialCommunityIcons name="clipboard-text-clock" size={28} color="black" style={{marginRight:10}}/>
                        <Text style={{fontWeight:'bold'}}>Last Upload: {}</Text>
                        <Text>{lastUploadDate}</Text>
                    </View>
                    <View style={styles.rowView}>
                        <MaterialCommunityIcons name="hospital-marker" size={28} color="black" style={{marginRight:10}}/>
                        <Text style={{fontWeight:'bold'}}>At: {}</Text>
                        <Text>{lastUploadAt}</Text>
                    </View>
                    <View style={styles.rowView}>
                        <MaterialIcons name="chat" size={28} color="black" style={{marginRight:10}}/>
                        <Text style={{fontWeight:'bold'}}>Reason: {}</Text>
                        <Text>{lastUploadReason}</Text>
                    </View>
                </View>
            )}
            
            <View style={{marginTop:20}}>
                <Pressable onPress={ () => {navigation.navigate('UploadNewScreen', {petId:pet})}}>
                    <Text style={styles.pressableStyle}>UPLOAD NEW</Text>
                </Pressable>
                <Pressable onPress={ () => {
                    if (lastUpload===null){
                        Alert.alert('ATTENTION', 'You need to upload a medical record first.', [  
                            {text: 'OK', onPress: () => console.log('OK Pressed')}
                        ]);
                    }
                    else {
                        navigation.navigate('ShareMedicalRecordScreen', {petId:pet, petName: pet_name});
                    }
                }}>
                    <Text style={styles.pressableStyle}>SHARE MEDICAL RECORD</Text>
                </Pressable>
                <Pressable onPress={ () => {
                    if (lastUpload===null) {
                        Alert.alert('ATTENTION', 'You need to upload a medical record first.', [  
                            {text: 'OK', onPress: () => console.log('OK Pressed')}
                        ]);
                    }
                    else {
                        navigation.navigate('ShowHistoryScreen', {petId:pet, petName:pet_name});
                    }
                }}>
                    <Text style={styles.pressableStyle}>SHOW HISTORY</Text>
                </Pressable>
            </View>
           
        </SafeAreaView>
    );
}
  
const styles = StyleSheet.create({
    mainView: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginTop: 22
    },
    rowView: {
        flexDirection:'row',
        paddingLeft:22,
        alignItems:'center'
    },
    img: {
        width:'100%', 
        height:'100%', 
        borderRadius: '100%'
    },
    imgView: {
        width: 60,
        height: 60,
        borderRadius: '100%',
        borderWidth: 1,
        borderColor: 'black',
        alignSelf: 'center',
        marginLeft: 22
    },
    title: {
        // textAlign: 'center',
        alignSelf: 'center',
        padding: 20,
        margin: 30,
        fontWeight: 'bold',
        fontSize: '35'
    },
    input: {
        alignSelf: 'center',
        height: 45,
        width: '90%',
        borderWidth: 1,
        padding: 10,
        borderColor: '#808080',
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
    deletePressable: {
        alignSelf: 'center',
        textAlign: 'center',
        backgroundColor: '#335C67',
        color: '#ffffff',
        marginLeft: 22,
        marginRight: 22,
        marginTop: 22,
        fontSize: 18,
        padding: 15,
        width: '90%',
        marginBottom:22
    },
    saveChanges: {
        // borderRadius: 5,
        // borderWidth: 1,
        flex:1, 
        alignItems:'baseline',
        alignSelf:'center'
    },
    deleteAccount: {
        // borderRadius: 5,
        // borderWidth: 1,
        //flex:1, 
        alignItems:'center',
        alignSelf:'center'
    },
});

export default PetProfileScreen;