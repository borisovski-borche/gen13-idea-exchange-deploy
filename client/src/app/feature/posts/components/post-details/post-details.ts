import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../../../core/services/posts-service';
import { PostItem } from '../post-item/post-item';
import { CommentsList } from '../comments-list/comments-list';
import { CommentForm } from '../comment-form/comment-form';
import { LikeDislikeOutput } from '../../post-model';
import { AuthService } from '../../../../core/services/auth-service';

@Component({
  selector: 'app-post-details',
  imports: [PostItem, CommentsList, CommentForm],
  templateUrl: './post-details.html',
  styleUrl: './post-details.scss',
})
export class PostDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private postsService = inject(PostsService);
  currentUser = inject(AuthService).currentUser;

  postDetails = this.postsService.postDetails;

  ngOnInit(): void {
    const postId: string = this.route.snapshot.params.id;

    this.postsService.getPostById(postId);
  }

  onCommentSubmit(body: string) {
    this.postsService.createComment({ postId: this.postDetails()._id, body });
  }

  onLikeDislikePost(data: LikeDislikeOutput) {
    this.postsService.likeDislikePostInDetails(data);
  }
}
