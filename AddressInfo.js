import { SafeAreaView, StyleSheet, Text, View, Pressable, TextInput } from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import SelectList from 'react-native-dropdown-select-list';
import { useState } from 'react';
import { db } from './FirebaseApp';
import { collection, addDoc } from "firebase/firestore";

const AddressInfo = ({navigation, route}) => {
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedProvince, setSelectedProvince] = useState("");
    const [address1, onaddress1Changed] = useState('');
    const [address2, onaddress2Changed] = useState('');
    const [city, onCityChanged] = useState('');
    const [postalcode, onPostalcodeChanged] = useState('');

    const {profile} = route.params;

    const country = [{key:'1',value:'Canada'}];
    const province = [
        {key:'1', value:'AB'}, 
        {key:'2', value:'QC'}, 
        {key:'3', value:'ON'}
    ]

    const createAccountPressed = async() => {
        try {
            const profileToInsert = {
                userId:profile.userId,
                first_name:profile.first_name,
                last_name:profile.last_name,
                phone_number:profile.phone_number,
                address_1: address1,
                address_2: address2,
                city: city,
                country: selectedCountry,
                province: selectedProvince,
                postal_code: postalcode
            };
            const insertedProfile = await addDoc(collection(db, "profiles"), profileToInsert);
            navigation.reset({index:0, routes:[{name: 'MainNavigator'}], key:null});
        }
        catch (err) {
            console.log(`${err.message}`);
        }
    }

    return (
        <SafeAreaView style={{flex:1}}> 
            <View style={{height:120}}> 
                <ProgressSteps
                    borderWidth={3}
                    activeStepIconBorderColor="#335C67"
                    activeLabelFontSize={12}
                    activeLabelColor="black"
                    labelFontSize={12}
                    labelColor="black"
                    activeStep={2}
                    completedLabelColor="black"
                    completedStepIconColor="#335C67"
                    completedProgressBarColor="#335C67"
                >
                    <ProgressStep label="Registration" removeBtnRow={true}/>
                    <ProgressStep label="Profile" removeBtnRow={true}/>
                    <ProgressStep label="Address" removeBtnRow={true}/>
                </ProgressSteps>
            </View>
            <Text style={styles.screentitle}>Address Info</Text>
            <Text style={styles.descTxt}>Complete your profile information. It will only take a few minutes.</Text>
            <Text style={styles.titleTxt}>Address *</Text>
            <TextInput 
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onaddress1Changed}
                value={address1}
            />
            <Text style={styles.titleTxt}>Address line 2</Text>
            <TextInput 
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onaddress2Changed}
                value={address2}
            />
            <Text style={styles.titleTxt}>City *</Text>
            <TextInput 
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onCityChanged}
                value={city}
            />
            <Text style={styles.titleTxt}>Country *</Text>
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
            <Text style={styles.titleTxt}>Province / State *</Text>
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
            <Text style={styles.titleTxt}>Postal Code *</Text>
            <TextInput 
                style={styles.input}
                placeholder=""
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onPostalcodeChanged}
                value={postalcode}
            />
            <Pressable onPress={createAccountPressed}>
                <Text style={styles.PressableStyle}>CREATE ACCOUNT</Text>
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
        marginBottom: 22,
        fontWeight: 'bold'
    },
    titleTxt: {
        marginTop:15, 
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
        marginRight:22
    },
});

export default AddressInfo;