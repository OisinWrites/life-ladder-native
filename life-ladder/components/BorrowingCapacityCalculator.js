import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { handleNumericChange, handleFormattedDisplay, handleFormattedDisplayTwoDecimal } from '../utilities/FormatNumber';

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

    return (
        <View style={styles.container}>
            {displaySwap ? (
                <View>
                    <Text style={styles.header}>Borrowing Capacity Calculator</Text>
                    <Button title="Edit Section" onPress={handleToggleComplete} />
                    <Text>Number of Applicants: {applicants}</Text>
                    <Text>{firstTimeBuyer === 'Yes' ? "First Time Buyer" : "Second Time Buyer"}</Text>
                    <Text>Max Borrowable Amount: {formattedMaxBorrowableAmount}</Text>
                    <Text>Property Value at max LTV of 90%: {formattedEstimatedPropertyValue}</Text>
                </View>
            ) : (
                <View>
                    <Text style={styles.header}>Borrowing Capacity Calculator</Text>
                    {displayWarning && <Text>Complete this section before moving on.</Text>}
                    <View style={styles.row}>
                        <Button
                            title="1 Applicant"
                            onPress={() => setApplicants(1)}
                            color={applicants === 1 ? 'blue' : 'gray'}
                        />
                        <Button
                            title="2 Applicants"
                            onPress={() => setApplicants(2)}
                            color={applicants === 2 ? 'blue' : 'gray'}
                        />
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="Applicant 1's Salary"
                        value={handleFormattedDisplay(salary1)}
                        onChangeText={(text) => handleNumericChange(text, setSalary1)}
                    />
                    {applicants === 2 && (
                        <TextInput
                            style={styles.input}
                            placeholder="Applicant 2's Salary"
                            value={handleFormattedDisplay(salary2)}
                            onChangeText={(text) => handleNumericChange(text, setSalary2)}
                        />
                    )}
                    <Text>
                        {applicants === 2 ? 'Are you both first-time buyers?' : 'Are you a first-time buyer?'}
                    </Text>
                    <View style={styles.row}>
                        <Button
                            title="Yes"
                            onPress={() => setFirstTimeBuyer('Yes')}
                            color={firstTimeBuyer === 'Yes' ? 'blue' : 'gray'}
                        />
                        <Button
                            title="No"
                            onPress={() => setFirstTimeBuyer('No')}
                            color={firstTimeBuyer === 'No' ? 'blue' : 'gray'}
                        />
                    </View>
                    <Text>Mortgage Borrowing Multiplier: {multiplier}x</Text>
                    <Text>Max Borrowable Amount: {formattedMaxBorrowableAmount}</Text>
                    <Text>Property Value at max LTV of 90%: {formattedEstimatedPropertyValue}</Text>
                    <Button
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    }
});

export default BorrowingCapacityCalculator;
