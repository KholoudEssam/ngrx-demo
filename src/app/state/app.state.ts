import { AuthState } from '../components/auth/state/auth.reducer';
import { PostState } from '../components/posts/state/posts.reducer';

export interface State {
  posts: PostState;
  auth: AuthState;
}
