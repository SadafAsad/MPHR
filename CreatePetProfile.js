import { SafeAreaView, StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { AntDesign, Ionicons, Fontisto, MaterialIcons, FontAwesome5 } from '@expo/vector-icons'; 

const CreatePetProfile = ({navigation}) => {
    return (
        <SafeAreaView style={{backgroundColor:'#fff', flex:1, justifyContent:'space-between'}}>
            
            <Text style={styles.title}>Create Pet Profile</Text>

            <Text style={{marginBottom:5, marginLeft:22}}>Name *</Text>
            <TextInput 
                style={styles.input}
                placeholder="Enter name"
                keyboardType="default"
                autoCapitalize="none"
            />

            <Text style={{marginBottom:5, marginLeft:22, marginTop:20}}>Birthday *</Text>
            <TextInput 
                style={styles.input}
                placeholder="Birthday"
                keyboardType="default"
                autoCapitalize="none"
            />

            <Text style={{marginBottom:5, marginLeft:22, marginTop:20}}>Sex *</Text>
            <TextInput  
                style={styles.input}
                placeholder="Enter sex"
                keyboardType="default"
                autoCapitalize="none"
            />
                
            <Text style={{marginBottom:5, marginLeft:22, marginTop:20}}>Photo</Text>
            <TextInput 
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
            />

            <View style={{flex:1, alignItems:'baseline', margin: 22}}>
                <Text style={{marginBottom:15, fontSize:16, fontWeight: 'bold'}}>Regular Clinic</Text>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-between', marginRight: 20}}>
                <FontAwesome5 name="clinic-medical" size={24} color="black" />
                    <Text style={{marginRight:20, marginLeft: 20}}>No regular Clinic</Text>
                    
                    <Pressable onPress={ () => {
                        navigation.navigate("AddVetScreen");
                    }}>
                        <AntDesign name="plus" size={20} color="black" style={{marginLeft:140}}/>
                    </Pressable>
                </View>
            </View>

            <Pressable onPress={ () => {
                navigation.navigate("CreatePetProfile2Screen")
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
    }
});

export default CreatePetProfile;