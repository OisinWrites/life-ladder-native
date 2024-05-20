import React, { useState, useEffect } from 'react';
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
    const [periodRemortgaged, setPeriodRemortgaged] = useState({});

    useEffect(() => {
        const { repaymentSchedule } = generateRepaymentSchedule(mortgageDrawdown, mortgageRate, loanTerm, remortgageDetails);
        setRepaymentSchedule(repaymentSchedule);
        setMonthlyPayment(calculateMonthlyMortgagePayment(mortgageDrawdown, mortgageRate, loanTerm));
    }, [mortgageDrawdown, mortgageRate, loanTerm, remortgageDetails]);

    const addRemortgagePeriod = (year, openingBalance) => {
        setRemortgageDetails([...remortgageDetails, { year, rate: mortgageRate, term: loanTerm, openingBalance }]);
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
        let remortgaged = false;
        return schedule
            .filter(({ year }) => year < remortgagedYear || remortgagedYear === undefined)
            .map(({ year, openingBalance, annualInterestCharged, capitalRepayment }, index) => {
                
                    return (
                        
                    <View key={`${detailIndex}-${year}`} style={tableStyles.tableRow}>
                        <CustomText style={tableStyles.cell}>{year}</CustomText>
                        <CustomText style={tableStyles.cell}>{handleFormattedDisplayTwoDecimal(openingBalance)}</CustomText>
                        <CustomText style={tableStyles.cell}>{handleFormattedDisplayTwoDecimal(annualInterestCharged)}</CustomText>
                        <CustomText style={tableStyles.cell}>{handleFormattedDisplayTwoDecimal(capitalRepayment)}</CustomText>

                        <Pressable style={styles.remortgageIconParent} onPress={() => addRemortgagePeriod(year, openingBalance)}>
                            <Image
                                source={remortgageIcon}
                                style={styles.remortgageIcon}
                            />
                        </Pressable>

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
                const { year, rate, term, openingBalance } = detail;
                const { repaymentSchedule: nestedSchedule } = generateRepaymentSchedule(openingBalance, rate, term, [], year);

                return (
                    <View style={styles.remortgageContainer} key={`remortgage-${index}`}>
                        <Pressable onPress={() => deleteRemortgagePeriod(index)}>
                            <FontAwesomeIcon style={borrowingStyles.larger} name="circle-xmark" size={20} color={'#FF6961'} />
                        </Pressable>
                        <View style={[styles.center, styles.row]}>
                            <CustomText>Loan Term: {term} {term === 1 ? ("year") : ("years")}</CustomText>
                            <Slider
                                minimumValue={1}
                                maximumValue={35}
                                minimumTrackTintColor='#03a1fc'
                                maximumTrackTintColor='#91B0C2'
                                thumbTintColor='#14a730'
                                style={styles.widthLimitLonger}
                                step={1}
                                value={term}
                                onValueChange={(value) => updateRemortgageDetail(index, 'term', value)}
                            />
                        </View>

                        <View style={[styles.center, styles.row]}>
                            <CustomText>Mortgage Rate: {rate}%</CustomText>
                            <Slider
                                minimumValue={2}
                                maximumValue={7}
                                minimumTrackTintColor='#03a1fc'
                                maximumTrackTintColor='#91B0C2'
                                thumbTintColor='#14a730'
                                style={styles.widthLimitLonger}
                                step={0.01}
                                value={rate}
                                onValueChange={(value) => updateRemortgageDetail(index, 'rate', value)}
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
