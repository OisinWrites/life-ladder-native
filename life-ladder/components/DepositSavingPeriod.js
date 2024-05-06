import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import styles from '../styles/appStyles';
import borrowingStyles from '../styles/borrowingStyles';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6';
import CustomText from '../utils/CustomText';
import CustomTextInput from '../utils/CustomTextInput';

import { handleNumericChange, handleFormattedDisplay, handleFormattedDisplayTwoDecimal } from '../utils/FormatNumber';


const DepositSavingPeriod = ({
    applicants,
    maxBorrowableAmount,
    estimatedPropertyValue,
    displaySwap3,
    displayWarning3,
    handleToggleComplete3,
    currentSavings1,
    currentSavings2,
    otherSavingGoals1,
    otherSavingGoals2,
    savingPowerMonthly1,
    savingPowerMonthly2,
    mortgageDrawdown,
    setMortgageDrawdown
}) => {

    const [propertyPrice, setPropertyPrice] = useState(
        estimatedPropertyValue !== '' ? handleFormattedDisplayTwoDecimal(estimatedPropertyValue) || 0 : 0
      );
    
    useEffect(() => {
        setPropertyPrice(estimatedPropertyValue !== '' ? handleFormattedDisplayTwoDecimal(estimatedPropertyValue) : 0);
    }, [estimatedPropertyValue]);

    useEffect(() => {
        setMortgageDrawdown(handleFormattedDisplayTwoDecimal(estimatedPropertyValue * 0.9));
    }, [estimatedPropertyValue]);
  
    function calculateRegistryFee(propertyPrice) {
        if (propertyPrice <= 50000) return 400;
        if (propertyPrice <= 200000) return 600;
        if (propertyPrice <= 400000) return 700;
        return 800;
    }
    
    function calculatePropertyTax(propertyPrice) {
        if (propertyPrice <= 200000) return 90;
        if (propertyPrice <= 262500) return 225;
        if (propertyPrice <= 350000) return 315;
        if (propertyPrice <= 437500) return 405;
        if (propertyPrice <= 525000) return 495;
        if (propertyPrice <= 612500) return 585;
        if (propertyPrice <= 700000) return 675;
        if (propertyPrice <= 787500) return 765;
        if (propertyPrice <= 875000) return 855;
        if (propertyPrice <= 962500) return 945;
        if (propertyPrice <= 1050000) return 1035;
    }

    // Calculate additional costs
    const stampDuty = propertyPrice < 1000000 ? propertyPrice * 0.01 : propertyPrice * 0.02;
    const solicitorFees = 2000;
    const valuerReport = 150;
    const surveyorReport = 300 * 1.23;
    const insuranceCosts = 300 + 360; // Homeowner's plus mortgage insurance
    const registryFee = calculateRegistryFee(propertyPrice);
    const propertyTax = calculatePropertyTax(propertyPrice);
    const totalAdditionalCosts = stampDuty + solicitorFees + valuerReport + surveyorReport + insuranceCosts + registryFee + propertyTax;


    return (
        <View style={styles.container}>
            {displaySwap3 ? (
                <View>
                    <Pressable style={styles.row} title="Edit Section" onPress={handleToggleComplete3} >
                        <CustomText style={[styles.centerText, styles.header, styles.completed]}>Deposit Saving Period</CustomText>
                    </Pressable>
                </View>
            ) : (
                <View>
                    <View style={styles.marginBottom}>
                        <CustomText style={[styles.centerText, styles.header]}>Deposit Saving Period</CustomText>
                        {displayWarning3 && 
                            <CustomText style={[styles.textColorGreen, styles.centerText, styles.bold]}>
                                Complete this section before moving on
                            </CustomText>
                        }
                    </View>

                    <View style={[styles.row, styles.center]}>
                        <CustomText>Property Price:</CustomText>
                        <View style={[
                            borrowingStyles.salaryInputs,
                            styles.widthLimit,
                            styles.marginRight,
                            styles.marginLeft
                            ]}>
                            <CustomTextInput
                                inputMode='numeric'
                                style={[styles.bigblue, styles.h2]}                             
                                value={handleFormattedDisplay(propertyPrice)}
                                onChangeText={(text) => handleNumericChange(text, setPropertyPrice)}
                            />       
                        </View>
                    </View>

                    <View style={[styles.row, styles.center]}>
                        <CustomText>Mortgage Drawdown:</CustomText>
                        <View style={[
                            borrowingStyles.salaryInputs,
                            styles.widthLimit,
                            styles.marginRight,
                            styles.marginLeft
                            ]}>
                            <CustomTextInput
                                inputMode='numeric'
                                style={[styles.bigblue, styles.h2]}                             
                                value={handleFormattedDisplay(mortgageDrawdown)}
                                onChangeText={(text) => handleNumericChange(text, setMortgageDrawdown)}
                            />       
                        </View>
                    </View>

                    <View>
                        <View style={styles.row}>
                            <CustomText>Minimum Deposit Required:</CustomText>
                            <CustomText style={[styles.textRight, styles.marginLeft]}> €</CustomText>
                        </View>
                        <View style={styles.row}>
                            <CustomText>Additional Deposit Required:</CustomText>
                            <CustomText style={[styles.textRight, styles.marginLeft]}> €</CustomText>
                        </View>
                        <CustomText style={[styles.marginTop, styles.bold]}>Additional Fees</CustomText>                        
                        <View style={styles.row}>
                            <CustomText>Stamp Duty @{propertyPrice < 1000000 ? "1%" : "2%"} of the property value:</CustomText>
                            <CustomText style={[styles.textRight, styles.marginLeft]}> €{stampDuty.toFixed(2)}</CustomText>
                        </View>
                        <View style={styles.row}>
                            <CustomText>Solicitor Fees:</CustomText>
                            <CustomText style={[styles.textRight, styles.marginLeft]}> €{solicitorFees} </CustomText>
                        </View>
                        <View style={styles.row}>
                            <CustomText>Valuer's Report Fee:</CustomText>
                            <CustomText style={[styles.textRight, styles.marginLeft]}> €{valuerReport}</CustomText>
                        </View>
                        <View style={styles.row}>
                            <CustomText>Surveyor's Report Fee (plus 23% VAT):</CustomText>
                            <CustomText style={[styles.textRight, styles.marginLeft]}> €{surveyorReport}</CustomText>
                        </View>
                        <View style={styles.row}>
                            <CustomText>Registry Fee:</CustomText>
                            <CustomText style={[styles.textRight, styles.marginLeft]}> €{registryFee}</CustomText>
                        </View>
                        <CustomText style={[styles.marginTop, styles.bold]}>Recurring Annual Fees</CustomText>
                        <View style={styles.row}>
                            <CustomText>Homeowner's Insurance:</CustomText>
                            <CustomText style={[styles.textRight, styles.marginLeft]}> €{(300)}</CustomText>
                        </View>
                        <View style={styles.row}>
                            <CustomText>Mortgage Insurance:</CustomText>
                            <CustomText style={[styles.textRight, styles.marginLeft]}> €{(360)}</CustomText>
                        </View>
                        <View style={styles.row}>
                            <CustomText>Local Property Tax:</CustomText>
                            <CustomText style={[styles.textRight, styles.marginLeft]}> €{propertyTax}</CustomText>
                        </View>
                        <View style={styles.row}>
                            <CustomText>Total Additional Costs:</CustomText>
                            <CustomText style={[styles.textRight, styles.marginLeft]}> €{totalAdditionalCosts.toFixed(2)}</CustomText>
                        </View>
                    </View>
                </View>
            )}
        </View>
    );
};

export default DepositSavingPeriod;