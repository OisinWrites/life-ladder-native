import React from 'react';
import { View, Pressable } from 'react-native';
import styles from '../styles/appStyles'
import keyboardStyles from '../styles/keyboardStyles';
import borrowingStyles from '../styles/borrowingStyles';
import CustomText from './CustomText';

const CustomKeyboard = ({ onKeyPress, onDelete, onClear, onSubmit, onClose, inputValue, onNext, updateCurrentRef}) => {
  const keys = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.' ];

  const rows = [
    keys.slice(0, 3),
    keys.slice(3, 6),
    keys.slice(6, 9),
    keys.slice(9, 11)
  ];

  return (
    <Pressable onPress={() => updateCurrentRef()}>
        <View style={keyboardStyles.keyboardWrapper}>
            <View style={[keyboardStyles.keyboardContainer, keyboardStyles.greyBorderTop]}>
                <View style={[borrowingStyles.salaryInputs, styles.marginTop, styles.widthLimit, styles.marginBottom,  keyboardStyles.greyBorder, keyboardStyles.largerInputValue, styles.borderRadiusSemi ]}>
                    <View>
                        <CustomText style={[
                            styles.bigblue, styles.h2, 
                            styles.bold, styles.paddingRight, 
                            keyboardStyles.defaultInput, keyboardStyles.largerInputFont]}>                            
                            {inputValue || ' '}
                        </CustomText>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.marginRight}>
                        {rows.slice(0, 3).map((row, index) => (
                            <View key={index} style={styles.row}>
                            {row.map((key) => (
                                <Pressable key={key} onPress={() => onKeyPress(key)}>
                                    <CustomText style={[ styles.textColorWhite, styles.centerText, styles.circleGrey, styles.largerCircle]}>{key}</CustomText>
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
                                    <CustomText style={[ styles.textColorWhite, styles.centerText, styles.circleGrey, styles.largerCircle]}>{key}</CustomText>
                                </Pressable>
                            ) : (
                                <View key={`empty-${index}`} style={keyboardStyles.keyEmpty} />
                            )
                            )}
                        </View>
                    </View>
                    <View style={styles.marginLeft}>
                        <Pressable style={[keyboardStyles.key, keyboardStyles.greyBorder, keyboardStyles.nextKey]} onPress={onNext}>
                            <CustomText style={keyboardStyles.keyText}>Next</CustomText>
                        </Pressable>
                        <Pressable style={[keyboardStyles.key, keyboardStyles.greyBorder, keyboardStyles.submitKey]} onPress={onSubmit}>
                            <CustomText style={keyboardStyles.keyText}>Submit</CustomText>
                        </Pressable>
                        <Pressable style={[keyboardStyles.key, keyboardStyles.greyBorder, keyboardStyles.deleteKey]} onPress={onDelete}>
                            <CustomText style={keyboardStyles.keyText}>Del</CustomText>
                        </Pressable>
                        <Pressable style={[keyboardStyles.key, keyboardStyles.greyBorder, keyboardStyles.clearKey]} onPress={onClear}>
                            <CustomText style={keyboardStyles.keyText}>Clear</CustomText>
                        </Pressable>
                        <Pressable style={[keyboardStyles.key, keyboardStyles.greyBorder, keyboardStyles.closeKey]} onPress={() => { onClear(); onClose(); }}>
                            <CustomText style={keyboardStyles.keyText}>Exit</CustomText>
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    </Pressable>
  );
};

export default CustomKeyboard;
