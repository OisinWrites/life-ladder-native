import React, { useState } from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
import styles from '../styles/appStyles';
import borrowingStyles from '../styles/borrowingStyles';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6';
import { calculateTaxDetails } from '../utils/taxCalc';

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
                    <Text style={[styles.centerText, styles.header, styles.completed]}>Deposit Saving Period</Text>
                </Pressable>
            </View>
        ) : (
            <View>

                <View style={styles.marginBottom}>
                    <Text style={[styles.centerText, styles.header]}>Deposit Saving Period</Text>
                    {displayWarning2 && 
                        <Text style={[styles.textColorGreen, styles.centerText, styles.bold ]}>
                            Complete this section before moving on
                        </Text>
                    }
                </View>

                <View style={styles.row}>

                    <View style={styles.marginRight}>
                        <View style={[styles.row, styles.center]}>
                            <Text>Monthly Rent:</Text>
                            <View style={[
                                borrowingStyles.salaryInputs,
                                styles.widthLimit,
                                styles.marginRight,
                                styles.marginLeft
                                ]}>
                                <TextInput
                                    style={[{color:'#03a1fc'}, styles.bold, styles.widthLimit]}                             
                                    value={handleFormattedDisplay(rent1)}
                                    onChangeText={(text) => handleNumericChange(text, setRent1)}
                                />       
                            </View>
                        </View>

                        <View style={[styles.row, styles.center]}>
                            <Text>Monthly Bills:</Text>
                            <View style={[
                                borrowingStyles.salaryInputs,
                                styles.widthLimit,
                                styles.marginRight,
                                styles.marginLeft
                                ]}>
                                <TextInput
                                    style={[{color:'#03a1fc'}, styles.bold, styles.widthLimit]}                             
                                    value={handleFormattedDisplay(bills1)}
                                    onChangeText={(text) => handleNumericChange(text, setBills1)}
                                />       
                            </View>
                        </View>

                        <View style={[styles.row, styles.center]}>
                            <Text>Weekly Discretionary</Text>
                            <View style={[
                                borrowingStyles.salaryInputs,
                                styles.widthLimit,
                                styles.marginRight,
                                styles.marginLeft
                                ]}>
                                <TextInput
                                    style={[{color:'#03a1fc'}, styles.bold, styles.widthLimit]}                             
                                    value={handleFormattedDisplay(weeklyDiscretionary1)}
                                    onChangeText={(text) => handleNumericChange(text, setWeeklyDiscretionary1)}
                                />       
                            </View>
                        </View>
                    </View>

                    <View>
                        <Text style={styles.centerText}>monthly tax</Text>
                        <View style={styles.row}>
                            <Text>usc:</Text>
                            <Text style={[styles.textRight, styles.marginLeft]}>{handleFormattedDisplayTwoDecimal(taxDetails1.usc / 12)}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text>paye:</Text>
                            <Text style={[styles.textRight, styles.marginLeft]}>{handleFormattedDisplayTwoDecimal(taxDetails1.paye / 12)}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text>prsi:</Text>
                            <Text style={[styles.textRight, styles.marginLeft]}>{handleFormattedDisplayTwoDecimal(taxDetails1.prsi / 12)}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text>net pay:</Text>
                            <Text style={[styles.textRight, styles.marginLeft]}>{handleFormattedDisplayTwoDecimal(taxDetails1.netMonthlyIncome)}</Text>
                        </View>
                    </View>
                </View>

            </View>
        )}
        </View>
    );
};
export default DepositSavingPeriod;