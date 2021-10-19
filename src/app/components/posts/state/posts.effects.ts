import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';
import { PostsService } from 'src/app/services/posts.service';
import * as PostsActions from '../state/posts.actions';

@Injectable()
export class PostEffects {
  constructor(private action$: Actions, private postsService: PostsService) {}

  getPosts$ = createEffect(() => {
    return this.action$.pipe(
      ofType(PostsActions.getPosts),
      mergeMap((action) =>
        this.postsService.getPosts().pipe(
          map((posts) => PostsActions.getPostsSuccess({ posts })),
          catchError((err) => of(PostsActions.getPostsFail({ error: err })))
        )
      )
    );
  });

  addPost$ = createEffect(() => {
    return this.action$.pipe(
      ofType(PostsActions.addPost),
      mergeMap((action) =>
        this.postsService.addPost(action.post).pipe(
          map((post) => PostsActions.addPostSuccess({ post })),
          catchError((err) => of(PostsActions.addPostFail({ error: err })))
        )
      )
    );
  });

  getPost$ = createEffect(() => {
    return this.action$.pipe(
      ofType(PostsActions.getPost),
      mergeMap((action) =>
        this.postsService.getPost(action.id).pipe(
          map((post) => PostsActions.getPostSuccess({ post })),
          catchError((err) => of(PostsActions.getPostFail({ error: err })))
        )
      )
    );
  });

  editPost$ = createEffect(() => {
    return this.action$.pipe(
      ofType(PostsActions.editPost),
      mergeMap((action) =>
        this.postsService.updatePost(action.id, action.updatedPost).pipe(
          map((post) => PostsActions.editPostSuccess({ post })),
          catchError((err) => of(PostsActions.editPostFail({ error: err })))
        )
      )
    );
  });

  deletePost$ = createEffect(() => {
    return this.action$.pipe(
      ofType(PostsActions.deletePost),
      concatMap((action) =>
        this.postsService.deletePost(action.id).pipe(
          map(() => PostsActions.deletePostSuccess({ id: action.id })),
          catchError((err) => of(PostsActions.deletePostFail({ error: err })))
        )
      )
    );
  });
}
