import React, { useState, useEffect, useRef } from 'react';
import { View, Pressable } from 'react-native';
import styles from '../styles/appStyles';
import borrowingStyles from '../styles/borrowingStyles';
import tableStyles from '../styles/tableStyles.js';
import CustomText from '../utils/CustomText';
import CustomNumericInput from '../utils/CustomNumericInput';
import { handleNumericChange, handleFormattedDisplay, handleFormattedDisplayTwoDecimal, parseFormattedNumber } from '../utils/FormatNumber';
import { calculateMonthlyMortgagePayment, generateRepaymentSchedule  } from '../utils/MortgageInterestCalc.js';
import Slider from '@react-native-community/slider';


const MortgageDetails = ({
    propertyPrice,
    mortgageDrawdown,
    loanTerm,
    setLoanTerm,
    mortgageRate,
    setMortgageRate,
    scrollRef,
}) => {

    const loanTermRef = useRef(null);
    const mortgageRateRef = useRef(null);

    const [monthlyPayment, setMonthlyPayment] = useState(0);
    const [repaymentSchedule, setRepaymentSchedule] = useState([]);

    const handleItemChange = (item) => {
        setLoanTerm(item);
    };
  
    useEffect(() => {
      if (mortgageDrawdown && loanTerm && mortgageRate) {
        const payment = calculateMonthlyMortgagePayment(mortgageDrawdown, mortgageRate, loanTerm);
        const schedule = generateRepaymentSchedule(mortgageDrawdown, mortgageRate, loanTerm);
        setMonthlyPayment(payment);
        setRepaymentSchedule(schedule);
      }
    }, [mortgageDrawdown, loanTerm, mortgageRate]);

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.marginBottom}>
                    <CustomText style={[styles.centerText, styles.header]}>MortgageDetails</CustomText>
                </View>

            </View>
            <View style={styles.row}>
                <CustomText>Property Price: </CustomText>
                <CustomText style={[styles.textRight, styles.marginLeft]}> {handleFormattedDisplayTwoDecimal(parseFloat(propertyPrice))}</CustomText>
            </View>
            <View style={styles.row}>
                <CustomText>Mortgage Drawdown:</CustomText>
                <CustomText style={[styles.textRight, styles.marginLeft]}> {handleFormattedDisplayTwoDecimal(parseFloat(mortgageDrawdown))}</CustomText>
            </View>

            <View style={[styles.center, styles.row]}>
                <CustomText>Loan Term: {loanTerm} { loanTerm === 1 ? ("year") : ("years")}</CustomText>
                <View>
                    <Slider
                        minimumValue={1}
                        maximumValue={35}
                        minimumTrackTintColor='#03a1fc'
                        maximumTrackTintColor='#91B0C2'
                        thumbTintColor='#14a730'
                        style={styles.widthLimitLonger}
                        step={1}
                        value={loanTerm}
                        onValueChange={setLoanTerm}
                    />                                        
                </View>
            </View>

            <View style={[styles.center, styles.row]}>
                <CustomText>Mortgage Rate: {mortgageRate}%</CustomText>
                <View>
                    <Slider
                        minimumValue={2}
                        maximumValue={7}
                        minimumTrackTintColor='#03a1fc'
                        maximumTrackTintColor='#91B0C2'
                        thumbTintColor='#14a730'
                        style={styles.widthLimitLonger}
                        step={0.01}
                        value={mortgageRate}
                        onValueChange={setMortgageRate}
                    />                                        
                </View>

            </View>
                <View style={tableStyles.table}>
                    <View style={tableStyles.tableHeader}>
                        <CustomText style={[tableStyles.cell, tableStyles.headerCell]}>Year</CustomText>
                        <CustomText style={[tableStyles.cell, tableStyles.headerCell]}>Opening Balance</CustomText>
                        <CustomText style={[tableStyles.cell, tableStyles.headerCell]}>Annual Interest Charged</CustomText>
                        <CustomText style={[tableStyles.cell, tableStyles.headerCell]}>Capital Repayment</CustomText>
                    </View>

                {repaymentSchedule.map(({ year, openingBalance, annualInterestCharged, capitalRepayment }) => (
                    <View key={year.toString()} style={tableStyles.tableRow}>
                        <CustomText style={tableStyles.cell}>{year}</CustomText>
                        <CustomText style={tableStyles.cell}>{handleFormattedDisplayTwoDecimal(openingBalance)}</CustomText>
                        <CustomText style={tableStyles.cell}>{handleFormattedDisplayTwoDecimal(annualInterestCharged)}</CustomText>
                        <CustomText style={tableStyles.cell}>{handleFormattedDisplayTwoDecimal(capitalRepayment)}</CustomText>
                    </View>
                ))}
                </View>
        </View>
    );
};

export default MortgageDetails;