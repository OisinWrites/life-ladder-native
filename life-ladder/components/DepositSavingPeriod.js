import React, { useState } from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
import styles from '../styles/appStyles';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6';

import { handleNumericChange, handleFormattedDisplay, handleFormattedDisplayTwoDecimal } from '../utils/FormatNumber';
const DepositSavingPeriod = ({
    applicants,
    salary1,
    salary2,
    maxBorrowableAmount,
    displaySwap2,
    displayWarning2,
    handleToggleComplete,
    estimatedPropertyValue,
}) => {
    
    return (
        <View style={styles.container}>
        {displaySwap ? (
            <View>
                <Pressable style={styles.row} title="Edit Section" onPress={handleToggleComplete} >
                    <Text style={[styles.centerText, styles.header, styles.completed]}>Deposit Saving Period</Text>
                </Pressable>
            </View>
        ) : (
            <Text></Text>
        )}
        </View>
    );
};
export default DepositSavingPeriod;