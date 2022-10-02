import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons, Fontisto, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { PetsTabScreenNavigator, VetsTabScreenNavigator, AppointmentsTabScreenNavigator, NotificationsTabScreenNavigator, AuthenticationNavigator, TabsNavigator } from './NavigationController';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="AuthenticationScreen" component={AuthenticationNavigator}/>
          <Stack.Screen name="TabsNavigator" component={TabsNavigator}/>
        </Stack.Navigator>
      }
    </NavigationContainer>
  );
}
