import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, FlatList, Pressable, View, Image, TextInput,} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const VetsTabScreen = () => {
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);

    useEffect(() => {
            setFilteredDataSource(vets);
            setMasterDataSource(vets);
    }, []);
    
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

    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
          const newData = masterDataSource.filter(function (item) {
            const itemData = item.name
              ? item.name.toUpperCase()
              : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
          });
          setFilteredDataSource(newData);
          setSearch(text);
        } else {
          setFilteredDataSource(masterDataSource);
          setSearch(text);
        }
      };

    return (
        <SafeAreaView style={styles.container}>
            <Text>Vets Tab Screen!</Text>
            <TextInput
                style={styles.textInputStyle}
                onChangeText={(text) => searchFilterFunction(text)}
                value={search}
                underlineColorAndroid="transparent"
                placeholder="Search Here"
            />
            {/* Vet Lists */}
            <FlatList
                data={filteredDataSource}
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
    textInputStyle: {
      height: 40,
      borderWidth: 1,
      paddingLeft: 20,
      margin: 5,
      borderColor: '#009688',
      backgroundColor: '#FFFFFF',
    },
});

export default VetsTabScreen;
