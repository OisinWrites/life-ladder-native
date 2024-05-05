import React, { useState, useEffect } from 'react';
import {
  View,
  Pressable,
  Animated,
  Text,
} from 'react-native';
import sliderStyle from '../styles/sliderStyle';

const selectionMap = {
  'No': -20,
  'Yes': 20,
  '1': -20,
  '2': 20,
};

const SlidingToggle = ({ options = [], defaultOption, onSelect }) => {
  const [selected, setSelected] = useState(defaultOption);
  const [animation] = useState(new Animated.Value(selectionMap[defaultOption]));

  const toggleSelection = (selection) => {
    setSelected(selection);
    const toValue = selectionMap[selection];

    Animated.timing(animation, {
      toValue,
      duration: 200,
      useNativeDriver: false,
    }).start();

    // Invoke the callback with the selected option
    if (onSelect) {
      onSelect(selection);
    }
  };

  const toggleStyle = {
    transform: [{ translateX: animation }],
  };

  return (
    <View style={sliderStyle.container}>
      <View style={sliderStyle.toggleContainer}>
        <Animated.View style={[sliderStyle.slider, toggleStyle]} />
        {options.map((option, index) => (
          <Pressable
            key={option.value}
            style={sliderStyle.toggleOption}
            onPress={() => toggleSelection(option.value)}
          >
            <Text style={selected === option.label ? sliderStyle.activeText : sliderStyle.inactiveText}>
              {option.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default SlidingToggle;
