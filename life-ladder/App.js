import { StatusBar, Platform, NativeModules } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { View, Pressable, Image, ScrollView } from 'react-native';
import styles from './styles/appStyles';
import lifeladderheader from './assets/images/lifeladderheader.png';

import { GlobalStylesProvider } from './utils/GlobalStylesContext';
import CustomText from './utils/CustomText';
import { handleFormattedDisplayTwoDecimal } from './utils/FormatNumber';

import BorrowingCapacityCalculator from './components/BorrowingCapacityCalculator';
import PersonalFinances from './components/PersonalFinances';
import DepositSavingPeriod from './components/DepositSavingPeriod';

import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts,
  Lato_400Regular,
  Lato_700Bold,
} from '@expo-google-fonts/lato';

SplashScreen.preventAutoHideAsync();

const { StatusBarManager } = NativeModules;

const normalizeNumber = (value) => {
  const parsedValue = parseFloat(value);
  return isNaN(parsedValue) ? null : parsedValue;
};

function App() {
  const scrollRef = useRef(null);
  const insets = SafeAreaView;

  const [fontsLoaded] = useFonts({
    Lato_400Regular,
    Lato_700Bold,
  });

  const [applicants, setApplicants] = useState(1);
  const [firstTimeBuyer, setFirstTimeBuyer] = useState('No');
  const [salary1, setSalary1] = useState(null);
  const [salary2, setSalary2] = useState(null);
  const [maxBorrowableAmount, setMaxBorrowableAmount] = useState(null);

  const [displaySwap, setDisplaySwap] = useState(false);
  const [displaySwap2, setDisplaySwap2] = useState(false);
  const [displaySwap3, setDisplaySwap3] = useState(false);

  const [displayWarning, setDisplayWarning] = useState(false);
  const [displayWarning2, setDisplayWarning2] = useState(false);
  const [displayWarning3, setDisplayWarning3] = useState(false);

  const [estimatedPropertyValue, setEstimatedPropertyValue] = useState(0);
  const [allowRecalculation, setAllowRecalculation] = useState(true);
  const [rent1, setRent1] = useState('');
  const [rent2, setRent2] = useState('');
  const [bills1, setBills1] = useState('');
  const [bills2, setBills2] = useState('');
  const [weeklyDiscretionary1, setWeeklyDiscretionary1] = useState('');
  const [weeklyDiscretionary2, setWeeklyDiscretionary2] = useState('');
  const [annualBills1, setAnnualBills1] = useState('');
  const [annualBills2, setAnnualBills2] = useState('');
  const [currentSavings1, setCurrentSavings1] = useState('');
  const [currentSavings2, setCurrentSavings2] = useState('');
  const [otherSavingGoals1, setOtherSavingGoals1] = useState('');
  const [otherSavingGoals2, setOtherSavingGoals2] = useState('');
  const [savingPowerMonthly1, setSavingPowerMonthly1] = useState('');
  const [savingPowerMonthly2, setSavingPowerMonthly2] = useState('');
  const [mortgageDrawdown, setMortgageDrawdown] = useState(maxBorrowableAmount !== '' ? handleFormattedDisplayTwoDecimal(maxBorrowableAmount) : 0);
  const [multiplier, setMultiplier] = useState(3.5);
    
  const handleHeaderClick = () => {
    if (borrowingSectionComplete) {
      setDisplaySwap(true);
      setDisplayWarning(false);
    } else {
      setDisplayWarning(true);
      setDisplaySwap(false);
    }
  };

  const handleHeaderClick2 = () => {
    if (depositSectionComplete) {
      setDisplaySwap2(true);
      setDisplayWarning2(false);
    } else {
      setDisplayWarning2(true);
      setDisplaySwap2(false);
    }
  };

  const handleHeaderClick3 = () => {
    if (depositSectionComplete) {
      setDisplaySwap2(true);
      setDisplayWarning2(false);
    } else {
      setDisplayWarning2(true);
      setDisplaySwap2(false);
    }
  };


  const handleToggleComplete = () => {
    setDisplaySwap(false);
    setDisplayWarning(false);
  };

  const handleToggleComplete2 = () => {
    setDisplaySwap2(false);
    setDisplayWarning2(false);
  };

  const handleToggleComplete3 = () => {
    setDisplaySwap2(false);
    setDisplayWarning2(false);
  };

  const borrowingSectionComplete = (normalizeNumber(salary1) !== null && normalizeNumber(salary1) !== 0)
    &&
    (applicants === 1 || (applicants === 2 && normalizeNumber(salary2) !== null && normalizeNumber(salary2) !== 0));

  useEffect(() => {
    if (allowRecalculation) {
      let totalSalary = parseFloat(salary1) || 0;
      if (applicants === 2) {
        totalSalary += parseFloat(salary2) || 0;
      }
      const calculatedAmount = totalSalary * multiplier;
      setMaxBorrowableAmount(calculatedAmount);
    }
  }, [salary1, salary2, applicants, multiplier, allowRecalculation]);

  useEffect(() => {
    if (maxBorrowableAmount) {
      const calculatedValue = (maxBorrowableAmount / 8) * 10;
      setEstimatedPropertyValue(calculatedValue);
    } else {
      setEstimatedPropertyValue(0);
    }
  }, [maxBorrowableAmount]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setHidden(true);
      // To make fullscreen immersive mode on Android
      const setFullscreen = async () => {
        try {
          await StatusBarManager.setFullscreen(true);
        } catch (e) {
          console.log(e);
        }
      };
      setFullscreen();
    }
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync(); // Hide the splash screen when fonts are loaded
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Optionally, return a fallback view
  }

    return (
      <SafeAreaProvider style={[styles.safeArea, { paddingTop: insets.top }]}>

        <ScrollView ref={scrollRef}>
          <GlobalStylesProvider>

            <Pressable style={[styles.appHeader, styles.fullHeight, styles.fullScreen ]} onPress={handleHeaderClick}>
              <Image source={lifeladderheader} style={styles.logoHeader} />
              <CustomText style={[styles.subHeaderText, styles.h2]}>Mortgage and Savings Calculator</CustomText>
            </Pressable>

            <View style={[styles.main, styles.section, styles.center ]}>
              <BorrowingCapacityCalculator
                applicants={applicants}
                setApplicants={setApplicants}
                firstTimeBuyer={firstTimeBuyer}
                setFirstTimeBuyer={setFirstTimeBuyer}
                salary1={salary1}
                setSalary1={setSalary1}
                salary2={salary2}
                setSalary2={setSalary2}
                maxBorrowableAmount={maxBorrowableAmount}
                setMaxBorrowableAmount={setMaxBorrowableAmount}
                displaySwap={displaySwap}
                displayWarning={displayWarning}
                handleToggleComplete={handleToggleComplete}
                estimatedPropertyValue={estimatedPropertyValue}
                setAllowRecalculation={setAllowRecalculation}
                multiplier={multiplier}
                setMultiplier={setMultiplier}
                scrollRef={scrollRef}
              />
            </View>

            <View style={[styles.main, styles.section, styles.center]}>
              <PersonalFinances
                applicants={applicants}
                salary1={salary1}
                salary2={salary2}
                displaySwap2={displaySwap2}
                displayWarning2={displayWarning2}
                handleToggleComplete2={handleToggleComplete2}
                rent1={rent1}
                rent2={rent2}
                setRent1={setRent1}
                setRent2={setRent2}
                bills1={bills1}
                setBills1={setBills1}
                bills2={bills2}
                setBills2={setBills2}
                weeklyDiscretionary1={weeklyDiscretionary1}
                weeklyDiscretionary2={weeklyDiscretionary2}
                setWeeklyDiscretionary1={setWeeklyDiscretionary1}
                setWeeklyDiscretionary2={setWeeklyDiscretionary2}
                annualBills1={annualBills1}
                setAnnualBills1={setAnnualBills1}
                annualBills2={annualBills2}
                setAnnualBills2={setAnnualBills2}
                currentSavings1={currentSavings1}
                setCurrentSavings1={setCurrentSavings1}
                currentSavings2={currentSavings2}
                setCurrentSavings2={setCurrentSavings2}
                otherSavingGoals1={otherSavingGoals1}
                setOtherSavingGoals1={setOtherSavingGoals1}
                otherSavingGoals2={otherSavingGoals2}
                setOtherSavingGoals2={setOtherSavingGoals2}
                savingPowerMonthly1={savingPowerMonthly1}
                savingPowerMonthly2={savingPowerMonthly2}
                setSavingPowerMonthly1={setSavingPowerMonthly1}
                setSavingPowerMonthly2={setSavingPowerMonthly2}
              />
            </View>
            <CustomText>{savingPowerMonthly1}</CustomText>
            <CustomText>{savingPowerMonthly2}</CustomText>

            <View style={[styles.main, styles.section, styles.center]}>
              <DepositSavingPeriod
                applicants={applicants}
                maxBorrowableAmount={maxBorrowableAmount}
                estimatedPropertyValue={estimatedPropertyValue}
                displaySwap3={displaySwap3}
                displayWarning3={displayWarning3}
                handleToggleComplete3={handleToggleComplete3}
                currentSavings1={currentSavings1}
                currentSavings2={currentSavings2}
                otherSavingGoals1={otherSavingGoals1}
                otherSavingGoals2={otherSavingGoals2}
                savingPowerMonthly1={savingPowerMonthly1}
                savingPowerMonthly2={savingPowerMonthly2}
                mortgageDrawdown={mortgageDrawdown}
                setMortgageDrawdown={setMortgageDrawdown}
              />
            </View>

          </GlobalStylesProvider>
        </ScrollView>

      </SafeAreaProvider>
    );
  }

export default App;

