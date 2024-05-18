import React, { useState, useEffect, useRef } from 'react';
import { View, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from '../styles/appStyles';
import borrowingStyles from '../styles/borrowingStyles';
import CustomText from '../utils/CustomText';
import CustomNumericInput from '../utils/CustomNumericInput';
import { countyPercentages, calculatePropertyTax, calculateBasePropertyTax } from '../utils/LocalPropertyTaxCalc';
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
    onKeyboardVisibleChange,

}) => {


    const [depositRequired, setDepositRequired] = useState('');

    const [propertyPriceFocused, setPropertyPriceFocused] = useState(false);
    const [mortgageDrawdownFocused, setMortgageDrawdownFocused] = useState(false);

    const [focusState, setFocusState] = useState({
        propertyPriceFocused: false,
        mortgageDrawdownFocused: false
    });

    const prevPropertyPrice = useRef();
    const prevMortgageDrawdown = useRef();

    const propertyPriceRef = useRef(null);
    const drawdownRef = useRef(null);

    const [propertyPrice, setPropertyPrice] = useState(estimatedPropertyValue);
    const [lockPropertyPrice, setLockPropertyPrice] = useState(false);

    const [lockMortgageDrawdown, setLockMortgageDrawdown] = useState(false);

    const [LTVRatio, setLTVRatio] = useState(80);
    const [sliderRange, setSliderRange] = useState({ min: 40, max: 90 });
    const [lockLTVRatio, setLockLTVRatio] = useState(true);
   
    const handleLock = (lockType) => {
        setLockPropertyPrice(lockType === 'propertyPrice');
        setLockMortgageDrawdown(lockType === 'mortgageDrawdown');
        setLockLTVRatio(lockType === 'LTVRatio');
    };

    const [depositSavingPeriod, setDepositSavingPeriod] = useState('');
    const [evenEffort, setEvenEffort] = useState('');
    const [firstAppSurplus, setFirstAppSurplus] = useState('');
    const [secondAppSurplus, setSecondAppSurplus] = useState('');
    const [combinedEffort, setCombinedEffort] = useState(true);

    const toggleCombinedEffort = () => {
        setCombinedEffort(previousState => !previousState);
    };

    useEffect(() => {
        if (applicants === 2) {
            if (savingPowerMonthly1 > savingPowerMonthly2) {
                let newEvenEffort = (savingPowerMonthly2 * 2).toFixed(1); // Correctly use toFixed immediately
                setEvenEffort(newEvenEffort);
    
                let newFirstAppSurplus = (savingPowerMonthly1 - savingPowerMonthly2).toFixed(1); // Correctly call toFixed
                setSecondAppSurplus(0);
                setFirstAppSurplus(newFirstAppSurplus);
            } else if (savingPowerMonthly2 > savingPowerMonthly1) {
                let newEvenEffort = (savingPowerMonthly1 * 2).toFixed(1); // Correctly use toFixed immediately
                setEvenEffort(newEvenEffort);
    
                let newSecondAppSurplus = (savingPowerMonthly2 - savingPowerMonthly1).toFixed(1); // Correctly call toFixed
                setFirstAppSurplus(0);
                setSecondAppSurplus(newSecondAppSurplus);
            }
        }
    }, [savingPowerMonthly1, savingPowerMonthly2, applicants]);

    useEffect(() => {
        let newDepositSavingPeriod;
        let newTotalCosts = parseFloat(totalAdditionalCosts) + parseFloat(depositRequired);
        if (applicants === 2) {
            if (combinedEffort) {
                newDepositSavingPeriod = newTotalCosts / (savingPowerMonthly1 + savingPowerMonthly2);
            } else {
                newDepositSavingPeriod = newTotalCosts / evenEffort;
            }
        } else {
            newDepositSavingPeriod = newTotalCosts / savingPowerMonthly1;
        }
    
        // Convert to integer for months
        newDepositSavingPeriod = Math.floor(newDepositSavingPeriod);
    
        // Function to format months into years and months
        function formatPeriod(months) {
            if (months < 12) {
                return `${months} months`;
            } else {
                const years = Math.floor(months / 12);
                const remainingMonths = months % 12;
                if (remainingMonths === 0) {
                    return `${years} year${years > 1 ? 's' : ''}`;
                } else {
                    return `${years} year${years > 1 ? 's' : ''} and ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`;
                }
            }
        }
    
        // Update the state with the formatted time period
        setDepositSavingPeriod(formatPeriod(newDepositSavingPeriod));
    }, [applicants, combinedEffort, depositRequired, totalAdditionalCosts, savingPowerMonthly1, savingPowerMonthly2, evenEffort]);

    useEffect(() => {
        let newDepositRequired = propertyPrice - mortgageDrawdown;
        newDepositRequired = (newDepositRequired).toFixed(2);
        setDepositRequired(newDepositRequired);
    }, [propertyPrice, mortgageDrawdown]);

    useEffect(() => {
        // Determine if propertyPrice was changed most recently
        if (propertyPrice !== prevPropertyPrice.current) {
            setFocusState({
                propertyPriceFocused: true,
                mortgageDrawdownFocused: false
            });
            prevPropertyPrice.current = propertyPrice;
        }
        // Determine if mortgageDrawdown was changed most recently
        else if (mortgageDrawdown !== prevMortgageDrawdown.current) {
            setFocusState({
                propertyPriceFocused: false,
                mortgageDrawdownFocused: true
            });
            prevMortgageDrawdown.current = mortgageDrawdown;
        }
    }, [propertyPrice, mortgageDrawdown]);

    useEffect(() => {
        if (lockPropertyPrice && focusState.mortgageDrawdownFocused) {
            // Calculate the new LTV ratio based on the current mortgage drawdown and property price
            let newLTVRatio = (mortgageDrawdown / propertyPrice) * 100;
            
            newLTVRatio = parseFloat(newLTVRatio.toFixed(5));
            // Set the new LTV ratio
            setLTVRatio(newLTVRatio);
        }
    }, [mortgageDrawdown, lockPropertyPrice, focusState.mortgageDrawdownFocused, propertyPrice]);

    useEffect(() => {
        if (lockPropertyPrice && !mortgageDrawdownFocused) {
            let newMortgageDrawdown = propertyPrice * (LTVRatio/100);

            setMortgageDrawdown(Number(newMortgageDrawdown).toFixed(0));
        }
    }, [LTVRatio, lockPropertyPrice, focusState.mortgageDrawdownFocused, propertyPrice]);

    useEffect(() => {
        if (lockMortgageDrawdown && focusState.propertyPriceFocused && (propertyPrice > 0)) {
            let newLTVRatio = (mortgageDrawdown / propertyPrice) * 100;

            newLTVRatio = parseFloat(newLTVRatio.toFixed(5));
                        
            setLTVRatio(newLTVRatio);
        }
    }, [lockMortgageDrawdown, mortgageDrawdown, focusState.propertyPriceFocused, propertyPrice]);

    useEffect(() => {
        if (lockMortgageDrawdown && !propertyPriceFocused) {
            let newPropertyPrice = mortgageDrawdown/(LTVRatio/100);

            setPropertyPrice(Number(newPropertyPrice).toFixed(0));
        }
    }, [LTVRatio, lockMortgageDrawdown, focusState.propertyPriceFocused, mortgageDrawdown]);

    useEffect(() => {
        if (lockLTVRatio && focusState.propertyPriceFocused) {
            let newMortgageDrawdown = propertyPrice * (LTVRatio/100);

            setMortgageDrawdown(Number(newMortgageDrawdown).toFixed(0));
        }
    },[lockLTVRatio, focusState.propertyPriceFocused, propertyPrice, LTVRatio]);

    useEffect(() => {
        if (lockLTVRatio && focusState.mortgageDrawdownFocused) {
            let newPropertyPrice = mortgageDrawdown/(LTVRatio/100);

            setPropertyPrice(Number(newPropertyPrice).toFixed(0));
        }
    },[lockLTVRatio, focusState.mortgageDrawdownFocused, mortgageDrawdown, LTVRatio]);
     
    function calculateRegistryFee(propertyPrice) {
        if (propertyPrice <= 50000) return 400;
        if (propertyPrice <= 200000) return 600;
        if (propertyPrice <= 400000) return 700;
        return 800;
    }

    const [selectedCounty, setSelectedCounty] = useState('');
    const [selectedPercentage, setSelectedPercentage] = useState(null);
    const [propertyTax, setPropertyTax] = useState(0);
    const [baseTaxValue, setBaseTaxValue] = useState(0);

    const counties = Object.keys(countyPercentages).map(name => ({
        name,
        percentage: countyPercentages[name]
    }));

    // Sort counties alphabetically
    const sortedCounties = counties.sort((a, b) => a.name.localeCompare(b.name));

    const handleCountyChange = (itemValue) => {
        const selected = sortedCounties.find(county => county.name === itemValue);
        setSelectedCounty(itemValue);
        setSelectedPercentage(selected ? selected.percentage : null);
        if (propertyPrice > 0) {
            const base = calculateBasePropertyTax(propertyPrice);
            const tax = calculatePropertyTax(propertyPrice, itemValue);
            setBaseTaxValue(base);
            setPropertyTax(tax);
        }
    };

    useEffect(() => {
        if (propertyPrice > 0) {
            const base = calculateBasePropertyTax(propertyPrice);
            const tax = calculatePropertyTax(propertyPrice, selectedCounty);
            setBaseTaxValue(base);
            setPropertyTax(tax);
        }
    }, [propertyPrice, selectedCounty]);

    // Calculate additional costs
    const stampDuty = propertyPrice < 1000000 ? propertyPrice * 0.01 : propertyPrice * 0.02;
    const solicitorFees = 2000;
    const valuerReport = 150;
    const surveyorReport = 300 * 1.23;
    const insuranceCosts = 300 + 360; // Homeowner's plus mortgage insurance
    const registryFee = calculateRegistryFee(propertyPrice);
    const totalAdditionalCosts = stampDuty + solicitorFees + valuerReport + surveyorReport + insuranceCosts + registryFee + baseTaxValue + (selectedPercentage * (baseTaxValue/100));

    const handleNext = (currentRef) => {
        const refsOrder = [
            propertyPriceRef,
            drawdownRef,
        ];
    
        const currentIndex = refsOrder.indexOf(currentRef);

        if (currentIndex !== -1 && currentIndex < refsOrder.length - 1) {
            const nextRef = refsOrder[currentIndex + 1];
            nextRef.current.focus();            
        } else {
            currentRef.current.focus();
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
                    <View style={styles.marginLeft}>
                        <View style={[styles.row, styles.center]}>
                            <CustomText>Property Price:</CustomText>
                            <View style={styles.row}>
                                <View style={[
                                    borrowingStyles.salaryInputs,
                                    styles.widthLimit,
                                    styles.marginRight,
                                    styles.marginLeft
                                ]}>
                                    {!lockPropertyPrice ? (
                                        <CustomNumericInput
                                            scrollRef={scrollRef}
                                            ref={propertyPriceRef}
                                            onNext={() => handleNext(propertyPriceRef)}
                                            onKeyboardVisibleChange={onKeyboardVisibleChange}
                                            style={[styles.bigblue, styles.h2, styles.latoFont]}                             
                                            value={handleFormattedDisplay(propertyPrice)}
                                            onChangeText={(text) => handleNumericChange(text, setPropertyPrice)}
                                            label="Property Price:"
                                        />
                                    ) : (
                                        <CustomText style={[
                                            styles.bigblue, 
                                            styles.h2, 
                                            styles.textRight, 
                                            styles.marginRight
                                        ]}>
                                            {handleFormattedDisplay(propertyPrice)}
                                        </CustomText>
                                    )}
                                </View>
                                <Pressable 
                                    title="Lock Property Price" 
                                    onPress={() => handleLock('propertyPrice')}
                                >
                                    {lockPropertyPrice ? (
                                        <FontAwesomeIcon name="lock" style={[styles.bigblue, styles.larger]} />
                                    ) : (
                                        <FontAwesomeIcon name="unlock" style={[styles.grey, styles.larger]} />
                                    )}
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
                                {!lockMortgageDrawdown ? (
                                    <CustomNumericInput
                                        scrollRef={scrollRef}
                                        ref={drawdownRef}
                                        onNext={() => handleNext(drawdownRef)}
                                        onKeyboardVisibleChange={onKeyboardVisibleChange}
                                        style={[styles.bigblue, styles.h2, styles.latoFont]}                             
                                        value={handleFormattedDisplay(mortgageDrawdown)}
                                        onChangeText={(text) => handleNumericChange(text, setMortgageDrawdown)}
                                        label="Mortgage Drawdown:"
                                    />
                                ) : (
                                    <CustomText style={[
                                        styles.bigblue, 
                                        styles.h2, 
                                        styles.textRight, 
                                        styles.marginRight
                                    ]}>
                                        {handleFormattedDisplay(mortgageDrawdown)}
                                    </CustomText>
                                )}
                            </View>
                            <Pressable 
                                title="Lock Mortgage Drawdown" 
                                onPress={() => handleLock('mortgageDrawdown')}
                            >
                                {lockMortgageDrawdown ? (
                                    <FontAwesomeIcon name="lock" style={[styles.bigblue, styles.larger]} />
                                ) : (
                                    <FontAwesomeIcon name="unlock" style={[styles.grey, styles.larger]} />
                                )}
                            </Pressable>
                        </View>

                        <View style={[styles.center, styles.row]}>
                            <CustomText>LTV Ratio: {(LTVRatio).toFixed(0)}%</CustomText>                       
                            {lockLTVRatio ? (
                                <Pressable 
                                    title="Lock LTV Ratio" 
                                    onPress={() => handleLock('LTVRatio')}
                                >
                                    <FontAwesomeIcon name="lock" style={[styles.bigblue, styles.larger]} />
                                </Pressable>
                            ) : (
                                <View style={[styles.center, styles.row]}>
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
                                    <Pressable 
                                        style={styles.marginLeft} 
                                        title="Lock LTV Ratio" 
                                        onPress={() => handleLock('LTVRatio')}
                                    >
                                        <FontAwesomeIcon name="unlock" style={[styles.grey, styles.larger]} />
                                    </Pressable>
                                </View>
                            )}
                        </View>


                        <View>
                            <View style={styles.row}>
                                <CustomText>Deposit Required:</CustomText>
                                <CustomText style={[styles.textRight, styles.marginLeft]}>{handleFormattedDisplay(depositRequired)}</CustomText>
                            </View>
                            <CustomText style={[styles.marginTop, styles.bold]}>Additional Fees</CustomText>
                            <View style={styles.horizontalRule}></View>
                            <View style={styles.row}>
                                <CustomText>Stamp Duty @{propertyPrice < 1000000 ? "1%" : "2%"} of the property value:</CustomText>
                                <CustomText style={[styles.textRight, styles.marginLeft]}> {handleFormattedDisplayTwoDecimal(stampDuty)}</CustomText>
                            </View>
                            <View style={styles.row}>
                                <CustomText>Solicitor Fees:</CustomText>
                                <CustomText style={[styles.textRight, styles.marginLeft]}> €{solicitorFees} </CustomText>
                            </View>
                            <View style={styles.row}>
                                <CustomText>Valuer's Report:</CustomText>
                                <CustomText style={[styles.textRight, styles.marginLeft]}> €{valuerReport}</CustomText>
                            </View>
                            <View style={styles.row}>
                                <CustomText>Surveyor's Report:</CustomText>
                                <CustomText style={[styles.textRight, styles.marginLeft]}> €{surveyorReport}</CustomText>
                            </View>
                            <View style={styles.row}>
                                <CustomText>Registry Fee:</CustomText>
                                <CustomText style={[styles.textRight, styles.marginLeft]}> €{registryFee}</CustomText>
                            </View>
                            <CustomText style={[styles.marginTop, styles.bold]}>Recurring Annual Fees</CustomText>
                            <View style={styles.horizontalRule}></View>
                            <View style={styles.row}>
                                <CustomText>Homeowner's Insurance:</CustomText>
                                <CustomText style={[styles.textRight, styles.marginLeft]}> €{(300)}</CustomText>
                            </View>
                            <View style={styles.row}>
                                <CustomText>Mortgage Insurance:</CustomText>
                                <CustomText style={[styles.textRight, styles.marginLeft]}> €{(360)}</CustomText>
                            </View>

                            <View>
                                <View style={styles.row}>
                                    <CustomText>LPT Charge (basic rate):</CustomText>
                                    <CustomText style={[styles.textRight, styles.marginLeft]}>  {handleFormattedDisplayTwoDecimal(baseTaxValue)}</CustomText>
                                </View>
                                { propertyPrice > 1750000 && (
                                    <View>
                                        <CustomText>Base rate estimated for properties above €1,750,000 @ 0.25%</CustomText>
                                    </View>   
                                )}
                                <CustomText style={styles.label}>Select a Local Authority:</CustomText>
                            </View>
                        </View>
                    </View>
                        
                    <View style={[borrowingStyles.quoteToggle, styles.centerText, styles.widthLimitLonger, styles.fixedRowHeight]}>
                        <View style={[styles.center]}>
                            <Picker
                                selectedValue={selectedCounty}
                                onValueChange={handleCountyChange}
                                style={[styles.pickerCustom, styles.marginRight, styles.paddingBottom]}
                            >
                                {sortedCounties.map((county, index) => (
                                <Picker.Item label={county.name} value={county.name} key={index} />
                                ))}
                            </Picker> 
                        </View>
                    </View>  

                    <View style={styles.marginLeft}>                            
                            {selectedCounty ? (
                                selectedPercentage === 0 ? (
                                    <CustomText>This Local Authority has a 0% increase LPT</CustomText>
                                ) : (
                                    <View>                                        
                                        <View style={styles.row}>
                                            <CustomText>Local Authority Increase @ {selectedPercentage}%:</CustomText>
                                            <CustomText style={[styles.textRight, styles.marginLeft]}>{handleFormattedDisplayTwoDecimal(selectedPercentage * (baseTaxValue/100))}</CustomText>
                                        </View>    
                                    </View>
                                )
                            ) : null}                                                                
                        </View>


                        <View style={styles.horizontalRule}/>
                        <View style={styles.row}>
                            <CustomText>Total Additional Costs:</CustomText>
                            <CustomText style={[styles.textRight, styles.marginLeft]}> {handleFormattedDisplayTwoDecimal(totalAdditionalCosts)}</CustomText>
                        </View>
                        <View style={styles.row}>
                            <CustomText>Total Savings Required:</CustomText>
                            <CustomText style={[styles.textRight, styles.marginLeft]}> {handleFormattedDisplayTwoDecimal(parseFloat(totalAdditionalCosts) + parseFloat(depositRequired))}</CustomText>
                        </View>
                        
                    
                    { applicants === 2 && 
                        <View style={styles.container}>
                            <Pressable
                                onPress={toggleCombinedEffort}
                                style={({ pressed }) => [
                                    {
                                        backgroundColor: pressed
                                            ? (combinedEffort ? '#FFA07A' : '#20B2AA') // Different color when pressed
                                            : (combinedEffort ? '#20B2AA' : '#FFA07A')
                                    },
                                    styles.button
                                ]}
                            >
                                <CustomText style={styles.text}>
                                    {combinedEffort ? 'Combined Effort: On' : 'Combined Effort: Off'}
                                </CustomText>
                            </Pressable>
                        </View>
                    }
                    <View style={styles.row}>
                        <CustomText>Deposit Saving Period:</CustomText>
                        <CustomText style={[styles.textRight, styles.marginLeft]}>{depositSavingPeriod}</CustomText>
                    </View>
                </View>
            )}
        </View>
    );
};

export default DepositSavingPeriod;