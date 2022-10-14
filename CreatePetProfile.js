import { SafeAreaView, StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { AntDesign, Ionicons, Fontisto, MaterialIcons, FontAwesome5 } from '@expo/vector-icons'; 

const CreatePetProfile = ({navigation}) => {
    return (
        <SafeAreaView style={{backgroundColor:'#fff', flex:1, justifyContent:'space-between'}}>
            
            <Text style={styles.title}>Create Pet Profile</Text>

            <View style={styles.saveChanges}>
            <View style={{marginTop:50}}/>
            <View style={{flex:1, alignItems:'baseline', alignSelf:'center'}}>
                <Text style={{marginBottom:5, fontSize:16, fontWeight: 'bold'}}>Name *</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Enter name"
                    keyboardType="default"
                    autoCapitalize="none"
                />
            </View>
            <View style={{flex:1, alignItems:'baseline', alignSelf:'center'}}>
                <Text style={{marginBottom:5, fontSize:16, fontWeight: 'bold'}}>Birthday *</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Birthday"
                    keyboardType="default"
                    autoCapitalize="none"
                />
            </View>
            <View style={{flex:1, alignItems:'baseline', alignSelf:'center'}}>
                <Text style={{marginBottom:5, fontSize:16, fontWeight: 'bold'}}>Sex *</Text>
                <TextInput  
                    style={styles.input}
                    placeholder="Enter email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>
            <View style={{flex:1, alignItems:'baseline', alignSelf:'center'}}>
                <Text style={{marginBottom:5, fontSize:16,fontWeight: 'bold'}}>Photo</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Enter phone number"
                    keyboardType="name-phone-pad"
                    autoCapitalize="none"
                />
            </View>
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

            <View style={{marginTop:10, marginBottom:20}}>
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
                </View>
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
        height: 40,
        width: 350,
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
        width: 350,
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