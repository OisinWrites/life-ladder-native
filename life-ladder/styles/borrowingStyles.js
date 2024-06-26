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
        fontSize: 25,
    },
    salaryInputs: {
        paddingVertical: 3,
        borderRadius: 20,
        borderColor: '#91b0c2',
        borderWidth: 2,
        backgroundColor: 'white',
        height: 40,
    },
    quoteToggle: {
        borderRadius: 20,
        backgroundColor: '#91b0c2',
        paddingTop: 5,
        marginBottom: 2,
        paddingHorizontal: 8,
    },
    manualInput: {
        backgroundColor: 'white',
        borderRadius: 25,
    },
});

export default borrowingStyles