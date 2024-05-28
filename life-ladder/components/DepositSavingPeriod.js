import React, { useState, useEffect, useRef } from 'react';
import { View, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from '../styles/appStyles';
import borrowingStyles from '../styles/borrowingStyles';
import keyboardStyles from '../styles/keyboardStyles';
import CustomText from '../utils/CustomText';
import CustomNumericInput from '../utils/CustomNumericInput';
import { countyPercentages, calculatePropertyTax, calculateBasePropertyTax } from '../utils/LocalPropertyTaxCalc';
import Slider from '@react-native-community/slider';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6';
import { 
    handleNumericChange, 
    handleFormattedDisplay, 
    handleFormattedDisplayTwoDecimal,
    handleFormattedDisplayNoDecimal,
    parseFormattedNumber
 } from '../utils/FormatNumber';
import { useKeyboard } from '../utils/KeyboardContext';

const DepositSavingPeriod = ({
    applicants,
    maxBorrowableAmount,
    estimatedPropertyValue,
    displaySwap3,
    displayWarning3,
    handleToggleComplete3,
    personalFinances,
    mortgageDrawdown,
    setMortgageDrawdown,
    scrollRef,
    propertyPrice,
    setPropertyPrice,
    depositSavingPeriod,
    setDepositSavingPeriod
}) => {
    const { isKeyboardVisible, setIsKeyboardVisible } = useKeyboard();
    const [depositRequired, setDepositRequired] = useState('');
    const [drawdownInExcessOfBorrowingCapacity, setDrawdownInExcessOfBorrowingCapacity] = useState(false);
    const [excessWarning, setExcessWarning] = useState(false);
    const [propertyPriceFocused, setPropertyPriceFocused] = useState(false);
    const [mortgageDrawdownFocused, setMortgageDrawdownFocused] = useState(false);

    const handlePropertyPriceFocus = () => {
        setPropertyPriceFocused(true);
        setMortgageDrawdownFocused(false);
    };
    
    const handlePropertyPriceBlur = () => {
        setPropertyPriceFocused(false);
    };
    
    const handleMortgageDrawdownFocus = () => {
        setMortgageDrawdownFocused(true);
        setPropertyPriceFocused(false);
    };
    
    const handleMortgageDrawdownBlur = () => {
        setMortgageDrawdownFocused(false);
    };   
  
    const prevPropertyPrice = useRef();
    const prevMortgageDrawdown = useRef();
    const prevLTVRatio = useRef(80);
    const propertyPriceRef = useRef(null);
    const drawdownRef = useRef(null);
    const [lockPropertyPrice, setLockPropertyPrice] = useState(false);
    const [lockMortgageDrawdown, setLockMortgageDrawdown] = useState(false);
    const [LTVRatio, setLTVRatio] = useState(80);
    const [sliderRange, setSliderRange] = useState({ min: 40, max: 90 });
    const [lockLTVRatio, setLockLTVRatio] = useState(true);
    const [evenEffort, setEvenEffort] = useState('');
    const [firstAppSurplus, setFirstAppSurplus] = useState('');
    const [secondAppSurplus, setSecondAppSurplus] = useState('');
    const [combinedEffort, setCombinedEffort] = useState(true);

    const toggleCombinedEffort = () => {
        setCombinedEffort(previousState => !previousState);
    };
   
    const handleLock = (lockType) => {
        setLockPropertyPrice(lockType === 'propertyPrice');
        setLockMortgageDrawdown(lockType === 'mortgageDrawdown');
        setLockLTVRatio(lockType === 'LTVRatio');
    };

    useEffect(() => {
        if (applicants === 2) {
            if (personalFinances[0].savingPowerMonthly > personalFinances[1].savingPowerMonthly) {
                let newEvenEffort = (personalFinances[1].savingPowerMonthly * 2).toFixed(1);
                setEvenEffort(newEvenEffort);
                let newFirstAppSurplus = (personalFinances[0].savingPowerMonthly - personalFinances[1].savingPowerMonthly).toFixed(1);
                setSecondAppSurplus(0);
                setFirstAppSurplus(newFirstAppSurplus);
            } else if (personalFinances[1].savingPowerMonthly > personalFinances[0].savingPowerMonthly) {
                let newEvenEffort = (personalFinances[0].savingPowerMonthly * 2).toFixed(1);
                setEvenEffort(newEvenEffort);
                let newSecondAppSurplus = (personalFinances[1].savingPowerMonthly - personalFinances[0].savingPowerMonthly).toFixed(1);
                setFirstAppSurplus(0);
                setSecondAppSurplus(newSecondAppSurplus);
            }
        }
    }, [personalFinances, applicants]);

    useEffect(() => {
        let newDepositSavingPeriod;
        let newTotalCosts = parseFloat(totalAdditionalCosts) + parseFloat(depositRequired);
        if (applicants === 2) {
            if (combinedEffort) {
                newDepositSavingPeriod = newTotalCosts / (personalFinances[0].savingPowerMonthly + personalFinances[1].savingPowerMonthly);
            } else {
                newDepositSavingPeriod = newTotalCosts / evenEffort;
            }
        } else {
            newDepositSavingPeriod = newTotalCosts / personalFinances[0].savingPowerMonthly;
        }
    
        newDepositSavingPeriod = Math.floor(newDepositSavingPeriod);
    
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
    
        setDepositSavingPeriod(formatPeriod(newDepositSavingPeriod));
    }, [applicants, combinedEffort, depositRequired, totalAdditionalCosts, personalFinances, evenEffort]);

    useEffect(() => {
        let newDepositRequired = propertyPrice - mortgageDrawdown;
        newDepositRequired = (newDepositRequired).toFixed(2);
        setDepositRequired(newDepositRequired);
    }, [propertyPrice, mortgageDrawdown]);

    useEffect(() => {
        if (lockLTVRatio) {
            if (propertyPriceFocused) {
                let newMortgageDrawdown = propertyPrice * (LTVRatio / 100);
                if (newMortgageDrawdown > maxBorrowableAmount) {
                    setLTVRatio(prevLTVRatio.current);
                } else {
                    setMortgageDrawdown(newMortgageDrawdown);
                }
            } else if (mortgageDrawdownFocused) {
                let newPropertyPrice = mortgageDrawdown / (LTVRatio / 100);
                setPropertyPrice(newPropertyPrice);
            }
        }
    }, [lockLTVRatio, propertyPriceFocused, mortgageDrawdownFocused, propertyPrice, LTVRatio, maxBorrowableAmount, mortgageDrawdown, setLTVRatio, setMortgageDrawdown, setPropertyPrice]);

    useEffect(() => {
        const formattedMortgageDrawdown = parseFormattedNumber(mortgageDrawdown);
        const formattedPropertyPrice = parseFormattedNumber(propertyPrice);
        if (lockMortgageDrawdown && formattedMortgageDrawdown > 0) {
            if (propertyPriceFocused) {
                let newLTVRatio = (formattedMortgageDrawdown / formattedPropertyPrice) * 100;
                newLTVRatio = parseFloat(newLTVRatio.toFixed(5));
                setLTVRatio(newLTVRatio);
            } else {
                let newPropertyPrice = formattedMortgageDrawdown / (LTVRatio / 100);
                setPropertyPrice(newPropertyPrice);
            }
        }
    }, [lockMortgageDrawdown, propertyPriceFocused, mortgageDrawdown, propertyPrice, LTVRatio, setPropertyPrice, setLTVRatio]);    

    useEffect(() => {
        const formattedPropertyPrice = parseFormattedNumber(propertyPrice);
        const formattedMortgageDrawdown = parseFormattedNumber(mortgageDrawdown);
    
        if (lockPropertyPrice && formattedPropertyPrice > 0) {
            if (mortgageDrawdownFocused) {
                let newLTVRatio = (formattedMortgageDrawdown / formattedPropertyPrice) * 100;
                newLTVRatio = parseFloat(newLTVRatio.toFixed(5));
                setLTVRatio(newLTVRatio);
            } else {
                let newMortgageDrawdown = formattedPropertyPrice * (LTVRatio / 100);
                if (newMortgageDrawdown > maxBorrowableAmount) {
                    let adjustedLTVRatio = (maxBorrowableAmount / formattedPropertyPrice) * 100;
                    setExcessWarning(true);
                    setLTVRatio(adjustedLTVRatio);
                    setMortgageDrawdown(maxBorrowableAmount);
                } else {
                    setMortgageDrawdown(newMortgageDrawdown);
                }
            }
        }
    }, [lockPropertyPrice, mortgageDrawdownFocused, mortgageDrawdown, propertyPrice, LTVRatio, maxBorrowableAmount, setLTVRatio, setMortgageDrawdown, setExcessWarning]);
    
    const handleMortgageDrawdownChange = (value) => {
        const newValue = parseFormattedNumber(value);
        if (newValue <= maxBorrowableAmount) {
            setMortgageDrawdown(newValue);
            setDrawdownInExcessOfBorrowingCapacity(false);
        } else {
            setMortgageDrawdown(maxBorrowableAmount);
            setDrawdownInExcessOfBorrowingCapacity(true);
        }
    
        // Update LTV ratio if the property price is locked
        if (lockPropertyPrice && propertyPrice > 0) {
            let newLTVRatio = (newValue / parseFormattedNumber(propertyPrice)) * 100;
            newLTVRatio = parseFloat(newLTVRatio.toFixed(5));
            setLTVRatio(newLTVRatio);
        }
    };

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

    const stampDuty = propertyPrice < 1000000 ? propertyPrice * 0.01 : propertyPrice * 0.02;
    const solicitorFees = 2000;
    const valuerReport = 150;
    const surveyorReport = 300 * 1.23;
    const insuranceCosts = 300 + 360;
    const registryFee = calculateRegistryFee(propertyPrice);
    const totalAdditionalCosts = stampDuty + solicitorFees + valuerReport + surveyorReport + insuranceCosts + registryFee + baseTaxValue + (selectedPercentage * (baseTaxValue / 100));

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

    useEffect(() => {
        if (mortgageDrawdown > maxBorrowableAmount && prevMortgageDrawdown.current <= maxBorrowableAmount) {
            setMortgageDrawdown(maxBorrowableAmount);
            setDrawdownInExcessOfBorrowingCapacity(true);
            setExcessWarning(true);
        } else if (mortgageDrawdown <= maxBorrowableAmount && prevMortgageDrawdown.current > maxBorrowableAmount) {
            setDrawdownInExcessOfBorrowingCapacity(false);
        }
        prevMortgageDrawdown.current = mortgageDrawdown;
    }, [mortgageDrawdown, maxBorrowableAmount]); 
    
    useEffect(() => {
        const formattedMortgageDrawdown = parseFormattedNumber(mortgageDrawdown);
        if (Math.ceil(formattedMortgageDrawdown) < maxBorrowableAmount) {
            setExcessWarning(false);
        }
    }, [mortgageDrawdown, maxBorrowableAmount, setExcessWarning]);
    

    return (
        <View style={styles.container}>
            {displaySwap3 ? (
                <View style={styles.marginBottom}>
                    <Pressable style={styles.row} title="Edit Section" onPress={handleToggleComplete3}>
                        <CustomText style={[styles.centerText, styles.header, styles.completed]}>Deposit Saving Period</CustomText>
                    </Pressable>
                </View>
            ) : (
                <View style={styles.marginBottom}>
                    <View style={styles.marginBottom}>
                        <CustomText style={[styles.centerText, styles.header]}>Deposit Saving Period</CustomText>
                        {displayWarning3 &&
                            <CustomText style={[styles.textColorGreen, styles.centerText, styles.bold]}>
                                Complete this section before moving on
                            </CustomText>
                        }
                    </View>

                    <CustomText>{ isKeyboardVisible ? ("Keyboard") : ("No keyboard")}</CustomText>
                    <CustomText>{ propertyPriceFocused ? ("ON") : ("OFF")}</CustomText>
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
                                        onKeyboardVisibleChange={setIsKeyboardVisible}
                                        style={[styles.bigblue, styles.h2, styles.latoFont]}
                                        value={handleFormattedDisplayNoDecimal(propertyPrice)}
                                        onChangeText={(text) => {handleNumericChange(text, setPropertyPrice)}}
                                        label="Property Price:"
                                        onFocus={handlePropertyPriceFocus}
                                        onBlur={handlePropertyPriceBlur}
                                    />
                                ) : (
                                    <CustomText style={[
                                        styles.bigblue,
                                        styles.h2,
                                        styles.textRight,
                                        styles.marginRight
                                    ]}>
                                        {handleFormattedDisplayNoDecimal(propertyPrice)}
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
                    <Pressable onPress={handleMortgageDrawdownFocus}><CustomText>MD on</CustomText></Pressable>
                    <Pressable onPress={handleMortgageDrawdownBlur}><CustomText>MD off</CustomText></Pressable>
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
                                    onKeyboardVisibleChange={setIsKeyboardVisible}
                                    style={[styles.bigblue, styles.h2, styles.latoFont]}
                                    value={handleFormattedDisplayNoDecimal(mortgageDrawdown)}
                                    onChangeText={(text) => handleMortgageDrawdownChange(text)}
                                    label={
                                        <View style={styles.labelContainer}>
                                            <CustomText style={[keyboardStyles.label, styles.centerText]}>Mortgage Drawdown:</CustomText>
                                            {excessWarning && (
                                                <CustomText style={styles.warning}>
                                                    WARNING: Max Loan cannot be exceeded!
                                                </CustomText>
                                            )}
                                        </View>
                                    }
                                    onFocus={handleMortgageDrawdownFocus}
                                    onBlur={handleMortgageDrawdownBlur}
                                />
                            ) : (
                                <>
                                    <CustomText style={[
                                        styles.bigblue,
                                        styles.h2,
                                        styles.textRight,
                                        styles.marginRight
                                    ]}>
                                        {handleFormattedDisplayNoDecimal(mortgageDrawdown)}
                                    </CustomText>
                                </>
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
                    <CustomText>{ mortgageDrawdownFocused ? ("ON") : ("OFF")}</CustomText>

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
                                        minimumTrackTintColor='#03a1fc'
                                        maximumTrackTintColor='#91B0C2'
                                        thumbTintColor='#14a730'
                                        step={1}
                                        value={LTVRatio}
                                        onValueChange={(value) => {setLTVRatio(value)}}
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

                    { excessWarning && (
                        <View style={[styles.center, styles.marginTop]}>
                            <CustomText style={[styles.warning, styles.marginBottom]}>
                                WARNING: Max Loan cannot be exceeded!
                            </CustomText>
                        </View>
                    )}

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
                                <CustomText>Local Property Tax { propertyPrice > 1750000 ? (                                        
                                        "(est 0.25% > €1.75 mil)"                                        
                                ) : ("(basic rate)")}:</CustomText>
                                <CustomText style={[styles.textRight, styles.marginLeft]}>  {handleFormattedDisplayTwoDecimal(baseTaxValue)}</CustomText>
                            </View>                                
                        </View>
                    </View>

                    <View style={[styles.row]}>
                        <View style={[styles.lptBox]}>
                            <CustomText style={styles.marginLeft}>Select a Local Authority:</CustomText>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={selectedCounty}
                                    onValueChange={handleCountyChange}
                                    style={styles.picker}                                
                                >
                                    {sortedCounties.map((county, index) => (
                                    <Picker.Item style={styles.pickerItem} label={county.name} value={county.name} key={index} />
                                    ))}
                                </Picker> 
                            </View>
                            <View style={styles.marginLeft}>                            
                                {selectedCounty ? (
                                    selectedPercentage === 0 ? (
                                        <CustomText>Authority has a 0% increase on LPT</CustomText>
                                    ) : (
                                        <View>                                        
                                            <View style={styles.row}>
                                                <CustomText>Local Authority Increase @ {selectedPercentage}%</CustomText>
                                            </View>    
                                        </View>
                                    )
                                ) : null}                                                                
                            </View>
                        </View>
                        { selectedPercentage > 1 && (
                        <CustomText style={[styles.textRight, styles.marginLeft]}>
                            {handleFormattedDisplayTwoDecimal(selectedPercentage * (baseTaxValue / 100))}
                        </CustomText>
                        )}
                    </View>

                    <View style={styles.horizontalRule} />
                    <View style={styles.row}>
                        <CustomText>Total Additional Costs:</CustomText>
                        <CustomText style={[styles.textRight, styles.marginLeft]}> {handleFormattedDisplayTwoDecimal(totalAdditionalCosts)}</CustomText>
                    </View>
                    <View style={styles.row}>
                        <CustomText>Total Savings Required:</CustomText>
                        <CustomText style={[styles.textRight, styles.marginLeft]}> {handleFormattedDisplayTwoDecimal(parseFloat(totalAdditionalCosts) + parseFloat(depositRequired))}</CustomText>
                    </View>

                    {applicants === 2 && 
                        <View style={styles.container}>
                            <Pressable
                                onPress={toggleCombinedEffort}
                                style={({ pressed }) => [
                                    {
                                        backgroundColor: pressed
                                            ? (combinedEffort ? '#FFA07A' : '#20B2AA')
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
