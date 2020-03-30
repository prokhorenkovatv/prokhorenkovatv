import React from 'react';
import { SCREENS } from 'navigation/constants';
import { DATA } from '../../../data';
import PostList from 'components/PostList';


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

  return (
    <PostList
      data={DATA}
      onOpen={openPostHandler}
    />
  );
}

export default MainScreen;
