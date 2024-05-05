import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import styles from '../styles/appStyles';
import borrowingStyles from '../styles/borrowingStyles';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6';
import { calculateTaxDetails } from '../utils/taxCalc';
import CustomText from '../utils/CustomText';
import CustomTextInput from '../utils/CustomTextInput';

import { handleNumericChange, handleFormattedDisplay, handleFormattedDisplayTwoDecimal, formatNumber } from '../utils/FormatNumber';
const DepositSavingPeriod = ({
    applicants,
    salary1,
    salary2,
    maxBorrowableAmount,
    displaySwap2,
    displayWarning2,
    handleToggleComplete,
    estimatedPropertyValue,
    rent1,
    setRent1,
    bills1,
    setBills1,
    weeklyDiscretionary1,
    setWeeklyDiscretionary1
}) => {

    const taxDetails1 = calculateTaxDetails(salary1);
    let taxDetails2 = applicants === 2 ? calculateTaxDetails(salary2) : null;
    
    return (
        <View style={styles.container}>
        {displaySwap2 ? (
            <View>
                <Pressable style={styles.row} title="Edit Section" onPress={handleToggleComplete2} >
                    <CustomText style={[styles.centerText, styles.header, styles.completed]}>Deposit Saving Period</CustomText>
                </Pressable>
            </View>
        ) : (
            <View>

                <View style={styles.marginBottom}>
                    <CustomText style={[styles.centerText, styles.header]}>Deposit Saving Period</CustomText>
                    {displayWarning2 && 
                        <CustomText style={[styles.textColorGreen, styles.centerText, styles.bold ]}>
                            Complete this section before moving on
                        </CustomText>
                    }
                </View>

                <View style={styles.row}>  

                    <View style={styles.marginRight}>
                        <View style={[styles.row, styles.center]}>
                            <CustomText>Monthly Rent:</CustomText>
                            <View style={[
                                borrowingStyles.salaryInputs,
                                styles.widthLimit,
                                styles.marginRight,
                                styles.marginLeft
                                ]}>
                                <CustomTextInput
                                    inputMode='numeric'
                                    style={[styles.bigblue, styles.h2]}                             
                                    value={handleFormattedDisplay(rent1)}
                                    onChangeText={(text) => handleNumericChange(text, setRent1)}
                                />       
                            </View>
                        </View>

                        <View style={[styles.row, styles.center]}>
                            <CustomText>Monthly Bills:</CustomText>
                            <View style={[
                                borrowingStyles.salaryInputs,
                                styles.widthLimit,
                                styles.marginRight,
                                styles.marginLeft
                                ]}>
                                <CustomTextInput
                                    inputMode='numeric'
                                    style={[styles.bigblue, styles.h2]}                             
                                    value={handleFormattedDisplay(bills1)}
                                    onChangeText={(text) => handleNumericChange(text, setBills1)}
                                />       
                            </View>
                        </View>

                        <View style={[styles.row, styles.center]}>
                            <CustomText>Weekly Spending:</CustomText>
                            <View style={[
                                borrowingStyles.salaryInputs,
                                styles.widthLimit,
                                styles.marginRight,
                                styles.marginLeft
                                ]}>
                                <CustomTextInput
                                    inputMode='numeric'
                                    style={[styles.bigblue, styles.h2]}                             
                                    value={handleFormattedDisplay(weeklyDiscretionary1)}
                                    onChangeText={(text) => handleNumericChange(text, setWeeklyDiscretionary1)}
                                />       
                            </View>
                        </View>
                    </View>

                    
                </View>
                
                <View style={styles.row}>
                    <View>
                        <CustomText style={styles.centerText}>monthly tax</CustomText>
                        <View style={styles.row}>
                            <CustomText>usc:</CustomText>
                            <CustomText style={[styles.textRight, styles.marginLeft]}>{handleFormattedDisplayTwoDecimal(taxDetails1.usc / 12)}</CustomText>
                        </View>
                        <View style={styles.row}>
                            <CustomText>paye:</CustomText>
                            <CustomText style={[styles.textRight, styles.marginLeft]}>{handleFormattedDisplayTwoDecimal(taxDetails1.paye / 12)}</CustomText>
                        </View>
                        <View style={styles.row}>
                            <CustomText>prsi:</CustomText>
                            <CustomText style={[styles.textRight, styles.marginLeft]}>{handleFormattedDisplayTwoDecimal(taxDetails1.prsi / 12)}</CustomText>
                        </View>
                        <View style={styles.row}>
                            <CustomText>net pay:</CustomText>
                            <CustomText style={[styles.textRight, styles.marginLeft]}>{handleFormattedDisplayTwoDecimal(taxDetails1.netMonthlyIncome)}</CustomText>
                        </View>
                    </View>
                </View>

            </View>
        )}
        </View>
    );
};
export default DepositSavingPeriod;