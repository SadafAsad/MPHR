import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PetsScreen from './PetsScreen';
import VetsScreen from './VetsScreen';
import PetProfileScreen from './PetProfileScreen';
import SettingScreen from './SettingScreen';
import AddVetScreen from './AddVetScreen';
import AddVetClinicsScreen from './AddVetClinicsScreen';
import LoginScreen from './LoginScreen';
import ResetPasswordScreen_v2 from './ResetPasswordScreen-v2';
import Registration_v3 from './Registration-v3';
import SetPasswordScreen from './SetPasswordScreen';
import ProfileInfo from './ProfileInfo';
import AddressInfo from './AddressInfo';
import EditProfileScreen from './EditProfileScreen';
import EditAddressScreen from './EditAddressScreen';
import ChangePasswordScreen from './ChangePasswordScreen';
import NotificationsSettingScreen from './NotificationsSettingScreen';
import CheckMailScreen from './CheckMailScreen';
import CreateNewPasswordScreen from './CreateNewPasswordScreen';
import DeleteAccountScreen from './DeleteAccountScreen';
import CreatePetProfile from './CreatePetProfile';
import CreatePetProfile2Screen from './CreatePetProfile2Screen';
import PetHistoryScreen from './PetHistoryScreen';
import AddPetHistoryScreen from './AddPetHistoryScreen';
import PetSettingScreen from './PetSettingScreen';
import EditPetScreen_1 from './EditPetScreen-1';
import EditPetScreen_2 from './EditPetScreen-2';
import ManageCaregiverSCreen from './ManageCareGiverScreen';
import AddCaregiverScreen from './AddCaregiverScreen';
import { Pressable, View, Alert } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons'; 
import { auth } from './FirebaseApp';
import { signOut } from "firebase/auth";

const Stack = createNativeStackNavigator();

const AuthenticationNavigator = ({navigation}) => {
    return(
        <Stack.Navigator screenOptions={{
            headerTintColor:'#335C67',
            headerTitleStyle:{color:'#000000'},
            }}>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Registration" component={Registration_v3}/>
            <Stack.Screen name="SetPassword" component={SetPasswordScreen} options={{title:'Registration'}}/>
            <Stack.Screen name="Profile" component={ProfileInfo}/>
            <Stack.Screen name="Address" component={AddressInfo}/>
            <Stack.Screen name="ResetPassword" component={ResetPasswordScreen_v2} options={{title:'Reset Password'}}/>
            <Stack.Screen name="MainNavigator" component={MainNavigator} options={{header: () => null}}/>
        </Stack.Navigator>
    )
}

export {AuthenticationNavigator};

