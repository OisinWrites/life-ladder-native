import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
import borrowingStyles from '../styles/borrowingStyles';
import styles from '../styles/appStyles';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6';

import { handleNumericChange, handleFormattedDisplay, handleFormattedDisplayTwoDecimal } from '../utils/FormatNumber';



const BorrowingCapacityCalculator = ({
    applicants,
    setApplicants,
    firstTimeBuyer,
    setFirstTimeBuyer,
    salary1,
    setSalary1,
    salary2,
    setSalary2,
    maxBorrowableAmount,
    setMaxBorrowableAmount,
    displaySwap,
    displayWarning,
    handleToggleComplete,
    estimatedPropertyValue,
    setAllowRecalculation
}) => {
    const multiplier = firstTimeBuyer === 'Yes' ? 4 : 3.5;
    const formattedMaxBorrowableAmount = maxBorrowableAmount !== null ? handleFormattedDisplayTwoDecimal(parseFloat(maxBorrowableAmount)) : null;
    const formattedEstimatedPropertyValue = estimatedPropertyValue !== null ? handleFormattedDisplayTwoDecimal(parseFloat(estimatedPropertyValue)) : null;

    const [showInput, setShowInput] = useState(false);

    const [totalSalary, setTotalSalary] = useState(0);

    useEffect(() => {
        let calculatedTotalSalary = parseFloat(salary1) || 0;
        if (applicants === 2 && salary2 > 0) {
            calculatedTotalSalary += parseFloat(salary2);
        }
        setTotalSalary(calculatedTotalSalary);
    }, [salary1, salary2, applicants]);

    useEffect(() => {
        if (!showInput) {
            let totalSalary = parseFloat(salary1) || 0;
            if (applicants === 2) {
                totalSalary += parseFloat(salary2) || 0;
            }
            const calculatedAmount = totalSalary * multiplier;
            setMaxBorrowableAmount(calculatedAmount);
        }
    }, [showInput, salary1, salary2, multiplier, applicants]);

    return (
        <View style={styles.container}>
            {displaySwap ? (
                <View>
                    <Pressable style={styles.row} title="Edit Section" onPress={handleToggleComplete} >
                        <Text style={[styles.centerText, styles.header, styles.completed]}>Borrowing Capacity Calculator</Text>
                    </Pressable>
                </View>
            ) : (
                <View>
                    
                    <View style={styles.marginBottom}>
                        <Text style={[styles.centerText, styles.header]}>Borrowing Capacity Calculator</Text>
                        {displayWarning && 
                            <Text style={[styles.textColorGreen, styles.centerText, styles.bold ]}>
                                Complete this section before moving on
                            </Text>
                        }
                    </View>

                    <View style={[styles.row, styles.center]}>
                        <Text>
                            Number of Applicants:
                        </Text>
                        <View style={borrowingStyles.slideSim}>
                            <Pressable
                                title="Yes"
                                onPress={() => setApplicants(1)}
                                style={({ pressed }) => [
                                    [borrowingStyles.slideButtons],
                                    { backgroundColor: applicants === 1 ? 'white' : '#91b0c2' },
                                    pressed && styles.pressed
                                ]}>
                                <Text style=
                                    {[{ color: applicants === 1 ? '#03a1fc' : 'white' },
                                    styles.centerText, styles.bold]}                                        
                                    ><FontAwesomeIcon style={borrowingStyles.larger} name="person" /></Text>
                            </Pressable>
                            <Pressable
                                title="2 Applicants"
                                onPress={() => setApplicants(2)}
                                style={({ pressed }) => [
                                    [borrowingStyles.slideButtons],
                                    { backgroundColor: applicants === 2 ? 'white' : '#91b0c2' },
                                    pressed && styles.pressed
                                ]}>
                                <Text style=
                                    {[{ color: applicants === 2 ? '#03a1fc' : 'white' },
                                    styles.centerText, styles.bold]}

                                    ><FontAwesomeIcon name="user-group" /></Text>
                            </Pressable>
                        </View>
                    </View>

                    <View style={[styles.row, styles.center]}>
                        <Text>
                            {applicants === 2 ? 'Both first-time buyers?' : 'First-time buyer?'}
                        </Text>
                        <View style={borrowingStyles.slideSim}>
                            <Pressable
                                title="No"
                                onPress={() => setFirstTimeBuyer('No')}
                                style={({ pressed }) => [
                                    [borrowingStyles.slideButtons],
                                    { backgroundColor:  firstTimeBuyer === 'No' ? 'white' : '#91b0c2' },
                                    pressed && styles.pressed
                                ]}>
                                <Text style=
                                    {[{ color:  firstTimeBuyer === 'No' ? '#03a1fc' : 'white' },
                                    styles.centerText, styles.bold]}
                                    >No</Text>
                            </Pressable>
                            <Pressable
                                title="Yes"
                                onPress={() => setFirstTimeBuyer('Yes')}
                                style={({ pressed }) => [
                                    [borrowingStyles.slideButtons],
                                    { backgroundColor:  firstTimeBuyer === 'Yes' ? 'white' : '#91b0c2' },
                                    pressed && styles.pressed
                                ]}>
                                <Text style=
                                    {[{ color:  firstTimeBuyer === 'Yes' ? '#03a1fc' : 'white' },
                                    styles.centerText, styles.bold]}                                        
                                    >Yes</Text>
                            </Pressable>
                        </View>
                    </View>

                    <View>
                        <View style={[borrowingStyles.salaryInputs]}>
                            <TextInput
                                style={[{color:'#03a1fc'}, styles.bold]}                             
                                placeholder={applicants === 2 ? ("Applicant 1's Annual Salary") : ("Your Annual Salary")}
                                value={handleFormattedDisplay(salary1)}
                                onChangeText={(text) => handleNumericChange(text, setSalary1)}
                            />       
                        </View>
                        {applicants === 2 && (
                        <View style={[borrowingStyles.salaryInputs]}>
                            <TextInput
                                style={[{color:'#03a1fc'}, styles.bold]}
                                placeholder="Applicant 2's Annual Salary"
                                value={handleFormattedDisplay(salary2)}
                                onChangeText={(text) => handleNumericChange(text, setSalary2)}
                            />
                        </View>
                        )}
                    </View>

                    <View style={styles.marginBottom}>
                        <View style={borrowingStyles.quoteToggle}>
                            <Pressable onPress={() => {setShowInput(prev => !prev);
                                 setAllowRecalculation(prev => !prev);}}>
                                <Text style={[styles.textColorWhite, styles.bold, styles.centerText]}>
                                    {showInput ? 'Revert to Salary Multiplier' : 'Use your own Mortgage Quote'}
                                </Text>
                            </Pressable>
                        </View>
                        {showInput && (
                            <View style={[borrowingStyles.salaryInputs]}>
                                <TextInput
                                    style={[{color:'#03a1fc'}, styles.bold]}                             
                                    value={handleFormattedDisplay(maxBorrowableAmount)}
                                    onChangeText={(text) => handleNumericChange(text, setMaxBorrowableAmount)}
                                    placeholder="Enter Mortgage Quote"
                                />
                            </View>
                        )}
                    </View>

                    <View style={styles.row}>
                        { salary1 > 0 && salary2 > 0 ? (
                            <>
                                <Text>{'Combined Annual Salary:'}</Text>
                                <Text>{handleFormattedDisplay(totalSalary)}</Text>
                            </>
                         ) : null}
                    </View>

                    <View style={styles.row}>
                        <Text>Mortgage Borrowing Multiplier:</Text>
                        <Text>{multiplier}x</Text>
                    </View>

                    <View style={styles.row}>
                        <Text>Max Borrowable Amount:</Text>
                        <Text>{formattedMaxBorrowableAmount}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text>Property Value at max LTV of 90%: </Text>
                        <Text>{formattedEstimatedPropertyValue}</Text>

                    </View>

                </View>
            )}
        </View>
    );
};

export default BorrowingCapacityCalculator;
