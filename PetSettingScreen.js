import { SafeAreaView, StyleSheet, Text, View, Pressable, Alert, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { auth, db } from './FirebaseApp';
import { collection, query, where, getDoc, doc } from "firebase/firestore";
import { useIsFocused } from '@react-navigation/native';

const PetSettingScreen = (props) => {
    const [pet_name, setPetName] = useState('');
    const [pet_birthday, setPetBirthday] = useState('');

    const {pet} = props.route.params;
    const isFocused = useIsFocused();

    useEffect(()=>{
        async function getPetData() {
            const docRef = doc(db, "pets", pet);
            const pet_data = await getDoc(docRef);
            setPetName(pet_data.data().name);
            setPetBirthday(pet_data.data().birthday);
        }
        getPetData();
    }, [isFocused])

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

    return (
        <SafeAreaView style={{backgroundColor:'#fff', flex:1}}>
            <View style={styles.mainView}>
                <View style={styles.imgView}>
                    <Image source={require('./assets/paw.png')} style={styles.img}/>
                </View>
                <View style={{flex:1, marginLeft:10}}>
                    <Text style={{fontWeight:'bold', fontSize:17}}>{pet_name}</Text>
                    <Text style={{color:'dimgray', fontWeight:'bold'}}>Age: 
                        <Text style={{color:'gray', fontWeight:'normal'}}>{getAge(pet_birthday)}</Text>
                    </Text>
                    <Text style={{color:'dimgray', fontWeight:'bold'}}>Owner: 
                        <Text style={{color:'gray', fontWeight:'normal'}}>Pet owner</Text>
                    </Text>
                </View>
            </View>
            <View style={{paddingLeft:22, paddingRight:22, marginTop:10}}>
                <Text style={{color:'dimgray', fontWeight:'bold', marginBottom:5}}>Caregivers: </Text>
                <View style={{flexDirection:'row'}}>
                    <FontAwesome name="user-circle" size={15} color="black" style={{marginRight:5}}/>
                    <Text style={{color:'gray', fontWeight:'normal'}}>Pet caregiveres</Text>
                </View>
            </View>

            <Text style={{alignSelf:'center', fontWeight:'bold', fontSize:16, marginBottom:20, marginTop:20}}>Settings</Text>
            
            <View>
                <Pressable onPress={ () => {props.navigation.navigate('EditPetScreen-1', {pet:pet})}}>
                    <Text style={styles.pressableStyle}>EDIT PET</Text>
                </Pressable>
                <Pressable onPress={ () => {props.navigation.navigate('ManageCareGiverSCreen', {pet:pet})}}>
                    <Text style={styles.pressableStyle}>MANAGE CAREGIVERS</Text>
                </Pressable>
                <Pressable onPress={ () => {console.log('pressed')}}>
                    <Text style={styles.pressableStyle}>TRANSFER OWNERSHIP</Text>
                </Pressable>
                <Pressable onPress={ () => {console.log('pressed')}}>
                    <Text style={styles.pressableStyle}>REMOVE PET</Text>
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
        height:undefined, 
        aspectRatio:1
    },
    imgView: {
        width: 60,
        height: 60,
        borderRadius: '100%',
        borderWidth: 1,
        borderColor: 'black',
        alignSelf: 'center',
        marginLeft: 22,
        padding: 8
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

export default PetSettingScreen;