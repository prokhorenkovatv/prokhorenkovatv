import { combineReducers } from 'redux';
import { postsReducer } from 'state/posts';

export default combineReducers({
  posts: postsReducer,
});