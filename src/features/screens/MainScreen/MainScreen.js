import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { SCREENS } from 'navigation/constants';
import PostList from 'components/PostList';
import { loadPosts, selectPostsList, selectLoading } from 'state/posts';
import { THEME } from 'styles/theme';

const MainScreen = ({ navigation }) => {
  const openPostHandler = post => {
    navigation.navigate(SCREENS.POST,
      {
        postId: post.id,
        date: post.date,
        booked: post.booked
      }
    )
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPosts())
  }, [dispatch]);

  const allPosts = useSelector(state => selectPostsList(state));
  const loading = useSelector(state => selectLoading(state));

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={THEME.MAIN_COLOR} />
      </View>
    )
  }
  return (
    <PostList
      data={allPosts}
      onOpen={openPostHandler}
    />
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
