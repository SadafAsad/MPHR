import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppointmentsTabScreen from './AppointmentsTabScreen';
import NotificationsTabScreen from './NotificationsTabScreen';
import PetsTabScreen from './PetsTabScreen';
import VetsTabScreen from './VetsTabScreen';

const Stack = createNativeStackNavigator();

const PetsTabScreenNavigator = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="PetsTabScreen" component={PetsTabScreen}/>
            <Stack.Screen name="VetsTabScreen" component={VetsTabScreen}/>
            <Stack.Screen name="AppointmentsTabScreen" component={AppointmentsTabScreen}/>
            <Stack.Screen name="NotificationsTabScreen" component={NotificationsTabScreen}/>
        </Stack.Navigator>
    )
}

export default PetsTabScreenNavigator;