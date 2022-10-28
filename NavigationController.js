import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PetsTabScreen from './PetsTabScreen';
import VetsTabScreen from './VetsTabScreen';
import PetProfileScreen from './PetProfileScreen';
import SettingScreen from './SettingScreen';
import AddPetScreen from './AddPetScreen';
import AddVetScreen from './AddVetScreen';
import LoginScreen from './LoginScreen';
import ResetPasswordScreen from './ResetPasswordScreen';
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
import { Pressable, View } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons'; 
import { auth } from './FirebaseApp';
import { signOut } from "firebase/auth";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const logoutPressed = async () => {
    try {
        await signOut(auth)
        navigation.dispatch(StackActions.popToTop());          
    } catch (err) {
        console.log(`Logout failed: ${err.message}`);
    }
}

// --------- bugs to be fixed ------------
// SettingScreen back button goes to NotificationTabScreen
// When logout, stack has screens 'HIGH PRIORITY'

const AuthenticationNavigator = ({navigation}) => {
    return(
        <Stack.Navigator screenOptions={{
            headerTintColor:'#335C67',
            headerTitleStyle:{color:'#000000'}
            }}>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Registration" component={Registration_v3}/>
            <Stack.Screen name="SetPassword" component={SetPasswordScreen}/>
            <Stack.Screen name="Profile" component={ProfileInfo}/>
            <Stack.Screen name="Address" component={AddressInfo}/>
            <Stack.Screen name="ResetPassword" component={ResetPasswordScreen}/>
            <Stack.Screen name="MainNavigator" component={MainNavigator}/>
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
            <Stack.Screen 
            name="PetsTabScreen" 
            component={PetsTabScreen} 
            options={{
                title: 'Pets',
                headerRight: () => (
                    <View style={{flexDirection:'row'}}>
                      <Pressable onPress={ () => {
                          navigation.navigate("SettingScreen");
                      }}>
                          <Ionicons name="settings-sharp" size={24} color='#335C67' style={{marginRight:15}}/>
                      </Pressable>
                      <Pressable onPress={logoutPressed}>
                          <MaterialIcons name="logout" size={24} color='#335C67' />
                      </Pressable>
                    </View>
                    
                )
            }}/>
            <Stack.Screen name="PetProfileScreen" component={PetProfileScreen}/>
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
            <Stack.Screen name="CreatePetProfile" component={CreatePetProfile}/>
            <Stack.Screen name="CreatePetProfile2Screen" component={CreatePetProfile2Screen}/>
            <Stack.Screen name="VetsTabScreen" component={VetsTabScreen}/>
            <Stack.Screen name="Vaccinations" component={PetHistoryScreenNavigator}/>
            <Stack.Screen name="AuthenticationNavigator" component={AuthenticationNavigator}/>
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
