import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AppointmentsTabScreen from './AppointmentsTabScreen';
import NotificationsTabScreen from './NotificationsTabScreen';
import PetsTabScreen from './PetsTabScreen';
import VetsTabScreen from './VetsTabScreen';
import PetProfileScreen from './PetProfileScreen';
import SettingScreen from './SettingScreen';
import AddPetScreen from './AddPetScreen';
import AddAppointmentScreen from './AddAppointmentScreen';
import AddVetScreen from './AddVetScreen';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import ResetPasswordScreen from './ResetPasswordScreen';
import ResetPasswordScreen_v2 from './ResetPasswordScreen-v2';
import Registration_v2 from './Registration-v2';
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
import { Pressable, Text } from 'react-native';
import { AntDesign, Ionicons, Fontisto, MaterialIcons, FontAwesome } from '@expo/vector-icons'; 

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// --------- bugs to be fixed ------------
// SettingScreen back button goes to NotificationTabScreen
// When logout, stack has screens 'HIGH PRIORITY'

const AuthenticationNavigator = () => {
    return(
        <Stack.Navigator screenOptions={{
            headerTintColor:'#335C67',
            headerTitleStyle:{color:'#000000'}
            }}>
            <Stack.Screen name="Login" component={LoginScreen}/>
            {/* <Stack.Screen name="Signup" component={SignupScreen}/> */}
            {/* <Stack.Screen name="Registration" component={Registration_v2}/> */}
            <Stack.Screen name="Registration" component={Registration_v3}/>
            <Stack.Screen name="Set Password" component={SetPasswordScreen}/>
            <Stack.Screen name="Profile" component={ProfileInfo}/>
            <Stack.Screen name="Address" component={AddressInfo}/>
            <Stack.Screen name="ResetPassword" component={ResetPasswordScreen}/>
            {/* <Stack.Screen name="ResetPassword" component={ResetPasswordScreen_v2}/> */}
        </Stack.Navigator>
    )
}

export {AuthenticationNavigator};

const CreatingProfileNavigator = () => {
    return(
        <Stack.Navigator options={{headerShown: false}}>
            <Stack.Screen name="Profile" component={ProfileInfo}/>
            <Stack.Screen name="Address" component={AddressInfo}/>
        </Stack.Navigator>
    )
}

export {CreatingProfileNavigator};

const TabsNavigator = ({navigation}) => {
    return(
        <Tab.Navigator 
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    if (route.name === 'Pets') {
                        return <MaterialIcons name="pets" size={size} color={color}/>;
                    } 
                    else if (route.name === 'Vets') {
                        return <FontAwesome name="hospital-o" size={size} color={color}/>;
                    }
                    else if (route.name === 'Appointments') {
                        return <Fontisto name="date" size={size} color={color}/>;
                    }
                    else {
                        return <Ionicons name="notifications-outline" size={size} color={color}/>;
                    }
                },
                tabBarActiveTintColor: '#335C67',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
            })}>
            <Tab.Screen name="Pets" component={PetsTabScreenNavigator}/>
            <Tab.Screen name="Vets" component={VetsTabScreenNavigator}/>
            <Tab.Screen name="Appointments" component={AppointmentsTabScreenNavigator}/>
            <Tab.Screen name="Notifications" component={NotificationsTabScreenNavigator}/>
        </Tab.Navigator>
    )
}

export {TabsNavigator};

