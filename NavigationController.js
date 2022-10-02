import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppointmentsTabScreen from './AppointmentsTabScreen';
import NotificationsTabScreen from './NotificationsTabScreen';
import PetsTabScreen from './PetsTabScreen';
import VetsTabScreen from './VetsTabScreen';
import PetProfileScreen from './PetProfileScreen';
import SettingScreen from './SettingScreen';
import AddPetScreen from './AddPetScreen';
import AddAppointmentScreen from './AddAppointmentScreen';
import AddVetScreen from './AddVetScreen';
import { Pressable, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 

const Stack = createNativeStackNavigator();

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
                        navigation.navigate("AddPetScreen");
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
