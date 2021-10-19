import { createReducer, on } from '@ngrx/store';
import { Post } from 'src/app/models/post.model';

import * as PostsActions from './posts.actions';

export interface PostState {
  posts: Post[];
  error: string;
  currentPost: Post;
  showSpinner: boolean;
  currentUrl: string;
}

const initState: PostState = {
  posts: [],
  error: '',
  currentPost: null,
  showSpinner: false,
  currentUrl: '/',
};

export const postReducer = createReducer(
  initState,
  on(PostsActions.getPosts, (state) => {
    return {
      ...state,
      showSpinner: true,
    };
  }),
  on(PostsActions.getPostsSuccess, (state, action) => {
    return {
      ...state,
      showSpinner: false,
      posts: action.posts,
    };
  }),
  on(PostsActions.getPostsFail, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(PostsActions.toggleSpinner, (state) => {
    return {
      ...state,
      showSpinner: !state.showSpinner,
    };
  }),
  on(PostsActions.addPostSuccess, (state, action): PostState => {
    const newPosts = [...state.posts];
    newPosts.push(action.post);
    return {
      ...state,
      posts: newPosts,
    };
  }),
  on(PostsActions.addPostFail, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(PostsActions.getPost, (state) => {
    return {
      ...state,
      showSpinner: true,
    };
  }),
  on(PostsActions.getPostSuccess, (state, action): PostState => {
    return {
      ...state,
      currentPost: action.post,
      showSpinner: false,
    };
  }),
  on(PostsActions.getPostFail, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(PostsActions.editPostSuccess, (state, action): PostState => {
    return {
      ...state,
      currentPost: action.post,
    };
  }),
  on(PostsActions.editPostFail, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(PostsActions.deletePost, (state): PostState => {
    return {
      ...state,
      showSpinner: true,
    };
  }),
  on(PostsActions.deletePostSuccess, (state, action): PostState => {
    const updatedPosts = state.posts.filter((p) => p._id != action.id);
    return {
      ...state,
      posts: updatedPosts,
      showSpinner: false,
    };
  }),
  on(PostsActions.deletePostFail, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  })
);
