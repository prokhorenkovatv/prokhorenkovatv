import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Post from 'features/Post';

const PostList = ({ data, onOpen }) => {
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
  }
});

