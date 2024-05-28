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

const FinancialPlanner = ({
    applicants,
    displaySwap,
    displayWarning,
    personalFinances
}) => {

    const renderPersonalFinances0 = (personalFinances) => {
        const items = Object.entries(personalFinances[0]);
        return items.map(([key, value]) => (
          <View style={styles.row} key={key}>
            <CustomText>{key.charAt(0).toUpperCase() + key.slice(1)}</CustomText>
            <CustomText style={[styles.textRight, styles.marginLeft]}>
              {handleFormattedDisplayTwoDecimal(value)}
            </CustomText>
          </View>
        ));
    };
      
    const renderPersonalFinances1 = (personalFinances) => {
        const items = Object.entries(personalFinances[1]);
        return items.map(([key, value]) => (
          <View style={styles.row} key={key}>
            <CustomText>{key.charAt(0).toUpperCase() + key.slice(1)}</CustomText>
            <CustomText style={[styles.textRight, styles.marginLeft]}>
              {handleFormattedDisplayTwoDecimal(value)}
            </CustomText>
          </View>
        ));
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

                    <View>
                        { applicants === 2 && (
                            <CustomText>Applicant 1</CustomText>
                        )}                        
                    </View>
                    <View style={styles.container}>
                        {renderPersonalFinances0(personalFinances)}
                    </View>
                </View>
            )}
        </View>
    );
};

export default FinancialPlanner;
