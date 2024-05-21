import React, { useState, useEffect, useMemo } from 'react';
import { View, Pressable, Image } from 'react-native';
import styles from '../styles/appStyles';
import tableStyles from '../styles/tableStyles.js';
import borrowingStyles from '../styles/borrowingStyles.js';
import CustomText from '../utils/CustomText';
import { handleFormattedDisplayTwoDecimal } from '../utils/FormatNumber';
import { calculateMonthlyMortgagePayment, generateRepaymentSchedule } from '../utils/MortgageInterestCalc';
import Slider from '@react-native-community/slider';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6';
import remortgageIcon from '../assets/images/remortgageIcon.png';

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
    const [remortgageDetails, setRemortgageDetails] = useState([]);
    const [remainingBalance, setRemainingBalance] = useState(0);

    // Calculate the initial repayment schedule and monthly payment
    useEffect(() => {
        if (mortgageDrawdown && loanTerm && mortgageRate) {
            const payment = calculateMonthlyMortgagePayment(mortgageDrawdown, mortgageRate, loanTerm);
            const { repaymentSchedule, remainingBalance } = generateRepaymentSchedule(mortgageDrawdown, mortgageRate, loanTerm, remortgageDetails);
            setMonthlyPayment(payment);
            setRepaymentSchedule(repaymentSchedule);
            if (remortgageDetails.length === 0) {
                setRemainingBalance(remainingBalance);
            } else {
                const newBalance = repaymentSchedule.find(r => r.year === remortgageDetails[0].year - 1)?.openingBalance || 0;
                setRemainingBalance(newBalance);
            }
        }
    }, [mortgageDrawdown, loanTerm, mortgageRate, remortgageDetails]);

    // Hook to update the remortgage details based on repayment schedule
    useEffect(() => {
        if (remortgageDetails.length > 0) {
            const updatedRemortgageDetails = remortgageDetails.map((detail, index) => {
                let openingBalance = 0;
                if (index === 0) {
                    const previousYear = repaymentSchedule.find(r => r.year === detail.year - 1);
                    openingBalance = previousYear ? previousYear.openingBalance - previousYear.capitalRepayment : detail.openingBalance;
                } else {
                    const previousDetail = remortgageDetails[index - 1];
                    const previousYear = previousDetail.nestedSchedule.find(r => r.year === detail.year - 1);
                    openingBalance = previousYear ? previousYear.openingBalance - previousYear.capitalRepayment : detail.openingBalance;
                }
                return {
                    ...detail,
                    openingBalance,
                    nestedSchedule: detail.nestedSchedule || []
                };
            });

            if (JSON.stringify(updatedRemortgageDetails) !== JSON.stringify(remortgageDetails)) {
                setRemortgageDetails(updatedRemortgageDetails);
            }
        }
    }, [repaymentSchedule]);

    // New useEffect to dynamically update nested schedules for subsequent remortgage periods
    useEffect(() => {
        if (remortgageDetails.length > 1) {
            const updatedRemortgageDetails = remortgageDetails.map((detail, index) => {
                if (index > 0) {
                    const previousDetail = remortgageDetails[index - 1];
                    const previousYear = previousDetail.nestedSchedule.find(r => r.year === detail.year - 1);
                    const openingBalance = previousYear ? previousYear.openingBalance - previousYear.capitalRepayment : detail.openingBalance;

                    const { repaymentSchedule: nestedSchedule } = generateRepaymentSchedule(openingBalance, detail.newRate, detail.newTerm, remortgageDetails.slice(index + 1), detail.year);
                    
                    return {
                        ...detail,
                        openingBalance,
                        nestedSchedule
                    };
                }
                return detail;
            });

            setRemortgageDetails(updatedRemortgageDetails);
        }
    }, [remortgageDetails]);

    const addRemortgagePeriod = (year, openingBalance) => {
        setRemortgageDetails([...remortgageDetails, { year, newRate: mortgageRate, newTerm: loanTerm, openingBalance }]);
    };

    const updateRemortgageDetail = (index, key, value) => {
        const updatedDetails = [...remortgageDetails];
        updatedDetails[index][key] = value;
        setRemortgageDetails(updatedDetails);
    };

    const deleteRemortgagePeriod = (index) => {
        const updatedDetails = [...remortgageDetails];
        updatedDetails.splice(index, 1);
        setRemortgageDetails(updatedDetails);
    };

    const renderRepaymentSchedule = (schedule, detailIndex, startYear = 1, remortgagedYear) => {
        return schedule
            .filter(({ year }) => year < remortgagedYear || remortgagedYear === undefined)
            .map(({ year, openingBalance, annualInterestCharged, capitalRepayment }) => {
                const isBeforeRemortgagedYear = remortgagedYear !== undefined && year < remortgagedYear;
                return (
                    <View key={`${detailIndex}-${year}`} style={tableStyles.tableRow}>
                        <CustomText style={tableStyles.cell}>{year}</CustomText>
                        <CustomText style={tableStyles.cell}>{handleFormattedDisplayTwoDecimal(openingBalance)}</CustomText>
                        <CustomText style={tableStyles.cell}>{handleFormattedDisplayTwoDecimal(annualInterestCharged)}</CustomText>
                        <CustomText style={tableStyles.cell}>{handleFormattedDisplayTwoDecimal(capitalRepayment)}</CustomText>
                        {!isBeforeRemortgagedYear ? (
                            <Pressable style={styles.remortgageIconParent} onPress={() => addRemortgagePeriod(year, openingBalance)}>
                                <Image
                                    source={remortgageIcon}
                                    style={styles.remortgageIcon}
                                />
                            </Pressable>
                        ) : (
                            <FontAwesomeIcon name="lock" style={[styles.grey, styles.larger]} />
                        )}
                    </View>
                );
            });
    };

    return (
        <View style={styles.container}>
            <CustomText>Property Price: {handleFormattedDisplayTwoDecimal(propertyPrice)}</CustomText>
            <CustomText>Mortgage Drawdown: {handleFormattedDisplayTwoDecimal(mortgageDrawdown)}</CustomText>
            <CustomText>Monthly Payment: {handleFormattedDisplayTwoDecimal(monthlyPayment)}</CustomText>

            <View style={tableStyles.tableHeader}>
                <CustomText style={[tableStyles.cell, tableStyles.headerCell]}>Year</CustomText>
                <CustomText style={[tableStyles.cell, tableStyles.headerCell]}>Balance</CustomText>
                <CustomText style={[tableStyles.cell, tableStyles.headerCell]}>Interest</CustomText>
                <CustomText style={[tableStyles.cell, tableStyles.headerCell]}>Repaid</CustomText>
                <CustomText style={[tableStyles.cell, tableStyles.headerCell]}>Remortgaged</CustomText>
                <CustomText style={[tableStyles.cell, tableStyles.headerCell]}>Remortgage</CustomText>
            </View>
            <View style={styles.remortgageContainer}>
                <View style={[styles.center, styles.row]}>
                    <CustomText>Loan Term: {loanTerm} {loanTerm === 1 ? ("year") : ("years")}</CustomText>
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

                <View style={[styles.center, styles.row]}>
                    <CustomText>Mortgage Rate: {mortgageRate}%</CustomText>
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
                {renderRepaymentSchedule(repaymentSchedule, 0, 1, remortgageDetails.length > 0 ? remortgageDetails[0].year : undefined)}
            </View>
            {remortgageDetails.map((detail, index) => {
                const { year, newRate, newTerm, openingBalance } = detail;
                const { repaymentSchedule: nestedSchedule } = generateRepaymentSchedule(openingBalance, newRate, newTerm, [], year);

                return (
                    <View style={styles.remortgageContainer} key={`remortgage-${index}`}>
                        <Pressable onPress={() => deleteRemortgagePeriod(index)}>
                            <FontAwesomeIcon style={borrowingStyles.larger} name="circle-xmark" size={20} color={'#FF6961'} />
                        </Pressable>
                        <View style={[styles.center, styles.row]}>
                            <CustomText>Loan Term: {newTerm} {newTerm === 1 ? ("year") : ("years")}</CustomText>
                            <Slider
                                minimumValue={1}
                                maximumValue={35}
                                minimumTrackTintColor='#03a1fc'
                                maximumTrackTintColor='#91B0C2'
                                thumbTintColor='#14a730'
                                style={styles.widthLimitLonger}
                                step={1}
                                value={newTerm}
                                onValueChange={(value) => updateRemortgageDetail(index, 'newTerm', value)}
                            />
                        </View>

                        <View style={[styles.center, styles.row]}>
                            <CustomText>Mortgage Rate: {newRate}%</CustomText>
                            <Slider
                                minimumValue={2}
                                maximumValue={7}
                                minimumTrackTintColor='#03a1fc'
                                maximumTrackTintColor='#91B0C2'
                                thumbTintColor='#14a730'
                                style={styles.widthLimitLonger}
                                step={0.01}
                                value={newRate}
                                onValueChange={(value) => updateRemortgageDetail(index, 'newRate', value)}
                            />
                        </View>
                        {renderRepaymentSchedule(nestedSchedule, index + 1, year, remortgageDetails.length > index + 1 ? remortgageDetails[index + 1].year : undefined)}
                    </View>
                );
            })}
        </View>
    );
};

export default MortgageDetails;
