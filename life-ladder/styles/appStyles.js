import { StyleSheet } from 'react-native';

const appStyles = StyleSheet.create({
    app: {
      textAlign: 'center',
    },
    appLogo: {
      height: 300, // Adjusted size, originally '40vmin'
      resizeMode: 'contain', // Ensures the image scales properly
    },
    logoHeader: {
        height: 200,
        width: 262,
        marginTop: '45vh',
        transform: 'translate(0%, -50%)',
    },
    appHeader: {
      backgroundColor: '#282c34',
      height: '100vh', // Example conversion for '50vh'
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 20, // Example conversion for 'calc(10px + 2vmin)'
      color: 'white',
    },
    subHeaderText: {
        fontSize: 15, // Example conversion for 'calc(10px + 2vmin)'
        marginBottom: 40,
    },
    appLink: {
      color: '#61dafb',
    },
    center: {
        alignItems: 'center',
    },
    section: {
        height: '100vh',
        width: '90vw',
    },
    horizontalRule: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginVertical: 20, // Adds spacing above and below the line
    }
});

export default appStyles