import { StyleSheet, Text, SafeAreaView, Pressable, FlatList, View, Image, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Searchbar } from 'react-native-paper';
import * as React from 'react';

const PetsTabScreen = ({navigation}) => {
    const [searchQuery, setSearchQuery] = React.useState('');

    const pets = [
        {id: 1, name: "Bacon", birthday: "2022-03-12"},
        {id: 2, name: "Leila", birthday: "2022-09-01"},
        {id: 3, name: "Honey", birthday: "2022-03-31"}
    ];

    const onChangeSearch = query => setSearchQuery(query);

    function getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        var month = 0;
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
            month = birthDate.getMonth();
        }
        else {
            month = m
        }
        if (age===0) {
            return `${month}mon`;
        }
        else {
            return `${age}yr${month}mon`;
        }
    }

    const renderItem = ( {item} ) => (
        <Pressable onPress={ () => {
            navigation.navigate("PetProfileScreen", {pet: item});
        }
        }>
            <View style={styles.pet}>
                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                    <Image source={require('./assets/pet-icon-2.png')} style={styles.img}/>
                    <View>
                        <View style={{flexDirection:'row', alignItems:'baseline'}}>
                            <Text style={{marginLeft:20, fontSize:18}}>{item.name}</Text>
                            <Text style={{fontSize:14}}> - age: {getAge(item.birthday)}</Text>
                        </View>
                        <Text style={{marginLeft:20}}>Caretakers:</Text>
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
            <View  style={{marginTop:10, marginBottom:50}}> 
            <Searchbar placeholder="Search" onChangeText={onChangeSearch} value={searchQuery} style={styles.searchBar} />
                <Pressable onPress={ () => {
                    // navigation.navigate("CheckMailScreen");
                        //navigation.dispatch(StackActions.replace('CheckMailScreen'))
                        Alert.alert('Adding new pet', 'Confirm',
                        [  
                            {  
                                text: 'Cancel',  
                                onPress: () => console.log('Cancel Pressed'),  
                                style: 'cancel',  
                            },  
                            {text: 'OK', onPress: () => navigation.navigate("CreatePetProfile")},  
                        ]  
                        );
                    }}>
                        <Text style={styles.deletePressable}>Add New Pet</Text>
                </Pressable>

            </View>
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
    searchBar: {
        width: '90%',
        alignSelf: 'center'
    }
});

export default PetsTabScreen;
