import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';

const PetProfileScreen = ({navigation}) => {
    return (
        <SafeAreaView>
            <Text>Pet Profile Screen</Text>
            <TouchableOpacity>
                <Text onPress={() => {
                        navigation.navigate("Vaccinations");
                }}>Report List</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
  
const styles = StyleSheet.create({
});

export default PetProfileScreen;
