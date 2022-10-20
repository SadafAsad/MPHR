import { SafeAreaView, StyleSheet, Text, TextInput, Pressable, View } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { UseTogglePasswordVisibility } from './UseTogglePasswordVisibility';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { sendEmailVerification,  } from "firebase/auth";
import { auth } from "./FirebaseApp";
import { FontAwesome } from '@expo/vector-icons'; 

const ResetPasswordScreen_v2 = ({navigation}) => {
    const [emailAddress, onEmailChanged] = useState('');
    const [hasError, onHasErrorChanged] = useState(false);
    const [error, setError] = useState('');
    const [codeIsSent, setCodeSent] = useState(false);
    const [timeLeft, setTimeLeft] = useState(null);
    const [targetTime, setTargetTime] = useState(null);
    const { passwordVisibility, rightIcon, handlePasswordVisibility } = UseTogglePasswordVisibility();

    let resendTimerInterval;

    const triggerTimer = (targetTimeInSeconds = 30) => {
        setTargetTime(targetTimeInSeconds);
        const finalTime = +new Date() + targetTimeInSeconds*1000;
        resendTimerInterval = setInterval(() => calculateTimeLeft(finalTime), 1000);
    }

    const calculateTimeLeft = (finalTime) => {
        const difference = finalTime - +new Date();
        if (difference >= 0) {
            setTimeLeft(Math.round(difference/1000));
        }
        else {
            clearInterval(resendTimerInterval);
            setTimeLeft(null);
            setCodeSent(false);
        }
    }

    const sendVerificationEmailPressed = async () => {
        try {
            // await auth.getUserByEmail(emailAddress)
            //     .then((userRecord) => {
            //         // See the UserRecord reference doc for the contents of userRecord.
            //         console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
            //     })
            //     .catch((error) => {
            //         console.log('Error fetching user data:', error);
            //     });
            sendEmailVerification(emailAddress, {
                handleCodeInApp: true,
                url: 'https://mphr-fall2022.firebaseapp.com',
            });
            onHasErrorChanged(false);
            setCodeSent(true);
            triggerTimer(30);
            return () => {
                clearInterval(resendTimerInterval);
            }
        } catch (err) {
            onHasErrorChanged(true);
            setError(err.message);
        }
    }

    return (
        <SafeAreaView style={{flex:1}}>

            <Text style={styles.screentitle}>Forgot Password</Text>
            <Text style={styles.descTxt}>Verify your email to change your password.</Text>

            { !codeIsSent && (
                <View>
                    <Text style={styles.titleTxt}>Enter your email address</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder="example@example.example"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onChangeText={onEmailChanged}
                        value={emailAddress}
                    />
                    <Pressable onPress={sendVerificationEmailPressed} disabled={codeIsSent}>
                        <Text style={styles.PressableStyle}>Send Verification Email</Text>
                    </Pressable>
                </View>
            )}

            { hasError && (
                <Text style={styles.errorStyle}>{error}</Text>
            )}

            { codeIsSent && (
                <View>
                    <Text style={styles.titleTxt}>Email address</Text>
                    <View style={styles.inputContainer}>
                        <FontAwesome name="lock" size={22} color="black" style={{marginLeft:10}}/>
                        <TextInput 
                            style={styles.disabledInput}
                            placeholder="example@example.example"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            selectTextOnFocus={false}
                            value={emailAddress}
                        />
                    </View>
                    <Pressable disabled={true}>
                        <Text style={styles.disabledPressable}>Send Verification Email</Text>
                    </Pressable>
                    <Text style={{alignSelf:'center', fontSize:13, marginTop:22}}>
                        Try again in <Text style={{fontWeight:'bold'}}>{timeLeft || targetTime}</Text> second(s)
                    </Text>
                </View>
            )}
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
    disabledInput: {
        alignSelf: 'center',
        height: 45,
        width: '90%',
        padding: 10,
        borderColor: '#808080',
    },
    inputContainer: {
        alignSelf: 'center',
        height: 45,
        width: '90%',
        borderWidth: 1,
        borderColor: '#808080',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'lightgray',
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
        width: '90%',
    },
    disabledPressable: {
        alignSelf: 'center',
        textAlign: 'center',
        backgroundColor: 'lightgray',
        color: '#ffffff',
        marginLeft: 22,
        marginRight: 22,
        marginTop: 22,
        fontSize: 18,
        padding: 15,
        width: '90%',
    },
    verificationCode: {
        flex:1,
        alignSelf: 'center',
        height: 45,
        width: '60%',
        borderWidth: 1,
        padding: 10,
        borderColor: '#808080',
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
    },
    screentitle: {
        fontWeight:'bold', 
        fontSize:30, 
        marginLeft:22, 
        marginRight:22,
        marginTop: 22
    },
    errorStyle: {
        color: '#ff0000',
        alignSelf: 'center',
        marginTop: 22
    }
});

export default ResetPasswordScreen_v2;