import AppointmentsTabScreen from './AppointmentsTabScreen';
import NotificationsTabScreen from './NotificationsTabScreen';
import PetsTabScreenNavigator from './NavigationController';
import VetsTabScreen from './VetsTabScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, Fontisto, MaterialIcons, FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {
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
          })}
        >
          <Tab.Screen name="Pets" component={PetsTabScreenNavigator}/>
          <Tab.Screen name="Vets" component={VetsTabScreen}/>
          <Tab.Screen name="Appointments" component={AppointmentsTabScreen}/>
          <Tab.Screen name="Notifications" component={NotificationsTabScreen}/>
        </Tab.Navigator>
      }
    </NavigationContainer>
  );
}
