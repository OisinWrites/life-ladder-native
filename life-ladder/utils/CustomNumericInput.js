import React, { useState } from 'react';
import { View, TextInput, Modal, Pressable } from 'react-native';
import CustomKeyboard from './CustomKeyboard';
import { useGlobalStyles } from './GlobalStylesContext';
import keyboardStyles from '../styles/keyboardStyles';

const CustomNumericInput = ({ value, onChangeText, placeholder, style, ...props }) => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const { defaultFontSize, placeholderOpacity } = useGlobalStyles();

  const handleToggleKeyboard = () => {
    setIsKeyboardVisible(!isKeyboardVisible);
  };

  const handleKeyPress = (key) => {
    const newValue = value + key;
    onChangeText(newValue);
  };

  const handleDelete = () => {
    const newValue = value.slice(0, -1);
    onChangeText(newValue);
  };

  const handleClear = () => {
    onChangeText('');
  };

  const handleSubmit = () => {
    setIsKeyboardVisible(false);
  };

  const handleClose = () => {
    setIsKeyboardVisible(false);
  };

  return (
    <View style={keyboardStyles.container}>
      <Pressable onPress={handleToggleKeyboard}>
        <TextInput
          {...props}
          style={[keyboardStyles.defaultInput(defaultFontSize), style]}
          value={value}
          placeholderTextColor={`rgba(3, 161, 252, ${placeholderOpacity})`}
          placeholder={placeholder}
          inputMode="numeric"
          readOnly={false} // Disable default keyboard
        />
      </Pressable>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isKeyboardVisible}
        onRequestClose={handleClose}
      >
        <Pressable style={keyboardStyles.modalBackground} onPress={handleClose}>
          <Pressable activeOpacity={1} style={keyboardStyles.modalContainer}>
            <CustomKeyboard
              onKeyPress={handleKeyPress}
              onDelete={handleDelete}
              onClear={handleClear}
              onSubmit={handleSubmit}
              onClose={handleClose}
              inputValue={value}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

export default CustomNumericInput;
