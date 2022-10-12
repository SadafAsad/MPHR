import { SafeAreaView, StyleSheet, Text, View, Pressable, TextInput } from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { StackActions } from '@react-navigation/native';

const AddressInfo = ({navigation}) => {
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
                    activeStep={2}
                    completedLabelColor="black"
                    completedStepIconColor="#335C67"
                    completedProgressBarColor="#335C67"
                >
                    <ProgressStep label="Registration" removeBtnRow={true}/>
                    <ProgressStep label="Profile" removeBtnRow={true}/>
                    <ProgressStep label="Address" removeBtnRow={true}/>
                </ProgressSteps>
            </View>
            <Text style={styles.screentitle}>Address Info</Text>
            <Text style={styles.descTxt}>Complete your profile information. It will only take a few minutes.</Text>
            <Text style={styles.titleTxt}>Address</Text>
            <TextInput 
                style={styles.input}
                placeholder=""
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <Text style={styles.titleTxt}>Address line 2</Text>
            <TextInput 
                style={styles.input}
                placeholder=""
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <Text style={styles.titleTxt}>City</Text>
            <TextInput 
                style={styles.input}
                placeholder=""
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <Text style={styles.titleTxt}>Country</Text>
            <Text style={styles.titleTxt}>Province / State</Text>
            <Text style={styles.titleTxt}>Postal Code</Text>
            <Pressable onPress={ () => {
                navigation.dispatch(StackActions.replace('TabsNavigator'))
            }}>
                <Text style={styles.PressableStyle}>Create Account</Text>
            </Pressable>
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
    }
});

export default AddressInfo;