import React, { useEffect } from 'react';
import {
  View, Text, StyleSheet, Image, Button, ScrollView, Alert
} from 'react-native';
import { DATA } from '../../../data';
import { THEME } from 'styles/theme';


const PostScreen = ({ route }) => {
  const post = DATA.find(p => p.id === route.params.postId);

  const removeHandler = () => {
    Alert.alert(
      "Remove post",
      "Are you sure?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Remove", style: 'destructive', onPress: () => { } }
      ],
      { cancelable: false }
    );
  }
  return (
    <ScrollView>
      <Image
        style={styles.image}
        source={{ uri: post.img }}
      />
      <View style={styles.textWrap}>
        <Text style={styles.title}>{post.text}</Text>
      </View>
      <Button
        title="Delete"
        color={THEME.DANGER_COLOR}
        onPress={removeHandler}
      />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
  },
  textWrap: {
    padding: 10
  },
  title: {
    fontFamily: 'OpenSans-Regular'
  }
});

export default PostScreen;
