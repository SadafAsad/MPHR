import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import Registration_v3 from './screens/Registration-v3';
import SetPasswordScreen from './screens/SetPasswordScreen';
import ResetPasswordScreen_v2 from './screens/ResetPasswordScreen-v2';
import ProfileInfo from './screens/ProfileInfo';
import AddressInfo from './screens/AddressInfo';
import PetsScreen from './screens/PetsScreen';
import SettingScreen from './screens/SettingScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import EditAddressScreen from './screens/EditAddressScreen';
import ChangePasswordScreen from './screens/ChangePasswordScreen';
import CheckMailScreen from './screens/CheckMailScreen';
import CreateNewPasswordScreen from './screens/CreateNewPasswordScreen';
import DeleteAccountScreen from './screens/DeleteAccountScreen';
import CreatePetProfile from './screens/CreatePetProfile';
import CreatePetProfile2Screen from './screens/CreatePetProfile2Screen';
import VetsScreen from './screens/VetsScreen';
import AddVetClinicsScreen from './screens/AddVetClinicsScreen';
import PetProfileScreen from './screens/PetProfileScreen';
import PetSettingScreen from './screens/PetSettingScreen';
import UploadNewScreen from './screens/UploadNewScreen';
import ShareMedicalRecordScreen from './screens/ShareMedicalRecordScreen';
import EditPetScreen_1 from './screens/EditPetScreen-1';
import EditPetScreen_2 from './screens/EditPetScreen-2';
import ManageCaregiverScreen from './screens/ManageCareGiverScreen';
import TransferOwnershipScreen from './screens/TransferOwnershipScreen';
import DeletePetScreen from './screens/DeletePetScreen';
import PetHistoryScreen from './screens/PetHistoryScreen';
import AddPetHistoryScreen from './screens/AddPetHistoryScreen';
import AddCaregiverScreen from './screens/AddCaregiverScreen';
import DeleteCaregiverScreen from './screens/DeleteCaregiverScreen';
import { Pressable, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import ShowHistoryScreen from './screens/ShowHistoryScreen';
import DeleteMedicalRecordsScreen from './screens/DeleteMedicalRecordsScreen';
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
            headerTitleStyle:{color:'#000000'}
            }}>
            <Stack.Screen name="PetsScreen" component={PetsScreen} options={{title:'Pets'}}/>
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
            <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} options={{title:'Profile Info'}}/>
            <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} options={{title:'Change Password'}}/>
            <Stack.Screen name="CheckMailScreen" component={CheckMailScreen}/>
            <Stack.Screen name="CreateNewPasswordScreen" component={CreateNewPasswordScreen}/>
            <Stack.Screen name="DeleteAccountScreen" component={DeleteAccountScreen} options={{title:'Delete Account'}}/>
            <Stack.Screen name="EditAddressScreen" component={EditAddressScreen} options={{title:'Address Info'}}/>
            <Stack.Screen name="CreatePetProfile" component={CreatePetProfile} options={{title:'Add Pet'}}/>
            <Stack.Screen name="CreatePetProfile2Screen" component={CreatePetProfile2Screen} options={{title:'Add Pet'}}/>
            <Stack.Screen name="VetsScreen" component={VetsScreen} options={{title:'Veterinary Clinics'}}/>
            <Stack.Screen name="Vaccinations" component={PetHistoryScreenNavigator}/>
            <Stack.Screen name="ManageCaregiverScreen" component={ManageCaregiverScreen } options={{title:'Manage Caregiver'}}/>
            <Stack.Screen name="AddVetClinicsScreen" component={AddVetClinicsScreen} options={{title:'Add Vet Clinic'}}/>
            <Stack.Screen name="AddCaregiverScreen" component={AddCaregiverScreen} options={{title:'Add Caregiver'}}/>
            <Stack.Screen name="UploadNewScreen" component={UploadNewScreen} options={{title:'Upload Medical Record'}}/>
            <Stack.Screen name="ShareMedicalRecordScreen" component={ShareMedicalRecordScreen} options={{title:'Share Medical Record'}}/>
            <Stack.Screen name="EditPetScreen-1" component={EditPetScreen_1} options={{title:'Edit Pet'}}/>
            <Stack.Screen name="EditPetScreen-2" component={EditPetScreen_2} options={{title:'Edit Pet'}}/>
            <Stack.Screen name="DeletePetScreen" component={DeletePetScreen} options={{title:'Delete Pet'}}/>
            <Stack.Screen name="ShowHistoryScreen" component={ShowHistoryScreen} options={{title:'Medical Records'}}/>
            <Stack.Screen name="DeleteMedicalRecordsScreen" component={DeleteMedicalRecordsScreen} options={{title: 'Delete Medical Record'}}/>
            <Stack.Screen name="TransferPetOwnership" component={TransferOwnershipScreen} options={{title:'Transfer Ownership'}}/>
            <Stack.Screen name="DeleteCaregiver" component={DeleteCaregiverScreen} options={{title:'Remove Caregiver'}}/>
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
