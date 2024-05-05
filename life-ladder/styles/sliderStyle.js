import { StyleSheet } from 'react-native';


const sliderStyle = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    toggleContainer: {
      flexDirection: 'row',
      width: 90,
      height: 40,
      borderRadius: 20,
      borderColor: '#91b0c2',
      borderWidth: 2,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      backgroundColor: '#91b0c2',
    },
    slider: {
      position: 'absolute',
      width: 45,
      height: '100%',
      backgroundColor: 'white',
      borderRadius: 20,
      borderWidth: 1,
      borderColor: '#91b0c2',
    },
    toggleOption: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    activeText: {
      color: '#03a1fc',
      fontWeight: 'bold',
      fontSize: 20,
    },
    inactiveText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 18,
    },
  });

  
export default sliderStyle