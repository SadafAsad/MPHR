import { SafeAreaView, StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native';
import { StackActions } from '@react-navigation/native';


const DeleteAccountScreen = ({navigation}) => {
    return (
        <SafeAreaView style={{backgroundColor:'#fff', flex:1, justifyContent:'center'}}>

            
            <Text style={styles.title}>Delete Account</Text>
            <Text style={{textAlign:'center',marginTop:10, marginLeft:36, marginRight:35, fontSize:20, alignSelf: 'center'}}>Are you sure that you want to delete your account?</Text>
            <Text style={{textAlign:'center',marginTop:10, marginLeft:50, marginRight:50, fontSize:13, alignSelf: 'center', color:'grey'}}>Attention: This action is irreversible and will erase all the data related to your account and your pets from the My Pet Health Record app.</Text>
            
            <Text style={{marginBottom:5, fontSize:16, marginTop: 20, marginLeft:22}}>Password</Text>
            <TextInput 
                style={styles.input}
                placeholder="Enter password"
                keyboardType="visible-password"
                autoCapitalize="none"
            />
            
            <Pressable onPress={ () => {
                // navigation.navigate("CheckMailScreen");
                //navigation.dispatch(StackActions.replace('CheckMailScreen'))
                Alert.alert('Account Deleted', 'Confirm',
                [         
                    {text: 'OK', onPress: () => console.log('OK Pressed')},  //console.log('OK Pressed')
                ]);
                }}>
                    <Text style={styles.deletePressable}>Delete Account</Text>
            </Pressable>

            <Pressable onPress={ () => {
                navigation.navigate('Login');
                //navigation.dispatch(StackActions.replace('CheckMailScreen'))
                Alert.alert('Account Deletion Canceled', 'Confirm',
                [  
                    {text: 'OK', onPress: () => navigation.navigate('Login')},  //console.log('OK Pressed')
                ]);
            }}>
                <Text style={styles.deletePressable}>Cancel</Text>
            </Pressable>
           
        </SafeAreaView>
    );
}
  
const styles = StyleSheet.create({
    input: {
        alignSelf: 'center',
        height: 45,
        width: '90%',
        borderWidth: 1,
        padding: 10,
        borderColor: '#808080',
    },
    title: {
        // textAlign: 'center',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: '35'
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
    mainView: {
       
       flex:1,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center'
    }
});

export default DeleteAccountScreen;