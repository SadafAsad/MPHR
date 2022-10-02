import { SafeAreaView, StyleSheet, Text, Pressable } from 'react-native';
import { StackActions } from '@react-navigation/native';

const LoginScreen = ({navigation}) => {
    return (
        <SafeAreaView>
            <Text>Log In Screen</Text>
            <Pressable onPress={ () => {
                navigation.dispatch(
                    StackActions.replace('TabsNavigator')
                )
            }}>
                <Text>CLICK HERE TO LOGIN</Text>
            </Pressable>
        </SafeAreaView>
    );
}
  
const styles = StyleSheet.create({
});

export default LoginScreen;