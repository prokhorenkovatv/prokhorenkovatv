import React from 'react';
import { SCREENS } from 'navigation/constants';
import PostList from 'components/PostList';
import { selectBookedList } from 'state/posts';
import { useSelector } from 'react-redux';

const BookmarkedScreen = ({ navigation }) => {
  const openPostHandler = post => {
    navigation.navigate(SCREENS.POST,
      {
        postId: post.id,
        date: post.date,
        booked: post.booked
      }
    )
  };

  const allBookedPosts = useSelector(state => selectBookedList(state));

  return (
    <PostList
      data={allBookedPosts}
      onOpen={openPostHandler}
    />
  );
}

export default BookmarkedScreen;
