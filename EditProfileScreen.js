import { SafeAreaView, StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native';
import { StackActions } from '@react-navigation/native';


const EditProfileScreen = ({navigation}) => {
    return (
        <SafeAreaView style={{backgroundColor:'#fff', flex:1, justifyContent:'space-between'}}>
            
            <Text style={styles.title}>Profile Info</Text>

            <View style={styles.saveChanges}>
            <View style={{marginTop:50}}/>
            <View style={{flex:1, alignItems:'baseline', alignSelf:'center'}}>
                <Text style={{marginBottom:5, fontSize:16}}>First Name</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Enter first name"
                    keyboardType="default"
                    autoCapitalize="none"
                />
            </View>
            <View style={{flex:1, alignItems:'baseline', alignSelf:'center'}}>
                <Text style={{marginBottom:5, fontSize:16}}>Last Name</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Enter last name"
                    keyboardType="default"
                    autoCapitalize="none"
                />
            </View>
            <View style={{flex:1, alignItems:'baseline', alignSelf:'center'}}>
                <Text style={{marginBottom:5, fontSize:16}}>Email</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Enter email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>
            <View style={{flex:1, alignItems:'baseline', alignSelf:'center'}}>
                <Text style={{marginBottom:5, fontSize:16}}>Phone Number</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Enter phone number"
                    keyboardType="name-phone-pad"
                    autoCapitalize="none"
                />
            </View>
            

            <View style={{marginTop:10, marginBottom:20}}>
            <Pressable onPress={ () => {
                    //navigation.dispatch(StackActions.replace('TabsNavigator'))
                    Alert.alert('Save Changes', 'Confirm',
                    [  
                        {  
                            text: 'Cancel',  
                            onPress: () => console.log('Cancel Pressed'),  
                            style: 'cancel',  
                        },  
                        {text: 'OK', onPress: () => navigation.navigate('SettingScreen')},  
                    ]  
                    );
                }}>
                    <Text style={styles.deletePressable}>Update Profile</Text>
                </Pressable>
                </View>
            </View>
                {/* <View style={styles.deleteAccount}>
                    <Pressable onPress={ () => {
                        //navigation.dispatch(StackActions.replace('TabsNavigator'))
                        Alert.alert('Delete Account', 'Confirm',
                        [  
                            {  
                                text: 'Cancel',  
                                onPress: () => console.log('Cancel Pressed'),  
                                style: 'cancel',  
                            },  
                            {text: 'OK', onPress: () => console.log('OK Pressed')},  
                        ]  
                        );
                    }}>
                        <Text style={styles.deletePressable}>Delete My Account</Text>
                    </Pressable>
               
                </View> */}
           
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

export default EditProfileScreen;