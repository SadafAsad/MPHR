import { SafeAreaView, StyleSheet, Text, View, TextInput, Pressable, Alert, Image } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'; 

const PetProfileScreen = ({navigation}) => {
    return (
        <SafeAreaView style={{backgroundColor:'#fff', flex:1}}>
            <View style={styles.mainView}>
                <View style={styles.imgView}>
                    <Image source={require('./assets/paw.png')} style={styles.img}/>
                </View>
                <View style={{flex:1, marginLeft:10}}>
                    <Text style={{fontWeight:'bold', fontSize:17}}>Pet name</Text>
                    <Text style={{color:'dimgray', fontWeight:'bold'}}>Age: 
                        <Text style={{color:'gray', fontWeight:'normal'}}>Pet age</Text>
                    </Text>
                    <Text style={{color:'dimgray', fontWeight:'bold'}}>Owner: 
                        <Text style={{color:'gray', fontWeight:'normal'}}>Pet owner</Text>
                    </Text>
                </View>
            </View>
            <View style={{paddingLeft:22, paddingRight:22, marginTop:10}}>
                <Text style={{color:'dimgray', fontWeight:'bold'}}>Caregivers: </Text>
                <Text style={{color:'gray', fontWeight:'normal'}}>Pet caregiveres</Text>
            </View>

            <Text style={{alignSelf:'center', fontWeight:'bold', fontSize:16, marginBottom:20, marginTop:20}}>Medical Records</Text>

            <View style={styles.rowView}>
                <MaterialCommunityIcons name="clipboard-text-clock" size={28} color="black" style={{marginRight:10}}/>
                <Text style={{fontWeight:'bold'}}>Last Upload:</Text>
                <Text>xx-xx-xx</Text>
            </View>
            <View style={styles.rowView}>
                <MaterialCommunityIcons name="hospital-marker" size={28} color="black" style={{marginRight:10}}/>
                <Text style={{fontWeight:'bold'}}>At:</Text>
                <Text>location</Text>
            </View>
            <View style={styles.rowView}>
                <MaterialIcons name="chat" size={28} color="black" style={{marginRight:10}}/>
                <Text style={{fontWeight:'bold'}}>Owner's Notes:</Text>
                <Text>note</Text>
            </View>
            
            <View style={{marginTop:20}}>
                <Pressable onPress={ () => {console.log('pressed')}}>
                    <Text style={styles.pressableStyle}>UPLOAD NEW</Text>
                </Pressable>
                <Pressable onPress={ () => {console.log('pressed')}}>
                    <Text style={styles.pressableStyle}>SHARE MEDICAL RECORD</Text>
                </Pressable>
                <Pressable onPress={ () => {console.log('pressed')}}>
                    <Text style={styles.pressableStyle}>SHOW HISTORY</Text>
                </Pressable>
            </View>

            {/* <Pressable onPress={ () => {
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
            </Pressable> */}
           
        </SafeAreaView>
    );
}
  
const styles = StyleSheet.create({
    mainView: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginTop: 22
    },
    rowView: {
        flexDirection:'row',
        paddingLeft:22,
        alignItems:'center'
    },
    img: {
        width:'100%', 
        height:undefined, 
        aspectRatio:1
    },
    imgView: {
        width: 60,
        height: 60,
        borderRadius: '100%',
        borderWidth: 1,
        borderColor: 'black',
        alignSelf: 'center',
        marginLeft: 22,
        padding: 8
    },
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
    pressableStyle: {
        alignSelf: 'center',
        textAlign: 'center',
        backgroundColor: '#335C67',
        color: '#fff',
        // backgroundColor: '#ffffff',
        // color: '#335C67',
        // borderColor: '#335C67',
        // borderStyle: 'solid',
        // borderWidth: 1,
        marginTop: 10,
        fontSize: 15,
        padding: 12,
        width: '90%',
        fontWeight: 'bold'
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
});

export default PetProfileScreen;