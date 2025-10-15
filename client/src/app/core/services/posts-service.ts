import { inject, Injectable, signal } from '@angular/core';
import {
  Comment,
  CreateCommentReq,
  CreateEditPostReq,
  LikeDislikeOutput,
  Post,
  PostDetails,
} from '../../feature/posts/post-model';
import { PostsApiService } from './posts-api-service';
import { NotificationsService } from './notifications-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private apiService = inject(PostsApiService);
  private notificationsService = inject(NotificationsService);
  private router = inject(Router);

  posts = signal<Post[]>([]);
  postDetails = signal<PostDetails>(null);
  userComments = signal<Comment[]>([]);
  userPosts = signal<Post[]>([]);

  getAllPosts() {
    this.apiService.fetchAllPosts().subscribe({
      next: (posts) => {
        this.posts.set(posts);
      },
      error: (err) => {
        console.log(err);
        this.notificationsService.showError(err.error.message);
      },
    });
  }

  getPostById(id: string) {
    this.apiService.fetchPostById(id).subscribe({
      next: (value) => {
        this.postDetails.set(value);
      },
      error: (err) => {
        console.log(err);
        this.router.navigate(['not-found']);
        this.notificationsService.showError(err.error.message);
      },
    });
  }

  getUserComments() {
    this.apiService.fetchUserComments().subscribe({
      next: (comments) => {
        this.userComments.set(comments);
      },
      error: (err) => {
        console.log(err);
        this.notificationsService.showError(err.error.message);
      },
    });
  }

  getUserPosts() {
    this.apiService.fetchUserPosts().subscribe({
      next: (posts) => {
        this.userPosts.set(posts);
      },
      error: (err) => {
        console.log(err);
        this.notificationsService.showError(err.error.message);
      },
    });
  }

  createPost(reqBody: CreateEditPostReq) {
    this.apiService.createPost(reqBody).subscribe({
      next: (post) => {
        this.notificationsService.showSuccess('Post created successfully!');
        this.router.navigate(['posts', post._id]);
      },
      error: (err) => {
        console.log(err);
        this.notificationsService.showError(err.error.message);
      },
    });
  }

  updatePost(id: string, reqBody: CreateEditPostReq) {
    this.apiService.updatePost(id, reqBody).subscribe({
      next: () => {
        this.notificationsService.showSuccess('Post updated successfully!');
        this.router.navigate(['posts', id]);
      },
      error: (err) => {
        console.log(err);
        this.notificationsService.showError(err.error.message);
      },
    });
  }

  deletePost(id: string) {
    this.apiService.deletePost(id).subscribe({
      next: () => {
        this.notificationsService.showSuccess('Post successfully removed!');
        //Refetch data approach
        // this.getUserPosts();
        //Only update UI approach
        this.userPosts.update((prevPosts) => prevPosts.filter((post) => post._id !== id));
      },
      error: (err) => {
        console.log(err);
        this.notificationsService.showError(err.error.message);
      },
    });
  }

  createComment(reqBody: CreateCommentReq) {
    this.apiService.createComment(reqBody).subscribe({
      next: () => {
        this.getPostById(reqBody.postId);
        this.notificationsService.showSuccess('Comment added!');
      },
      error: (err) => {
        console.log(err);
        this.notificationsService.showError(err.error.message);
      },
    });
  }

  likeDislikePostInList(data: LikeDislikeOutput) {
    this.apiService.likeDislikePost(data).subscribe({
      next: (updatedPost) => {
        this.posts.update((prevPosts) => {
          return prevPosts.map((post) => {
            if (post._id === updatedPost._id) {
              return { ...post, likes: updatedPost.likes, dislikes: updatedPost.dislikes };
            }
            return post;
          });
        });
      },
      error: (err) => {
        console.log(err);
        this.notificationsService.showError(err.error.message);
      },
    });
  }

  likeDislikePostInDetails(data: LikeDislikeOutput) {
    this.apiService.likeDislikePost(data).subscribe({
      next: (updatedPost) => {
        this.postDetails.update((prevDetails) => ({
          ...prevDetails,
          likes: updatedPost.likes,
          dislikes: updatedPost.dislikes,
        }));
      },
      error: (err) => {
        console.log(err);
        this.notificationsService.showError(err.error.message);
      },
    });
  }
}
