import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const AboutScreen = () => {
  return (
    <View style={styles.center}>
      <Text>This is the best app for your posts!</Text>
      <Text>Version <Text style={styles.version}>1.0.0</Text></Text>
    </View>
  );
}
const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  version: {
    fontFamily: 'OpenSans-Bold'
  }
});

export default AboutScreen;
