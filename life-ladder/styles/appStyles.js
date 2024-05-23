import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  fullScreen: {
    height: height,
    width: '100%',
  },
  appLogo: {
    height: 300,
    resizeMode: 'contain',
  },
  logoHeader: {
      height: 200,
      width: 262,
      marginTop: 45,
  },
  appHeader: {
    backgroundColor: '#282c34',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
  subHeaderText: {
    marginTop: 180,
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
    padding: 5,
    margin: 5,
    maxWidth: 600,
  },
  header: {
    fontSize: 22,
  },
  latoFont: {
    fontFamily: 'Lato_400Regular',
  },
  input: {
    height: 25,
    borderColor: '#f2f9fc',
    borderWidth: 1,
    padding: 5,
    backgroundColor: '#cde8f7',
    borderRadius: 20,
    width: 200,
  },
  borderRadiusSemi: {
    borderRadius: 100,
  },  
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  fixedRowHeight: {
    height: 40,
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
    borderRadius: 20,
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
  completed: {
    color: '#03a1fc',
  },
  marginBottom: {
    marginBottom: 15,
  },
  widthLimit: {
    width: 155,
  },
  widthLimitMid: {
    width: 40,
  },
  widthLimitSmall: {
    width: 20,
  },
  widthLimitLonger: {
    width: 230,
  },
  marginRight: {
    marginRight: 8,
  },
  marginLeft: {
    marginLeft: 8,
  },
  marginLeftLarger: {
    marginLeft: 15,
  },
  sendRight: {
    justifyContent: 'right',
  },
  right: {
    justifyContent: 'flex-end',
  },
  defaultPlaceholderOpacity: {
    opacity: 0.8,
  },
  h2: {
    fontSize: 23,
  },
  bigblue: {
    color:'#03a1fc',
  },
  grey: {
    color: '#91B0C2',
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
  marginHorizontal: {
    marginHorizontal: 10,
  },
  marginTop: {
    marginTop: 10,
  },
  circleGrey: {
    alignContent: 'center',
    height: 38,
    width: 38,
    backgroundColor: '#91b0c2',
    borderRadius: 100,
    marginLeft: 6,
    fontSize: 15,
  },
  largerCircle: {
    height: 70,
    width: 70,
    fontSize: 60,
    marginBottom: 6,
    marginLeft: 6,
  },
  circleSelected: {
    textAlign: 'center',
    height: 38,
    width: 38,
    borderColor:  '#91b0c2',
    borderWidth: 3,
    borderRadius: 100,
    marginLeft: 6,
    color: '#03a1fc',
    fontSize: 15,
  },
  lineHeight: {
    lineHeight: 35,
  },
  justifyCenter: {
    justifyContent: 'space-between',
    justifyContent: 'flex-end',
  },
  paddingRight: {
    paddingRight: 10,
  },
  paddingLeft: {
    paddingLeft: 20,
  },
  larger: {
    fontSize: 40,
  },
  lptBox: {
    width: 275,
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 50,
    overflow: 'hidden',
    height: 40,
    marginVertical: 3,
  },
  picker: {
    top: -7,
    width: '100%',
    color: '#333',
  },
  pickerItem: {
    height: 50,
    color: '#666',
  },
  wheelPickerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  wheelPicker: {
    width: 200,
    height: 150
  },
  remortgageContainer: {
    marginVertical: 10,
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5
  },
  remortgageIcon: {
    height: 30,
    width: 30,
  },
  remortgageIconParent: {
    height: 40,
    width: 40,
    margin: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bigBlueBackground: {
    backgroundColor: '#03a1fc',
    borderRadius: 50,
  },
  labelContainer: {
    flexDirection: 'column',
  },
  warning: {
    color: '#ff6961',
  },
});

export default styles