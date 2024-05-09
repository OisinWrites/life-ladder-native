import React, { useState, useRef } from 'react';
import { View, StyleSheet, TextInput, Modal, Pressable, ScrollView } from 'react-native';
import CustomKeyboard from './CustomKeyboard';
import { useGlobalStyles } from './GlobalStylesContext';
import keyboardStyles from '../styles/keyboardStyles';

const CustomNumericInput = ({ value, onChangeText, placeholder, style, scrollRef, ...props }) => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const { defaultFontSize, placeholderOpacity } = useGlobalStyles();
  const inputRef = useRef(null);

  const handleToggleKeyboard = () => {
    setIsKeyboardVisible(!isKeyboardVisible);
    
    if (scrollRef && scrollRef.current && inputRef.current) {
      inputRef.current.measureLayout(
        scrollRef.current,
        (left, top) => {
          scrollRef.current.scrollTo({ y: top - 40, animated: true });
        },
        (error) => {
          console.log(error);
        }
      );
    }
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
    <View style={keyboardStyles.container} ref={inputRef}>
      <Pressable onPress={handleToggleKeyboard}>
        <TextInput
          {...props}
          style={[keyboardStyles.defaultInput(defaultFontSize), style]}
          value={value}
          placeholderTextColor={`rgba(3, 161, 252, ${placeholderOpacity})`}
          placeholder={placeholder}
          inputMode="numeric"
          editable ={false} // Disable default keyboard
        />
      </Pressable>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isKeyboardVisible}
        onRequestClose={handleClose}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <Pressable style={styles.modalBackground} onPress={handleClose}>
            <Pressable activeOpacity={1} style={styles.modalContainer}>
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
        </ScrollView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    justifyContent: 'flex-end',
  },
});

export default CustomNumericInput;
