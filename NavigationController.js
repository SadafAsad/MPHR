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
import { Pressable, Text } from 'react-native';
import { AntDesign, Ionicons, Fontisto, MaterialIcons, FontAwesome } from '@expo/vector-icons'; 

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// --------- bugs to be fixed ------------
// SettingScreen back button goes to NotificationTabScreen

const AuthenticationNavigator = () => {
    return(
        <Stack.Navigator options={{headerShown: false}}>
            <Stack.Screen name="LoginScreen" component={LoginScreen}/>
            <Stack.Screen name="SignupScreen" component={SignupScreen}/>
            <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen}/>
        </Stack.Navigator>
    )
}

export {AuthenticationNavigator};

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
                tabBarActiveTintColor: '#9E2A2B',
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
                        <Text>Setting</Text>
                    </Pressable>
                ),
                headerLeft: () => (
                    <Pressable onPress={ () => {
                        navigation.navigate("AddPetScreen");
                    }}>
                        <AntDesign name="plus" size={20} color="black" />
                    </Pressable>
                )
            }}/>
            <Stack.Screen name="PetProfileScreen" component={PetProfileScreen}/>
            <Stack.Screen name="SettingScreen" component={SettingScreen}/>
            <Stack.Screen name="AddPetScreen" component={AddPetScreen}/>
        </Stack.Navigator>
    )
}

export {PetsTabScreenNavigator};

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
                        <Text>Setting</Text>
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
                        <Text>Setting</Text>
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
        </Stack.Navigator>
    )
}

export {AppointmentsTabScreenNavigator};

const NotificationsTabScreenNavigator = ({navigation}) => {
    return(
        <Stack.Navigator>
            <Stack.Screen 
            name="NotificationsTabScreen" 
            component={NotificationsTabScreen} 
            options={{
                title: 'Notifications',
                headerRight: () => (
                    <Pressable onPress={ () => {
                        navigation.navigate("SettingScreen");
                    }}>
                        <Text>Setting</Text>
                    </Pressable>
                )
            }}/>
            <Stack.Screen name="SettingScreen" component={SettingScreen}/>
        </Stack.Navigator>
    )
}

export {NotificationsTabScreenNavigator};
