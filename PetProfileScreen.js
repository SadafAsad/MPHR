import { SafeAreaView, StyleSheet, Text, View, TextInput, Pressable, Alert, Image } from 'react-native';
import { AntDesign, Ionicons, Fontisto, MaterialIcons, FontAwesome5 } from '@expo/vector-icons'; 

const PetProfileScreen = ({navigation}) => {
    return (
        <SafeAreaView style={{backgroundColor:'#fff', flex:1}}>
            <Image source={require('./assets/cat.jpg')} style={styles.img}/>
            {/* <Text style={styles.title}>Create Pet Profile</Text> */}

            <Text style={{marginBottom:5, marginLeft:22}}>Name</Text>
            <TextInput 
                style={styles.input}
                editable={false}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
            />

            <Text style={{marginBottom:5, marginLeft:22, marginTop:20}}>Birthday</Text>
            <TextInput 
                style={styles.input}
                editable={false}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
            />

            <Text style={{marginBottom:5, marginLeft:22, marginTop:20}}>Sex</Text>
            <TextInput  
                style={styles.input}
                editable={false}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
            />
                
            <Text style={{marginBottom:5, marginLeft:22, marginTop:20}}>Species</Text>
            <TextInput 
                style={styles.input}
                editable={false}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
            />
            <Pressable onPress={ () => {
                // navigation.navigate("CheckMailScreen");
                //navigation.dispatch(StackActions.replace('CheckMailScreen'))
                Alert.alert('Going to records', 'Confirm',
                    [  
                        {  
                            text: 'Cancel',  
                            onPress: () => console.log('Cancel Pressed'),  
                            style: 'cancel',  
                        },  
                        {text: 'OK', onPress: () => navigation.navigate("Vaccinations")},  
                    ]  
                    );
                }}>
                    <Text style={styles.deletePressable}>Vaccination Records</Text>
            </Pressable>
           
        </SafeAreaView>
    );
}
  
const styles = StyleSheet.create({
    title: {
        // textAlign: 'center',
        alignSelf: 'center',
        padding: 20,
        margin: 30,
        fontWeight: 'bold',
        fontSize: '35'
    },
    input: {
        alignSelf: 'center',
        height: 45,
        width: '90%',
        borderWidth: 1,
        padding: 10,
        borderColor: '#808080',
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
        marginBottom:22
    },
    saveChanges: {
        // borderRadius: 5,
        // borderWidth: 1,
        flex:1, 
        alignItems:'baseline',
        alignSelf:'center'
    },
    deleteAccount: {
        // borderRadius: 5,
        // borderWidth: 1,
        //flex:1, 
        alignItems:'center',
        alignSelf:'center'
    },
    img: {
        alignSelf: 'center',
        width: 150,
        height: 150,
        marginTop: 22,
        borderRadius: '100%',
        borderWidth: 1,
        borderColor: 'black',
    },
});

export default PetProfileScreen;