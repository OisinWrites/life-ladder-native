import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { View, Text, Pressable, Image, ScrollView } from 'react-native';
import appStyles from './styles/appStyles';
import lifeladderheader from './assets/images/lifeladderheader.png'; 

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
    <ScrollView contentContainerStyle={[appStyles.center]}>

      <View style={[appStyles.app, appStyles.center]}>

        <Pressable onPress={handleHeaderClick} style={appStyles.appHeader}>
          <Image source={lifeladderheader} style={appStyles.logoHeader} />
          <Text style={[appStyles.appHeader, appStyles.subHeaderText]}>Mortgage and Savings Calculator</Text>
        </Pressable>
        <View><FontAwesome5 name="rocket" size={30} color="#900" />
        <FontAwesome5 name="house" size={30} color="#900" />
        </View>
        <View style={[appStyles.main, appStyles.section, appStyles.center]}>
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
    </ScrollView>
  );
}

export default App;

