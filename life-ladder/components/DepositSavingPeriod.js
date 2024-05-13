import React, { useState, useEffect, useRef } from 'react';
import { View, Button, Pressable } from 'react-native';
import styles from '../styles/appStyles';
import borrowingStyles from '../styles/borrowingStyles';
import CustomText from '../utils/CustomText';
import CustomNumericInput from '../utils/CustomNumericInput';
import Slider from '@react-native-community/slider';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6';

import { handleNumericChange, handleFormattedDisplay, handleFormattedDisplayTwoDecimal, parseFormattedNumber } from '../utils/FormatNumber';


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
    mortgageDrawdown,
    setMortgageDrawdown,
    scrollRef,
    onKeyboardVisibleChange
}) => {
    const propertyPriceRef = useRef(null);
    const drawdownRef = useRef(null);

    const propertyPriceNumber = parseFormattedNumber(propertyPrice);

    const [propertyPrice, setPropertyPrice] = useState(estimatedPropertyValue);
    const [propertyPriceFocused, setPropertyPriceFocused] = useState(false);
    const [lockPropertyPrice, setLockPropertyPrice] = useState(true);

    const [mortgageDrawdownFocused, setMortgageDrawdownFocused] = useState(false);
    const [lockMortgageDrawdown, setLockMortgageDrawdown] = useState(false);

    const [LTVRatio, setLTVRatio] = useState(80);
    const [sliderRange, setSliderRange] = useState({ min: 40, max: 90 });
    const [lockLTVRatio, setLockLTVRatio] = useState(false);
   
    const handleLock = (lockType) => {
        setLockPropertyPrice(lockType === 'propertyPrice');
        setLockMortgageDrawdown(lockType === 'mortgageDrawdown');
        setLockLTVRatio(lockType === 'LTVRatio');
    };

    useEffect(() => {
        if (lockPropertyPrice && mortgageDrawdownFocused) {
            // Calculate the new LTV ratio based on the current mortgage drawdown and property price
            let newLTVRatio = (mortgageDrawdown / propertyPrice) * 100;
            
            // Round the new LTV ratio to the nearest whole number
            newLTVRatio = Math.round(newLTVRatio);
            
            // Set the new LTV ratio
            setLTVRatio(newLTVRatio);
        }
    }, [mortgageDrawdown, lockPropertyPrice, mortgageDrawdownFocused, propertyPrice]);

    useEffect(() => {
        if (lockPropertyPrice && !mortgageDrawdownFocused) {
            let newMortgageDrawdown = propertyPrice * (LTVRatio/100);

            newMortgageDrawdown = Math.round(newMortgageDrawdown)

            setMortgageDrawdown(newMortgageDrawdown);
        }
    }, [LTVRatio, lockPropertyPrice, mortgageDrawdownFocused, propertyPrice]);

    useEffect(() => {
        if (lockMortgageDrawdown && propertyPriceFocused ) {
            let newLTVRatio = (mortgageDrawdown / propertyPrice) * 100;
            
            newLTVRatio = Math.round(newLTVRatio);
            
            setLTVRatio(newLTVRatio);
        }
    }, [lockMortgageDrawdown, mortgageDrawdown, propertyPriceFocused, propertyPrice]);

    useEffect(() => {
        if (lockMortgageDrawdown && !propertyPriceFocused) {
            let newPropertyPrice = mortgageDrawdown/(LTVRatio/100);

            newPropertyPrice = Math.round(newPropertyPrice);

            setPropertyPrice((newPropertyPrice).toFixed(0));
        }
    }, [LTVRatio, lockMortgageDrawdown, propertyPriceFocused, mortgageDrawdown]);

    useEffect(() => {
        if (lockLTVRatio && propertyPriceFocused) {
            let newMortgageDrawdown = propertyPrice * (LTVRatio/100);

            newMortgageDrawdown = Math.round(newMortgageDrawdown);

            setMortgageDrawdown((newMortgageDrawdown).toFixed(0));
        }
    },[lockLTVRatio, propertyPriceFocused, propertyPrice, LTVRatio]);

    useEffect(() => {
        if (lockLTVRatio && mortgageDrawdownFocused) {
            let newPropertyPrice = mortgageDrawdown/(LTVRatio/100);

            newPropertyPrice = Math.round(newPropertyPrice);

            setPropertyPrice((newPropertyPrice).toFixed(0));
        }
    },[lockLTVRatio, mortgageDrawdownFocused, mortgageDrawdown, LTVRatio]);
     
    function calculateRegistryFee(propertyPrice) {
        if (propertyPrice <= 50000) return 400;
        if (propertyPrice <= 200000) return 600;
        if (propertyPrice <= 400000) return 700;
        return 800;
    }
    
    function calculatePropertyTax(propertyPrice) {
        if (propertyPrice <= 200000) return 90;
        if (propertyPrice <= 262500) return 225;
        if (propertyPrice <= 350000) return 315;
        if (propertyPrice <= 437500) return 405;
        if (propertyPrice <= 525000) return 495;
        if (propertyPrice <= 612500) return 585;
        if (propertyPrice <= 700000) return 675;
        if (propertyPrice <= 787500) return 765;
        if (propertyPrice <= 875000) return 855;
        if (propertyPrice <= 962500) return 945;
        if (propertyPrice <= 1050000) return 1035;
    }

    // Calculate additional costs
    const stampDuty = propertyPriceNumber < 1000000 ? propertyPriceNumber * 0.01 : propertyPriceNumber * 0.02;
    const solicitorFees = 2000;
    const valuerReport = 150;
    const surveyorReport = 300 * 1.23;
    const insuranceCosts = 300 + 360; // Homeowner's plus mortgage insurance
    const registryFee = calculateRegistryFee(propertyPrice);
    const propertyTax = calculatePropertyTax(propertyPrice);
    const totalAdditionalCosts = stampDuty + solicitorFees + valuerReport + surveyorReport + insuranceCosts + registryFee ;

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
            {displaySwap3 ? (
                <View>
                    <Pressable style={styles.row} title="Edit Section" onPress={handleToggleComplete3} >
                        <CustomText style={[styles.centerText, styles.header, styles.completed]}>Deposit Saving Period</CustomText>
                    </Pressable>
                </View>
            ) : (
                <View>
                    <View style={styles.marginBottom}>
                        <CustomText style={[styles.centerText, styles.header]}>Deposit Saving Period</CustomText>
                        {displayWarning3 && 
                            <CustomText style={[styles.textColorGreen, styles.centerText, styles.bold]}>
                                Complete this section before moving on
                            </CustomText>
                        }
                    </View>
                    <CustomText>Estimated Property Value: {estimatedPropertyValue}</CustomText>
                    <CustomText>Property Price: {propertyPrice}</CustomText>
                    <CustomText>Mortgage Drawdown: {mortgageDrawdown}</CustomText>
                    <CustomText>LTV: {LTVRatio}%</CustomText>
                    
                    <CustomText>PropertyPrice: {lockPropertyPrice ? "locked" : "unlocked"}</CustomText>
                    <CustomText>MortgageDrawdown: {lockMortgageDrawdown ? "locked" : "unlocked"}</CustomText>
                    <CustomText>LTVRation: {lockLTVRatio ? "locked" : "unlocked"}</CustomText>

                    <View style={[styles.row, styles.center]}>
                        <CustomText>Property Price:</CustomText>
                        <View style={styles.row}>
                            <View style={[
                                borrowingStyles.salaryInputs,
                                styles.widthLimit,
                                styles.marginRight,
                                styles.marginLeft
                                ]}>
                                { !lockPropertyPrice ?  
                                    (<CustomNumericInput
                                        scrollRef={scrollRef}
                                        ref={propertyPriceRef}
                                        onNext={() => handleNext(propertyPriceRef)}
                                        onKeyboardVisibleChange={onKeyboardVisibleChange}
                                        onFocus={() => setPropertyPriceFocused(true)}
                                        onBlur={() => setPropertyPriceFocused(false)}
                                        style={[styles.bigblue, styles.h2, styles.latoFont]}                             
                                        value={handleFormattedDisplay(propertyPrice)}
                                        onChangeText={(text) => handleNumericChange(text, setPropertyPrice)}
                                        />) :
                                    (<CustomText style={[styles.bigblue, styles.h2, styles.textRight, styles.marginRight]}>
                                        {handleFormattedDisplay(propertyPrice)}
                                    </CustomText>)
                                    }       
                            </View>
                            <Pressable 
                                title="Lock Property Price" 
                                onPress={() => handleLock('propertyPrice')}
                                style={styles.marginTop}
                            >
                                { lockPropertyPrice ? (
                                    <FontAwesomeIcon name="lock" style={[styles.bigblue, styles.larger]} />) :
                                    (<FontAwesomeIcon name="unlock" style={[styles.grey, styles.larger]} />)
                                }
                            </Pressable>
                    </View>
                    </View>

                    <View style={[styles.row, styles.center]}>
                        <CustomText>Mortgage Drawdown:</CustomText>
                        <View style={[
                            borrowingStyles.salaryInputs,
                            styles.widthLimit,
                            styles.marginRight,
                            styles.marginLeft
                            ]}>
                            { !lockMortgageDrawdown ?  
                                (<CustomNumericInput
                                    scrollRef={scrollRef}
                                    ref={drawdownRef}
                                    onNext={() => handleNext(drawdownRef)}
                                    onKeyboardVisibleChange={onKeyboardVisibleChange}
                                    onFocus={() => setMortgageDrawdownFocused(true)}
                                    onBlur={() => setMortgageDrawdownFocused(false)}
                                    style={[styles.bigblue, styles.h2, styles.latoFont]}                             
                                    value={handleFormattedDisplay(mortgageDrawdown)}
                                    onChangeText={(text) => handleNumericChange(text, setMortgageDrawdown)}
                                />) :
                                (<CustomText style={[styles.bigblue, styles.h2, styles.textRight, styles.marginRight]}>
                                    {handleFormattedDisplay(mortgageDrawdown)}
                                </CustomText>)
                                }             
                        </View>
                        <Pressable title="Lock Mortgage Drawdown" onPress={() => handleLock('mortgageDrawdown')} >
                            { lockMortgageDrawdown ? (
                                <FontAwesomeIcon name="lock" style={[styles.bigblue, styles.larger]} />) :
                                (<FontAwesomeIcon name="unlock"  style={[styles.grey, styles.larger]} />)
                            }
                        </Pressable>
                    </View>

                    <View style={styles.row}>
                        <CustomText>LTV Ratio: {LTVRatio}%</CustomText>                       
                        
                            { lockLTVRatio ? (
                                <Pressable title="Lock LTV Ratio" onPress={() => handleLock('LTVRatio')} >
                                    <FontAwesomeIcon name="lock" style={[styles.bigblue, styles.larger]} />
                                </Pressable>) :
                                (
                                    <View style={styles.row}>
                                        <View style={styles.widthLimit}>
                                            <Slider
                                                minimumValue={40}
                                                maximumValue={90}
                                                minimumTrackTintColor="#307ecc"
                                                maximumTrackTintColor="#000000"
                                                step={1}
                                                value={LTVRatio}
                                                onValueChange={setLTVRatio}
                                            />                                        
                                        </View>
                                        <Pressable style={styles.marginLeft} title="Lock LTV Ratio" onPress={() => handleLock('LTVRatio')} >
                                            <FontAwesomeIcon name="unlock" style={[styles.grey, styles.larger]} />
                                        </Pressable>
                                    </View>
                                )
                            }                        
                    </View>

                    <View>
                        <View style={styles.row}>
                            <CustomText>Minimum Deposit Required:</CustomText>
                            <CustomText style={[styles.textRight, styles.marginLeft]}> €</CustomText>
                        </View>
                        <View style={styles.row}>
                            <CustomText>Additional Deposit Required:</CustomText>
                            <CustomText style={[styles.textRight, styles.marginLeft]}> €</CustomText>
                        </View>
                        <CustomText style={[styles.marginTop, styles.bold]}>Additional Fees</CustomText>                        
                        <View style={styles.row}>
                            <CustomText>Stamp Duty @{handleFormattedDisplayTwoDecimal(propertyPriceNumber) < 1000000 ? "1%" : "2%"} of the property value:</CustomText>
                            <CustomText style={[styles.textRight, styles.marginLeft]}> {handleFormattedDisplayTwoDecimal(stampDuty)}</CustomText>
                        </View>
                        <View style={styles.row}>
                            <CustomText>Solicitor Fees:</CustomText>
                            <CustomText style={[styles.textRight, styles.marginLeft]}> €{solicitorFees} </CustomText>
                        </View>
                        <View style={styles.row}>
                            <CustomText>Valuer's Report Fee:</CustomText>
                            <CustomText style={[styles.textRight, styles.marginLeft]}> €{valuerReport}</CustomText>
                        </View>
                        <View style={styles.row}>
                            <CustomText>Surveyor's Report Fee (plus 23% VAT):</CustomText>
                            <CustomText style={[styles.textRight, styles.marginLeft]}> €{surveyorReport}</CustomText>
                        </View>
                        <View style={styles.row}>
                            <CustomText>Registry Fee:</CustomText>
                            <CustomText style={[styles.textRight, styles.marginLeft]}> €{registryFee}</CustomText>
                        </View>
                        <CustomText style={[styles.marginTop, styles.bold]}>Recurring Annual Fees</CustomText>
                        <View style={styles.row}>
                            <CustomText>Homeowner's Insurance:</CustomText>
                            <CustomText style={[styles.textRight, styles.marginLeft]}> €{(300)}</CustomText>
                        </View>
                        <View style={styles.row}>
                            <CustomText>Mortgage Insurance:</CustomText>
                            <CustomText style={[styles.textRight, styles.marginLeft]}> €{(360)}</CustomText>
                        </View>
                        <View style={styles.row}>
                            <CustomText>Local Property Tax:</CustomText>
                            <CustomText style={[styles.textRight, styles.marginLeft]}> €{propertyTax}</CustomText>
                        </View>
                        <View style={styles.row}>
                            <CustomText>Total Additional Costs:</CustomText>
                            <CustomText style={[styles.textRight, styles.marginLeft]}> €{totalAdditionalCosts.toFixed(2)}</CustomText>
                        </View>
                    </View>
                </View>
            )}
        </View>
    );
};

export default DepositSavingPeriod;