import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Image, ScrollView } from 'react-native';
import styles from './styles/appStyles';
import lifeladderheader from './assets/images/lifeladderheader.png'; 

import BorrowingCapacityCalculator from './components/BorrowingCapacityCalculator';
import DepositSavingPeriod from './components/DepositSavingPeriod';

function App() {
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

  const borrowingSectionComplete = salary1 !== null &&
                                   firstTimeBuyer !== null &&
                                   (applicants === 1 || (applicants === 2 && salary2 !== null));

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

        <Pressable style={styles.appHeader} onPress={handleHeaderClick}>
          <Image source={lifeladderheader} style={styles.logoHeader} />
          <Text style={styles.subHeaderText}>Mortgage and Savings Calculator</Text>
        </Pressable>

        <Text>{rent1} {bills1}</Text>

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
          <DepositSavingPeriod
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
          />
        </View>

    </ScrollView>
  );
}

export default App;

