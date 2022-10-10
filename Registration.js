import { SafeAreaView, StyleSheet, Text, TextInput, Pressable, View } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { ProgressBar } from 'react-native-paper';
import { useState } from 'react';
import { UseTogglePasswordVisibility } from './UseTogglePasswordVisibility';
import { StackActions } from '@react-navigation/native';

const RegistrationStep1 = ({navigation}) => {
    const [codeIsSent, setCodeSent] = useState(false);
    const [emailConfirmed, setEmailConfirmed] = useState(false);
    const { passwordVisibility, rightIcon, handlePasswordVisibility } = UseTogglePasswordVisibility();

    return (
        <SafeAreaView>
            <ProgressBar progress={0.333} color={'#335C67'}/>
            <Text>Registration</Text>
            <Text>Verify your email to register. It will only take a few minutes.</Text>
            <Text>Enter your email address</Text>
            <TextInput 
                style={styles.input}
                placeholder="example@example.example"
                keyboardType="email-address"
                autoCapitalize="none"
            />

            { !codeIsSent && (
                <Pressable onPress={ () => {
                    setCodeSent(true);
                }} disabled={codeIsSent}>
                    <Text style={styles.PressableStyle}>Send Verification Code</Text>
                </Pressable>
            )}

            { codeIsSent && !emailConfirmed && (
                <View>
                    <Text>Enter verification code</Text>
                    <Text>Enter the verification code that was sent to your email.</Text>
                    <TextInput
                        style={styles.verificationCode}
                        placeholder="------"
                        autoCapitalize="none"
                    />
                    <Pressable onPress={ () => {
                        // send a new verification code
                    }}>
                        <Ionicons name="refresh" size={24} color="black"/>
                        <Text>Send again</Text>
                    </Pressable>
                    <Pressable onPress={ () => {
                        setEmailConfirmed(true);
                    }} disabled={emailConfirmed}>
                        <Text style={styles.PressableStyle}>Confirm</Text>
                    </Pressable>
                </View>
            )}

            { codeIsSent && emailConfirmed && (
                <View>
                    <Text>Set a password</Text>
                    <View style={styles.inputContainer}>
                        <TextInput 
                        style={styles.inputField}
                        placeholder=""
                        keyboardType="default"
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={passwordVisibility}
                        />
                        <Pressable onPress={handlePasswordVisibility}>
                            <MaterialCommunityIcons name={rightIcon} size={22} color="#232323" />
                        </Pressable>
                    </View>
                    <Pressable onPress={ () => {
                        // go to next screen
                        navigation.dispatch(StackActions.replace('TabsNavigator'))
                    }}>
                        <Text style={styles.PressableStyle}>Next</Text>
                    </Pressable>
                </View>
            )}
        </SafeAreaView>
    );
}
  
const styles = StyleSheet.create({
    input: {
        alignSelf: 'center',
        height: 40,
        width: 350,
        borderWidth: 1,
        padding: 10,
        borderColor: '#808080',
    },
    PressableStyle: {
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
    verificationCode: {
        alignSelf: 'center',
        height: 40,
        width: 175,
        borderWidth: 1,
        padding: 10,
        borderColor: '#808080',
    },
    inputContainer: {
        height: 40,
        width: 350,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#808080'
    },
    inputField: {
        padding: 10,
        width: '90%'
    }
});

export default RegistrationStep1;