import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppointmentsTabScreen from './AppointmentsTabScreen';
import NotificationsTabScreen from './NotificationsTabScreen';
import PetsTabScreen from './PetsTabScreen';
import VetsTabScreen from './VetsTabScreen';
import PetProfileScreen from './PetProfileScreen';

const Stack = createNativeStackNavigator();

const PetsTabScreenNavigator = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="PetsTabScreen" component={PetsTabScreen} options={{title: 'Pets'}}/>
            <Stack.Screen name="PetProfileScreen" component={PetProfileScreen}/>
        </Stack.Navigator>
    )
}

export {PetsTabScreenNavigator};

const VetsTabScreenNavigator = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="VetsTabScreen" component={VetsTabScreen} options={{title: 'Vets'}}/>
        </Stack.Navigator>
    )
}

export {VetsTabScreenNavigator};

const AppointmentsTabScreenNavigator = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="AppointmentsTabScreen" component={AppointmentsTabScreen} options={{title: 'Appointments'}}/>
        </Stack.Navigator>
    )
}

export {AppointmentsTabScreenNavigator};

const NotificationsTabScreenNavigator = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="NotificationsTabScreen" component={NotificationsTabScreen} options={{title: 'Notifications'}}/>
        </Stack.Navigator>
    )
}

export {NotificationsTabScreenNavigator};
