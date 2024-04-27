import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    app: {
      textAlign: 'center',
    },
    appLogo: {
      height: 300, // Adjusted size, originally '40vmin'
      resizeMode: 'contain', // Ensures the image scales properly
    },
    appHeader: {
      backgroundColor: '#282c34',
      height: '50vh', // Example conversion for '50vh'
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 20, // Example conversion for 'calc(10px + 2vmin)'
      color: 'white',
    },
    subHeaderText: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 15, // Example conversion for 'calc(10px + 2vmin)'
        color: 'white',
    },
    appLink: {
      color: '#61dafb',
    },
});

export default styles