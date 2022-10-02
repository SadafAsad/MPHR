import { SafeAreaView, StyleSheet, Text, Pressable, View, TextInput } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { useState } from "react";
import { StackActions } from '@react-navigation/native';

const ResetPasswordScreen = ({navigation}) => {
    const [checked, setChecked] = useState('');

    return (
        <SafeAreaView style={{backgroundColor:'#fff', flex:1, justifyContent:'space-between'}}>
            <View>
                <Text style={{fontSize:20, margin:22}}>We need to verify your identity</Text>

                <RadioButton.Group onValueChange={checked => setChecked(checked)} value={checked}>
                    <RadioButton.Item label="Email" value="Email" />
                    <RadioButton.Item label="Text" value="Text" />
                </RadioButton.Group>

                { (checked==='Email') && (
                    <TextInput 
                        style={styles.input}
                        placeholder="Enter email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                )}

                { (checked==='Text') && (
                    <TextInput 
                        style={styles.input}
                        placeholder="Enter phone number"
                        keyboardType="phone-pad"
                        autoCapitalize="none"
                    />
                )}
            </View>

            <View style={{marginTop:20}}>
                <Pressable onPress={ () => {
                    navigation.dispatch(StackActions.replace('TabsNavigator'))
                }}>
                    <Text style={styles.verificationPressable}>Send Verification Code</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}
  
const styles = StyleSheet.create({
    verificationPressable: {
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
    input: {
        alignSelf: 'center',
        height: 40,
        width: 350,
        borderWidth: 1,
        padding: 10,
        borderColor: '#808080',
    },
});

export default ResetPasswordScreen;