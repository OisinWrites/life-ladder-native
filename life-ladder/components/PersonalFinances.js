import React, { useState, useRef } from 'react';
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
    scrollRef,
    onKeyboardVisibleChange,
}) => {

    const taxDetails1 = parseFloat(salary1) > 0 ? calculateTaxDetails(salary1) : 0;
    let taxDetails2 = applicants === 2 ? calculateTaxDetails(salary2) : 0;

    const rent1Ref = useRef(null);
    const bills1Ref = useRef(null);
    const discretionary1Ref = useRef(null);
    const annualBills1Ref = useRef(null);
    const savings1Ref = useRef(null);
    const savingGoals1Ref = useRef(null);
    const rent2Ref = useRef(null);
    const bills2Ref = useRef(null);
    const discretionary2Ref = useRef(null);
    const annualBills2Ref = useRef(null);
    const savings2Ref = useRef(null);
    const savingGoals2Ref = useRef(null);

    const savingPowerMonthly1 = (taxDetails1.netMonthlyIncome) - rent1 - bills1 - ((parseFloat(weeklyDiscretionary1) || 0) * 52) / 12 - (annualBills1/12)
    const savingPowerMonthly2 = (taxDetails2.netMonthlyIncome) - rent2 - bills2 - ((parseFloat(weeklyDiscretionary2) || 0) * 52) / 12 - (annualBills2/12)

    const handleNext = (currentRef) => {
        const refsOrder = [
            rent1Ref,
            bills1Ref,
            discretionary1Ref,
            annualBills1Ref,
            savings1Ref,
            savingGoals1Ref,
            ...(applicants === 2 ? [rent2Ref, bills2Ref, discretionary2Ref, annualBills2Ref, savings2Ref, savingGoals2Ref] : []),
        ];
    
        const currentIndex = refsOrder.indexOf(currentRef);

        if (currentIndex !== -1 && currentIndex < refsOrder.length - 1) {
            const nextRef = refsOrder[currentIndex + 1];
            nextRef.current && nextRef.current.handleToggleKeyboard();
        } else {
            currentRef.current && currentRef.current.handleToggleKeyboard();
        }
    };
        
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
                        <CustomText style={[styles.textColorGreen, styles.centerText ]}>
                            Complete this section before moving on
                        </CustomText>
                    }
                </View>

                <View style={styles.marginBottom}>
                    {applicants === 2 && (
                        <CustomText style={[styles.centerText , styles.marginBottom]}>
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
                                        scrollRef={scrollRef}
                                        ref={rent1Ref}
                                        onNext={() => handleNext(rent1Ref)}
                                        onKeyboardVisibleChange={onKeyboardVisibleChange}
                                        style={[styles.bigblue ]}                             
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
                                        scrollRef={scrollRef}
                                        ref={bills1Ref}
                                        onNext={() => handleNext(bills1Ref)}
                                        onKeyboardVisibleChange={onKeyboardVisibleChange}
                                        style={[styles.bigblue ]}                             
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
                                        scrollRef={scrollRef}
                                        ref={discretionary1Ref}
                                        onNext={() => handleNext(discretionary1Ref)}
                                        onKeyboardVisibleChange={onKeyboardVisibleChange}
                                        style={[styles.bigblue ]}                             
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
                                        scrollRef={scrollRef}
                                        ref={annualBills1Ref}
                                        onNext={() => handleNext(annualBills1Ref)}
                                        onKeyboardVisibleChange={onKeyboardVisibleChange}
                                        style={[styles.bigblue ]}                             
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
                                        scrollRef={scrollRef}
                                        ref={savings1Ref}
                                        onNext={() => handleNext(savings1Ref)}
                                        onKeyboardVisibleChange={onKeyboardVisibleChange}
                                        style={[styles.bigblue ]}                             
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
                                        scrollRef={scrollRef}  
                                        ref={savingGoals1Ref}
                                        onNext={() => handleNext(savingGoals1Ref)}
                                        onKeyboardVisibleChange={onKeyboardVisibleChange}                                    
                                        style={[styles.bigblue ]}                             
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
                        <CustomText style={[styles.centerText, styles.marginBottom]}>
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
                                            scrollRef={scrollRef}
                                            ref={rent2Ref}
                                            onNext={() => handleNext(rent2Ref)}
                                            onKeyboardVisibleChange={onKeyboardVisibleChange}
                                            style={[styles.bigblue ]}                             
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
                                            scrollRef={scrollRef}
                                            ref={bills2Ref}
                                            onNext={() => handleNext(bills2Ref)}
                                            onKeyboardVisibleChange={onKeyboardVisibleChange}
                                            style={[styles.bigblue ]}                             
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
                                            scrollRef={scrollRef}
                                            ref={discretionary2Ref}
                                            onNext={() => handleNext(discretionary2Ref)}
                                            onKeyboardVisibleChange={onKeyboardVisibleChange}
                                            style={[styles.bigblue ]}                             
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
                                            scrollRef={scrollRef}
                                            ref={annualBills2Ref}
                                            onNext={() => handleNext(annualBills2Ref)}
                                            onKeyboardVisibleChange={onKeyboardVisibleChange}
                                            style={[styles.bigblue ]}                             
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
                                            scrollRef={scrollRef}
                                            ref={savings2Ref}
                                            onNext={() => handleNext(savings2Ref)}
                                            onKeyboardVisibleChange={onKeyboardVisibleChange}
                                            style={[styles.bigblue ]}                             
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
                                            scrollRef={scrollRef}
                                            ref={savingGoals2Ref}
                                            onNext={() => handleNext(savingGoals2Ref)}
                                            onKeyboardVisibleChange={onKeyboardVisibleChange}
                                            style={[styles.bigblue ]}                             
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