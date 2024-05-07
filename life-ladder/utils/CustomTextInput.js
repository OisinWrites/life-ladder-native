import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { useGlobalStyles } from './GlobalStylesContext';
import { useFonts, Lato_400Regular } from '@expo-google-fonts/lato';
let [fontsLoaded] = useFonts({ Lato_400Regular });
if (!fontsLoaded) return null;

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
    textAlign: 'right',
    paddingRight: 10,
  }),
});

export default CustomTextInput;