const MainNavigator = ({navigation}) => {
    return(
        <Stack.Navigator screenOptions={{
            headerTintColor:'#335C67',
            headerTitleStyle:{color:'#000000'},
            }}>
            <Stack.Screen 
            name="PetsScreen" 
            component={PetsScreen} 
            options={{
                title: 'Pets',
                headerRight: () => (
                    <View style={{flexDirection:'row'}}>
                      <Pressable onPress={ () => {
                          navigation.navigate("Settings");
                      }}>
                          <Ionicons name="settings-sharp" size={24} color='#335C67' style={{marginRight:15}}/>
                      </Pressable>
                      <Pressable onPress={ () => {
                            Alert.alert('Logout', 'Are you sure you want to logout?', [  
                                {text: 'NO', onPress: () => console.log('NO Pressed'), style:'cancel'},  
                                {text: 'YES', onPress: async () => {
                                    try {
                                        await signOut(auth);
                                        navigation.reset({index:0, routes:[{name: 'AuthenticationNavigator'}], key:null});      
                                    } catch (err) {
                                        console.log(`Logout failed: ${err.message}`);
                                    }
                                }},
                            ]);
                      }}>
                          <MaterialIcons name="logout" size={24} color='#335C67' />
                      </Pressable>
                    </View>
                    
                )
            }}/>
            <Stack.Screen name="PetProfileScreen" component={PetProfileScreen}/>
            <Stack.Screen name="PetSettingScreen" component={PetSettingScreen} options={{title:'Pet Settings'}}/>
            <Stack.Screen name="Settings" component={SettingScreen} options={{
                headerRight: () => (
                    <Pressable onPress={ () => {
                        Alert.alert('LOGOUT', 'Are you sure you want to logout?', [  
                            {text: 'NO', onPress: () => console.log('NO Pressed'), style:'cancel'},  
                            {text: 'YES', onPress: async () => {
                                try {
                                    await signOut(auth);
                                    navigation.reset({index:0, routes:[{name: 'AuthenticationNavigator'}], key:null});      
                                } catch (err) {
                                    console.log(`Logout failed: ${err.message}`);
                                }
                            }},
                        ]);
                    }}>
                        <MaterialIcons name="logout" size={24} color='#335C67' />
                    </Pressable>
                )
            }}/>
            <Stack.Screen name="AddVetScreen" component={AddVetScreen}/>
            <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} options={{title:'Profile Info'}}/>
            <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} options={{title:'Change Password'}}/>
            <Stack.Screen name="NotificationsSettingScreen" component={NotificationsSettingScreen} options={{title:'Notifications'}}/>
            <Stack.Screen name="CheckMailScreen" component={CheckMailScreen}/>
            <Stack.Screen name="CreateNewPasswordScreen" component={CreateNewPasswordScreen}/>
            <Stack.Screen name="DeleteAccountScreen" component={DeleteAccountScreen} options={{title:'Delete Account'}}/>
            <Stack.Screen name="EditAddressScreen" component={EditAddressScreen} options={{title:'Address Info'}}/>
            <Stack.Screen name="CreatePetProfile" component={CreatePetProfile} options={{title:'Add Pet'}}/>
            <Stack.Screen name="CreatePetProfile2Screen" component={CreatePetProfile2Screen} options={{title:'Add Pet'}}/>
            <Stack.Screen name="VetsScreen" component={VetsScreen} options={{title:'Veterinary Clinics'}}/>
            <Stack.Screen name="Vaccinations" component={PetHistoryScreenNavigator}/>
            <Stack.Screen name="ManageCaregiverSCreen" component={ManageCaregiverSCreen}/>
            <Stack.Screen name="AddVetClinicsScreen" component={AddVetClinicsScreen}/>
            <Stack.Screen name="AddCaregiverScreen" component={AddCaregiverScreen}/>
            <Stack.Screen name="EditPetScreen-1" component={EditPetScreen_1} options={{title:'Edit Pet'}}/>
            <Stack.Screen name="EditPetScreen-2" component={EditPetScreen_2} options={{title:'Edit Pet'}}/>
            <Stack.Screen name="AuthenticationNavigator" component={AuthenticationNavigator} options={{header: () => null}}/>
        </Stack.Navigator>
    )
}

export {MainNavigator};

const PetHistoryScreenNavigator =({navigation}) => {
    return(
        <Stack.Navigator>
            <Stack.Screen 
            name="PetHistoryScreen" 
            component={PetHistoryScreen} 
            options={{
                title: 'Vaccinations', 
                headerShown: false
            }}/>
            {/* <Stack.Screen name="PetProfileScreen" component={PetProfileScreen}/>
            <Stack.Screen name="SettingScreen" component={SettingScreen}/>
            <Stack.Screen name="AddPetScreen" component={AddPetScreen}/>
            <Stack.Screen name="AddVetScreen" component={AddVetScreen}/>
            <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} options={{ title: 'Edit Profile' }}/>
            <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} options={{ title: 'Change password' }}/>
            <Stack.Screen name="NotificationsSettingScreen" component={NotificationsSettingScreen} options={{ title: 'Notifications' }}/>
            <Stack.Screen name="CheckMailScreen" component={CheckMailScreen}/>
            <Stack.Screen name="CreateNewPasswordScreen" component={CreateNewPasswordScreen}/>
            <Stack.Screen name="DeleteAccountScreen" component={DeleteAccountScreen}/>
            <Stack.Screen name="EditAddressScreen" component={EditAddressScreen}/>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="CreatePetProfile" component={CreatePetProfile}/>
            <Stack.Screen name="CreatePetProfile2Screen" component={CreatePetProfile2Screen}/>
            <Stack.Screen name="VetsTabScreen" component={VetsTabScreen}/> */}
            <Stack.Screen name="AddPetHistoryScreen" component={AddPetHistoryScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}

export {PetHistoryScreenNavigator}
