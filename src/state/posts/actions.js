import { createAction } from 'redux-act';
import { compose } from 'utils';
// import * as api from 'api';
import { PostDB } from 'database/db';

export const savePosts = createAction(
  'Posts have been successfully saved',
);
export const removePostLocally = createAction('Post was removed');

export const loadPosts = () => dispatch =>
  PostDB.getPosts()
    .then(compose(dispatch, savePosts));

export const updateBookedStatus = post => dispatch =>
  PostDB
    .updateBookedStatus(post)
    .then(() => compose(dispatch, loadPosts)(post));

export const removePost = id => dispatch =>
  PostDB
    .removePost(id)
    .then(() => compose(dispatch, removePostLocally)(id));

export const createPost = post => dispatch =>
  PostDB.createPost(post)
    .then(() => compose(dispatch, loadPosts)(post))
