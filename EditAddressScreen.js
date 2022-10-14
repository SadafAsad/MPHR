import { SafeAreaView, StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native';
import { StackActions } from '@react-navigation/native';


const EditAddressScreen = ({navigation}) => {
    return (
        <SafeAreaView style={{backgroundColor:'#fff', flex:1, justifyContent:'space-between'}}>
            
            <Text style={styles.title}>Address Info</Text>

            <View style={styles.saveChanges}>
            <View style={{marginTop:30}}/>
            <View style={{flex:1, alignItems:'baseline', alignSelf:'center'}}>
                <Text style={{marginBottom:5, fontSize:18, fontWeight: 'bold'}}>Address</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Enter address"
                    keyboardType="default"
                    autoCapitalize="none"
                />
            </View>
            <View style={{flex:1, alignItems:'baseline', alignSelf:'center'}}>
                <Text style={{marginBottom:5, fontSize:18, fontWeight: 'bold'}}>Address Line 2</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Enter address line 2"
                    keyboardType="default"
                    autoCapitalize="none"
                />
            </View>
            <View style={{flex:1, alignItems:'baseline', alignSelf:'center'}}>
                <Text style={{marginBottom:5, fontSize:18, fontWeight: 'bold'}}>City</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Enter city"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>
            <View style={{flex:1, alignItems:'baseline', alignSelf:'center'}}>
                <Text style={{marginBottom:5, fontSize:18, fontWeight: 'bold'}}>Country</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Select country"
                    keyboardType="name-phone-pad"
                    autoCapitalize="none"
                />
            </View>
            <View style={{flex:1, alignItems:'baseline', alignSelf:'center'}}>
                <Text style={{marginBottom:5, fontSize:18, fontWeight: 'bold'}}>Province / State</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Select province / state"
                    keyboardType="default"
                    autoCapitalize="none"
                />
            </View>
            <View style={{flex:1, alignItems:'baseline', alignSelf:'center'}}>
                <Text style={{marginBottom:5, fontSize:18, fontWeight: 'bold'}}>Postal Code</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Enter postal code"
                    keyboardType="default"
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
                    <Text style={styles.deletePressable}>Update Address</Text>
                </Pressable>
                </View>
            </View>
                 
           
        </SafeAreaView>
    );
}
  
const styles = StyleSheet.create({
    title: {
        // textAlign: 'center',
        marginTop: 30,
        alignSelf: 'center',
        padding: 20,
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
    },
    mainView: {
       
        flex:1,
         flexDirection:'column',
         alignItems:'center',
         justifyContent:'center'
     }
});

export default EditAddressScreen;