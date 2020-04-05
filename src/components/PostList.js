import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import Post from 'features/Post';
import { isEmpty } from 'utils';
import { useTheme } from '@react-navigation/native';

const PostList = ({ data, onOpen }) => {
  const theme = useTheme();
  if (isEmpty(data)) {
    return (
      <View style={styles.wrapper}>
        <Text
          style={[styles.noItems,
          { color: theme.colors.text }]}
        >
          No posts yet
        </Text>
      </View>
    )
  }
  return (
    <View style={styles.wrapper}>
      <FlatList
        data={data}
        keyExtractor={post => post.id.toString()}
        renderItem={({ item }) => <Post post={item} onOpen={onOpen} />}
      />
    </View>)
}

export default PostList;

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
    flex: 1
  },
  noItems: {
    fontFamily: "OpenSans-Regular",
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 18
  }
});

