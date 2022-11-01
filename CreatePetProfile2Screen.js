import * as React from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { db } from './FirebaseApp';
import { collection, addDoc} from "firebase/firestore";
import { useState } from 'react';

const CreatePetProfile2Screen = ({navigation, route}) => {
    const [checked, setChecked] = React.useState('first');
    const [pet_specie, onSpecieChanged] = useState('');
    const [pet_breed, onBreedChanged] = useState('');
    const [coat_color, onColorChanged] = useState('');

    const {pet_profile} = route.params;

    const addPetPressed = async () => {
        try {
            const petToInsert = {
                userId:pet_profile.userId,
                name:pet_profile.name,
                birthday:pet_profile.birthday,
                regular_clinic:pet_profile.regular_clinic,
                specie:pet_specie,
                breed:pet_breed,
                coat_color:coat_color,
                mark:"",
                neutering:"",
            };
            const insertedPet = await addDoc(collection(db, "pets"), petToInsert);
            navigation.reset({index:0, routes:[{name: 'PetsTabScreen'}]});
        }
        catch (err) {
            console.log(`${err.message}`);
        }
    }

    return (
        <SafeAreaView style={{backgroundColor:'#fff', flex:1, justifyContent:'space-between'}}>
            
            <Text style={styles.title}>Create Pet Profile</Text>

                <Text style={{marginBottom:5, marginLeft:22}}>Pet Specie</Text>
                <TextInput 
                    style={styles.input}
                    placeholder=""
                    keyboardType="default"
                    autoCapitalize="none"
                    onChangeText={onSpecieChanged}
                    value={pet_specie}
                />

                <Text style={{marginBottom:5, marginLeft:22, marginTop:20}}>Pet Breed</Text>
                <TextInput 
                    style={styles.input}
                    placeholder=""
                    keyboardType="default"
                    autoCapitalize="none"
                    onChangeText={onBreedChanged}
                    value={pet_breed}
                />

                <Text style={{marginBottom:5, marginLeft:22, marginTop:20}}>Pet Coat Color</Text>
                <TextInput  
                    style={styles.input}
                    placeholder=""
                    keyboardType="default"
                    autoCapitalize="none"
                    onChangeText={onColorChanged}
                    value={coat_color}
                />

                <Text style={{marginBottom:5, marginLeft:22, marginTop:20}}>Pet Distinguish Mark</Text>
                <TextInput 
                    style={styles.input}
                    placeholder=""
                    keyboardType="name-phone-pad"
                    autoCapitalize="none"
                />
            <View style={{flex:1, alignItems:'baseline', margin: 22}}>
                <Text style={{marginBottom:15, fontSize:16, fontWeight: 'bold'}}>Neutering / Castration</Text>
                <View style={styles.checkedOptions}>
                <Text style={{marginBottom:5, fontSize:16,}}>Spayed Or Neutered</Text>
                <RadioButton
                    value="Spayed Or Neutered"
                    status={ checked === 'first' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('first') }
                    style= {{margin: 20, padding:20}}
                />
                </View>
                <View style={styles.checkedOptions}>
                <Text style={{marginBottom:5, fontSize:16}}>Intact</Text>
                <RadioButton
                    value="Intact"
                    status={ checked === 'second' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('second')}
                    style={{width:'90%'}}
                />
                
                </View>
                
            </View>

            <View style={{marginTop:10, marginBottom:22}}>
            <Pressable onPress={addPetPressed}>
                    <Text style={styles.deletePressable}>ADD PET</Text>
                </Pressable>
            </View>
                
           
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
    checkedOptions: {
       
        flexDirection: 'row',
        justifyContent: 'space-between',
       
        alignItems: 'center'
    }
});

export default CreatePetProfile2Screen;