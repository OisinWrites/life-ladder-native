import { StyleSheet } from 'react-native';


const tableStyles = StyleSheet.create({
    table: {
        flexDirection: 'column',
        margin: 2,
    },
    tableHeader: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 6,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        alignItems: 'center',
    },
    cell: {
        flex: 1,
        margin: 1,
        padding: 2,
        alignContent: 'center',
    },
    headerCell: {
        fontWeight: 'bold',
        fontSize: 12,
    },
    smlWidth: {
        maxWidth: 30,
        fontSize: 12,
    },
    midWidth: {
        width: 90,
        fontSize: 12,
    },
    lrgWidth: {
        width: 120,    
        fontSize: 12,
    },
    iconWidth: {
        width: 50,
    },
    year: {
        width: 35,
    },
    balance: {
        minWidth: 80,
    },
    interest: {
        minWidth: 82,
    },
    repaid: {
        minWidth: 60,
    }
  });

  
export default tableStyles