import { StyleSheet, Text, SafeAreaView, Pressable, FlatList, View, Image, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Card } from 'react-native-paper'
import { FontAwesome } from '@expo/vector-icons';
import { StackActions } from '@react-navigation/native';
import { useState } from "react";
import CheckBox from "expo-checkbox";
import { UseTogglePasswordVisibility } from './UseTogglePasswordVisibility';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SettingScreen = ({navigation}) => {

    // return (
    //     <SafeAreaView style={styles.screen}>
    //         <Pressable onPress={() => navigation.navigate("EditProfileScreen")}>
    //             <Card style={styles.list} >
    //                 <Text>Edit Profile</Text>
    //             </Card>
    //         </Pressable>
    //     </SafeAreaView>
    // )

    const settingOptions = [
        {id: 1, name: "Edit Profile", component: "EditProfileScreen"},
        {id: 2, name: "Edit Address", component: "EditAddressScreen"},
        {id: 3, name: "Change password", component: "ChangePasswordScreen"},
        {id: 4, name: "Delete Account", component: "DeleteAccountScreen"},
        {id: 5, name: "Notifications", component: "NotificationsSettingScreen"}

    ];
    
    const renderItem = ( {item} ) => (
        <Pressable onPress={() => {
            navigation.navigate(item.component)
        }}>
            <View style={styles.pet}>
                <View>
                    <Text style={{marginLeft:20, fontSize:18}}>{item.name}</Text>
                    
                </View>
                <AntDesign name="right" size={20} color='#335C67' style={{marginRight:20}}/>
            </View>
        </Pressable>
    );
    
    const ItemDivider = () => {
        return (
            <View style={{height: 1, width: "100%", backgroundColor: "#cccccc"}}/>
        )
    }
    
    return (
        <SafeAreaView style={styles.container}>
            
            <View style={{flex:2, margin: 20, paddingLeft: 0,}}>

            <Text style={{marginTop: 10, marginBottom:10, textAlign: 'center', fontWeight: 'bold', fontSize: 30}}>Account</Text>
            <View style={styles.mainView}>
            
            <FontAwesome name="user-circle" size={60} color="black"/>
            <View style={{flex:1, margin: 20, paddingLeft: 30}}>
                <Text style={{marginTop: 10}}>Owner Name</Text>
                <Text style={{marginTop: 10}}>Owner Email</Text>
                <Text style={{marginTop: 10}}>Owner Phone</Text>
                <Text style={{marginTop: 10}}>Owner Address</Text>
                </View>
            </View>
            
            </View>
            

            <FlatList style={{marginTop:0}}
                data={settingOptions}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                ItemSeparatorComponent={ItemDivider}
                />

<View  style={{marginTop:0, marginBottom:10}}> 
                <Pressable onPress={ () => {
                    // navigation.navigate("CheckMailScreen");
                        //navigation.dispatch(StackActions.replace('CheckMailScreen'))
                        Alert.alert('Contact Us', 'Confirm',
                        [  
                            {  
                                text: 'Cancel',  
                                onPress: () => console.log('Cancel Pressed'),  
                                style: 'cancel',  
                            },  
                            {text: 'OK', onPress: () => console.log('OK Pressed')},  //console.log('OK Pressed')
                        ]  
                        );
                    }}>
                        <Text style={styles.deletePressable}>Contact Us</Text>
                </Pressable>

                <Pressable onPress={ () => {
                     //navigation.navigate('Login')
                        //navigation.dispatch(StackActions.replace('CheckMailScreen'))
                        Alert.alert('Signing Out', 'Confirm',
                        [  
                            {  
                                text: 'Cancel',  
                                onPress: () => console.log('Cancel Pressed'),  
                                style: 'cancel',  
                            },  
                            {text: 'OK', onPress: () => navigation.dispatch(StackActions.replace('AuthenticationNavigator'))},  //navigation.navigate("Login")
                        ]  
                        );
                    }}>
                        <Text style={styles.deletePressable}>Sign Out</Text>
                </Pressable>

            </View>
        </SafeAreaView>
    );

}
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    pet: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        marginBottom: 15,
        alignItems: 'center'
    },
    mainView: {
        borderRadius: 5,
        borderWidth: 1,
        margin: 10,
        paddingLeft:50,
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        alignSelf: 'center',
        
    },
    deletePressable: {
        alignSelf: 'center',
        textAlign: 'center',
        backgroundColor: '#335C67',
        color: '#ffffff',
        marginLeft: 22,
        marginRight: 22,
        marginTop: 10,
        fontSize: 18,
        padding: 15,
        width: '90%',
    },
});

export default SettingScreen;