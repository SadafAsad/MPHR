import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';

const AddressInfo = () => {
    return (
        <SafeAreaView>
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
        </SafeAreaView>
    );
}
  
const styles = StyleSheet.create({
});

export default AddressInfo;