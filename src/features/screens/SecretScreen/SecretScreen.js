import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { useTheme } from 'react-native-paper';

const SecretScreen = ({ navigation }) => {
  const theme = useTheme();
  return (
    <View style={styles.center}>
      <Text style={
        [styles.text,
        { color: theme.colors.text }]}>
        Haha! It was me here all a long!
      </Text>
      <Image
        source={require('assets/cute.jpg')}
        style={styles.image}
      />
      <View
        style={styles.button}
      >
        <Button
          title='Go back'
          onPress={() => navigation.goBack()}
          color={theme.colors.primary}
        />
      </View>
    </View>
  );
}

export default SecretScreen;
const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 20
  },
  button: {
    marginTop: 20,
    width: 100
  },
  image: {
    width: '100%',
    height: 500,
    marginTop: 20
  }
});