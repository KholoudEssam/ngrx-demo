import { createAction, props } from '@ngrx/store';
import { Post } from 'src/app/models/post.model';

export const getPosts = createAction('[Post] Get');
export const getPostsSuccess = createAction(
  '[Post] Get Success',
  props<{ posts: Post[] }>()
);
export const getPostsFail = createAction(
  '[Post] Get Fail',
  props<{ error: string }>()
);

export const toggleSpinner = createAction('[Spinner] toggle');

export const addPost = createAction('[Post] Add', props<{ post: FormData }>());
export const addPostSuccess = createAction(
  '[Post] Add Success',
  props<{ post: Post }>()
);
export const addPostFail = createAction(
  '[Post] Add Fail',
  props<{ error: string }>()
);

export const getPost = createAction('[Post] GetOne', props<{ id: string }>());
export const getPostSuccess = createAction(
  '[Post] GetOne Success',
  props<{ post: Post }>()
);
export const getPostFail = createAction(
  '[Post] GetOne Fail',
  props<{ error: string }>()
);

export const editPost = createAction(
  '[Post] EditOne',
  props<{ id: string; updatedPost: FormData }>()
);
export const editPostSuccess = createAction(
  '[Post] EditOne Success',
  props<{ post: Post }>()
);
export const editPostFail = createAction(
  '[Post] EditOne Fail',
  props<{ error: string }>()
);

export const deletePost = createAction(
  '[Post] DeleteOne',
  props<{ id: string }>()
);
export const deletePostSuccess = createAction(
  '[Post] DeleteOne Success',
  props<{ id: string }>()
);
export const deletePostFail = createAction(
  '[Post] DeleteOne Fail',
  props<{ error: string }>()
);
