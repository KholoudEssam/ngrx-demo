import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Post } from '../../../models/post.model';
import { getIsAuth } from '../../auth/state';
import { getAllPosts, toggleSpinnerS } from '../state';
import * as PostsActions from '../state/posts.actions';
import { PostState } from '../state/posts.reducer';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  loading$: Observable<boolean>;
  postsTest$: Observable<Post[]>;

  currentUserId: string;

  currentPage: number;
  postsPerPage: number;
  postsLength: number;
  pageSizeOptions = [2, 4, 6, 10];

  posts$: Observable<Post[]>;

  private postSub: Subscription;
  private authSub: Subscription;
  isAuth$: Observable<boolean>;

  constructor(private store: Store<PostState>) {
    this.currentPage = 1;
    this.postsPerPage = +localStorage.getItem('postsPerPage') || 2;
    this.currentUserId = localStorage.getItem('userId');
  }

  ngOnInit(): void {
    this.loading$ = this.store.select(toggleSpinnerS);
    this.store.dispatch(PostsActions.getPosts());
    this.posts$ = this.store.select(getAllPosts);

    // this.postSub = this.postsService
    //   .getPosts(this.postsPerPage, this.currentPage)
    //   .subscribe(({ posts, postsCount }) => {
    //     this.posts = posts;
    //     this.postsLength = postsCount;
    //     this.loading = false;
    //     console.log(posts);
    //   });
    this.isAuth$ = this.store.select(getIsAuth);
  }

  onPageChange(page: PageEvent) {
    localStorage.setItem('postsPerPage', page.pageSize.toString());
    this.currentPage = page.pageIndex + 1;
    this.postsPerPage = page.pageSize;
    // this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }

  deletePost(id: string) {
    this.store.dispatch(PostsActions.deletePost({ id }));
    this.loading$ = this.store.select(toggleSpinnerS);
  }
  toggleSpinner() {
    this.store.dispatch(PostsActions.toggleSpinner());
  }

  // ngOnDestroy() {
  //   this.postSub.unsubscribe();
  //   this.authSub.unsubscribe();
  // }
}
