import { StyleSheet } from 'react-native';

const borrowingStyles = StyleSheet.create({
    slideSim: {
        backgroundColor: '#91b0c2',
        padding: 2,
        flexDirection: 'row',
        borderRadius: 20,
        width: 90,
    },
    slideButtons: {
        borderRadius: 20,
        paddingVertical: 3,
        justifyContent: 'space-evenly',
        width: '50%',
        alignContent: 'center',
    },
    larger: {
        fontSize: 16,
    },
    salaryInputs: {
        paddingVertical: 3,
        borderRadius: 20,
        borderColor: '#91b0c2',
        borderWidth: 2,
        marginBottom: 2,
        backgroundColor: 'white',
    },
    quoteToggle: {
        borderRadius: 20,
        backgroundColor: '#91b0c2',
        paddingTop: 5,
        marginTop: 10,
        width: '80%',
        marginBottom: 2,
        height: 33,
    },
    manualInput: {
        backgroundColor: 'white',
        borderRadius: 25,
    },
});

export default borrowingStyles