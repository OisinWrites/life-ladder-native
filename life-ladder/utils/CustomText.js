import React from 'react';
import { Text } from 'react-native';

const CustomText = ({ children, style, ...props }) => {
  return (
    <Text style={[{ fontFamily: 'Lato_400Regular', fontSize: 14 }, style]} {...props}>
      {children}
    </Text>
  );
};

export default CustomText;
