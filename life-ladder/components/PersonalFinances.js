import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import styles from '../styles/appStyles';
import borrowingStyles from '../styles/borrowingStyles';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6';
import { calculateTaxDetails } from '../utils/taxCalc';
import CustomText from '../utils/CustomText';
import CustomNumericInput from '../utils/CustomNumericInput';

import { handleNumericChange, handleFormattedDisplay, handleFormattedDisplayTwoDecimal, formatNumber } from '../utils/FormatNumber';
const PersonalFinances= ({
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
    setWeeklyDiscretionary1,
    annualBills1,
    setAnnualBills1,
    currentSavings1,
    setCurrentSavings1,
    otherSavingGoals1,
    setOtherSavingGoals1,
    rent2,
    setRent2,
    bills2,
    setBills2,
    weeklyDiscretionary2,
    setWeeklyDiscretionary2,
    annualBills2,
    setAnnualBills2,
    currentSavings2,
    setCurrentSavings2,
    otherSavingGoals2,
    setOtherSavingGoals2,
}) => {

    const taxDetails1 = parseFloat(salary1) > 0 ? calculateTaxDetails(salary1) : 0;
    let taxDetails2 = applicants === 2 ? calculateTaxDetails(salary2) : 0;

    const savingPowerMonthly1 = (taxDetails1.netMonthlyIncome) - rent1 - bills1 - ((parseFloat(weeklyDiscretionary1) || 0) * 52) / 12 - (annualBills1/12)
    const savingPowerMonthly2 = (taxDetails2.netMonthlyIncome) - rent2 - bills2 - ((parseFloat(weeklyDiscretionary2) || 0) * 52) / 12 - (annualBills2/12)

    
    return (
        <View style={styles.container}>
        {displaySwap2 ? (
            <View>
                <Pressable style={styles.row} title="Edit Section" onPress={handleToggleComplete2} >
                    <CustomText style={[styles.centerText, styles.header, styles.completed]}>Personal Finances</CustomText>
                </Pressable>
            </View>
        ) : (
            <View>

                <View style={styles.marginBottom}>
                    <CustomText style={[styles.centerText, styles.header]}>Personal Finances</CustomText>
                    {displayWarning2 && 
                        <CustomText style={[styles.textColorGreen, styles.centerText, styles.bold ]}>
                            Complete this section before moving on
                        </CustomText>
                    }
                </View>

                <View style={styles.marginBottom}>
                    {applicants === 2 && (
                        <CustomText style={[styles.centerText, styles.h2, styles.marginBottom]}>
                            Applicant 1's Details</CustomText>
                    )}
                    
                    <View style={styles.row}>  

                        <View>
                            <View style={[styles.row, styles.center]}>
                                <CustomText>Monthly Rent:</CustomText>
                                <View style={[
                                    borrowingStyles.salaryInputs,
                                    styles.widthLimit,
                                    styles.marginLeft
                                    ]}>
                                    <CustomNumericInput
                                        
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
                                    styles.marginLeft
                                    ]}>
                                    <CustomNumericInput
                                        
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
                                    styles.marginLeft
                                    ]}>
                                    <CustomNumericInput
                                        
                                        style={[styles.bigblue, styles.h2]}                             
                                        value={handleFormattedDisplay(weeklyDiscretionary1)}
                                        onChangeText={(text) => handleNumericChange(text, setWeeklyDiscretionary1)}
                                    />       
                                </View>
                            </View>

                            <View style={[styles.row, styles.center]}>
                                <CustomText>Annual Bills:</CustomText>
                                <View style={[
                                    borrowingStyles.salaryInputs,
                                    styles.widthLimit,
                                    styles.marginLeft
                                    ]}>
                                    <CustomNumericInput
                                        
                                        style={[styles.bigblue, styles.h2]}                             
                                        value={handleFormattedDisplay(annualBills1)}
                                        onChangeText={(text) => handleNumericChange(text, setAnnualBills1)}
                                    />       
                                </View>
                            </View>

                            <View style={[styles.row, styles.marginVertical]}>
                                <CustomText>Monthly Savings:</CustomText>
                                <CustomText style={[styles.textRight, styles.marginLeft, styles.marginRight]}>{handleFormattedDisplayTwoDecimal(savingPowerMonthly1)}</CustomText>
                            </View>

                            <View style={[styles.row, styles.center]}>
                                <CustomText>Current Savings</CustomText>
                                <View style={[
                                    borrowingStyles.salaryInputs,
                                    styles.widthLimit,
                                    styles.marginLeft
                                    ]}>
                                    <CustomNumericInput
                                        
                                        style={[styles.bigblue, styles.h2]}                             
                                        value={handleFormattedDisplay(currentSavings1)}
                                        onChangeText={(text) => handleNumericChange(text, setCurrentSavings1)}
                                    />       
                                </View>
                            </View>

                            <View style={[styles.row, styles.center]}>
                                <CustomText>Other saving goals:</CustomText>
                                <View style={[
                                    borrowingStyles.salaryInputs,
                                    styles.widthLimit,
                                    styles.marginLeft
                                    ]}>
                                    <CustomNumericInput
                                        
                                        style={[styles.bigblue, styles.h2]}                             
                                        value={handleFormattedDisplay(otherSavingGoals1)}
                                        onChangeText={(text) => handleNumericChange(text, setOtherSavingGoals1)}
                                    />       
                                </View>
                            </View>

                        </View>
                        
                    </View>
                
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
                        <View style={styles.horizontalRule}/>
                        <View style={styles.row}>
                            <CustomText>net pay:</CustomText>
                            <CustomText style={[styles.textRight, styles.marginLeft]}>{handleFormattedDisplayTwoDecimal(taxDetails1.netMonthlyIncome)}</CustomText>
                        </View>
                    </View>
                </View>

                { applicants === 2 && (
                    <View style={styles.marginBottom}>
                        <CustomText style={[styles.centerText, styles.h2, styles.marginBottom]}>
                            Applicant 2's Details
                        </CustomText>
                        <View style={styles.row}>
                            <View>
                                <View style={[styles.row, styles.center]}>
                                    <CustomText>Monthly Rent:</CustomText>
                                    <View style={[
                                        borrowingStyles.salaryInputs,
                                        styles.widthLimit,
                                        styles.marginLeft
                                        ]}>
                                        <CustomNumericInput
                                            
                                            style={[styles.bigblue, styles.h2]}                             
                                            value={handleFormattedDisplay(rent2)}
                                            onChangeText={(text) => handleNumericChange(text, setRent2)}
                                        />       
                                    </View>
                                </View>

                                <View style={[styles.row, styles.center]}>
                                    <CustomText>Monthly Bills:</CustomText>
                                    <View style={[
                                        borrowingStyles.salaryInputs,
                                        styles.widthLimit,
                                        styles.marginLeft
                                        ]}>
                                        <CustomNumericInput
                                            
                                            style={[styles.bigblue, styles.h2]}                             
                                            value={handleFormattedDisplay(bills2)}
                                            onChangeText={(text) => handleNumericChange(text, setBills2)}
                                        />       
                                    </View>
                                </View>

                                <View style={[styles.row, styles.center]}>
                                    <CustomText>Weekly Spending:</CustomText>
                                    <View style={[
                                        borrowingStyles.salaryInputs,
                                        styles.widthLimit,
                                        styles.marginLeft
                                        ]}>
                                        <CustomNumericInput
                                            
                                            style={[styles.bigblue, styles.h2]}                             
                                            value={handleFormattedDisplay(weeklyDiscretionary2)}
                                            onChangeText={(text) => handleNumericChange(text, setWeeklyDiscretionary2)}
                                        />       
                                    </View>
                                </View>

                                <View style={[styles.row, styles.center]}>
                                    <CustomText>Annual Bills:</CustomText>
                                    <View style={[
                                        borrowingStyles.salaryInputs,
                                        styles.widthLimit,
                                        styles.marginLeft
                                        ]}>
                                        <CustomNumericInput
                                            
                                            style={[styles.bigblue, styles.h2]}                             
                                            value={handleFormattedDisplay(annualBills2)}
                                            onChangeText={(text) => handleNumericChange(text, setAnnualBills2)}
                                        />       
                                    </View>
                                </View>

                                <View style={[styles.row, styles.marginVertical]}>
                                    <CustomText>Monthly Savings:</CustomText>
                                    <CustomText style={[styles.textRight, styles.marginLeft, styles.marginRight]}>{handleFormattedDisplayTwoDecimal(savingPowerMonthly2)}</CustomText>
                                </View>

                                <View style={[styles.row, styles.center]}>
                                    <CustomText>Current Savings</CustomText>
                                    <View style={[
                                        borrowingStyles.salaryInputs,
                                        styles.widthLimit,
                                        styles.marginLeft
                                        ]}>
                                        <CustomNumericInput
                                            
                                            style={[styles.bigblue, styles.h2]}                             
                                            value={handleFormattedDisplay(currentSavings2)}
                                            onChangeText={(text) => handleNumericChange(text, setCurrentSavings2)}
                                        />       
                                    </View>
                                </View>

                                <View style={[styles.row, styles.center]}>
                                    <CustomText>Other saving goals:</CustomText>
                                    <View style={[
                                        borrowingStyles.salaryInputs,
                                        styles.widthLimit,
                                        styles.marginLeft
                                        ]}>
                                        <CustomNumericInput
                                            
                                            style={[styles.bigblue, styles.h2]}                             
                                            value={handleFormattedDisplay(otherSavingGoals2)}
                                            onChangeText={(text) => handleNumericChange(text, setOtherSavingGoals2)}
                                        />       
                                    </View>
                                </View>

                            </View>
                        </View>

                        <View>
                            <CustomText style={styles.centerText}>monthly tax</CustomText>
                            <View style={styles.row}>
                                <CustomText>usc:</CustomText>
                                <CustomText style={[styles.textRight, styles.marginLeft]}>{handleFormattedDisplayTwoDecimal(taxDetails2.usc / 12)}</CustomText>
                            </View>
                            <View style={styles.row}>
                                <CustomText>paye:</CustomText>
                                <CustomText style={[styles.textRight, styles.marginLeft]}>{handleFormattedDisplayTwoDecimal(taxDetails2.paye / 12)}</CustomText>
                            </View>
                            <View style={styles.row}>
                                <CustomText>prsi:</CustomText>
                                <CustomText style={[styles.textRight, styles.marginLeft]}>{handleFormattedDisplayTwoDecimal(taxDetails2.prsi / 12)}</CustomText>
                            </View>
                            <View style={styles.horizontalRule}/>
                            <View style={styles.row}>
                                <CustomText>net pay:</CustomText>
                                <CustomText style={[styles.textRight, styles.marginLeft]}>{handleFormattedDisplayTwoDecimal(taxDetails2.netMonthlyIncome)}</CustomText>
                            </View>
                        </View>

                    </View>
                ) }                

            </View>
        )}
        </View>
    );
};
export default PersonalFinances;