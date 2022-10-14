import { SafeAreaView, StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import SelectList from 'react-native-dropdown-select-list';
import { useState } from 'react';


const EditProfileScreen = ({navigation}) => {
    const [selectedNumCode, setSelectedNumCode] = useState("");

    const numCode = [{key:'1',value:'+1'}];

    return (
        <SafeAreaView style={{flex:1}}>
            <Text style={styles.screentitle}>Profile Info</Text>
            <Text style={styles.titleTxt}>First name</Text>
            <TextInput 
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
            />
            <Text style={styles.titleTxt}>Last name</Text>
            <TextInput 
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
            />
            <Text style={styles.titleTxt}>Phone number</Text>
            <View style={{flexDirection:'row', alignItems:'center', width:'90%', alignSelf:'center'}}>
                <SelectList 
                    setSelected={setSelectedNumCode} 
                    data={numCode} 
                    onSelect={() => alert(selectedNumCode)}
                    boxStyles={styles.numCodeInput}
                    dropdownItemStyles={styles.numCodeInput}
                    dropdownStyles={{borderColor:'transparent'}}
                    maxHeight='100'
                    searchPlaceholder=""
                    search={false}
                    placeholder=" "
                />
                <TextInput 
                    style={styles.rowInput}
                    placeholder="(_ _ _)_ _ _-_ _ _"
                    keyboardType="default"
                    autoCapitalize="none"
                />
            </View>
            <Pressable onPress={ () => {
                //navigation.dispatch(StackActions.replace('TabsNavigator'))
                Alert.alert('Save Changes', 'Confirm',
                [  
                    {  
                        text: 'Cancel',  
                        onPress: () => console.log('Cancel Pressed'),  
                        style: 'cancel',  
                    },  
                    {text: 'OK', onPress: () => navigation.navigate('SettingScreen')},  
                ]  
                );
            }}>
                <Text style={styles.PressableStyle}>Update Profile</Text>
            </Pressable>
                {/* <View style={styles.deleteAccount}>
                    <Pressable onPress={ () => {
                        //navigation.dispatch(StackActions.replace('TabsNavigator'))
                        Alert.alert('Delete Account', 'Confirm',
                        [  
                            {  
                                text: 'Cancel',  
                                onPress: () => console.log('Cancel Pressed'),  
                                style: 'cancel',  
                            },  
                            {text: 'OK', onPress: () => console.log('OK Pressed')},  
                        ]  
                        );
                    }}>
                        <Text style={styles.deletePressable}>Delete My Account</Text>
                    </Pressable>
               
                </View> */}
           
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
        borderRadius: '0%',
    },
    numCodeInput: {
        alignSelf: 'center',
        height: 45,
        borderWidth: 1,
        padding: 10,
        borderColor: '#808080',
        borderRadius: '0%',
    },
    rowInput: {
        flex: 1,
        alignSelf: 'center',
        height: 45,
        borderWidth: 1,
        padding: 10,
        borderColor: '#808080',
        borderRadius: '0%',
        marginLeft: 5
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
        marginTop:22
    }
});

export default EditProfileScreen;
