import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { useGlobalStyles } from './GlobalStylesContext';

const CustomTextInput = ({ style, ...props }) => {
  const { defaultFontSize, placeholderOpacity } = useGlobalStyles();

  return (
    <TextInput
      {...props}
      style={[styles.defaultInput(defaultFontSize), style]}
      placeholderTextColor={`rgba(3, 161, 252, ${placeholderOpacity})`}
    />
  );
};

const styles = StyleSheet.create({
  defaultInput: (fontSize) => ({
    fontSize,
    color:'#03a1fc !important',
    fontFamily: 'Lato-Regular',
    textAlign: 'center',
  }),
});

export default CustomTextInput;
