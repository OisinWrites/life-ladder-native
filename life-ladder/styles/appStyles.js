import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
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
    fullHeight: {
      height: '70%',
    },
    appHeader: {
      backgroundColor: '#282c34',
      width: '100%',
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
        color: 'white',
    },
    appLink: {
      color: '#61dafb',
    },
    center: {
      alignItems: 'center',
    },
    horizontalRule: {
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      margin: 4,
    },
    container: {
      flex: 1,
      padding: 10,
      maxWidth: 600,
    },
    header: {
      fontSize: 22,
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
    centerText: {
      textAlign: 'center',
    },
    textRight: {
      textAlign: 'right',
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
      color: 'gray',
    },
    textColorGreen: {
      color: '#1FA149',
    },
    button: {
      height: 25,
      alignContent: 'center',
    },
    bold: {
      fontWeight: 'bold',
    },
    completed: {
      color: '#03a1fc',
    },
    marginBottom: {
      marginBottom: 15,
    },
    widthLimit: {
      width: 190,
    },
    marginRight: {
      marginRight: 8,
    },
    marginLeft: {
      marginLeft: 8,
    },
    sendRight: {
      justifyContent: 'right',
    },
    defaultFontSize: {
      fontSize: 30,
    },
    defaultPlaceholderOpacity: {
      opacity: 0.8,
    },
    h2: {
      fontSize: 20,
    },
    bigblue: {
      color:'#03a1fc',
    },
    widthFull: {
      width: '100%',
    },
    marginBottomTen: {
      marginBottom: 10,
    },
    marginVertical: {
      marginTop: 8,
      marginBottom: 8,
    },
    marginTop: {
      marginTop: 10,
    },
    circleGrey: {
      alignContent: 'center',
      height: 40,
      width: 40,
      backgroundColor: '#91b0c2',
      borderRadius: '100%',
      marginLeft: 6,
      fontSize: 15,
    },
    circleSelected: {
      alignContent: 'center',
      height: 40,
      width: 40,
      borderColor:  '#91b0c2',
      borderWidth: 3,
      borderRadius: '100%',
      marginLeft: 6,
      color: '#03a1fc',
      fontSize: 15,
    },
    justifyCenter: {
      justifyContent: 'flex-end',
      justifyContent: 'space-between',
    },
});

export default styles