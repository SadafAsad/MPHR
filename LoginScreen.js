import { SafeAreaView, StyleSheet, Text, Pressable, Image, View, TextInput } from 'react-native';
import { StackActions } from '@react-navigation/native';

const LoginScreen = ({navigation}) => {
    return (
        <SafeAreaView style={{backgroundColor:'#fff', flex:1, justifyContent:'space-between'}}>
            <Image source={require('./assets/MPHR.png')} style={styles.img}/>
            <View style={{marginTop:300}}/>

            <View style={{flex:1, alignItems:'baseline', alignSelf:'center'}}>
                <Text style={{marginBottom:5, fontSize:16}}>Email address:</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Enter email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <Text style={{marginBottom:5, fontSize:16, marginTop:20}}>Password:</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Enter password"
                    keyboardType="default"
                    autoCapitalize="none"
                    secureTextEntry={true}
                />
                <Pressable onPress={ () => {
                    navigation.navigate("ResetPasswordScreen")
                }}>
                    <Text style={{fontSize:14, color:'#335C67', marginTop:5}}>Forgot Password?</Text>
                </Pressable>
            </View>

            <View style={{marginTop:20}}>
                <Pressable onPress={ () => {
                    navigation.dispatch(StackActions.replace('TabsNavigator'))
                }}>
                    <Text style={styles.loginPressable}>Log In</Text>
                </Pressable>
                <Pressable onPress={() => {
                    navigation.navigate("SignupScreen")
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
    input: {
        alignSelf: 'center',
        height: 40,
        width: 350,
        borderWidth: 1,
        padding: 10,
        borderColor: '#808080',
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
});

export default LoginScreen;