const PetsTabScreenNavigator = ({navigation}) => {
    return(
        <Stack.Navigator>
            <Stack.Screen 
            name="PetsTabScreen" 
            component={PetsTabScreen} 
            options={{
                title: 'Pets',
                headerRight: () => (
                    <Pressable onPress={ () => {
                        navigation.navigate("SettingScreen");
                    }}>
                        {/* <Text>Setting</Text> */}
                        <FontAwesome name="user-circle" size={25} color="black"/>
                    </Pressable>
                )
                //,
                // headerLeft: () => (
                //     <Pressable onPress={ () => {
                //         navigation.navigate("AddPetScreen");
                //     }}>
                //         <AntDesign name="plus" size={20} color="black" />
                //     </Pressable>
                // )
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
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="CreatePetProfile" component={CreatePetProfile}/>
            <Stack.Screen name="CreatePetProfile2Screen" component={CreatePetProfile2Screen}/>
            <Stack.Screen name="VetsTabScreen" component={VetsTabScreen}/>
            <Stack.Screen name="Vaccinations" component={PetHistoryScreenNavigator}/>
        </Stack.Navigator>
    )
}

export {PetsTabScreenNavigator};

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

const VetsTabScreenNavigator = ({navigation}) => {
    return(
        <Stack.Navigator>
            <Stack.Screen 
            name="VetsTabScreen" 
            component={VetsTabScreen} 
            options={{
                title: 'Vets',
                headerRight: () => (
                    <Pressable onPress={ () => {
                        navigation.navigate("SettingScreen");
                    }}>
                        {/* <Text>Setting</Text> */}
                        <FontAwesome name="user-circle" size={25} color="black"/>
                    </Pressable>
                ),
                headerLeft: () => (
                    <Pressable onPress={ () => {
                        navigation.navigate("AddVetScreen");
                    }}>
                        <AntDesign name="plus" size={20} color="black" />
                    </Pressable>
                )
            }}/>
            <Stack.Screen name="SettingScreen" component={SettingScreen}/>
            <Stack.Screen name="AddVetScreen" component={AddVetScreen}/>
            <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} options={{ title: 'Edit Profile' }}/>
            <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} options={{ title: 'Change password' }}/>
            <Stack.Screen name="NotificationsSettingScreen" component={NotificationsSettingScreen} options={{ title: 'Notifications' }}/>
            <Stack.Screen name="CheckMailScreen" component={CheckMailScreen}/>
            <Stack.Screen name="CreateNewPasswordScreen" component={CreateNewPasswordScreen}/>
            <Stack.Screen name="DeleteAccountScreen" component={DeleteAccountScreen}/>
            <Stack.Screen name="EditAddressScreen" component={EditAddressScreen}/>
            {/* <Stack.Screen name="Authentication" component={AuthenticationNavigator}/> */}
            
        </Stack.Navigator>
    )
}

export {VetsTabScreenNavigator};

const AppointmentsTabScreenNavigator = ({navigation}) => {
    return(
        <Stack.Navigator>
            <Stack.Screen 
            name="AppointmentsTabScreen" 
            component={AppointmentsTabScreen} 
            options={{
                title: 'Appointments',
                headerRight: () => (
                    <Pressable onPress={ () => {
                        navigation.navigate("SettingScreen");
                    }}>
                        {/* <Text>Setting</Text> */}
                        <FontAwesome name="user-circle" size={25} color="black"/>
                    </Pressable>
                ),
                headerLeft: () => (
                    <Pressable onPress={ () => {
                        navigation.navigate("AddAppointmentScreen");
                    }}>
                        <AntDesign name="plus" size={20} color="black" />
                    </Pressable>
                )
            }}/>
            <Stack.Screen name="SettingScreen" component={SettingScreen}/>
            <Stack.Screen name="AddAppointmentScreen" component={AddAppointmentScreen}/>
            <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} options={{ title: 'Edit Profile' }}/>
            <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} options={{ title: 'Change password' }}/>
            <Stack.Screen name="NotificationsSettingScreen" component={NotificationsSettingScreen} options={{ title: 'Notifications' }}/>
            <Stack.Screen name="CheckMailScreen" component={CheckMailScreen}/>
            <Stack.Screen name="CreateNewPasswordScreen" component={CreateNewPasswordScreen}/>
            <Stack.Screen name="DeleteAccountScreen" component={DeleteAccountScreen}/>
            <Stack.Screen name="EditAddressScreen" component={EditAddressScreen}/>
            {/* <Stack.Screen name="Authentication" component={AuthenticationNavigator}/> */}
        </Stack.Navigator>
    )
}

export {AppointmentsTabScreenNavigator};

const NotificationsTabScreenNavigator = ({navigation}) => {
    return(
        <Stack.Navigator>
            <Stack.Screen 
            name="NotificationSettingsTabScreen" 
            component={NotificationsTabScreen} 
            options={{
                title: 'Notifications',
                headerRight: () => (
                    <Pressable onPress={ () => {
                        navigation.navigate("SettingScreen");
                    }}>
                        {/* <Text>Setting</Text> */}
                        <FontAwesome name="user-circle" size={25} color="black"/>
                    </Pressable>
                )
            }}/>
            <Stack.Screen name="SettingScreen" component={SettingScreen}/>
            <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} options={{ title: 'Edit Profile' }}/>
            <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} options={{ title: 'Change password' }}/>
            <Stack.Screen name="NotificationsSettingScreen" component={NotificationsSettingScreen} options={{ title: 'Notifications' }}/>
            <Stack.Screen name="CheckMailScreen" component={CheckMailScreen}/>
            <Stack.Screen name="CreateNewPasswordScreen" component={CreateNewPasswordScreen}/>
            <Stack.Screen name="DeleteAccountScreen" component={DeleteAccountScreen}/>
            <Stack.Screen name="EditAddressScreen" component={EditAddressScreen}/>
            {/* <Stack.Screen name="Authentication" component={AuthenticationNavigator}/> */}
            {/* <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} options={{ title: 'Edit Profile' }} /> */}
        </Stack.Navigator>
    )
}

export {NotificationsTabScreenNavigator};
