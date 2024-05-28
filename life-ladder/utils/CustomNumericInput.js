import React, { useState, useRef, useImperativeHandle, forwardRef, useEffect } from 'react';
import { View, StyleSheet, TextInput, Modal, Pressable, ScrollView, StatusBar } from 'react-native';
import CustomKeyboard from './CustomKeyboard';
import { useGlobalStyles } from './GlobalStylesContext';
import keyboardStyles from '../styles/keyboardStyles';
import { useKeyboard } from '../utils/KeyboardContext';

const CustomNumericInput = React.forwardRef(({
    value,
    onChangeText,
    placeholder,
    style,
    scrollRef,
    onNext,
    label,
    onFocus,
    onBlur,
    onKeyboardVisibleChange,
    ...props
}, ref) => {
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
    const { defaultFontSize, placeholderOpacity } = useGlobalStyles();
    const inputRef = useRef(null);

    const handleToggleKeyboard = () => {
        const newVisibility = !isKeyboardVisible;
        setIsKeyboardVisible(newVisibility);
        if (onKeyboardVisibleChange) {
            onKeyboardVisibleChange(newVisibility);
        }
        
        if (newVisibility && onFocus) {
            onFocus(); // Trigger onFocus when keyboard becomes visible
        }

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

    useImperativeHandle(ref, () => ({
        focus: () => {
            handleToggleKeyboard(true);
        },
        handleToggleKeyboard,
    }));

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
        if (onKeyboardVisibleChange) {
            onKeyboardVisibleChange(false);
        }
    };

    const handleClose = () => {
        setIsKeyboardVisible(false);
        if (onKeyboardVisibleChange) {
            onKeyboardVisibleChange(false);
        }
    };

    const handleNext = () => {
        setIsKeyboardVisible(false);
        if (onNext) {
            onNext();
        }
    };

    useEffect(() => {
        // Hide the status bar when the custom keyboard is visible
        StatusBar.setHidden(isKeyboardVisible);
    }, [isKeyboardVisible]);

    return (
        <View style={keyboardStyles.container} ref={inputRef}>
            <Pressable onPress={handleToggleKeyboard}>
                <TextInput
                    ref={inputRef}
                    onFocus={onFocus}
                    style={[keyboardStyles.defaultInput(defaultFontSize), style]}
                    value={value}
                    placeholderTextColor={`rgba(3, 161, 252, ${placeholderOpacity})`}
                    placeholder={placeholder}
                    inputMode="numeric"
                    editable={false} // Disable default keyboard
                    {...props}
                />
            </Pressable>
            <Modal
                animationType="none"
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
                                onNext={handleNext}
                                inputValue={value}
                                label={label}
                            />
                        </Pressable>
                    </Pressable>
                </ScrollView>
            </Modal>
        </View>
    );
});

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
