import { SafeAreaView, StyleSheet, Text, Pressable, Image, View, TextInput } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { useState, useEffect } from "react";
import CheckBox from "expo-checkbox";
import { UseTogglePasswordVisibility } from './UseTogglePasswordVisibility';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { auth } from "./FirebaseApp";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = ({navigation}) => {
    const [emailAddress, onEmailChanged] = useState('');
    const [password, onPasswordChanged] = useState('');
    const [error, onErrorChanged] = useState('');
    const [hasError, onHasErrorChanged] = useState(false);
    const [isSelected, setSelection] = useState(false);
    const { passwordVisibility, rightIcon, handlePasswordVisibility } = UseTogglePasswordVisibility();

    const loginPressed = async () => {
        try {
            onHasErrorChanged(false);
            await signInWithEmailAndPassword(auth, emailAddress, password);
            navigation.dispatch(StackActions.replace('TabsNavigator'))
        } catch (err) {
            onErrorChanged("Your email or password is incorrect. Please try again.");
            onEmailChanged("");
            onPasswordChanged("");
            onHasErrorChanged(true);
        }
    }

    return (
        <SafeAreaView style={{backgroundColor:'#fff', flex:1, justifyContent:'space-between'}}>
            <Image source={require('./assets/MPHR.png')} style={styles.img}/>
            <View style={{marginTop:300}}/>

            <View style={{flex:1, alignItems:'baseline'}}>
                <Text style={{marginBottom:5, fontSize:16, marginLeft:22}}>Email address</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Enter email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={onEmailChanged}
                    value={emailAddress}
                />

                <Text style={{marginBottom:5, fontSize:16, marginTop:15, marginLeft:22}}>Password</Text>
                <View style={styles.inputContainer}>
                    <TextInput 
                        style={styles.inputField}
                        placeholder="Enter password"
                        keyboardType="default"
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={passwordVisibility}
                        onChangeText={onPasswordChanged}
                        value={password}
                    />
                    <Pressable onPress={handlePasswordVisibility}>
                        <MaterialCommunityIcons name={rightIcon} size={22} color="#232323" />
                    </Pressable>
                </View>

                <View style={{flexDirection:'row', justifyContent:'space-between', alignSelf:'stretch', alignItems:'center', marginTop:15, width:'90%', marginLeft:22}}>
                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                        <CheckBox
                            value={isSelected}
                            onValueChange={setSelection}
                            color='#335C67'
                        />
                        <Text style={{marginLeft:5, fontSize:15}}>Remember me</Text>
                    </View>
                    <Pressable onPress={ () => {
                        navigation.navigate("ResetPassword")
                    }}>
                        <Text style={{fontSize:15, color:'#335C67', alignSelf:'flex-end'}}>Forgot Password?</Text>
                    </Pressable>
                </View>

                { hasError && (
                    <Text style={styles.errorStyle}>{error}</Text>
                )}
            </View>

            <View style={{marginTop:20}}>
                <Pressable onPress={loginPressed}>
                    <Text style={styles.loginPressable}>Log In</Text>
                </Pressable>
                <Pressable onPress={() => {
                    // navigation.navigate("Signup")
                    navigation.navigate("Registration")
                }}>
                    <Text style={styles.signupPressable}>Sign Up</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}
  
const styles = StyleSheet.create({
    img: {
        position: 'absolute',
        alignSelf: 'center',
        marginTop: -100
    },
    loginPressable: {
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
    signupPressable: {
        alignSelf: 'center',
        textAlign: 'center',
        backgroundColor: '#ffffff',
        color: '#335C67',
        borderColor: '#335C67',
        borderStyle: 'solid',
        borderWidth: 1,
        marginLeft: 22,
        marginRight: 22,
        marginTop: 22,
        marginBottom: 0,
        fontSize: 18,
        padding: 15,
        width: '90%',
    },
    input: {
        alignSelf: 'center',
        height: 45,
        width: '90%',
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
    errorStyle: {
        color: '#ff0000',
        alignSelf: 'center',
        marginTop: 22
    }
});

export default LoginScreen;