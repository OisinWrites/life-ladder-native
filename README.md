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
