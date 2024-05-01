import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
import styles from '../styles/borrowingStyles';
import appStyles from '../styles/appStyles';
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
    estimatedPropertyValue
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

    return (
        <View style={styles.container}>
            {displaySwap ? (
                <View>
                    <Text style={[styles.center, styles.header]}>Borrowing Capacity Calculator</Text>
                    <Pressable title="Edit Section" onPress={handleToggleComplete} ><Text>Edit</Text></Pressable>
                    <Text>Number of Applicants: {applicants}</Text>
                    <Text>{firstTimeBuyer === 'Yes' ? "First Time Buyer" : "Second Time Buyer"}</Text>
                    <Text>Max Borrowable Amount: {formattedMaxBorrowableAmount}</Text>
                    <Text>Property Value at max LTV of 90%: {formattedEstimatedPropertyValue}</Text>
                </View>
            ) : (
                <View>
                    <Text style={[styles.center, styles.header]}>Borrowing Capacity Calculator</Text>
                    <View style={appStyles.horizontalRule}/>
                    {displayWarning && <Text>Complete this section before moving on.</Text>}
                    <View style={styles.row}>
                        <Pressable
                            title="1 Applicant"
                            onPress={() => setApplicants(1)}
                            style={({ pressed }) => [
                                [styles.button, styles.rounded],
                                { backgroundColor: applicants === 1 ? '#03a1fc' : '#91b0c2' },
                                pressed && styles.pressed
                            ]}
                        ><Text style={ styles.textColorWhite }>1 Applicant </Text></Pressable>
                        <TextInput
                            style={[styles.input, styles.textColorGray]}
                            placeholder="Applicant 1's Annual Salary"
                            value={handleFormattedDisplay(salary1)}
                            onChangeText={(text) => handleNumericChange(text, setSalary1)}
                        />
                    </View>
                    <View style={styles.row}>
                        <Pressable
                            title="2 Applicants"
                            onPress={() => setApplicants(2)}
                            style={({ pressed }) => [
                                [styles.button, styles.rounded],
                                { backgroundColor: applicants === 2 ? '#03a1fc' : '#91b0c2' },
                                pressed && styles.pressed
                            ]}
                        ><Text style={ styles.textColorWhite }>2 Applicants</Text></Pressable>
                        {applicants === 2 && (
                            <TextInput
                                style={[styles.input, styles.textColorGray]}
                                placeholder="Applicant 2's Annual Salary"
                                value={handleFormattedDisplay(salary2)}
                                onChangeText={(text) => handleNumericChange(text, setSalary2)}
                            />
                        )}
                    </View>
                    <View>
                        <View style={styles.row}>
                            <Text>
                                {applicants === 2 ? 'Both first-time buyers?' : 'First-time buyer?'}
                            </Text>
                            <Pressable
                                title="Yes"
                                onPress={() => setFirstTimeBuyer('Yes')}
                                style={({ pressed }) => [
                                    [styles.button, styles.rounded, styles.margin],
                                    { backgroundColor:  firstTimeBuyer === 'Yes' ? '#03a1fc' : '#91b0c2' },
                                    pressed && styles.pressed
                                ]}
                            ><Text style={ styles.textColorWhite }>Yes</Text></Pressable>
                            <Pressable
                                title="No"
                                onPress={() => setFirstTimeBuyer('No')}
                                style={({ pressed }) => [
                                    [styles.button, styles.rounded, styles.margin],
                                    { backgroundColor:  firstTimeBuyer === 'No' ? '#03a1fc' : '#91b0c2' },
                                    pressed && styles.pressed
                                ]}
                            ><Text style={ styles.textColorWhite }>No</Text></Pressable>
                        </View>
                    </View>
                    <View style={styles.row}>
                        {applicants === 2 ? (
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
                    <Text>Max Borrowable Amount: {formattedMaxBorrowableAmount}</Text>
                    <Text>Property Value at max LTV of 90%: {formattedEstimatedPropertyValue}</Text>
                    <Pressable
                        title={showInput ? 'Hide Input' : 'Update Max Borrowable Amount'}
                        onPress={() => setShowInput(!showInput)}
                    />
                    {showInput && (
                        <TextInput
                            style={styles.input}
                            value={handleFormattedDisplay(maxBorrowableAmount)}
                            onChangeText={(text) => handleNumericChange(text, setMaxBorrowableAmount)}
                            placeholder="Enter new amount"
                        />
                    )}
                </View>
            )}
        </View>
    );
};

export default BorrowingCapacityCalculator;
