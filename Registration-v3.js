import { SafeAreaView, StyleSheet, Text, TextInput, Pressable, View } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { UseTogglePasswordVisibility } from './UseTogglePasswordVisibility';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { sendEmailVerification, updateEmail, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./FirebaseApp";

const Registration_v3 = ({navigation}) => {
    const [emailAddress, onEmailChanged] = useState('');
    const [key, setKey] = useState('');
    const [hasError, onHasErrorChanged] = useState(false);
    const [error, setError] = useState('');
    const [userCreated, setUserCreated] = useState(false);
    const [codeIsSent, setCodeSent] = useState(false);
    const [emailConfirmed, setEmailConfirmed] = useState(false);
    const [resendIsActive, setResendActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState(null);
    const [targetTime, setTargetTime] = useState(null);
    const { passwordVisibility, rightIcon, handlePasswordVisibility } = UseTogglePasswordVisibility();

    let resendTimerInterval;

    const triggerTimer = (targetTimeInSeconds = 30) => {
        setTargetTime(targetTimeInSeconds);
        setResendActive(false);
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
            setResendActive(true);
            setTimeLeft(null);
            setCodeSent(false);
        }
    }

    const generateRandomString = (lenth) => {
        const char = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890';
        const random = Array.from(
            {length: lenth},
            () => char[Math.floor(Math.random() * char.length)]
        );
        const randomKey = random.join("");
        return randomKey
    }

    const sendVerificationEmailPressed = async () => {
        try {
            onHasErrorChanged(false);
            generateRandomString(8);
            const userCredential = await createUserWithEmailAndPassword(auth, emailAddress, generateRandomString(8));
            setUserCreated(true);
        } catch (err) {
            setUserCreated(false);
            onHasErrorChanged(true);
            setError(err.message);
        }
    }

    return (
        <SafeAreaView style={{flex:1}}>
            
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

            <Text style={styles.screentitle}>Registration</Text>
            <Text style={styles.descTxt}>Verify your email to register. It will only take a few minutes.</Text>
            <Text style={styles.titleTxt}>Enter your email address</Text>

            { !codeIsSent && (
                <View>
                    <TextInput 
                        style={styles.input}
                        placeholder="example@example.example"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onChangeText={onEmailChanged}
                        value={emailAddress}
                    />
                    <Pressable onPress={ () => {
                        sendVerificationEmailPressed();
                        if (!hasError && userCreated) {
                            updateEmail(auth.currentUser, emailAddress).then(() => {
                                // Email updated!
                                // ...
                            }).catch((error) => {
                                // An error occurred
                                // ...
                            });
                            sendEmailVerification(auth.currentUser)
                            .then(() => {
                                // Email verification sent!
                                // ...
                            });
                            setCodeSent(true);
                            triggerTimer(30);
                            return () => {
                                clearInterval(resendTimerInterval);
                            }
                        };
                    }} disabled={codeIsSent}>
                        <Text style={styles.PressableStyle}>Send Verification Email</Text>
                    </Pressable>
                </View>
            )}

            { hasError && (
                <Text style={styles.errorStyle}>{error}</Text>
            )}

            { codeIsSent && (
                <View style={{}}>
                    <TextInput 
                        style={styles.disabledInput}
                        placeholder="example@example.example"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        editable={false}
                        selectTextOnFocus={false}
                        value={emailAddress}
                    />
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
        borderWidth: 1,
        padding: 10,
        borderColor: '#808080',
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
    inputContainer: {
        height: 45,
        width: '90%',
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
        marginRight:22
    },
    errorStyle: {
        color: '#ff0000',
        alignSelf: 'center',
        marginTop: 22
    }
});

export default Registration_v3;