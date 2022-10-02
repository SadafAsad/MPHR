import { StyleSheet, Text, SafeAreaView, Pressable, FlatList, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const PetsTabScreen = ({navigation}) => {
    const pets = [
        {id: 1, name: "Bacon", birthday: "2022/03/12"},
        {id: 2, name: "Leila", birthday: "2022/09/01"}
    ];

    const renderItem = ( {item} ) => (
        <Pressable onPress={ () => {
            navigation.navigate("PetProfileScreen", {pet: item});
        }
        }>
            <View style={styles.pet}>
                <View>
                    <Text style={{marginLeft:20, fontSize:18}}>{item.name}</Text>
                    <Text style={{marginLeft:20, fontSize:14}}>Birthday: {item.birthday}</Text>
                </View>
                <AntDesign name="right" size={20} color='#335C67' style={{marginRight:20}}/>
            </View>
        </Pressable>
    );

    const ItemDivider = () => {
        return (
            <View style={{height: 1, width: "100%", backgroundColor: "#cccccc"}}/>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={pets}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                ItemSeparatorComponent={ItemDivider}
                />
        </SafeAreaView>
    );
}
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    pet: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        marginBottom: 15,
        alignItems: 'center'
    },
});

export default PetsTabScreen;
