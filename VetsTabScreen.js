import { SafeAreaView, StyleSheet, Text, FlatList, Pressable, View, Image, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const VetsTabScreen = () => {
    const vets = [
        {id: 1, name: "Merck Animal Health", address: "16750 route Transcanadienne\nKirkland, Quebec H9H 4M7"},
        {id: 2, name: "Parliament Animal Hospital", address: "584 Parliament St.\nToronto, Ontario M4X 1P8"}
    ];

    const renderItem = ( {item} ) => (
        <Pressable onPress={ () => {
            //maybe add navigation for details (not yet confirmed)
            console.log(`${item.name}`);
        }
        }>
            <View style={styles.vet}>
                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                    <Image source={require('./assets/pet-icon-2.png')} style={styles.img}/>
                    <View>
                        <View style={{flexDirection:'column', marginLeft:20, alignItems:'baseline'}}>
                            <Text style={{fontSize:18, fontWeight:'bold'}}>{item.name}</Text>
                            <Text style={{fontSize:14}}>{item.address}</Text>
                        </View> 
                    </View>
                </View>
                <AntDesign name="right" size={20} color='#335C67' style={{marginRight:22}}/>
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
            <Text>Vets Tab Screen!</Text>



            {/* Vet Lists */}
            <FlatList
                data={vets}
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
    vet: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        marginBottom: 15,
        alignItems: 'center'
    },
    img: {
        marginLeft: 22,
        width: 60,
        height: 60,
        borderRadius: '100%',
        borderWidth: 1,
        borderColor: 'black',
    },
    deletePressable: {
        alignSelf: 'center',
        textAlign: 'center',
        backgroundColor: '#335C67',
        color: '#ffffff',
        marginLeft: 22,
        marginRight: 22,
        marginTop: 22,
        fontSize: 18,
        padding: 15,
        width: '90%',
    },
});

export default VetsTabScreen;
