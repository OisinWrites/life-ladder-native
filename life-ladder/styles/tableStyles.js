import { StyleSheet } from 'react-native';


const tableStyles = StyleSheet.create({
    table: {
        flexDirection: 'column',
        margin: 10,
    },
    tableHeader: {
        flexDirection: 'row',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    cell: {
        flex: 1,
        margin: 4,
        padding: 10,
    },
    headerCell: {
        fontWeight: 'bold',
    },
    smlWidth: {
        maxWidth: 60,
    },
    midWidth: {
        minWidth: 115,
    },
    lrgWidth: {
        minWidth: 120,    
    },
    iconWidth: {
        minWidth: 100,
    },
  });

  
export default tableStyles