import React, { useState, useEffect, useRef } from 'react';
import { View, Button, Pressable } from 'react-native';
import styles from '../styles/appStyles';
import tableStyles from '../styles/tableStyles.js';
import borrowingStyles from '../styles/borrowingStyles.js';
import CustomText from '../utils/CustomText';
import { handleFormattedDisplayTwoDecimal } from '../utils/FormatNumber';
import { calculateMonthlyMortgagePayment, generateRepaymentSchedule } from '../utils/MortgageInterestCalc.js';
import Slider from '@react-native-community/slider';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6';


const MortgageDetails = ({
    propertyPrice,
    mortgageDrawdown,
    loanTerm,
    setLoanTerm,
    mortgageRate,
    setMortgageRate,
    scrollRef,
}) => {
    const [monthlyPayment, setMonthlyPayment] = useState(0);
    const [repaymentSchedule, setRepaymentSchedule] = useState([]);
    const [remortgageDetails, setRemortgageDetails] = useState({ year: 0, newRate: mortgageRate, newTerm: loanTerm });
    const [remainingBalance, setRemainingBalance] = useState(0);
    const [newRepaymentSchedule, setNewRepaymentSchedule] = useState([]);
    const [hasNonZeroOpeningBalance, setHasNonZeroOpeningBalance] = useState(false);

    useEffect(() => {
        if (mortgageDrawdown && loanTerm && mortgageRate) {
            const payment = calculateMonthlyMortgagePayment(mortgageDrawdown, mortgageRate, loanTerm);
            const { repaymentSchedule, remainingBalance } = generateRepaymentSchedule(mortgageDrawdown, mortgageRate, loanTerm);
            setMonthlyPayment(payment);
            setRepaymentSchedule(repaymentSchedule);
            if (remortgageDetails.year === 0) {
                setRemainingBalance(remainingBalance);
            } else {
                // Update remaining balance for new table if there's an active remortgage
                const remortgageYearData = repaymentSchedule.find(r => r.year === remortgageDetails.year - 1);
                const newBalance = remortgageYearData ? remortgageYearData.openingBalance - remortgageYearData.capitalRepayment : 0;
                setRemainingBalance(newBalance);
            }
        }
    }, [mortgageDrawdown, loanTerm, mortgageRate]);

    useEffect(() => {
        if (remortgageDetails.year > 0 && remainingBalance !== 0) {
            const { newRate, newTerm } = remortgageDetails;
            const { repaymentSchedule: newSchedule } = generateRepaymentSchedule(remainingBalance, newRate, newTerm);
            setNewRepaymentSchedule(newSchedule);
        }
    }, [remortgageDetails, remainingBalance, loanTerm, mortgageRate, mortgageDrawdown]);

    useEffect(() => {
        if (remortgageDetails.year > 0) {
            const parsedRemainingBalance = parseFloat(remainingBalance);
            setHasNonZeroOpeningBalance(parsedRemainingBalance > 1);
        }
    }, [remainingBalance, remortgageDetails]);    

    const handleRemortgage = (year, balance) => {
        setRemortgageDetails({ ...remortgageDetails, year });
        setRemainingBalance(balance);
    };  

    const cancelRemortgage = () => {
        setRemortgageDetails({ year: 0, newRate: mortgageRate, newTerm: loanTerm });
        setNewRepaymentSchedule([]);
        const payment = calculateMonthlyMortgagePayment(mortgageDrawdown, mortgageRate, loanTerm);
        const { repaymentSchedule, remainingBalance } = generateRepaymentSchedule(mortgageDrawdown, mortgageRate, loanTerm);
        setMonthlyPayment(payment);
        setRepaymentSchedule(repaymentSchedule);
        setRemainingBalance(remainingBalance);
    };

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.marginBottom}>
                    <CustomText style={[styles.centerText, styles.header]}>MortgageDetails</CustomText>
                </View>
            </View>
            <View style={styles.row}>
                <CustomText>Property Price: </CustomText>
                <CustomText style={[styles.textRight, styles.marginLeft]}>{handleFormattedDisplayTwoDecimal(parseFloat(propertyPrice))}</CustomText>
            </View>
            <View style={styles.row}>
                <CustomText>Mortgage Drawdown:</CustomText>
                <CustomText style={[styles.textRight, styles.marginLeft]}>{handleFormattedDisplayTwoDecimal(parseFloat(mortgageDrawdown))}</CustomText>
            </View>            

            <View style={styles.row}>
                <CustomText>Monthly Payment:</CustomText>
                <CustomText style={[styles.textRight, styles.marginLeft]}>{handleFormattedDisplayTwoDecimal(parseFloat(monthlyPayment))}</CustomText>
            </View>

            <View style={tableStyles.tableHeader}>
                <CustomText style={[tableStyles.cell, tableStyles.headerCell]}>Year</CustomText>
                <CustomText style={[tableStyles.cell, tableStyles.headerCell]}>Balance</CustomText>
                <CustomText style={[tableStyles.cell, tableStyles.headerCell]}>Interest</CustomText>
                <CustomText style={[tableStyles.cell, tableStyles.headerCell]}>Repaid</CustomText>
                <CustomText style={[tableStyles.cell, tableStyles.headerCell]}>Remortgage</CustomText>
            </View>
            <View style={styles.remortgageContainer}>
                <View style={[styles.center, styles.row]}>
                    <CustomText>Loan Term: {loanTerm} {loanTerm === 1 ? ("year") : ("years")}</CustomText>
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

                {repaymentSchedule
                    .filter(({ year }) => remortgageDetails.year === 0 || year < remortgageDetails.year)
                    .map(({ year, openingBalance, annualInterestCharged, capitalRepayment }) => (
                        <View key={year.toString()} style={tableStyles.tableRow}>
                            <CustomText style={tableStyles.cell}>{year}</CustomText>
                            <CustomText style={tableStyles.cell}>{handleFormattedDisplayTwoDecimal(openingBalance)}</CustomText>
                            <CustomText style={tableStyles.cell}>{handleFormattedDisplayTwoDecimal(annualInterestCharged)}</CustomText>
                            <CustomText style={tableStyles.cell}>{handleFormattedDisplayTwoDecimal(capitalRepayment)}</CustomText>
                            {(remortgageDetails.year === 0 || year > remortgageDetails.year) && (
                                <Button title="Remortgage" onPress={() => handleRemortgage(year, openingBalance)} />
                            )}
                        </View>
                    ))}
            </View>
            {hasNonZeroOpeningBalance && (
                <>
                {remortgageDetails.year > 0 && (
                    <View style={styles.remortgageContainer}>                        
                        <Pressable onPress={cancelRemortgage}>
                            <FontAwesomeIcon style={borrowingStyles.larger} name="circle-xmark" size={20} color={'#FF6961'}/>
                        </Pressable>
                        <View style={[styles.center, styles.row]}>
                            <CustomText>New Loan Term: {remortgageDetails.newTerm} {remortgageDetails.newTerm === 1 ? ("year") : ("years")}</CustomText>
                            <Slider
                                minimumValue={1}
                                maximumValue={35}
                                minimumTrackTintColor='#03a1fc'
                                maximumTrackTintColor='#91B0C2'
                                thumbTintColor='#14a730'
                                style={styles.widthLimitLonger}
                                step={1}
                                value={remortgageDetails.newTerm}
                                onValueChange={(value) => setRemortgageDetails({ ...remortgageDetails, newTerm: value })}
                            />
                        </View>
                        <View style={[styles.center, styles.row]}>
                            <CustomText>New Mortgage Rate: {remortgageDetails.newRate}%</CustomText>
                            <Slider
                                minimumValue={2}
                                maximumValue={7}
                                minimumTrackTintColor='#03a1fc'
                                maximumTrackTintColor='#91B0C2'
                                thumbTintColor='#14a730'
                                style={styles.widthLimitLonger}
                                step={0.01}
                                value={remortgageDetails.newRate}
                                onValueChange={(value) => setRemortgageDetails({ ...remortgageDetails, newRate: value })}
                            />
                        </View>

                        <View style={tableStyles.table}>
                            {newRepaymentSchedule
                            .filter(({ openingBalance, annualInterestCharged, capitalRepayment }) => 
                                openingBalance !== 0 || annualInterestCharged !== 0 || capitalRepayment !== 0)
                            .map(({ year, openingBalance, annualInterestCharged, capitalRepayment }, index) => (
                                <View key={index.toString()} style={tableStyles.tableRow}>
                                    <CustomText style={tableStyles.cell}>{remortgageDetails.year + index}</CustomText>
                                    <CustomText style={tableStyles.cell}>{handleFormattedDisplayTwoDecimal(openingBalance)}</CustomText>
                                    <CustomText style={tableStyles.cell}>{handleFormattedDisplayTwoDecimal(annualInterestCharged)}</CustomText>
                                    <CustomText style={tableStyles.cell}>{handleFormattedDisplayTwoDecimal(capitalRepayment)}</CustomText>
                                </View>
                            ))}
                        </View>
                    </View>
                )}
                </>
            )}
        </View>
    );
};

export default MortgageDetails;
