import { SafeAreaView, StyleSheet, Text, TextInput, Pressable, View } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { UseTogglePasswordVisibility } from './UseTogglePasswordVisibility';
import { StackActions } from '@react-navigation/native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';

const RegistrationStep1 = ({navigation}) => {
    const [codeIsSent, setCodeSent] = useState(false);
    const [emailConfirmed, setEmailConfirmed] = useState(false);
    const { passwordVisibility, rightIcon, handlePasswordVisibility } = UseTogglePasswordVisibility();

    return (
        <SafeAreaView style={{flex:1, alignSelf:'center'}}>
            
            <View style={{height:120}}> 
                <ProgressSteps
                    borderWidth={3}
                    activeStepIconBorderColor="#335C67"
                    activeLabelFontSize={12}
                    activeLabelColor="black"
                    labelFontSize={12}
                    labelColor="black"
                    completedLabelColor="black"
                >
                    <ProgressStep label="Registration" removeBtnRow={true}/>
                    <ProgressStep label="Profile" removeBtnRow={true}/>
                    <ProgressStep label="Address" removeBtnRow={true}/>
                </ProgressSteps>
            </View>

            <Text style={{fontWeight:'bold', fontSize:30, marginLeft:22, marginRight:22}}>Registration</Text>
            <Text style={styles.descTxt}>Verify your email to register. It will only take a few minutes.</Text>
            <Text style={styles.titleTxt}>Enter your email address</Text>

            { !emailConfirmed && (
                <TextInput 
                    style={styles.input}
                    placeholder="example@example.example"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            )}

            { codeIsSent && emailConfirmed && (
                <TextInput 
                    style={styles.disabledInput}
                    placeholder="example@example.example"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            )}

            { !codeIsSent && (
                <Pressable onPress={ () => {
                    setCodeSent(true);
                }} disabled={codeIsSent}>
                    <Text style={styles.PressableStyle}>Send Verification Code</Text>
                </Pressable>
            )}

            { codeIsSent && !emailConfirmed && (
                <View>
                    <Text style={styles.titleTxt}>Enter verification code</Text>
                    <Text style={styles.descTxt}>Enter the verification code that was sent to your email.</Text>
                    
                    <View style={{flexDirection:'row', marginLeft:22, marginTop:5, marginRight:22, alignSelf:'stretch'}}>
                        <TextInput
                            style={styles.verificationCode}
                            placeholder="------"
                            autoCapitalize="none"
                        />
                        <Pressable onPress={ () => {
                            // send a new verification code
                        }} style={{flex:1}}>
                            <View style={{flex:1, flexDirection:'row', alignSelf:'center'}}>
                                <Ionicons name="refresh" size={24} color="black" style={{alignSelf:'center'}}/>
                                <Text style={{fontSize:15, alignSelf:'center'}}>Send again</Text>
                            </View>
                        </Pressable>
                    </View>
                    <Pressable onPress={ () => {
                        setEmailConfirmed(true);
                    }} disabled={emailConfirmed}>
                        <Text style={styles.PressableStyle}>Confirm</Text>
                    </Pressable>
                </View>
            )}

            { codeIsSent && emailConfirmed && (
                <View>
                    <Text style={styles.titleTxt}>Set a password</Text>
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
    disabledInput: {
        alignSelf: 'center',
        height: 40,
        width: 350,
        borderWidth: 1,
        padding: 10,
        borderColor: '#808080',
        backgroundColor: '#c4c4c4',
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
        flex:1,
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
        borderColor: '#808080',
        alignSelf: 'center'
    },
    inputField: {
        padding: 10,
        width: '90%'
    },
    progressStyle: {
        borderWidth: 1,
        activeStepIconBorderColor: '#335C67',
        progressBarColor: '#335C67',
        activeStepIconColor: '#335C67',
        completedStepIconColor: '#335C67',
    },
    titleTxt: {
        marginTop:20, 
        marginBottom:5, 
        marginLeft:22, 
        marginRight:22
    },
    descTxt: {
        fontSize:15, 
        color:'#808080', 
        marginTop:5, 
        marginLeft:22, 
        marginRight:22
    }
});

export default RegistrationStep1;