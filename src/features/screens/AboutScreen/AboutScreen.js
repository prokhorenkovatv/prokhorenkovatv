import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useTheme } from 'react-native-paper';
import { LocalNotification } from 'services/LocalPushController';

const AboutScreen = () => {
  const theme = useTheme();
  const handleButtonPress = () => {
    LocalNotification()
  }
  return (
    <View style={styles.center}>
      <Text style={{ color: theme.colors.text }}>This is the best app for your posts!</Text>
      <Text style={{ color: theme.colors.text }}>Version <Text style={styles.version}>1.0.0</Text></Text>
      <Text style={{ color: theme.colors.text, marginTop: 20 }}>And also, push a button below</Text>
      <Text>to see something interesting</Text>
      <View style={{ marginTop: 20 }}>
        <Button
          title={'Curious?'}
          color={theme.colors.primary}
          onPress={handleButtonPress} />
      </View>
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
  },
  info: {
    marginTop: 30
  }
});

export default AboutScreen;
