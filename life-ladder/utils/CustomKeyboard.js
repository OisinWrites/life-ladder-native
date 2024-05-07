import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import styles from '../styles/appStyles'
import keyboardStyles from '../styles/keyboardStyles';
import borrowingStyles from '../styles/borrowingStyles';
import CustomText from './CustomText';

const CustomKeyboard = ({ onKeyPress, onDelete, onClear, onSubmit, onClose, inputValue, }) => {
  const keys = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.' ];

  const rows = [
    keys.slice(0, 3),
    keys.slice(3, 6),
    keys.slice(6, 9),
    keys.slice(9, 11)
  ];

  return (
    <View style={keyboardStyles.keyboardWrapper}>
        <View style={[keyboardStyles.keyboardContainer]}>
            <View style={[borrowingStyles.salaryInputs, styles.marginTop, styles.widthLimit, styles.marginBottom ]}>
                <CustomText style={[styles.bigblue, styles.h2, 
                    styles.bold, styles.widthLimit, 
                    styles.textRight, styles.fontFamily, 
                    styles.paddingRight,
                    keyboardStyles.defaultInput]}>                            
                    {inputValue}
                </CustomText>
            </View>
            <View style={styles.row}>
                <View>
                    {rows.slice(0, 3).map((row, index) => (
                        <View key={index} style={styles.row}>
                        {row.map((key) => (
                            <Pressable key={key} onPress={() => onKeyPress(key)}>
                                <CustomText style={[ styles.textColorWhite, styles.bold, styles.centerText, styles.circleGrey]}>{key}</CustomText>
                            </Pressable>
                            ))}
                        </View>
                    ))}
                    <View style={[styles.row, styles.lastRow]}>
                        {['', '0', '.'].map((key, index) =>
                        key ? (
                            <Pressable
                            key={key}
                            onPress={() => onKeyPress(key)}
                            >
                                <CustomText style={[ styles.textColorWhite, styles.bold, styles.centerText, styles.circleGrey]}>{key}</CustomText>
                            </Pressable>
                        ) : (
                            <View key={`empty-${index}`} style={keyboardStyles.keyEmpty} />
                        )
                        )}
                    </View>
                </View>
                <View style={styles.marginLeft}>
                    <Pressable style={[keyboardStyles.key, keyboardStyles.submitKey]} onPress={onSubmit}>
                        <CustomText style={keyboardStyles.keyText}>Submit</CustomText>
                    </Pressable>
                    <Pressable style={[keyboardStyles.key, keyboardStyles.deleteKey]} onPress={onDelete}>
                        <CustomText style={keyboardStyles.keyText}>Del</CustomText>
                    </Pressable>
                    <Pressable style={[keyboardStyles.key, keyboardStyles.clearKey]} onPress={onClear}>
                        <CustomText style={keyboardStyles.keyText}>Clear</CustomText>
                    </Pressable>
                    <Pressable style={[keyboardStyles.key, keyboardStyles.closeKey]} onPress={() => { onClear(); onClose(); }}>
                        <CustomText style={keyboardStyles.keyText}>Exit</CustomText>
                    </Pressable>
                </View>
            </View>
        </View>
    </View>
  );
};

export default CustomKeyboard;
