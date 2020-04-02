import React, { useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, Image, Button, ScrollView, Alert
} from 'react-native';
import { THEME } from 'styles/theme';
import { useDispatch, useSelector } from 'react-redux';
import {
  removePost,
  updateBookedStatus,
  selectPostById,
  selectBookedStatusById
} from 'state/posts';
import { SCREENS } from 'navigation/constants';

const PostScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();

  const { postId } = route.params;

  const post = useSelector(state =>
    selectPostById(state, postId));

  const booked = useSelector(state =>
    selectBookedStatusById(state, postId));

  useEffect(() => {
    navigation.setParams({ booked })
  }, [booked])

  const toggleHandler = useCallback(() => {
    dispatch(updateBookedStatus(post))
  }, [dispatch, post])

  useEffect(() => {
    navigation.setParams({ toggleHandler })
  }, [toggleHandler]);

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
        {
          text: "Remove", style: 'destructive',
          onPress: async () => {
            await dispatch(removePost(postId))
            return navigation.navigate(SCREENS.MAIN)
          }
        }
      ],
      { cancelable: false }
    );
  };

  if (!post) {
    return null
  }
  return (
    <ScrollView>
      <Image
        style={styles.image}
        source={{ uri: post.img }}
      />
      <View style={styles.textWrap}>
        <Text style={styles.title}>{post.title}</Text>
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
