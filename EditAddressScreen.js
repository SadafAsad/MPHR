import { SafeAreaView, StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native';
import SelectList from 'react-native-dropdown-select-list';
import { useState, useEffect } from 'react';
import { db } from './FirebaseApp';
import { updateDoc, getDoc, doc } from "firebase/firestore";

const EditAddressScreen = ({navigation, route}) => {
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedProvince, setSelectedProvince] = useState("");
    const [newAddress1, onaddress1Changed] = useState('');
    const [newAddress2, onaddress2Changed] = useState('');
    const [newCity, onCityChanged] = useState('');
    const [postalcode, onPostalcodeChanged] = useState('');
    const [userProfileData, setUserProfileData] = useState(null);
    const [docRef, setDocRef] = useState(null);

    const country = [{key:'1',value:'Canada'}];
    const province = [
        {key:'1', value:'AB'}, 
        {key:'2', value:'QC'}, 
        {key:'3', value:'ON'}
    ]

    const {userProfile} = route.params;

    useEffect(() => {
        async function getProfile() {
            const docRef = doc(db, "profiles", userProfile);
            const profileToUpdate = await getDoc(docRef);
            setDocRef(docRef);
            setUserProfileData(profileToUpdate.data());

            onaddress1Changed(profileToUpdate.data().address_1);
            onaddress2Changed(profileToUpdate.data().address_2);
            onCityChanged(profileToUpdate.data().city);
            onPostalcodeChanged(profileToUpdate.data().postal_code);
        }
        getProfile();
    }, [])

    const updateAddressPressed = async () => {
        const updatedProfileData = {
            userId:userProfileData.userId,
            first_name:userProfileData.first_name,
            last_name:userProfileData.last_name,
            phone_number:userProfileData.phone_number,
            address_1:newAddress1,
            address_2:newAddress2,
            city:newCity,
            country:selectedCountry,
            province:selectedProvince,
            postal_code:postalcode
        };
        try {
            updateDoc(docRef, updatedProfileData);
            navigation.goBack();
        }
        catch (err) {
            console.log(`${err.message}`);
        }
    }

    return (
        <SafeAreaView style={{flex:1}}>
            <Text style={styles.screentitle}>Address</Text>
            <Text style={styles.titleTxt}>Address</Text>
            <TextInput 
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onaddress1Changed}
                value={newAddress1}
            />
            <Text style={styles.titleTxt}>Address line 2</Text>
            <TextInput 
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onaddress2Changed}
                value={newAddress2}
            />
            <Text style={styles.titleTxt}>City</Text>
            <TextInput 
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onCityChanged}
                value={newCity}
            />
            <Text style={styles.titleTxt}>Country</Text>
            <SelectList 
                setSelected={setSelectedCountry} 
                data={country} 
                onSelect={() => {setSelectedCountry(country[selectedCountry-1].value)}}
                boxStyles={styles.input}
                dropdownItemStyles={styles.input}
                dropdownStyles={{borderColor:'transparent'}}
                maxHeight='100'
                placeholder=" "
            />
            <Text style={styles.titleTxt}>Province / State</Text>
            <SelectList 
                setSelected={setSelectedProvince} 
                data={province} 
                onSelect={() => {setSelectedProvince(province[selectedProvince-1].value)}}
                boxStyles={styles.input}
                dropdownItemStyles={styles.input}
                dropdownStyles={{borderColor:'transparent'}}
                maxHeight='100'
                placeholder=" "
            />
            <Text style={styles.titleTxt}>Postal Code</Text>
            <TextInput 
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onPostalcodeChanged}
                value={postalcode}
            />
            <Pressable onPress={() => {
                Alert.alert('UPDATE ADDRESS', 'Are you sure you want to update your address?', [  
                    {text: 'NO', onPress: () => console.log('NO Pressed'), style:'cancel'},  
                    {text: 'YES', onPress: () => updateAddressPressed()}
                ]);
            }}>
                <Text style={styles.PressableStyle}>UPDATE ADDRESS</Text>
            </Pressable>
        </SafeAreaView>
    );
}
  
const styles = StyleSheet.create({
    input: {
        alignSelf: 'center',
        height: 45,
        width: '90%',
        borderWidth: 1,
        padding: 10,
        borderColor: '#808080',
        borderRadius: '0%',
    },
    PressableStyle: {
        alignSelf: 'center',
        textAlign: 'center',
        backgroundColor: '#335C67',
        color: '#ffffff',
        marginLeft: 22,
        marginRight: 22,
        marginTop: 22,
        fontSize: 15,
        padding: 12,
        width: '90%',
        fontWeight: 'bold'
    },
    titleTxt: {
        marginTop:20, 
        marginBottom:5, 
        marginLeft:22, 
        marginRight:22
    },
    descTxt: {
        fontSize:15, 
        color:'#808080', 
        marginTop:5, 
        marginLeft:22, 
        marginRight:22
    },
    screentitle: {
        fontWeight:'bold', 
        fontSize:30, 
        marginLeft:22, 
        marginRight:22,
        marginTop:22
    },
});

export default EditAddressScreen;
