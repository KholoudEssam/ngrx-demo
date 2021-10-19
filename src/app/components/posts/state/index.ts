import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostState } from './posts.reducer';

const getPostFeatureState = createFeatureSelector<PostState>('posts');

export const getAllPosts = createSelector(
  getPostFeatureState,
  (state) => state.posts
);

export const getSinglePost = createSelector(
  getPostFeatureState,
  (state) => state.currentPost
);

export const toggleSpinnerS = createSelector(
  getPostFeatureState,
  (state) => state.showSpinner
);

export const getCurrentUrl = createSelector(
  getPostFeatureState,
  (state) => state.currentUrl
);
