import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Animated, TextInput } from 'react-native';
import borrowingStyles from '../styles/borrowingStyles';
import styles from '../styles/appStyles';
import sliderStyle from '../styles/sliderStyle';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6';
import SlidingToggle from '../utils/toggleAnimation';
import CustomText from '../utils/CustomText';
import CustomTextInput from '../utils/CustomTextInput';
import CustomNumericInput from '../utils/CustomNumericInput';

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
    setAllowRecalculation,
    multiplier,
    setMultiplier,
}) => {
    const formattedMaxBorrowableAmount = maxBorrowableAmount !== null ? handleFormattedDisplayTwoDecimal(parseFloat(maxBorrowableAmount)) : null;
    const formattedEstimatedPropertyValue = estimatedPropertyValue !== null ? handleFormattedDisplayTwoDecimal(parseFloat(estimatedPropertyValue)) : null;

    const [numericInput, setNumericInput] = useState('');
    const [showInput, setShowInput] = useState(false);
    const [exemptionGiven, setExemptionGiven] = useState('No')
    const [totalSalary, setTotalSalary] = useState(0);

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

    return (
        <View style={styles.container}>
            {displaySwap ? (
                <View>
                    <Pressable style={styles.row} title="Edit Section" onPress={handleToggleComplete} >
                        <CustomText style={[styles.centerText, styles.header, styles.completed]}>Borrowing Capacity Calculator</CustomText>
                    </Pressable>
                </View>
            ) : (
                <View>
                    
                    <View style={styles.marginBottom}>
                        <CustomText style={[styles.centerText, styles.header]}>Borrowing Capacity Calculator</CustomText>
                        {displayWarning && 
                            <CustomText style={[styles.textColorGreen, styles.centerText, styles.bold ]}>
                                Complete this section before moving on
                            </CustomText>
                        }
                    </View>

                    <View style={[styles.row, styles.center, styles.marginLeft]}>
                        <CustomText style={[styles.marginRight]}>
                            Number of Applicants:
                        </CustomText>
                        <View style={[styles.sliderContainer, styles.sendRight]}>
                            <SlidingToggle
                            options={applicantOptions}
                            defaultOption={applicants}
                            onSelect={(value) => setApplicants(value)}
                            />
                        </View>
                    </View>

                    <View>
                        <View style={[styles.row, styles.center, styles.marginLeft]}>
                            <CustomText>
                                {applicants === 2 ? ("Applicant 1's Annual Salary") : ("Your Annual Salary")}:
                            </CustomText>
                            <View style={[
                                borrowingStyles.salaryInputs,
                                styles.widthLimit,
                                styles.marginLeft
                            ]}>                            
                                <CustomNumericInput
                                    style={[styles.bigblue, styles.h2, styles.bold, styles.widthLimit]}                             
                                    value={handleFormattedDisplay(salary1)}
                                    onChangeText={(text) => handleNumericChange(text, setSalary1)}
                                />       
                            </View>
                        </View>
                        {applicants === 2 && (
                        <View style={[styles.row, styles.center, styles.marginLeft]}>
    
                            <CustomText>
                                Applicant 2's Annual Salary:
                            </CustomText>
                            <View style={[
                                borrowingStyles.salaryInputs,
                                styles.widthLimit,
                                styles.marginLeft
                            ]}>   
                                <CustomTextInput
                                    inputMode='numeric'
                                    style={[styles.bigblue, styles.h2, styles.bold, styles.widthLimit]}                             
                                    value={handleFormattedDisplay(salary2)}
                                    onChangeText={(text) => handleNumericChange(text, setSalary2)}
                                />
                            </View>
                        </View>
                        )}
                    </View>

                    <View style={[styles.row, styles.marginLeft]}>
                        { salary1 > 0 && salary2 > 0 ? (
                            <>
                                <CustomText>{'Combined Annual Salary:'}</CustomText>
                                <CustomText style={styles.marginRight}>{handleFormattedDisplay(totalSalary)}</CustomText>
                            </>
                         ) : null}
                    </View>

                    
                    { !showInput &&
                        <>
                        <View style={[styles.row, styles.center, styles.marginLeft]}>
                            <CustomText style={[styles.marginRight]}>
                                {applicants === 2 ? 'Both first-time buyers?' : 'First-time buyer?'}
                            </CustomText>
                            <View style={[sliderStyle.container, styles.sendRight, styles.marginLeft]}>
                                <SlidingToggle
                                    options={firstTimeBuyerOptions}
                                    defaultOption={firstTimeBuyer}
                                    onSelect={(value) => setFirstTimeBuyer(value)}
                                    />
                            </View>
                        </View>

                        <View style={[styles.row, styles.center, styles.marginLeft]}>
                            <CustomText style={[styles.marginRight]}>
                                Borrowing Rate Exemption:
                            </CustomText>
                            <View style={[sliderStyle.container, styles.sendRight, styles.marginLeft]}>
                                <SlidingToggle
                                    options={exemptionGivenOptions}
                                    defaultOption={'No'}
                                    onSelect={(value) => setExemptionGiven(value)}
                                    />
                            </View>
                        </View>

                        <View style={[styles.center, styles.row, styles.marginLeft]}>
                            <CustomText style={[styles.marginRight]}>Borrowing Rate:</CustomText>
                            <View style={[styles.row, styles.widthLimit, styles.sendRight]}>
                                <Pressable onPress={() => setMultiplier(3.5)}>
                                    <CustomText style={[styles.textColorWhite, styles.bold, styles.centerText,
                                        multiplier === 3.5 ? styles.circleSelected : styles.circleGrey
                                    ]}>
                                        3.5x</CustomText>
                                </Pressable>
                                { firstTimeBuyer === 'Yes' && (
                                <Pressable onPress={() => setMultiplier(4)}>
                                    <CustomText style={[styles.textColorWhite, styles.bold, styles.centerText,
                                        multiplier === 4 ? styles.circleSelected : styles.circleGrey
                                    ]}>
                                        4x</CustomText>
                                </Pressable>)}
                                { exemptionGiven === 'Yes' && (
                                <Pressable onPress={() => setMultiplier(4.5)}>
                                    <CustomText style={[styles.textColorWhite, styles.bold, styles.centerText,
                                        multiplier === 4.5 ? styles.circleSelected : styles.circleGrey
                                    ]}>
                                        4.5x</CustomText>
                                </Pressable>)}
                            </View>
                        </View>

                    <View style={[styles.row, styles.marginLeft, styles.marginTop, styles.marginBottomTen]}>
                        <CustomText>Max Loan:</CustomText>
                        <CustomText style={styles.marginRight}>{formattedMaxBorrowableAmount}</CustomText>
                    </View>
                    </>
                    }

                    <View style={[styles.row, styles.marginLeft, styles.marginTop, styles.marginBottomTen]}>
                        <CustomText>Property Value @ 80% LTV: </CustomText>
                        <CustomText style={styles.marginRight}>{formattedEstimatedPropertyValue}</CustomText>
                    </View>
                    
                    <View style={[styles.row, styles.center, styles.marginTop]}>
                        <View style={[borrowingStyles.quoteToggle]}>
                            <Pressable onPress={() => {setShowInput(prev => !prev);
                                 setAllowRecalculation(prev => !prev);}}>
                                <CustomText style={[styles.textColorWhite, styles.bold, styles.centerText]}>
                                    {showInput ? 'Revert to Salary Multiplier?' : 'Use your own Mortgage Quote?'}
                                </CustomText>                                
                            </Pressable>
                        </View>
                        <View style={[styles.widthLimit, styles.marginLeft,
                            showInput && borrowingStyles.salaryInputs,
                            ]}>
                            {showInput && (
                                <CustomTextInput
                                    inputMode='numeric'
                                    style={[styles.bigblue, styles.h2]}                    
                                    value={handleFormattedDisplay(maxBorrowableAmount)}
                                    onChangeText={(text) => handleNumericChange(text, setMaxBorrowableAmount)}
                                    placeholder="enter mortgage quote"
                                />
                            )}    
                        </View>
                    </View>

                </View>
            )}
        </View>
    );
};

export default BorrowingCapacityCalculator;
