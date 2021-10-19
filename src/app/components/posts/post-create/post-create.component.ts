import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Post } from '../../../models/post.model';
import { PostState } from '../state/posts.reducer';
import { mimeType } from './mimeType.validator';
import * as PostsActions from '../state/posts.actions';
import { getCurrentUrl, getSinglePost, toggleSpinnerS } from '../state';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit, OnDestroy {
  sub: Subscription;
  form: FormGroup;
  editMode: Boolean = false;
  loading$: Observable<boolean>;
  post$: Observable<Post>;
  postId: string;
  previewImage: any;

  constructor(
    private store: Store<PostState>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.sub = this.route.paramMap.subscribe((param) => {
      this.loading$ = this.store.select(toggleSpinnerS);
      if (param.has('id')) {
        this.editMode = true;
        this.postId = param.get('id');

        this.store.dispatch(PostsActions.getPost({ id: this.postId }));

        this.store.select(getSinglePost).subscribe((post) => {
          this.form.patchValue({
            title: post.title,
            content: post.content,
            imageUrl: post.imageUrl,
          });
        });
      } else {
        this.loading$ = this.store.select(toggleSpinnerS);
      }
    });
  }

  initForm() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(5)],
      }),
      content: new FormControl(null, { validators: [Validators.required] }),
      imageUrl: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType],
      }),
    });
  }

  onImageChange(e) {
    const file = e.target.files[0];
    this.form.patchValue({ imageUrl: file });
    this.form.get('imageUrl').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.previewImage = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onSubmitForm() {
    this.loading$ = this.store.select(toggleSpinnerS);

    const { title, content, imageUrl } = this.form.value;
    let postData = new FormData();

    postData.append('title', title);
    postData.append('content', content);

    if (typeof imageUrl === 'object') {
      postData.append('imageUrl', imageUrl);
    }

    if (this.editMode) {
      this.store.dispatch(
        PostsActions.editPost({ id: this.postId, updatedPost: postData })
      );
      this.store.select(getCurrentUrl).subscribe((url) => {
        this.router.navigate([url]);
      });
    } else {
      this.store.dispatch(PostsActions.addPost({ post: postData }));
      this.store.select(getCurrentUrl).subscribe((url) => {
        this.router.navigate([url]);
      });
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
