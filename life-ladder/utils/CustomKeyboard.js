import React, { useState } from 'react';
import { View, Pressable, Image, Modal, Linking} from 'react-native';
import styles from '../styles/appStyles'
import keyboardStyles from '../styles/keyboardStyles';
import borrowingStyles from '../styles/borrowingStyles';
import CustomText from './CustomText';
import leaflifeladder from '../assets/images/leaflifeladder.png';
import { useKeyboard } from '../utils/KeyboardContext';

const CustomKeyboard = ({ onKeyPress, onDelete, onClear, onSubmit, onClose, inputValue, onNext, label }) => {
  const keys = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.' ];

  const rows = [
    keys.slice(0, 3),
    keys.slice(3, 6),
    keys.slice(6, 9),
    keys.slice(9, 11)
  ];

  const { isKeyboardVisible, setIsKeyboardVisible } = useKeyboard();
  const handleClose = () => {
    setIsKeyboardVisible(false);
  };
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = () => {
    const url = 'https://www.oisinbanville.com';
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log("Don't know how to open URI: " + url);
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };


  return (
        <View style={keyboardStyles.keyboardWrapper}>
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
                >
                <View style={keyboardStyles.fullScreenModal}>
                    
                    <Pressable onPress={handlePress}>
                        <CustomText>www.oisinbanville.com</CustomText>
                    </Pressable>
                    <Pressable
                    style={styles.closeButton}
                    onPress={() => setModalVisible(!modalVisible)}
                    >
                     <CustomText>X</CustomText>
                    </Pressable>
                    
                </View>
            </Modal>
            <View style={[keyboardStyles.keyboardContainer, keyboardStyles.greyBorderTop]}>

                <View>
                    <CustomText style={[keyboardStyles.label, styles.centerText]}>{label}</CustomText>
                    <View style={styles.row}>
                        <View style={[borrowingStyles.salaryInputs, styles.marginRight, styles.marginTop, styles.marginBottom,  keyboardStyles.greyBorder, keyboardStyles.largerInputValue, styles.borderRadiusSemi]}>
                            <View>
                                <CustomText style={[
                                    styles.bigblue, styles.h2, 
                                    styles.bold, styles.paddingRight, 
                                    keyboardStyles.defaultInput, keyboardStyles.largerInputFont]}>                            
                                    {inputValue || ' '}
                                </CustomText>
                            </View>
                        </View>
                        <Pressable style={[keyboardStyles.key, keyboardStyles.greyBorder, keyboardStyles.nextKey]} onPress={onNext}>
                            <CustomText style={[keyboardStyles.keyText, styles.bigblue]}>Next</CustomText>
                        </Pressable>
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
                                <Pressable
                                key={`empty-${index}`}
                                onPress={() => setModalVisible(true)}
                                >
                                    <Image
                                        source={leaflifeladder}
                                        style={keyboardStyles.leaf}
                                    />
                                </Pressable>
                            )
                            )}
                        </View>
                    </View>
                    <View style={styles.marginLeft}>
                        <Pressable style={[keyboardStyles.key, keyboardStyles.greyBorder, keyboardStyles.submitKey]} onPress={onSubmit}>
                            <CustomText style={keyboardStyles.keyText}>Submit</CustomText>
                        </Pressable>
                        <Pressable style={[keyboardStyles.key, keyboardStyles.greyBorder, keyboardStyles.deleteKey]} onPress={onDelete}>
                            <CustomText style={keyboardStyles.keyText}>Del</CustomText>
                        </Pressable>
                        <Pressable style={[keyboardStyles.key, keyboardStyles.greyBorder, keyboardStyles.clearKey]} onPress={onClear}>
                            <CustomText style={keyboardStyles.keyText}>Clear</CustomText>
                        </Pressable>
                        <Pressable style={[keyboardStyles.key, keyboardStyles.greyBorder, keyboardStyles.closeKey]} onPress={() => { onClose(); }}>
                            <CustomText style={keyboardStyles.keyText}>Exit</CustomText>
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
  );
};

export default CustomKeyboard;
