import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        maxWidth: 400,
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    input: {
        height: 25,
        borderColor: '#f2f9fc',
        borderWidth: 1,
        padding: 5,
        backgroundColor: '#cde8f7',
        borderRadius: 10,
        width: 200,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 2,
    },
    center: {
        textAlign: 'center',
    },
    pressed: {
        opacity: 0.5,
        padding: 2,
    },
    rounded: {
        borderRadius: 10,
        paddingInline: 10,
    },
    margin: {
        marginHorizontal: 20,
        paddingVertical: 3,
    },
    textColorWhite: {
        color: 'white',
    },
    textColorGray: {
        color : 'gray',
    },
    button: {
        height: 25,
        alignContent: 'center',
    },  
});

export default styles