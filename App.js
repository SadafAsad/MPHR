import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, Fontisto, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { PetsTabScreenNavigator, VetsTabScreenNavigator, AppointmentsTabScreenNavigator, NotificationsTabScreenNavigator } from './NavigationController';

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
            headerShown: false,
          })}
        >
          <Tab.Screen name="Pets" component={PetsTabScreenNavigator}/>
          <Tab.Screen name="Vets" component={VetsTabScreenNavigator}/>
          <Tab.Screen name="Appointments" component={AppointmentsTabScreenNavigator}/>
          <Tab.Screen name="Notifications" component={NotificationsTabScreenNavigator}/>
        </Tab.Navigator>
      }
    </NavigationContainer>
  );
}
