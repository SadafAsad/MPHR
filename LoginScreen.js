import { SafeAreaView, StyleSheet, Text, Pressable, Image, View, TextInput } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { useState } from "react";
import CheckBox from "expo-checkbox";
import { UseTogglePasswordVisibility } from './UseTogglePasswordVisibility';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const LoginScreen = ({navigation}) => {
    const [isSelected, setSelection] = useState(false);
    const { passwordVisibility, rightIcon, handlePasswordVisibility } = UseTogglePasswordVisibility();

    return (
        <SafeAreaView style={{backgroundColor:'#fff', flex:1, justifyContent:'space-between'}}>
            <Image source={require('./assets/MPHR.png')} style={styles.img}/>
            <View style={{marginTop:300}}/>

            <View style={{flex:1, alignItems:'baseline', alignSelf:'center'}}>
                <Text style={{marginBottom:5, fontSize:16}}>Email address</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Enter email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <Text style={{marginBottom:5, fontSize:16, marginTop:20}}>Password</Text>
                <View style={styles.inputContainer}>
                    <TextInput 
                        style={styles.inputField}
                        placeholder="Enter password"
                        keyboardType="default"
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={passwordVisibility}
                    />
                    <Pressable onPress={handlePasswordVisibility}>
                        <MaterialCommunityIcons name={rightIcon} size={22} color="#232323" />
                    </Pressable>
                </View>

                <View style={{flexDirection:'row', justifyContent:'space-between', alignSelf:'stretch', alignItems:'center', marginTop:15}}>
                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                        <CheckBox
                            value={isSelected}
                            onValueChange={setSelection}
                        />
                        <Text style={{marginLeft:5, fontSize:15}}>Remember me</Text>
                    </View>
                    <Pressable onPress={ () => {
                        navigation.navigate("ResetPassword")
                    }}>
                        <Text style={{fontSize:15, color:'#335C67', alignSelf:'flex-end'}}>Forgot Password?</Text>
                    </Pressable>
                </View>
            </View>

            <View style={{marginTop:20}}>
                <Pressable onPress={ () => {
                    navigation.dispatch(StackActions.replace('TabsNavigator'))
                }}>
                    <Text style={styles.loginPressable}>Log In</Text>
                </Pressable>
                <Pressable onPress={() => {
                    navigation.navigate("Signup")
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
        width: 350,
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

export default LoginScreen;