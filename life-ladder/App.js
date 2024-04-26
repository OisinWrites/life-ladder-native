import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import BorrowingCapacityCalculator from './components/BorrowingCapacityCalculator';

function App() {
  const [applicants, setApplicants] = useState(1);
  const [firstTimeBuyer, setFirstTimeBuyer] = useState(null);
  const [salary1, setSalary1] = useState(null);
  const [salary2, setSalary2] = useState(null);
  const [maxBorrowableAmount, setMaxBorrowableAmount] = useState(null);
  const [displaySwap, setDisplaySwap] = useState(false);
  const [displayWarning, setDisplayWarning] = useState(false);
  const [estimatedPropertyValue, setEstimatedPropertyValue] = useState(0);

  const handleHeaderClick = () => {
    if (borrowingSectionComplete) {
      setDisplaySwap(true);
      setDisplayWarning(false);
    } else {
      setDisplayWarning(true);
      setDisplaySwap(false);
    }
  };

  const handleToggleComplete = () => {
    setDisplaySwap(false);
    setDisplayWarning(false);
  };

  const borrowingSectionComplete = salary1 !== null &&
                                   firstTimeBuyer !== null &&
                                   (applicants === 1 || (applicants === 2 && salary2 !== null));

  const multiplier = firstTimeBuyer === 'Yes' ? 4 : 3.5;

  useEffect(() => {
    let totalSalary = parseFloat(salary1) || 0;
    if (applicants === 2) {
      totalSalary += parseFloat(salary2) || 0;
    }
    const calculatedAmount = totalSalary * multiplier;
    setMaxBorrowableAmount(calculatedAmount);
  }, [salary1, salary2, applicants, multiplier]);

  useEffect(() => {
    if (maxBorrowableAmount) {
      const calculatedValue = (maxBorrowableAmount / 9) * 10;
      setEstimatedPropertyValue(calculatedValue);
    }
  }, [maxBorrowableAmount]);

  return (
    <View style={styles.app}>
      <TouchableOpacity onPress={handleHeaderClick} style={styles.appHeader}>
        <Text style={styles.headerText}>Life Ladder</Text>
        <Text style={styles.subHeaderText}>Mortgage and Savings Calculator</Text>
      </TouchableOpacity>
      <View style={styles.main}>
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
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
  },
  appHeader: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
  },
  subheader: {
      fontSize: 18,
      fontWeight: 'normal',
  },
});
