import * as React from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, Pressable, Alert, } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { AntDesign, Ionicons, Fontisto, MaterialIcons, FontAwesome5 } from '@expo/vector-icons'; 
import { RadioButton } from 'react-native-paper';

const CreatePetProfile2Screen = ({navigation}) => {
    const [checked, setChecked] = React.useState('first');

    return (
        <SafeAreaView style={{backgroundColor:'#fff', flex:1, justifyContent:'space-between'}}>
            
            <Text style={styles.title}>Create Pet Profile</Text>

                <Text style={{marginBottom:5, marginLeft:22}}>Specie</Text>
                
                <TextInput 
                    style={styles.input}
                    placeholder="Enter name"
                    keyboardType="default"
                    autoCapitalize="none"
                />
                <Text style={{marginBottom:5, marginLeft:22, marginTop:20}}>Breed</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Birthday"
                    keyboardType="default"
                    autoCapitalize="none"
                />
                <Text style={{marginBottom:5, marginLeft:22, marginTop:20}}>Coat Color</Text>
                <TextInput  
                    style={styles.input}
                    placeholder="Enter coat color"
                    keyboardType="default"
                    autoCapitalize="none"
                />
                <Text style={{marginBottom:5, marginLeft:22, marginTop:20}}>Distinguish Mark</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Enter phone number"
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
            <Pressable onPress={ () => {
                    navigation.dispatch(StackActions.replace('TabsNavigator'))
                    // Alert.alert('Save Changes', 'Confirm',
                    // [  
                    //     {  
                    //         text: 'Cancel',  
                    //         onPress: () => console.log('Cancel Pressed'),  
                    //         style: 'cancel',  
                    //     },  
                    //     {text: 'OK', onPress: () => console.log('OK Pressed')},  
                    // ]  
                    //);
                }}>
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