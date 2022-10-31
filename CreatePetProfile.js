import { SafeAreaView, StyleSheet, Text, View, TextInput, Pressable, Alert, Image } from 'react-native';
import { StackActions } from '@react-navigation/native';
import SelectList from 'react-native-dropdown-select-list';
import { AntDesign, Ionicons, Fontisto, MaterialIcons, FontAwesome5, FontAwesome } from '@expo/vector-icons'; 
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './FirebaseApp';

const CreatePetProfile = ({navigation}) => {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [pet_name, onPetnameChanged] = useState('');
    const [pet_birthday, onPetbirthdayChanged] = useState('');
    const [pet_gender, onPetgenderChanged] = useState('');

    const vet = { selectedVet: null };
    const onSelectedVet = data => {
        vet.selectedVet = data;
    };

    const gender = [
        {key:'1', value:'Male'}, 
        {key:'2', value:'Female'}
    ]

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

    const nextPressed = async () => {
        var clinic_id = null;
        for (const [key, value] of Object.entries(vet)) {
            for (const [key2, value2] of Object.entries(value)) {
                console.log(`${key2}: ${value2}`);
                clinic_id = value2;
            }
            console.log(`${key}: ${value}`);
        }
        const petToInsert = {
            userId:loggedInUser.uid,
            name:pet_name,
            birthday:pet_birthday,
            regular_clinic:clinic_id
        };
        console.log("user id: " + petToInsert.userId);
        console.log("pet name: " + petToInsert.name);
        console.log("pet birthday: " + petToInsert.birthday);
        console.log("clinic id: " + petToInsert.regular_clinic);
        // navigation.reset({index:0, routes:[{name: 'CreatePetProfile2Screen', params: {pet_profile: petToInsert}}]});
    }

    return (
        <SafeAreaView style={{backgroundColor:'#fff', flex:1, justifyContent:'space-between'}}>
            
            <Text style={styles.title}>Create Pet Profile</Text>

            <Text style={{marginBottom:5, marginLeft:22}}>Pet Name *</Text>
            <TextInput 
                style={styles.input}
                placeholder="Enter name"
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onPetnameChanged}
                value={pet_name}
            />

            <Text style={{marginBottom:5, marginLeft:22, marginTop:20}}>Pet Birthday *</Text>
            <TextInput 
                style={styles.input}
                placeholder="Birthday"
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onPetbirthdayChanged}
                value={pet_birthday}
            />

            <Text style={{marginBottom:5, marginLeft:22, marginTop:20}}>Pet Gender *</Text>
            <SelectList 
                setSelected={onPetgenderChanged} 
                data={gender} 
                onSelect={() => alert(pet_gender)}
                boxStyles={styles.input}
                dropdownItemStyles={styles.input}
                dropdownStyles={{borderColor:'transparent'}}
                maxHeight='100'
                placeholder=" "
            />
                
            <Text style={{marginBottom:5, marginLeft:22, marginTop:20}}>Photo</Text>
            <TextInput 
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
            />

            { vet.selectedVet==null && (
                <View style={{flex:1, alignItems:'baseline', margin: 22}}>
                    <Text style={{marginBottom:15, fontSize:16, fontWeight: 'bold'}}>Regular Clinic</Text>
                    <View style={{flexDirection:'row', justifyContent:'space-between', marginRight: 20, alignSelf:'stretch', alignItems:'center'}}>
                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                            <FontAwesome5 name="clinic-medical" size={24} color="black" />
                            <Text style={{marginRight:20, marginLeft: 20}}>No regular Clinic</Text>
                        </View>
                        <Pressable onPress={ () => {
                            navigation.navigate("VetsTabScreen", {onSelect: onSelectedVet});
                        }}>
                            <AntDesign name="plus" size={20} color="black" style={{alignSelf:'flex-end'}}/>
                        </Pressable>
                    </View>
                </View>
            )}

            { !vet.selectedVet==null && (
                <View style={{flex:1, alignItems:'baseline', margin:22}}>
                    <Text style={{marginBottom:15, fontSize:16, fontWeight: 'bold'}}>Regular Clinic</Text>
                    <View style={{flexDirection:'row', justifyContent:'space-between', marginRight: 15, alignSelf:'stretch', alignItems:'center'}}>
                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                            <Image source={require('./assets/physical-examination-1.png')} style={styles.img}/>
                            <View style={{marginRight:20, marginLeft: 20}}>
                                <Text style={{fontWeight: 'bold'}}>Clinic Name</Text>
                                <Text>Clinic Street Address</Text>
                                <Text>Clinic City Address</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row', justifyContent:'space-between', alignSelf:'center', alignItems:'center'}}>
                            <FontAwesome name="trash" size={24} color="black" style={{marginRight:20}}/>
                            <MaterialIcons name="edit" size={24} color="black" style={{}}/>
                        </View>
                    </View>
                </View>
            )}

            <Pressable onPress={nextPressed}>
                <Text style={styles.deletePressable}>NEXT</Text>
            </Pressable>
           
        </SafeAreaView>
    );
}
  
const styles = StyleSheet.create({
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
        borderRadius: '0%',
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
    img: {
        width: 60,
        height: 60,
        borderRadius: '100%',
        borderWidth: 1,
        borderColor: 'black',
    },
});

export default CreatePetProfile;