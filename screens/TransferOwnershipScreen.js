import { SafeAreaView, StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native';
import { useState } from "react";
import CheckBox from "expo-checkbox";

const TransferOwnershipScreen = ({navigation}) => {
    const [hasError, onHasErrorChanged] = useState(false);
    const [error, onErrorChanged] = useState('');
    const [emailAddress, onEmailChanged] = useState('');
    const [isSelected, setSelection] = useState(false);

    const transferOwnershipPressed = () => {

    }

    return (
        <SafeAreaView style={{backgroundColor:'#fff', flex:1, justifyContent:'center'}}>

            <Text style={{textAlign:'center',marginTop:10, marginLeft:36, marginRight:35, fontSize:20, alignSelf: 'center', fontWeight: 'bold'}}>Who will be the new owner of {}
                <Text style={{textDecorationLine:'underline'}}>PET NAME</Text>
            ?
            </Text>
            <Text style={{textAlign:'left',marginTop:10, marginLeft:50, marginRight:50, fontSize:13, alignSelf: 'center', color:'dimgray'}}>Attention: 
                <Text style={{color:'gray'}}>Transferring pet ownership allows another user to have full control of the pet.</Text>
            </Text>
            
            <Text style={{marginBottom:5, fontSize:15, marginTop:15, marginLeft:22}}>Email</Text>
            <TextInput 
                style={styles.input}
                placeholder="Enter email"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onEmailChanged}
                value={emailAddress}
            />

            <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                <CheckBox
                    value={isSelected}
                    onValueChange={setSelection}
                    color='#335C67'
                />
                <Text style={{marginLeft:5, fontSize:15}}>Add me as caregiver</Text>
            </View>

            { hasError && (
                <Text style={styles.errorStyle}>{error}</Text>
            )}
            
            <Pressable onPress={ () => {
                Alert.alert('TRANSFER OWNERSHIP', 'Please confirm ownership transformation.', [  
                    {text: 'Cancel', onPress: () => console.log('NO Pressed'), style:'cancel'},  
                    {text: 'Confirm', onPress: () => transferOwnershipPressed()}
                ]);
            }}>
                <Text style={styles.deletePressable}>TRANSFER OWNERSHIP</Text>
            </Pressable>

            <Pressable onPress={() => {navigation.goBack()}}>
                <Text style={styles.cancelPressable}>CANCEL</Text>
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
    deletePressable: {
        alignSelf: 'center',
        textAlign: 'center',
        backgroundColor: '#335C67',
        color: '#ffffff',
        marginLeft: 22,
        marginRight: 22,
        marginTop: 22,
        fontSize: 15,
        padding: 15,
        width: '90%',
        fontWeight: 'bold'
    },
    cancelPressable: {
        alignSelf: 'center',
        textAlign: 'center',
        backgroundColor: '#ffffff',
        color: '#335C67',
        borderColor: '#335C67',
        borderStyle: 'solid',
        borderWidth: 1,
        marginLeft: 22,
        marginRight: 22,
        marginTop: 15,
        marginBottom: 0,
        fontSize: 15,
        padding: 15,
        width: '90%',
        fontWeight: 'bold'
    },
    errorStyle: {
        color: '#ff0000',
        alignSelf: 'center',
        marginTop: 22
    }
});

export default TransferOwnershipScreen;