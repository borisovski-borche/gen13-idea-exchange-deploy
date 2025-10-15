import { Component, inject, OnInit } from '@angular/core';
import { PostsService } from '../../../../core/services/posts-service';
import { PostItem } from '../post-item/post-item';
import { LikeDislikeOutput } from '../../post-model';
import { AuthService } from '../../../../core/services/auth-service';

@Component({
  selector: 'app-posts-list',
  imports: [PostItem],
  templateUrl: './posts-list.html',
  styleUrl: './posts-list.scss',
})
export class PostsList implements OnInit {
  private postsService = inject(PostsService);
  currentUser = inject(AuthService).currentUser;

  posts = this.postsService.posts;

  ngOnInit() {
    this.postsService.getAllPosts();
  }

  onLikeDislike(data: LikeDislikeOutput) {
    console.log('this is in the list parent', data);
    this.postsService.likeDislikePostInList(data);
  }
}
