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

    const renderRepaymentSchedule = (schedule, index = 0, startYear = 1, nextRemortgageYear) => {
        return schedule.map((item, i) => {
            const year = startYear + i;
            return (
                <>
                { Number(item.openingBalance) > 1 && (
                    <View key={`${index}-${i}`} style={tableStyles.tableRow}>
                        <CustomText style={tableStyles.cell}>{year}</CustomText>
                        <CustomText style={tableStyles.cell}>{handleFormattedDisplayTwoDecimal(item.openingBalance)}</CustomText>
                        <CustomText style={tableStyles.cell}>{handleFormattedDisplayTwoDecimal(item.annualInterestCharged)}</CustomText>
                        <CustomText style={tableStyles.cell}>{handleFormattedDisplayTwoDecimal(item.capitalRepayment)}</CustomText>
                        {!nextRemortgageYear && (
                            <Pressable style={styles.remortgageIconParent} onPress={() => addRemortgagePeriod(year, item.openingBalance)}>
                                <Image
                                    source={remortgageIcon}
                                    style={styles.remortgageIcon}
                                />
                            </Pressable>
                        )}
                    </View>               
                )}
                </>
            );
        });
    };

    return (
        <ScrollView style={styles.container} ref={scrollRef}>
            {remortgageDetails.map((details, index) => (
                <View key={index}>
                    {details.schedule.length > 0 && details.schedule[0].openingBalance > 1 && (
                        <>
                            {index > 0 && (
                                <Pressable onPress={() => deleteRemortgagePeriod(index)}>
                                    <FontAwesomeIcon style={borrowingStyles.larger} name="circle-xmark" size={20} color={'#FF6961'} />
                                </Pressable>
                            )}
                            <View style={[styles.center, styles.row]}>
                                <CustomText>New Loan Term: {details.newTerm} {details.newTerm === 1 ? "year" : "years"}</CustomText>
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
                                <CustomText>New Mortgage Rate: {details.newRate}%</CustomText>
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
                            {renderRepaymentSchedule(details.schedule, index, details.year || 1, remortgageDetails.length > index + 1 ? remortgageDetails[index + 1].year : undefined)}
                        </>
                    )}
                </View>
            ))}
        </ScrollView>
    );
};

export default MortgageDetails;
