import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from '../core-constants';
import {
  Comment,
  CreateCommentReq,
  CreateEditPostReq,
  LikeDislikeOutput,
  Post,
  PostDetails,
} from '../../feature/posts/post-model';

@Injectable({
  providedIn: 'root',
})
export class PostsApiService {
  private http = inject(HttpClient);

  fetchAllPosts() {
    return this.http.get<Post[]>(`${API_URL}/posts`);
  }

  fetchPostById(id: string) {
    return this.http.get<PostDetails>(`${API_URL}/posts/${id}`);
  }

  createPost(reqBody: CreateEditPostReq) {
    return this.http.post<Post>(`${API_URL}/posts`, reqBody);
  }

  createComment(reqBody: CreateCommentReq) {
    return this.http.post(`${API_URL}/comments`, reqBody);
  }

  likeDislikePost(data: LikeDislikeOutput) {
    return this.http.patch<Post>(`${API_URL}/posts/${data.postId}/${data.type}`, null);
  }

  fetchUserComments() {
    return this.http.get<Comment[]>(`${API_URL}/comments/user`);
  }

  fetchUserPosts() {
    return this.http.get<Post[]>(`${API_URL}/posts/user`);
  }

  updatePost(id: string, reqBody: CreateEditPostReq) {
    return this.http.patch(`${API_URL}/posts/${id}`, reqBody);
  }

  deletePost(id: string) {
    return this.http.delete(`${API_URL}/posts/${id}`);
  }
}
