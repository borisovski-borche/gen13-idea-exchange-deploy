import { Component, computed, input, output } from '@angular/core';
import { LikeDislikeOutput, Post, PostActionOutput, PostDetails } from '../../post-model';
import { DatePipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { User } from '../../../auth/auth-model';

@Component({
  selector: 'app-post-item',
  imports: [DatePipe, RouterLink, NgClass],
  templateUrl: './post-item.html',
  styleUrl: './post-item.scss',
})
export class PostItem {
  post = input.required<Post | PostDetails>();
  currentUser = input<User>(null);
  canEdit = input(false);

  postActionOutput = output<PostActionOutput>();
  likeDislikeOutput = output<LikeDislikeOutput>();

  canLikeDislike = computed(() => {
    return this.currentUser()._id !== this.post().author._id;
  });

  postLikeStatus = computed(() => {
    console.log('the computd has run because post has changed');
    const isPostLiked = this.post().likes.some((userId) => userId === this.currentUser()._id);
    const isPostDisliked = this.post().dislikes.some((userId) => userId === this.currentUser()._id);

    return {
      liked: isPostLiked,
      disliked: isPostDisliked,
    };
  });

  onLikeDislikeClick(type: 'like' | 'dislike') {
    this.likeDislikeOutput.emit({ type, postId: this.post()._id });
  }

  onPostActionClick(action: 'edit' | 'delete') {
    this.postActionOutput.emit({ action, post: this.post() as Post });
  }
}
