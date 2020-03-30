import React from 'react';
import { SCREENS } from 'navigation/constants';
import { DATA } from '../../../data';
import PostList from 'components/PostList';

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

  return (
    <PostList
      data={DATA.filter(post => post.booked)}
      onOpen={openPostHandler}
    />
  );
}

export default BookmarkedScreen;
