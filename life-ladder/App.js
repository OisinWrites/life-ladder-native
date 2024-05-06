import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Image, ScrollView, StyleSheet } from 'react-native';
import styles from './styles/appStyles';
import lifeladderheader from './assets/images/lifeladderheader.png';

import { GlobalStylesProvider } from './utils/GlobalStylesContext';
import CustomTextInput from './utils/CustomTextInput';
import CustomText from './utils/CustomText';

import BorrowingCapacityCalculator from './components/BorrowingCapacityCalculator';
import PersonalFinances from './components/PersonalFinances';

import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts,
  Lato_400Regular,
  Lato_700Bold,
} from '@expo-google-fonts/lato';

SplashScreen.preventAutoHideAsync();

const normalizeNumber = (value) => {
  const parsedValue = parseFloat(value);
  return isNaN(parsedValue) ? null : parsedValue;
};

function App() {
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
  const [displayWarning, setDisplayWarning] = useState(false);
  const [displayWarning2, setDisplayWarning2] = useState(false);
  const [estimatedPropertyValue, setEstimatedPropertyValue] = useState(0);
  const [allowRecalculation, setAllowRecalculation] = useState(true);
  const [rent1, setRent1] = useState('');
  const [bills1, setBills1] = useState('');
  const [weeklyDiscretionary1, setWeeklyDiscretionary1] = useState('');
  const [annualBills1, setAnnualBills1] = useState('');
  const [annualBills2, setAnnualBills2] = useState('');
  const [currentSavings1, setCurrentSavings1] = useState('');
  const [currentSavings2, setCurrentSavings2] = useState('');
  const [otherSavingGoals1, setOtherSavingGoals1] = useState('');
  const [otherSavingGoals2, setOtherSavingGoals2] = useState('');

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

  const handleToggleComplete = () => {
    setDisplaySwap(false);
    setDisplayWarning(false);
  };

  const handleToggleComplete2 = () => {
    setDisplaySwap2(false);
    setDisplayWarning2(false);
  };

  const borrowingSectionComplete = (normalizeNumber(salary1) !== null && normalizeNumber(salary1) !== 0)
                                   &&
                                   (applicants === 1 || (applicants === 2 && normalizeNumber(salary2) !== null && normalizeNumber(salary2) !== 0));

  const multiplier = firstTimeBuyer === 'Yes' ? 4 : 3.5;

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
      const calculatedValue = (maxBorrowableAmount / 9) * 10;
      setEstimatedPropertyValue(calculatedValue);
    } else {
      setEstimatedPropertyValue(0);
    }
  }, [maxBorrowableAmount]);

  return (
    <ScrollView>
      <GlobalStylesProvider>

        <Pressable style={[styles.appHeader, styles.fullHeight]} onPress={handleHeaderClick}>
          <Image source={lifeladderheader} style={styles.logoHeader} />
          <CustomText style={[styles.subHeaderText, styles.h2]}>Mortgage and Savings Calculator</CustomText>
        </Pressable>

        <View style={[styles.main, styles.section, styles.center]}>
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
          />
        </View>

        <View style={[styles.main, styles.section, styles.center]}>
          <PersonalFinances
            applicants={applicants}
            salary1={salary1}
            salary2={salary2}
            maxBorrowableAmount={maxBorrowableAmount}
            displaySwap2={displaySwap2}
            displayWarning2={displayWarning2}
            handleToggleComplete2={handleToggleComplete2}
            estimatedPropertyValue={estimatedPropertyValue}
            rent1={rent1}
            setRent1={setRent1}
            bills1={bills1}
            setBills1={setBills1}
            weeklyDiscretionary1={weeklyDiscretionary1}
            setWeeklyDiscretionary1={setWeeklyDiscretionary1}
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
            setotherSavingGoals2={setOtherSavingGoals2}
          />
        </View>

      </GlobalStylesProvider>
    </ScrollView>
  );
}

export default App;

