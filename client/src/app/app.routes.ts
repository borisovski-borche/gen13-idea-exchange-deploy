import { Routes } from '@angular/router';
import { Home } from './feature/home/home';
import { Login } from './feature/auth/components/login/login';
import { Register } from './feature/auth/components/register/register';
import { PostsList } from './feature/posts/components/posts-list/posts-list';
import { PostForm } from './feature/posts/components/post-form/post-form';
import { NotFound } from './core/components/not-found/not-found';
import { UserComments } from './feature/posts/components/user-comments/user-comments';
import { PostDetails } from './feature/posts/components/post-details/post-details';
import { authGuard, loginGuard } from './core/guards';
import { UserPosts } from './feature/posts/components/user-posts/user-posts';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'login',
    component: Login,
    canActivate: [loginGuard],
  },
  {
    path: 'register',
    component: Register,
    canActivate: [loginGuard],
  },
  {
    path: 'posts',
    component: PostsList,
    canActivate: [authGuard],
  },
  {
    path: 'user/posts',
    component: UserPosts,
    canActivate: [authGuard],
  },
  {
    path: 'user/comments',
    component: UserComments,
    canActivate: [authGuard],
  },
  {
    path: 'posts/create',
    component: PostForm,
    canActivate: [authGuard],
  },
  {
    path: 'posts/edit',
    component: PostForm,
    canActivate: [authGuard],
  },
  {
    path: 'posts/:id',
    component: PostDetails,
    canActivate: [authGuard],
  },
  {
    path: '**',
    component: NotFound,
  },
];
