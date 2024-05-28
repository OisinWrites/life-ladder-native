import { StatusBar, Platform, NativeModules } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { View, Pressable, Image, ScrollView } from 'react-native';
import styles from './styles/appStyles';
import lifeladderheader from './assets/images/lifeladderheader.png';

import { GlobalStylesProvider } from './utils/GlobalStylesContext';
import { KeyboardProvider } from './utils/KeyboardContext';
import CustomText from './utils/CustomText';
import { handleFormattedDisplayTwoDecimal } from './utils/FormatNumber';
import { calculateMonthlyMortgagePayment } from './utils/MortgageInterestCalc';

import BorrowingCapacityCalculator from './components/BorrowingCapacityCalculator';
import PersonalFinances from './components/PersonalFinances';
import DepositSavingPeriod from './components/DepositSavingPeriod';
import MortgageDetails from './components/MortgageDetails';
import FinancialPlanner from './components/FinancialPlanner';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts,
  Lato_400Regular,
  Lato_700Bold,
} from '@expo-google-fonts/lato';
import FinancialPlanner from './components/FinancialPlanner';

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
  const [salary1, setSalary1] = useState(50000);
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
  const [mortgageDrawdown, setMortgageDrawdown] = useState(estimatedPropertyValue * 0.8);
  const [propertyPrice, setPropertyPrice] = useState(estimatedPropertyValue);
  const [multiplier, setMultiplier] = useState(3.5);
  const [remortgageDetails, setRemortgageDetails] = useState([
      { newTerm: 25, newRate: 3.5, openingBalance: mortgageDrawdown, schedule: [] }
  ]);
  const [personalFinances1, setPersonalFinances1] = useState({
    salary: salary1,
    rent: rent1,
    bills: bills1,
    weeklyDiscretionary: weeklyDiscretionary1,
    annualBills: annualBills1,
    currentSavings: currentSavings1,
    otherSavingGoals: otherSavingGoals1,
    savingPowerMonthly: savingPowerMonthly1
  });
  
  const [personalFinances2, setPersonalFinances2] = useState({
    salary: salary2,
    rent: rent2,
    bills: bills2,
    weeklyDiscretionary: weeklyDiscretionary2,
    annualBills: annualBills2,
    currentSavings: currentSavings2,
    otherSavingGoals: otherSavingGoals2,
    savingPowerMonthly: savingPowerMonthly2
  });
  
  useEffect(() => {
    setPersonalFinances1(prevState => ({
      ...prevState,
      salary: salary1,
      rent: rent1,
      bills: bills1,
      weeklyDiscretionary: weeklyDiscretionary1,
      annualBills: annualBills1,
      currentSavings: currentSavings1,
      otherSavingGoals: otherSavingGoals1,
      savingPowerMonthly: savingPowerMonthly1
    }));
  }, [salary1, rent1, bills1, weeklyDiscretionary1, annualBills1, currentSavings1, otherSavingGoals1, savingPowerMonthly1]);
  
  useEffect(() => {
    setPersonalFinances2(prevState => ({
      ...prevState,
      salary: salary2,
      rent: rent2,
      bills: bills2,
      weeklyDiscretionary: weeklyDiscretionary2,
      annualBills: annualBills2,
      currentSavings: currentSavings2,
      otherSavingGoals: otherSavingGoals2,
      savingPowerMonthly: savingPowerMonthly2
    }));
  }, [salary2, rent2, bills2, weeklyDiscretionary2, annualBills2, currentSavings2, otherSavingGoals2, savingPowerMonthly2]);
  

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
    setMortgageDrawdown(estimatedPropertyValue * 0.8);
  }, [estimatedPropertyValue]);

  useEffect(() => {
    setPropertyPrice(estimatedPropertyValue);
  }, [estimatedPropertyValue]);

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
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const renderRemortgageDetails = () => {
    return remortgageDetails.map((details, index) => {
      const monthlyRepayments = calculateMonthlyMortgagePayment(details.openingBalance, details.newRate, details.newTerm);
      const nextRemortgage = remortgageDetails[index + 1];
      const yearsUntilRemortgage = nextRemortgage 
        ? Math.min(nextRemortgage.year - (details.year || 1), details.newTerm)
        : details.newTerm;

      return (
        <View key={`remortgage-period-${index}`} style={styles.row}>
          {monthlyRepayments > 1 && (
            <View style={styles.row}>
              <View style={styles.row}>
                <CustomText style={[styles.widthLimitSmall, styles.textRight]}>{yearsUntilRemortgage}</CustomText>
                <CustomText style={[styles.marginLeft]}>{yearsUntilRemortgage === 1 ? " year " : " years "}</CustomText>
              </View>
              <CustomText style={[styles.textRight, styles.marginLeft]}>
                {handleFormattedDisplayTwoDecimal(monthlyRepayments)}
              </CustomText>
            </View>
          )}
        </View>
      );
    });
  };

  const calculateTotalInterestPayments = () => {
    return remortgageDetails.reduce((totalInterest, details) => {
      return totalInterest + details.schedule.reduce((yearlyInterest, year) => {
        return yearlyInterest + year.annualInterestCharged;
      }, 0);
    }, 0);
  };

  const renderInterestPaymentsPerYear = () => {
    return remortgageDetails.map((details, remortgageIndex) => {
      return details.schedule.map((year, yearIndex) => (
        <View key={`interest-${remortgageIndex}-${yearIndex}`} style={styles.row}>
          <CustomText style={[styles.widthLimitSmall, styles.textRight]}>
            Year {year.year}
          </CustomText>
          <CustomText style={styles.marginLeft}>
            {handleFormattedDisplayTwoDecimal(year.annualInterestCharged)}
          </CustomText>
        </View>
      ));
    });
  };
  

    return (
      <SafeAreaProvider style={[styles.safeArea, { paddingTop: insets.top }]}>
        <KeyboardProvider>
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
                  displaySwap2={displaySwap2}
                  displayWarning2={displayWarning2}
                  handleToggleComplete2={handleToggleComplete2}
                  personalFinances1={personalFinances1}
                  setPersonalFinances1={setPersonalFinances1}
                  personalFinances2={personalFinances2}
                  setPersonalFinances2={setPersonalFinances2}
                  scrollRef={scrollRef}
                />
              </View>

              <View style={[styles.main, styles.section, styles.center]}>
                <DepositSavingPeriod
                  applicants={applicants}
                  maxBorrowableAmount={maxBorrowableAmount}
                  estimatedPropertyValue={estimatedPropertyValue}
                  propertyPrice={propertyPrice}
                  setPropertyPrice={setPropertyPrice}
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
                  scrollRef={scrollRef}
                />
              </View>
              
              <View style={[styles.main, styles.section, styles.center]}>
                <MortgageDetails                
                  mortgageDrawdown={mortgageDrawdown}                
                  remortgageDetails={remortgageDetails}
                  setRemortgageDetails={setRemortgageDetails}
                />
              </View>

              <View style={[styles.main, styles.section, styles.center]}>
                <FinancialPlanner
                  applicants={applicants}
                />
              </View>

              <View style={styles.appLogo}></View>



            </GlobalStylesProvider>
          </ScrollView>
        </KeyboardProvider>
      </SafeAreaProvider>
    );
  }

export default App;

