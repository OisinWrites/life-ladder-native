import React, { useState, useEffect, useRef } from 'react';
import { View, Pressable, Image, ScrollView } from 'react-native';
import styles from '../styles/appStyles';
import tableStyles from '../styles/tableStyles.js';
import borrowingStyles from '../styles/borrowingStyles.js';
import CustomText from '../utils/CustomText';
import { handleFormattedDisplayTwoDecimal } from '../utils/FormatNumber';
import { calculateMonthlyMortgagePayment, generateRepaymentSchedule } from '../utils/MortgageInterestCalc';
import Slider from '@react-native-community/slider';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6';
import remortgageIcon from '../assets/images/remortgageIcon.png';

const MortgageDetails = ({ propertyPrice, mortgageDrawdown, scrollRef }) => {
    const [remortgageDetails, setRemortgageDetails] = useState([
        { newTerm: 25, newRate: 3.5, openingBalance: mortgageDrawdown, schedule: [] }
    ]);
    const prevRemortgageDetails = useRef(JSON.stringify(remortgageDetails));
    const prevMortgageDrawdown = useRef(mortgageDrawdown);

    const recalculateSchedules = () => {
        let updatedRemortgageDetails = [...remortgageDetails];
        for (let index = 0; index < updatedRemortgageDetails.length; index++) {
            const details = updatedRemortgageDetails[index];
            const startYear = details.year || 1;
            const scheduleResult = generateRepaymentSchedule(
                details.openingBalance,
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
                            <Pressable style={[styles.remortgageIconParent]} onPress={() => addRemortgagePeriod(year, item.openingBalance)}>
                                <Image
                                    source={remortgageIcon}
                                    style={styles.remortgageIcon}
                                />
                            </Pressable>
                        ) : (
                            <FontAwesomeIcon name="lock" style={[styles.grey, styles.larger]} />
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
                <CustomText>Total Years Until Mortgage is Repaid: {totalYearsUntilRepaid}</CustomText>
                {remortgageDetails.map((details, index) => {
                    const monthlyRepayments = calculateMonthlyMortgagePayment(details.openingBalance, details.newRate, details.newTerm);
                    const nextRemortgage = remortgageDetails[index + 1];
                    const yearsUntilRemortgage = nextRemortgage 
                        ? Math.min(nextRemortgage.year - (details.year || 1), details.newTerm)
                        : details.newTerm;
                    return (
                        <CustomText key={`remortgage-period-${index}`}>
                            {monthlyRepayments > 1 && (
                                <>
                                    Period {index + 1}: {yearsUntilRemortgage} years, at {handleFormattedDisplayTwoDecimal(monthlyRepayments)} per month
                                </>
                            )}
                        </CustomText>
                    );
                })}
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
                                        <CustomText>Monthly Repayments: {handleFormattedDisplayTwoDecimal(monthlyRepayments)}</CustomText>
                                        <CustomText>Length of Mortgage Period: {yearsUntilRemortgage}</CustomText>
                                        {index === 0 ? (
                                            <Pressable onPress={refreshSchedules}>
                                                <FontAwesomeIcon style={[borrowingStyles.larger, styles.bigblue]} name="repeat" size={20} />
                                            </Pressable>
                                        ) : (
                                            <Pressable onPress={() => deleteRemortgagePeriod(index)}>
                                                <FontAwesomeIcon style={borrowingStyles.larger} name="circle-xmark" size={20} color={'#FF6961'} />
                                            </Pressable>
                                        )}
                                        <View style={[styles.center, styles.row]}>
                                            <CustomText>Loan Term: {details.newTerm} {details.newTerm === 1 ? "year" : "years"} </CustomText>
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
                                            <CustomText>Mortgage Rate: {details.newRate}% </CustomText>
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
                                        <View style={tableStyles.tableHeader}>
                                            <CustomText style={[tableStyles.cell, tableStyles.headerCell, tableStyles.smlWidth]}>Year</CustomText>
                                            <CustomText style={[tableStyles.cell, tableStyles.headerCell, tableStyles.lrgWidth, styles.paddingLeft]}>Balance</CustomText>
                                            <CustomText style={[tableStyles.cell, tableStyles.headerCell, tableStyles.midWidth, styles.paddingLeft]}>Interest</CustomText>
                                            <CustomText style={[tableStyles.cell, tableStyles.headerCell, tableStyles.midWidth, styles.paddingLeft]}>Repaid</CustomText>
                                            <CustomText style={[tableStyles.cell, tableStyles.headerCell, tableStyles.iconWidth]}>Remortgage</CustomText>
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
