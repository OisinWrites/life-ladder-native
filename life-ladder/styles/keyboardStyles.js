import { StyleSheet } from 'react-native';

const keyboardStyles = StyleSheet.create({
    keyboardWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        padding: 10,
    },
    keyboardContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: 10,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        },
    key: {
        width: 80,
        padding: 4,
        marginBottom: 12,
        backgroundColor: '#03a1fc',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteKey: {
        backgroundColor: '#ff6961',
    },
    clearKey: {
        backgroundColor: '#f4a261',
    },
    submitKey: {
        backgroundColor: '#4caf50',
    },
    keyText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
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
        backgroundColor: 'rgba(0,0,0,0.5)',
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
        fontWeight: 'bold',
    },
    defaultInput: (fontSize) => ({
        fontSize,
        color:'#03a1fc',
        fontFamily: 'Lato-Regular',
        textAlign: 'right',
        paddingRight: 10,
    }),
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
});

export default keyboardStyles