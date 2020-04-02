import { compose, hashToArr } from 'utils';

export const selectPostsList = compose(hashToArr, s => s.posts.allPosts);

export const selectBookedList = state =>
  hashToArr(state.posts.allPosts)
    .filter(p => p.booked);

export const selectPostById = (state, id) =>
  state.posts.allPosts[id];

export const selectBookedStatusById = (state, id) =>
  hashToArr(state.posts.allPosts)
    .filter(post => post.booked)
    .some(post => post.id === id);

export const selectLoading = state =>
  state.posts.loading;
