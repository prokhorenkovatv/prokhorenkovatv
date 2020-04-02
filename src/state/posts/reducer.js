import { createReducer } from 'redux-act';
import { savePosts, removePostLocally } from './actions';
import { arrToHash } from 'utils';

const INITIAL_STATE = {
  allPosts: {},
  loading: true
};

export default createReducer(
  {
    [savePosts]: (state, posts) => ({
      ...state,
      allPosts: {
        ...state.allPosts,
        ...arrToHash(posts),

      },
      loading: false
    }),
    [removePostLocally]: (state, id) => {
      const allPosts = { ...state.allPosts };
      delete allPosts[id];
      return {
        ...state,
        allPosts
      }
    }
  },
  INITIAL_STATE
)