import React, { useState, useEffect, useRef } from 'react';
import { View, Pressable } from 'react-native';
import borrowingStyles from '../styles/borrowingStyles';
import styles from '../styles/appStyles';
import sliderStyle from '../styles/sliderStyle';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6';
import SlidingToggle from '../utils/toggleAnimation';
import CustomText from '../utils/CustomText';
import CustomNumericInput from '../utils/CustomNumericInput';

import { handleNumericChange, handleFormattedDisplay, handleFormattedDisplayTwoDecimal } from '../utils/FormatNumber';
import { useKeyboard } from '../utils/KeyboardContext';

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
    setAllowRecalculation,
    multiplier,
    setMultiplier,
    scrollRef,
}) => {
    const formattedMaxBorrowableAmount = maxBorrowableAmount !== null ? handleFormattedDisplayTwoDecimal(parseFloat(maxBorrowableAmount)) : null;
    const formattedEstimatedPropertyValue = estimatedPropertyValue !== null ? handleFormattedDisplayTwoDecimal(parseFloat(estimatedPropertyValue)) : null;

    const [showInput, setShowInput] = useState(false);
    const [exemptionGiven, setExemptionGiven] = useState('No')
    const [totalSalary, setTotalSalary] = useState(0);

    const { isKeyboardVisible, setIsKeyboardVisible } = useKeyboard();
    const salary1Ref = useRef(null);
    const salary2Ref = useRef(null);
    const maxBorrowableAmountRef = useRef(null);

    const focusInput = () => {
        inputRef.current.focus();
    };

    const firstTimeBuyerOptions = [
        {
          label: 'No',
          value: 'No',
        },
        {
          label: 'Yes',
          value: 'Yes',
        },
      ];
    
    const exemptionGivenOptions = [
        {
          label: 'No',
          value: 'No',
        },
        {
          label: 'Yes',
          value: 'Yes',
        },
    ];
      
    const applicantOptions = [
        {
        label: <FontAwesomeIcon style={borrowingStyles.larger} name="person" size={20} color={applicants === 1 ? '#03a1fc' : 'white'} />,
        value: 1,
        },
        {
        label: <FontAwesomeIcon name="user-group" size={20} color={applicants === 2 ? '#03a1fc' : 'white'} />,
        value: 2,
        },
    ];
    

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

    useEffect(() => {
        if (multiplier === 4.5 && exemptionGiven === 'No') {
          setMultiplier(3.5);
        } else if (multiplier === 4 && firstTimeBuyer === 'No') {
          setMultiplier(3.5);
        }
    }, [firstTimeBuyer, exemptionGiven, multiplier]);

    const handleNext = (currentRef) => {
        if (currentRef === salary1Ref && applicants === 2) {
          salary2Ref.current && salary2Ref.current.handleToggleKeyboard();
        } else if (currentRef === salary2Ref) {
          maxBorrowableAmountRef.current && maxBorrowableAmountRef.current.handleToggleKeyboard();
        } else {
          currentRef.current && currentRef.current.handleToggleKeyboard();
        }
    };

    return (
        <View style={styles.container}>
            {displaySwap ? (
                <View>
                    <Pressable style={styles.row} title="Edit Section" onPress={handleToggleComplete} >
                        <CustomText style={[styles.centerText, styles.header, styles.completed]}>Financial Planner</CustomText>
                    </Pressable>
                </View>
            ) : (
                <View>

                    <View style={styles.marginBottom}>
                        <CustomText style={[styles.centerText, styles.header]}>Financial Planner</CustomText>
                        {displayWarning && 
                            <CustomText style={[styles.textColorGreen, styles.centerText ]}>
                                Complete this section before moving on
                            </CustomText>
                        }
                    </View>
                    
                </View>
            )}
        </View>
    );
};

export default FinancialPlanner;
