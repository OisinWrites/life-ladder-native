import { StyleSheet } from 'react-native';

const keyboardStyles = StyleSheet.create({
    keyboardWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    fullScreenModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    keyboardContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#282C34',
        padding: 10,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        },
    key: {
        width: 70,
        height: 70,
        marginBottom: 8,
        backgroundColor: '#03a1fc',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    greyBorder: {
        borderWidth: 3,
        borderColor: '#91B0C2',
    },
    greyBorderTop: {
        borderTopWidth: 3,
        borderColor: '#91B0C2',
    },
    deleteKey: {
        backgroundColor: '#ff6961',
    },
    clearKey: {
        backgroundColor: '#3DB7FD',
    },
    nextKey: {
        marginLeft: 6,
        marginTop: 10,
        backgroundColor: 'white',
    },
    submitKey: {
        backgroundColor: '#20A14A',
    },
    keyText: {
        color: '#ffffff',
        fontSize: 18,
    },
    keyEmpty: {
        width: '30%',
        padding: 20,
        marginLeft: 5,
    },
    closeKey: {
        backgroundColor: '#555',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    inputDisplay: {
        width: '90%',
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#03a1fc',
    },
    inputText: {
        color: '#03a1fc',
        fontSize: 24,
    },
    defaultInput: (fontSize) => ({
        fontSize,
        color:'#03a1fc',
        textAlign: 'right',
        paddingRight: 10,
    }),
    largerInputValue: {
        height: 70,
        width: 222,
    },
    largerInputFont: {
        fontSize: 30,
        textAlign: 'right',
        
        marginTop: 12,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    label: {
        fontSize: 16,
        fontFamily: 'Lato_400Regular',
        color: 'white',
    },
    leaf: {
        height: 70,
        width: 70,
        resizeMode: 'contain',
    },
});

export default keyboardStyles