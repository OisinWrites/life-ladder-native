import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
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
    personalFinances1,
    setPersonalFinances1,
    personalFinances2,
    setPersonalFinances2,
    scrollRef,
    rent1Ref,
    bills1Ref,
    discretionary1Ref,
    annualBills1Ref,
    savings1Ref,
    savingGoals1Ref,
    rent2Ref,
    bills2Ref,
    discretionary2Ref,
    annualBills2Ref,
    savings2Ref,
    savingGoals2Ref
  }) => {
    const { isKeyboardVisible, setIsKeyboardVisible } = useKeyboard();

    const taxDetails1 = parseFloat(personalFinances1.salary) > 0 ? calculateTaxDetails(personalFinances1.salary) : 0;
    const taxDetails2 = applicants === 2 ? calculateTaxDetails(personalFinances2.salary) : 0;
  
    const handleNumericChange = (text, setter) => {
      const value = parseFormattedNumber(text);
      setter(value);
    };
  
    const handlePersonalFinancesChange1 = (key, value) => {
      setPersonalFinances1(prevState => ({
        ...prevState,
        [key]: value
      }));
    };
  
    const handlePersonalFinancesChange2 = (key, value) => {
      setPersonalFinances2(prevState => ({
        ...prevState,
        [key]: value
      }));
    };
  
    const newSavingPowerMonthly1 = taxDetails1.netMonthlyIncome - personalFinances1.rent - personalFinances1.bills - (parseFloat(personalFinances1.weeklyDiscretionary) || 0) * 52 / 12 - (personalFinances1.annualBills / 12);
    const newSavingPowerMonthly2 = taxDetails2.netMonthlyIncome - personalFinances2.rent - personalFinances2.bills - (parseFloat(personalFinances2.weeklyDiscretionary) || 0) * 52 / 12 - (personalFinances2.annualBills / 12);
  
    useEffect(() => {
      setPersonalFinances1(prevState => ({
        ...prevState,
        savingPowerMonthly: newSavingPowerMonthly1
      }));
      setPersonalFinances2(prevState => ({
        ...prevState,
        savingPowerMonthly: newSavingPowerMonthly2
      }));
    }, [newSavingPowerMonthly1, newSavingPowerMonthly2]);
  
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
                        value={handleFormattedDisplay(personalFinances1.rent)}
                        onChangeText={(text) => handleNumericChange(text, (value) => handlePersonalFinancesChange1('rent', value))}
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
                        value={handleFormattedDisplay(personalFinances1.bills)}
                        onChangeText={(text) => handleNumericChange(text, (value) => handlePersonalFinancesChange1('bills', value))}
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
                        value={handleFormattedDisplay(personalFinances1.weeklyDiscretionary)}
                        onChangeText={(text) => handleNumericChange(text, (value) => handlePersonalFinancesChange1('weeklyDiscretionary', value))}
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
                        value={handleFormattedDisplay(personalFinances1.annualBills)}
                        onChangeText={(text) => handleNumericChange(text, (value) => handlePersonalFinancesChange1('annualBills', value))}
                        label="Annual Bills:"
                      />
                    </View>
                  </View>
  
                  <View style={[styles.row, styles.marginVertical]}>
                    <CustomText>Monthly Savings:</CustomText>
                    <CustomText style={[styles.textRight, styles.marginLeft, styles.marginRight]}>
                      {handleFormattedDisplayTwoDecimal(personalFinances1.savingPowerMonthly)}
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
                        value={handleFormattedDisplay(personalFinances1.currentSavings)}
                        onChangeText={(text) => handleNumericChange(text, (value) => handlePersonalFinancesChange1('currentSavings', value))}
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
                        value={handleFormattedDisplay(personalFinances1.otherSavingGoals)}
                        onChangeText={(text) => handleNumericChange(text, (value) => handlePersonalFinancesChange1('otherSavingGoals', value))}
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
                          value={handleFormattedDisplay(personalFinances2.rent)}
                          onChangeText={(text) => handleNumericChange(text, (value) => handlePersonalFinancesChange2('rent', value))}
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
                          value={handleFormattedDisplay(personalFinances2.bills)}
                          onChangeText={(text) => handleNumericChange(text, (value) => handlePersonalFinancesChange2('bills', value))}
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
                          value={handleFormattedDisplay(personalFinances2.weeklyDiscretionary)}
                          onChangeText={(text) => handleNumericChange(text, (value) => handlePersonalFinancesChange2('weeklyDiscretionary', value))}
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
                          value={handleFormattedDisplay(personalFinances2.annualBills)}
                          onChangeText={(text) => handleNumericChange(text, (value) => handlePersonalFinancesChange2('annualBills', value))}
                          label="Annual Bills:"
                        />
                      </View>
                    </View>
  
                    <View style={[styles.row, styles.marginVertical]}>
                      <CustomText>Monthly Savings:</CustomText>
                      <CustomText style={[styles.textRight, styles.marginLeft, styles.marginRight]}>
                        {handleFormattedDisplayTwoDecimal(personalFinances2.savingPowerMonthly)}
                      </CustomText>
                    </View>
  
                    <View style={[styles.row, styles.center]}>
                      <CustomText>Current Savings</CustomText>
                      <View style={[borrowingStyles.salaryInputs, styles.widthLimit, styles.marginLeft]}>
                        <CustomNumericInput
                          scrollRef={scrollRef}
                          ref={savings2Ref}
                          onNext={() => handleNext(savings2Ref)}
                          onKeyboardVisibleChange={setIsKeyboardVisible}
                          style={[styles.bigblue]}
                          value={handleFormattedDisplay(personalFinances2.currentSavings)}
                          onChangeText={(text) => handleNumericChange(text, (value) => handlePersonalFinancesChange2('currentSavings', value))}
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
                          value={handleFormattedDisplay(personalFinances2.otherSavingGoals)}
                          onChangeText={(text) => handleNumericChange(text, (value) => handlePersonalFinancesChange2('otherSavingGoals', value))}
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
  