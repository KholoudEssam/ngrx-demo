import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostListComponent } from './post-list/post-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppAngularMaterialModule } from 'src/app/app-angular-material.module';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { postReducer } from './state/posts.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PostEffects } from './state/posts.effects';

@NgModule({
  declarations: [PostCreateComponent, PostListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppAngularMaterialModule,
    RouterModule,
    StoreModule.forFeature('posts', postReducer),
    EffectsModule.forFeature([PostEffects]),
  ],
})
export class PostsModule {}
