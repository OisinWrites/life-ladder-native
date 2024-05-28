import React, { useState, useRef, useEffect } from 'react';
import { View, Pressable } from 'react-native';
import styles from '../styles/appStyles';
import borrowingStyles from '../styles/borrowingStyles';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6';
import { calculateTaxDetails } from '../utils/taxCalc';
import CustomText from '../utils/CustomText';
import CustomNumericInput from '../utils/CustomNumericInput';
import { handleNumericChange, handleFormattedDisplay, handleFormattedDisplayTwoDecimal, parseFormattedNumber } from '../utils/FormatNumber';
import { useKeyboard } from '../utils/KeyboardContext';

const PersonalFinances = ({
    applicants,
    displaySwap2,
    displayWarning2,
    handleToggleComplete2,
    personalFinances,
    setPersonalFinances,
    scrollRef
}) => {
    const { isKeyboardVisible, setIsKeyboardVisible } = useKeyboard();

    const taxDetails1 = parseFloat(personalFinances[0].salary) > 0 ? calculateTaxDetails(personalFinances[0].salary) : 0;
    const taxDetails2 = applicants === 2 ? calculateTaxDetails(personalFinances[1].salary) : 0;

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

    const handleNumericChange = (text, setter) => {
        const value = parseFormattedNumber(text);
        setter(value);
    };

    const handlePersonalFinancesChange = (index, key, value) => {
        setPersonalFinances(prevState => {
            const newState = [...prevState];
            newState[index][key] = value;
            return newState;
        });
    };

    const newSavingPowerMonthly1 = taxDetails1.netMonthlyIncome - personalFinances[0].rent - personalFinances[0].bills - (parseFloat(personalFinances[0].weeklyDiscretionary) || 0) * 52 / 12 - (personalFinances[0].annualBills / 12);
    const newSavingPowerMonthly2 = taxDetails2.netMonthlyIncome - personalFinances[1].rent - personalFinances[1].bills - (parseFloat(personalFinances[1].weeklyDiscretionary) || 0) * 52 / 12 - (personalFinances[1].annualBills / 12);

    useEffect(() => {
        setPersonalFinances(prevState => {
            const newState = [...prevState];
            newState[0].savingPowerMonthly = newSavingPowerMonthly1;
            return newState;
        });
    }, [newSavingPowerMonthly1]);

    useEffect(() => {
        setPersonalFinances(prevState => {
            const newState = [...prevState];
            newState[1].savingPowerMonthly = newSavingPowerMonthly2;
            return newState;
        });
    }, [newSavingPowerMonthly2]);

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
            if (nextRef && nextRef.current) {
                nextRef.current.focus();
            }
        } else {
            if (currentRef && currentRef.current) {
                currentRef.current.focus();
            }
        }
    };

    return (
        <View style={styles.container}>
            {displaySwap2 ? (
                <View>
                    <Pressable style={styles.row} title="Edit Section" onPress={handleToggleComplete2}>
                        <CustomText style={[styles.centerText, styles.header, styles.completed]}>Personal Finances</CustomText>
                    </Pressable>
                </View>
            ) : (
                <View>
                    <View style={styles.marginBottom}>
                        <CustomText style={[styles.centerText, styles.header]}>Personal Finances</CustomText>
                        {displayWarning2 &&
                            <CustomText style={[styles.textColorGreen, styles.centerText]}>
                                Complete this section before moving on
                            </CustomText>
                        }
                    </View>

                    <View style={styles.marginBottom}>
                        {applicants === 2 && (
                            <CustomText style={[styles.centerText, styles.marginBottom]}>
                                Applicant 1's Details
                            </CustomText>
                        )}

                        <View style={styles.row}>
                            <View>
                                <View style={[styles.row, styles.center]}>
                                    <CustomText>Monthly Rent:</CustomText>
                                    <View style={[borrowingStyles.salaryInputs, styles.widthLimit, styles.marginLeft]}>
                                        <CustomNumericInput
                                            scrollRef={scrollRef}
                                            ref={rent1Ref}
                                            onNext={() => handleNext(rent1Ref)}
                                            onKeyboardVisibleChange={setIsKeyboardVisible}
                                            style={[styles.bigblue]}
                                            value={handleFormattedDisplay(personalFinances[0].rent)}
                                            onChangeText={(text) => handlePersonalFinancesChange(0, 'rent', parseFormattedNumber(text))}
                                            label="Monthly Rent:"
                                        />
                                    </View>
                                </View>

                                <View style={[styles.row, styles.center]}>
                                    <CustomText>Monthly Bills:</CustomText>
                                    <View style={[borrowingStyles.salaryInputs, styles.widthLimit, styles.marginLeft]}>
                                        <CustomNumericInput
                                            scrollRef={scrollRef}
                                            ref={bills1Ref}
                                            onNext={() => handleNext(bills1Ref)}
                                            onKeyboardVisibleChange={setIsKeyboardVisible}
                                            style={[styles.bigblue]}
                                            value={handleFormattedDisplay(personalFinances[0].bills)}
                                            onChangeText={(text) => handlePersonalFinancesChange(0, 'bills', parseFormattedNumber(text))}
                                            label="Monthly Bills:"
                                        />
                                    </View>
                                </View>

                                <View style={[styles.row, styles.center]}>
                                    <CustomText>Weekly Spending:</CustomText>
                                    <View style={[borrowingStyles.salaryInputs, styles.widthLimit, styles.marginLeft]}>
                                        <CustomNumericInput
                                            scrollRef={scrollRef}
                                            ref={discretionary1Ref}
                                            onNext={() => handleNext(discretionary1Ref)}
                                            onKeyboardVisibleChange={setIsKeyboardVisible}
                                            style={[styles.bigblue]}
                                            value={handleFormattedDisplay(personalFinances[0].weeklyDiscretionary)}
                                            onChangeText={(text) => handlePersonalFinancesChange(0, 'weeklyDiscretionary', parseFormattedNumber(text))}
                                            label="Weekly Spending:"
                                        />
                                    </View>
                                </View>

                                <View style={[styles.row, styles.center]}>
                                    <CustomText>Annual Bills:</CustomText>
                                    <View style={[borrowingStyles.salaryInputs, styles.widthLimit, styles.marginLeft]}>
                                        <CustomNumericInput
                                            scrollRef={scrollRef}
                                            ref={annualBills1Ref}
                                            onNext={() => handleNext(annualBills1Ref)}
                                            onKeyboardVisibleChange={setIsKeyboardVisible}
                                            style={[styles.bigblue]}
                                            value={handleFormattedDisplay(personalFinances[0].annualBills)}
                                            onChangeText={(text) => handlePersonalFinancesChange(0, 'annualBills', parseFormattedNumber(text))}
                                            label="Annual Bills:"
                                        />
                                    </View>
                                </View>

                                <View style={[styles.row, styles.marginVertical]}>
                                    <CustomText>Monthly Savings:</CustomText>
                                    <CustomText style={[styles.textRight, styles.marginLeft, styles.marginRight]}>
                                        {handleFormattedDisplayTwoDecimal(personalFinances[0].savingPowerMonthly)}
                                    </CustomText>
                                </View>

                                <View style={[styles.row, styles.center]}>
                                    <CustomText>Current Savings:</CustomText>
                                    <View style={[borrowingStyles.salaryInputs, styles.widthLimit, styles.marginLeft]}>
                                        <CustomNumericInput
                                            scrollRef={scrollRef}
                                            ref={savings1Ref}
                                            onNext={() => handleNext(savings1Ref)}
                                            onKeyboardVisibleChange={setIsKeyboardVisible}
                                            style={[styles.bigblue]}
                                            value={handleFormattedDisplay(personalFinances[0].currentSavings)}
                                            onChangeText={(text) => handlePersonalFinancesChange(0, 'currentSavings', parseFormattedNumber(text))}
                                            label="Current Savings:"
                                        />
                                    </View>
                                </View>

                                <View style={[styles.row, styles.center]}>
                                    <CustomText>Other Saving Goals:</CustomText>
                                    <View style={[borrowingStyles.salaryInputs, styles.widthLimit, styles.marginLeft]}>
                                        <CustomNumericInput
                                            scrollRef={scrollRef}
                                            ref={savingGoals1Ref}
                                            onNext={() => handleNext(savingGoals1Ref)}
                                            onKeyboardVisibleChange={setIsKeyboardVisible}
                                            style={[styles.bigblue]}
                                            value={handleFormattedDisplay(personalFinances[0].otherSavingGoals)}
                                            onChangeText={(text) => handlePersonalFinancesChange(0, 'otherSavingGoals', parseFormattedNumber(text))}
                                            label="Other Saving Goals:"
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View>
                            <CustomText style={styles.centerText}>monthly tax</CustomText>
                            <View style={styles.row}>
                                <CustomText>usc:</CustomText>
                                <CustomText style={[styles.textRight, styles.marginLeft]}>
                                    {handleFormattedDisplayTwoDecimal(taxDetails1.usc / 12)}
                                </CustomText>
                            </View>
                            <View style={styles.row}>
                                <CustomText>paye:</CustomText>
                                <CustomText style={[styles.textRight, styles.marginLeft]}>
                                    {handleFormattedDisplayTwoDecimal(taxDetails1.paye / 12)}
                                </CustomText>
                            </View>
                            <View style={styles.row}>
                                <CustomText>prsi:</CustomText>
                                <CustomText style={[styles.textRight, styles.marginLeft]}>
                                    {handleFormattedDisplayTwoDecimal(taxDetails1.prsi / 12)}
                                </CustomText>
                            </View>
                            <View style={styles.horizontalRule} />
                            <View style={styles.row}>
                                <CustomText>net pay:</CustomText>
                                <CustomText style={[styles.textRight, styles.marginLeft]}>
                                    {handleFormattedDisplayTwoDecimal(taxDetails1.netMonthlyIncome)}
                                </CustomText>
                            </View>
                        </View>
                    </View>

                    {applicants === 2 && (
                        <View style={styles.marginBottom}>
                            <CustomText style={[styles.centerText, styles.marginBottom]}>
                                Applicant 2's Details
                            </CustomText>
                            <View style={styles.row}>
                                <View>
                                    <View style={[styles.row, styles.center]}>
                                        <CustomText>Monthly Rent:</CustomText>
                                        <View style={[borrowingStyles.salaryInputs, styles.widthLimit, styles.marginLeft]}>
                                            <CustomNumericInput
                                                scrollRef={scrollRef}
                                                ref={rent2Ref}
                                                onNext={() => handleNext(rent2Ref)}
                                                onKeyboardVisibleChange={setIsKeyboardVisible}
                                                style={[styles.bigblue]}
                                                value={handleFormattedDisplay(personalFinances[1].rent)}
                                                onChangeText={(text) => handlePersonalFinancesChange(1, 'rent', parseFormattedNumber(text))}
                                                label="Monthly Rent:"
                                            />
                                        </View>
                                    </View>

                                    <View style={[styles.row, styles.center]}>
                                        <CustomText>Monthly Bills:</CustomText>
                                        <View style={[borrowingStyles.salaryInputs, styles.widthLimit, styles.marginLeft]}>
                                            <CustomNumericInput
                                                scrollRef={scrollRef}
                                                ref={bills2Ref}
                                                onNext={() => handleNext(bills2Ref)}
                                                onKeyboardVisibleChange={setIsKeyboardVisible}
                                                style={[styles.bigblue]}
                                                value={handleFormattedDisplay(personalFinances[1].bills)}
                                                onChangeText={(text) => handlePersonalFinancesChange(1, 'bills', parseFormattedNumber(text))}
                                                label="Monthly Bills:"
                                            />
                                        </View>
                                    </View>

                                    <View style={[styles.row, styles.center]}>
                                        <CustomText>Weekly Spending:</CustomText>
                                        <View style={[borrowingStyles.salaryInputs, styles.widthLimit, styles.marginLeft]}>
                                            <CustomNumericInput
                                                scrollRef={scrollRef}
                                                ref={discretionary2Ref}
                                                onNext={() => handleNext(discretionary2Ref)}
                                                onKeyboardVisibleChange={setIsKeyboardVisible}
                                                style={[styles.bigblue]}
                                                value={handleFormattedDisplay(personalFinances[1].weeklyDiscretionary)}
                                                onChangeText={(text) => handlePersonalFinancesChange(1, 'weeklyDiscretionary', parseFormattedNumber(text))}
                                                label="Weekly Spending:"
                                            />
                                        </View>
                                    </View>

                                    <View style={[styles.row, styles.center]}>
                                        <CustomText>Annual Bills:</CustomText>
                                        <View style={[borrowingStyles.salaryInputs, styles.widthLimit, styles.marginLeft]}>
                                            <CustomNumericInput
                                                scrollRef={scrollRef}
                                                ref={annualBills2Ref}
                                                onNext={() => handleNext(annualBills2Ref)}
                                                onKeyboardVisibleChange={setIsKeyboardVisible}
                                                style={[styles.bigblue]}
                                                value={handleFormattedDisplay(personalFinances[1].annualBills)}
                                                onChangeText={(text) => handlePersonalFinancesChange(1, 'annualBills', parseFormattedNumber(text))}
                                                label="Annual Bills:"
                                            />
                                        </View>
                                    </View>

                                    <View style={[styles.row, styles.marginVertical]}>
                                        <CustomText>Monthly Savings:</CustomText>
                                        <CustomText style={[styles.textRight, styles.marginLeft, styles.marginRight]}>
                                            {handleFormattedDisplayTwoDecimal(personalFinances[1].savingPowerMonthly)}
                                        </CustomText>
                                    </View>

                                    <View style={[styles.row, styles.center]}>
                                        <CustomText>Current Savings:</CustomText>
                                        <View style={[borrowingStyles.salaryInputs, styles.widthLimit, styles.marginLeft]}>
                                            <CustomNumericInput
                                                scrollRef={scrollRef}
                                                ref={savings2Ref}
                                                onNext={() => handleNext(savings2Ref)}
                                                onKeyboardVisibleChange={setIsKeyboardVisible}
                                                style={[styles.bigblue]}
                                                value={handleFormattedDisplay(personalFinances[1].currentSavings)}
                                                onChangeText={(text) => handlePersonalFinancesChange(1, 'currentSavings', parseFormattedNumber(text))}
                                                label="Current Savings:"
                                            />
                                        </View>
                                    </View>

                                    <View style={[styles.row, styles.center]}>
                                        <CustomText>Other Saving Goals:</CustomText>
                                        <View style={[borrowingStyles.salaryInputs, styles.widthLimit, styles.marginLeft]}>
                                            <CustomNumericInput
                                                scrollRef={scrollRef}
                                                ref={savingGoals2Ref}
                                                onNext={() => handleNext(savingGoals2Ref)}
                                                onKeyboardVisibleChange={setIsKeyboardVisible}
                                                style={[styles.bigblue]}
                                                value={handleFormattedDisplay(personalFinances[1].otherSavingGoals)}
                                                onChangeText={(text) => handlePersonalFinancesChange(1, 'otherSavingGoals', parseFormattedNumber(text))}
                                                label="Other Saving Goals:"
                                            />
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View>
                                <CustomText style={styles.centerText}>monthly tax</CustomText>
                                <View style={styles.row}>
                                    <CustomText>usc:</CustomText>
                                    <CustomText style={[styles.textRight, styles.marginLeft]}>
                                        {handleFormattedDisplayTwoDecimal(taxDetails2.usc / 12)}
                                    </CustomText>
                                </View>
                                <View style={styles.row}>
                                    <CustomText>paye:</CustomText>
                                    <CustomText style={[styles.textRight, styles.marginLeft]}>
                                        {handleFormattedDisplayTwoDecimal(taxDetails2.paye / 12)}
                                    </CustomText>
                                </View>
                                <View style={styles.row}>
                                    <CustomText>prsi:</CustomText>
                                    <CustomText style={[styles.textRight, styles.marginLeft]}>
                                        {handleFormattedDisplayTwoDecimal(taxDetails2.prsi / 12)}
                                    </CustomText>
                                </View>
                                <View className={styles.horizontalRule} />
                                <View className={styles.row}>
                                    <CustomText>net pay:</CustomText>
                                    <CustomText className={[styles.textRight, styles.marginLeft]}>
                                        {handleFormattedDisplayTwoDecimal(taxDetails2.netMonthlyIncome)}
                                    </CustomText>
                                </View>
                            </View>
                        </View>
                    )}
                </View>
            )}
        </View>
    );
};

export default PersonalFinances;
