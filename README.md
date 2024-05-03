Setting up environment for React Native app

Local terminal, run command: npm install -g react-native-cli
Researched mobile app platform development and the features and limitations of Android Studio
and ios Xcode. Discovered that the open source platform Expo can achieve app development for both
android and ios while easily integrating with my VSCode suite. It is limited to its set of libraries for 
each platform, and where more robust functionality is required the respective android and ios 
platforms can achieve the more complex and specific, though necessitating that the app be built separately
for android and ios.

In vscode terminal: npm install -g expo-cli
: expo init "MyNewProject"

Helpful extensions
ESLint: Helps with JavaScript linting.
Prettier: Code formatter that supports JavaScript and React Native.
React Native Tools: Provides debugging tools, command palette commands, and more.
Expo Tools: This extension provides snippets and commands useful for developing with Expo.

To combine Prettier and Eslint
cl: npm install --save-dev eslint-config-prettier eslint-plugin-prettier

ESLint and Prettier: These will automatically format your code and highlight issues based on your 
configurations when you open and edit files in VSCode. Or run cl npx eslint 'your-file'.js
React Native Tools and Expo Tools: Access their features through the command palette 
(Ctrl+Shift+P) or by right-clicking in the editor for context-specific actions.


To create app
cl: npx create-expo-app MyNewProject

HTML & CSS
Neither HTML nor CSS, being web based languages, are supported in a React Native App
which must operate within ios or android. 
HTML elements are replaced by new terms which additionally are written in PascalCasing.
<div> = <View>
<p> = <Text>
<img> = <Image>
<input type="text"> = <TextInput>
<button> = <Button>
<a> = <Pressable>
<ul/ol/li> ~ <FlatList/SectionList>

Additional:
<ScrollView>: Allows content to be scrollable. It can scroll vertically or horizontally and can contain any type of component within it.
<SafeAreaView>: This component automatically adjusts its padding to respect the notches on iOS (like iPhone X and later) and also the status bar on Android, ensuring that content does not overlap with system-specific design elements.
<Modal>: Used for displaying content in a modal. You can toggle visibility and customize its appearance extensively.
<ActivityIndicator>: Provides a simple way to show a loading/spinner indicator.
<Switch>: A toggle switch component for showing a boolean input.
<Picker> (deprecated in the latest versions, now moved to @react-native-picker/picker): A dropdown list for selecting one of several options.

Adding FontAwesome5 icons

npm i --save @fortawesome/react-native-fontawesome @fortawesome/fontawesome-svg-core react-native-svg

npm i --save @fortawesome/free-solid-svg-icons
npm i --save @fortawesome/free-brands-svg-icons
npm i --save @fortawesome/free-regular-svg-icons

Deployment

Production for an app through playstore necessitates a aab file which expo will automatically build. To install an app directly, without channelling through a store, we need to specify to expo to create an apk file. Expo can simplify the production of ios and android builds, automating much of the native requirements for each.
Run from app dir not root
npx expo login
specify an apk buildType in eas file
eas build --platform android --profile apk
download build article from expo dev (link provided in terminal after commands)
from command prompt, navigate to apk file: adb install 'life-ladder-android'.apk
