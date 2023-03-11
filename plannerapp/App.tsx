/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import StaticServer from 'react-native-static-server';

let server = new StaticServer(8069);

const WebHTML = require('./web/index.html');

async function App(): Promise<JSX.Element> {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  // Start the server
  server.start().then(url => {
    console.log('Serving at URL', url);
  });

  // Stop the server
  server.stop();

  // Check if native server running
  const isRunning = await server.isRunning();
  // isRunning - true/false
  console.log('{isRunning} :>> ', {isRunning});
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
        }}>
        <WebView
          style={{flex: 1}}
          originWhitelist={['*']}
          source={WebHTML}
          scalesPageToFit
          javaScriptEnabled
          domStorageEnabled={true}
          allowFileAccess={true}
          allowUniversalAccessFromFileURLs={true}
          onError={syntheticEvent => {
            const {nativeEvent} = syntheticEvent;
            console.log('WebView error: ', nativeEvent);
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
