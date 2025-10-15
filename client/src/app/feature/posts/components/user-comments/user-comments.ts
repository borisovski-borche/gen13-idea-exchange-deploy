import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth-service';
import { CommentsList } from '../comments-list/comments-list';
import { PostsService } from '../../../../core/services/posts-service';

@Component({
  selector: 'app-user-comments',
  imports: [CommentsList],
  templateUrl: './user-comments.html',
  styleUrl: './user-comments.scss',
})
export class UserComments implements OnInit {
  private postsService = inject(PostsService);

  userComments = this.postsService.userComments;
  currentUser = inject(AuthService).currentUser;

  ngOnInit() {
    this.postsService.getUserComments();
  }
}
