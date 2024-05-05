import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useGlobalStyles } from './GlobalStylesContext';

const CustomText = ({ children, style, ...props }) => {
  const { defaultFontSize } = useGlobalStyles();

  return (
    <Text {...props} style={[styles.defaultFont(defaultFontSize), style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  defaultFont: (fontSize) => ({
    fontSize,
    fontFamily: 'Lato_400Regular, sans-serif',
    color: '#282C34',
  }),
});

export default CustomText;
