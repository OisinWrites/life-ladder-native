import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Animated, TextInput } from 'react-native';
import borrowingStyles from '../styles/borrowingStyles';
import styles from '../styles/appStyles';
import sliderStyle from '../styles/sliderStyle';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6';
import SlidingToggle from '../utils/toggleAnimation';


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
    const [selectedValue, setSelectedValue] = useState('No');

    const [showInput, setShowInput] = useState(false);

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
                        <View style={[styles.sliderContainer, styles.sendRight]}>
                            <SlidingToggle
                            options={applicantOptions}
                            defaultOption={applicants}
                            onSelect={(value) => setApplicants(value)}
                            />
                        </View>
                    </View>

                    <View style={[styles.row, styles.center]}>
                        <Text>
                            {applicants === 2 ? 'Both first-time buyers?' : 'First-time buyer?'}
                        </Text>
                        <View style={[sliderStyle.container, styles.sendRight, styles.marginLeft]}>
                            <SlidingToggle
                                options={firstTimeBuyerOptions}
                                defaultOption={firstTimeBuyer}
                                onSelect={(value) => setFirstTimeBuyer(value)}
                                />
                        </View>
                    </View>

                    <View>
                        <View style={[borrowingStyles.salaryInputs]}>
                            <TextInput
                                keyboardType='numeric'
                                style={[{color:'#03a1fc'}, styles.bold]}                             
                                placeholder={applicants === 2 ? ("Applicant 1's Annual Salary") : ("Your Annual Salary")}
                                value={handleFormattedDisplay(salary1)}
                                onChangeText={(text) => handleNumericChange(text, setSalary1)}
                            />       
                        </View>
                        {applicants === 2 && (
                        <View style={[borrowingStyles.salaryInputs]}>
                            <TextInput
                                keyboardType='numeric'
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
                                    keyboardType='numeric'
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
