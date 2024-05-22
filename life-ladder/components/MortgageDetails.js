import React, { useState, useEffect, useRef } from 'react';
import { View, Pressable, Image, ScrollView } from 'react-native';
import styles from '../styles/appStyles';
import tableStyles from '../styles/tableStyles.js';
import borrowingStyles from '../styles/borrowingStyles.js';
import CustomText from '../utils/CustomText';
import CustomNumericInput from '../utils/CustomNumericInput.js';
import { handleFormattedDisplayTwoDecimal, parseFormattedNumber, handleFormattedDisplay } from '../utils/FormatNumber';
import { calculateMonthlyMortgagePayment, generateRepaymentSchedule } from '../utils/MortgageInterestCalc';
import Slider from '@react-native-community/slider';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6';
import remortgageIcon from '../assets/images/remortgageIcon.png';

const MortgageDetails = ({ 
    mortgageDrawdown, 
    remortgageDetails,
    setRemortgageDetails,
    }) => {
    const prevRemortgageDetails = useRef(JSON.stringify(remortgageDetails));
    const prevMortgageDrawdown = useRef(mortgageDrawdown);

    const recalculateSchedules = () => {
        let updatedRemortgageDetails = [...remortgageDetails];
        for (let index = 0; index < updatedRemortgageDetails.length; index++) {
            const details = updatedRemortgageDetails[index];
            const startYear = details.year || 1;

            const adjustedOpeningBalance = parseFormattedNumber(details.openingBalance) + parseFormattedNumber(details.cashBack || 0);

            // Send the adjusted opening balance to the generateRepaymentSchedule function
            const scheduleResult = generateRepaymentSchedule(
                adjustedOpeningBalance,  // Using adjusted opening balance
                details.newRate,
                details.newTerm,
                remortgageDetails.slice(index + 1),
                startYear
            );

            const schedule = scheduleResult.repaymentSchedule;
            const lastYearDetails = scheduleResult.lastYearDetails;

            updatedRemortgageDetails[index] = { ...details, schedule };

            if (updatedRemortgageDetails[index + 1]) {
                const { openingBalance, capitalRepayment } = lastYearDetails;
                updatedRemortgageDetails[index + 1].openingBalance = openingBalance - capitalRepayment;
            }
        }
        setRemortgageDetails(updatedRemortgageDetails);
    };

    useEffect(() => {
        const currentRemortgageDetails = JSON.stringify(remortgageDetails);
        if (currentRemortgageDetails !== prevRemortgageDetails.current) {
            recalculateSchedules();
            prevRemortgageDetails.current = currentRemortgageDetails;
        }
    }, [remortgageDetails]);

    useEffect(() => {
        if (prevMortgageDrawdown.current !== mortgageDrawdown) {
            setRemortgageDetails((prevDetails) => {
                const updatedDetails = [...prevDetails];
                updatedDetails[0].openingBalance = mortgageDrawdown;
                return updatedDetails;
            });
            prevMortgageDrawdown.current = mortgageDrawdown;
        }
    }, [mortgageDrawdown]);

    const addRemortgagePeriod = (year, previousBalance) => {
        const newRemortgageDetails = [...remortgageDetails];
        newRemortgageDetails.push({ year, newTerm: 25, newRate: 3.5, openingBalance: previousBalance, schedule: [] });
        setRemortgageDetails(newRemortgageDetails);
    };

    const deleteRemortgagePeriod = (index) => {
        const newRemortgageDetails = remortgageDetails.filter((_, i) => i !== index);
        setRemortgageDetails(newRemortgageDetails);
    };

    const updateRemortgageDetail = (index, key, value) => {
        const updatedDetails = remortgageDetails.map((detail, i) => 
            i === index ? { ...detail, [key]: value } : detail
        );
        setRemortgageDetails(updatedDetails);
    };

    const refreshSchedules = () => {
        setRemortgageDetails([{
            newTerm: 25,
            newRate: 3.5,
            openingBalance: mortgageDrawdown,
            schedule: []
        }]);
    }

    const renderRepaymentSchedule = (schedule, index = 0, startYear = 1, nextRemortgageYear) => {
        return schedule.map((item, i) => {
            const year = startYear + i;
            return (
                Number(item.openingBalance) > 1 && (
                    <View key={`${index}-${i}`} style={tableStyles.tableRow}>
                        <CustomText style={[ tableStyles.cell, tableStyles.smlWidth ]}>{year}</CustomText>
                        <CustomText numberOfLines={1} style={[ tableStyles.cell, tableStyles.lrgWidth ]}>{handleFormattedDisplayTwoDecimal(item.openingBalance)}</CustomText>
                        <CustomText numberOfLines={1} style={[ tableStyles.cell, tableStyles.midWidth ]}>{handleFormattedDisplayTwoDecimal(item.annualInterestCharged)}</CustomText>
                        <CustomText numberOfLines={1} style={[ tableStyles.cell, tableStyles.midWidth ]}>{handleFormattedDisplayTwoDecimal(item.capitalRepayment)}</CustomText>
                        <View style={[tableStyles.iconWidth, styles.center]}>
                        {!nextRemortgageYear ? (
                            <Pressable style={[styles.remortgageIconParent, styles.bigBlueBackground]} onPress={() => addRemortgagePeriod(year, item.openingBalance)}>
                                <Image
                                    source={remortgageIcon}
                                    style={styles.remortgageIcon}
                                />
                            </Pressable>
                        ) : (
                            <FontAwesomeIcon name="lock" style={[styles.remortgageIconParent, styles.grey, styles.larger]} />
                        )}
                        </View>
                    </View>
                )
            );
        });
    };

    const totalYearsUntilRepaid = remortgageDetails.reduce((total, details, index) => {
        if (details.schedule.length > 0 && details.schedule[0].openingBalance >= 1) {
            const nextRemortgage = remortgageDetails[index + 1];
            const yearsUntilRemortgage = nextRemortgage 
                ? Math.min(nextRemortgage.year - (details.year || 1), details.newTerm)
                : details.newTerm;
            return total + yearsUntilRemortgage;
        }
        return total;
    }, 0);
    
    return (
        <View style={styles.container}>
            <View style={styles.marginBottom}>
                <View style={styles.marginBottom}>
                    <CustomText style={[styles.centerText, styles.header]}>Mortgage Details</CustomText>
                </View>
                <View style={styles.remortgageContainer}>
                    <View style={[styles.row, tableStyles.tableHeader, styles.marginBottom]}>
                        <CustomText>Length of Mortgage Period</CustomText>
                        <CustomText style={[styles.textRight, styles.marginLeft]}>Monthly Repayments</CustomText>
                    </View>

                    {remortgageDetails.map((details, index) => {
                        const monthlyRepayments = calculateMonthlyMortgagePayment(details.openingBalance, details.newRate, details.newTerm);
                        const nextRemortgage = remortgageDetails[index + 1];
                        const yearsUntilRemortgage = nextRemortgage 
                            ? Math.min(nextRemortgage.year - (details.year || 1), details.newTerm)
                            : details.newTerm;
                        return (
                            <View key={`remortgage-period-${index}`}>
                                {monthlyRepayments > 1 && (
                                    <View style={styles.row}>
                                        <View style={styles.row}>
                                            <CustomText style={[styles.widthLimitSmall, styles.textRight]}>{yearsUntilRemortgage}</CustomText>
                                            <CustomText style={[styles.marginLeft]}>{ yearsUntilRemortgage === 1 ? (" year ") : (" years ")}</CustomText>
                                        </View>
                                        <CustomText style={[styles.textRight, styles.marginLeft]}>
                                        {handleFormattedDisplayTwoDecimal(monthlyRepayments)}
                                        </CustomText>
                                    </View>
                                )}
                            </View>
                        );
                    })}
                </View>
                <View>
                    {remortgageDetails.map((details, index) => {
                        const monthlyRepayments = calculateMonthlyMortgagePayment(details.openingBalance, details.newRate, details.newTerm);
                        const nextRemortgage = remortgageDetails[index + 1];
                        const yearsUntilRemortgage = nextRemortgage 
                            ? Math.min(nextRemortgage.year - (details.year || 1), details.newTerm)
                            : details.newTerm;
                        return (
                            <View key={`remortgage-container-${index}`}>
                                {details.schedule.length > 0 && details.schedule[0].openingBalance > 1 && (
                                    <View style={styles.remortgageContainer}>
                                        <View style={styles.row}>
                                            <View>
                                                <View style={styles.row}>
                                                    <CustomText style={styles.widthLimitLonger}>Length of Mortgage Period:</CustomText>
                                                    <CustomText style={[styles.textRight, styles.marginLeft]}>{yearsUntilRemortgage}{ yearsUntilRemortgage === 1 ? (" year ") : (" years ")}</CustomText>
                                                </View>
                                                <View style={styles.row}>
                                                    <CustomText style={styles.widthLimitLonger}>Monthly Repayments: </CustomText>
                                                    <CustomText style={[styles.textRight, styles.marginLeft]}>{handleFormattedDisplayTwoDecimal(monthlyRepayments)}</CustomText>
                                                </View>
                                            </View>
                                            <View style={[styles.textRight, styles.marginLeftLarger]}>
                                                {index === 0 ? (
                                                    <Pressable onPress={refreshSchedules}>
                                                        <FontAwesomeIcon style={[borrowingStyles.larger, styles.bigblue]} name="repeat" size={20} />
                                                    </Pressable>
                                                ) : (
                                                    <Pressable onPress={() => deleteRemortgagePeriod(index)}>
                                                        <FontAwesomeIcon style={borrowingStyles.larger} name="circle-xmark" size={20} color={'#FF6961'} />
                                                    </Pressable>
                                                )}
                                            </View>
                                        </View>

                                        <CustomText>{details.cashBack}</CustomText>
                                        <View style={[styles.row, styles.fixedRowHeight, styles.center, styles.marginLeft]}>
                                            <CustomText>Cash Back?</CustomText>
                                            <View style={[borrowingStyles.salaryInputs, styles.widthLimit, styles.marginLeft]}>
                                                <CustomNumericInput
                                                    label="Cash released from mortgage:"
                                                    style={styles.bigblue}
                                                    value={handleFormattedDisplay(details.cashBack)}
                                                    onChangeText={(text) => updateRemortgageDetail(index, 'cashBack', parseFormattedNumber(text))}                                                />
                                            </View>
                                        </View>
                                        <View style={styles.marginVertical}>
                                            <View style={[styles.center, styles.row]}>
                                                <CustomText style={[styles.widthLimitMid, styles.textRight]}>Term:</CustomText>
                                                <CustomText style={[styles.textRight, styles.marginLeft]}>{details.newTerm} {details.newTerm === 1 ? "year" : "years"} </CustomText>
                                                <Slider
                                                    minimumValue={1}
                                                    maximumValue={35}
                                                    minimumTrackTintColor='#03a1fc'
                                                    maximumTrackTintColor='#91B0C2'
                                                    thumbTintColor='#14a730'
                                                    style={styles.widthLimitLonger}
                                                    step={1}
                                                    value={details.newTerm}
                                                    onValueChange={(value) => updateRemortgageDetail(index, 'newTerm', value)}
                                                />
                                            </View>
                                            <View style={[styles.center, styles.row]}>
                                                <CustomText style={[styles.widthLimitMid, styles.textRight]}>Rate:</CustomText>
                                                <CustomText style={[styles.textRight, styles.marginLeft]}>{(details.newRate).toFixed(2)}%</CustomText>
                                                <Slider
                                                    minimumValue={2}
                                                    maximumValue={7}
                                                    minimumTrackTintColor='#03a1fc'
                                                    maximumTrackTintColor='#91B0C2'
                                                    thumbTintColor='#14a730'
                                                    style={styles.widthLimitLonger}
                                                    step={0.01}
                                                    value={details.newRate}
                                                    onValueChange={(value) => updateRemortgageDetail(index, 'newRate', value)}
                                                />
                                            </View>
                                        </View>
                                        <View style={tableStyles.tableHeader}>
                                            <CustomText style={[tableStyles.headerCell, tableStyles.year]}>Year</CustomText>
                                            <CustomText style={[tableStyles.headerCell, tableStyles.balance]}>Balance</CustomText>
                                            <CustomText style={[tableStyles.headerCell, tableStyles.interest]}>Interest</CustomText>
                                            <CustomText style={[tableStyles.headerCell, tableStyles.repaid]}>Repaid</CustomText>
                                            <CustomText numberOfLines={1} style={[tableStyles.headerCell]}>Remortgage</CustomText>
                                        </View>
                                        {renderRepaymentSchedule(details.schedule, index, details.year || 1, remortgageDetails.length > index + 1 ? remortgageDetails[index + 1].year : undefined)}
                                    </View>
                                )}
                            </View>
                        );
                    })}
                </View>
            </View>
        </View>
    );
};

export default MortgageDetails;
