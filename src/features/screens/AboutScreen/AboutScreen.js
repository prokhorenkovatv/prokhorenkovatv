import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useTheme } from 'react-native-paper';
import { LocalNotification } from 'services/LocalPushController';
import PushNotification from 'react-native-push-notification';

const AboutScreen = () => {
  const theme = useTheme();

  const handleSendNotification = () => LocalNotification();

  const handleCancelNotification = () =>
    PushNotification.cancelAllLocalNotifications();

  return (
    <View style={styles.center}>
      <Text style={{ color: theme.colors.text }}>
        This is the best app for your posts!
      </Text>
      <Text style={{ color: theme.colors.text }}>
        Version <Text style={styles.version}>1.0.0</Text>
      </Text>
      <Text style={{ color: theme.colors.text, marginTop: 20 }}>
        Push a button below
      </Text>
      <Text>to see something interesting</Text>
      <View style={{ margin: 10 }}>
        <View style={styles.button}>
          <Button
            title='Send notification'
            color={theme.colors.primary}
            onPress={handleSendNotification} />
        </View>
        <View>
          <Button
            title='Cancel notification'
            color={theme.colors.primary}
            onPress={handleCancelNotification} />
        </View>
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
    fontFamily: 'OpenSans-Bold',
  },
  info: {
    marginTop: 30
  },
  button: {
    marginBottom: 15
  }
});

export default AboutScreen;
