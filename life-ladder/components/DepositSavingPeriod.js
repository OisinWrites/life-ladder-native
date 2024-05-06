import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
import styles from '../styles/appStyles';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6';
import CustomText from '../utils/CustomText';
import CustomTextInput from '../utils/CustomTextInput';

import { handleNumericChange, handleFormattedDisplay, handleFormattedDisplayTwoDecimal } from '../utils/FormatNumber';


const DepositSavingPeriod = ({
    applicants,
    maxBorrowableAmount,
    estimatedPropertyValue,
    displaySwap3,
    displayWarning3,
    handleToggleComplete3,
    currentSavings1,
    currentSavings2,
    otherSavingGoals1,
    otherSavingGoals2,
    savingPowerMonthly1,
    savingPowerMonthly2,
}) => {

    return (
        <View></View>
    );
};

export default DepositSavingPeriod;