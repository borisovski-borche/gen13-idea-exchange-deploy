import { Component, effect, ElementRef, inject, OnInit, viewChild } from '@angular/core';
import { PostsService } from '../../../../core/services/posts-service';
import { AuthService } from '../../../../core/services/auth-service';
import { PostItem } from '../post-item/post-item';
import { PostActionOutput } from '../../post-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-posts',
  imports: [PostItem],
  templateUrl: './user-posts.html',
  styleUrl: './user-posts.scss',
})
export class UserPosts implements OnInit {
  private postsService = inject(PostsService);
  private router = inject(Router);

  currentUser = inject(AuthService).currentUser;

  userPosts = this.postsService.userPosts;

  deleteDialog = viewChild<ElementRef<HTMLDialogElement>>('deleteDialog');

  deletePostId: string = '';

  ngOnInit(): void {
    this.postsService.getUserPosts();
  }

  onPostAction(value: PostActionOutput) {
    if (value.action === 'delete') {
      this.deletePostId = value.post._id;
      this.deleteDialog().nativeElement.showModal();
    }

    if (value.action === 'edit') {
      //Edit post flow
      this.router.navigate(['posts', 'edit'], {
        state: {
          post: value.post,
        },
      });
    }
  }

  onModalClose() {
    this.deleteDialog().nativeElement.close();
  }

  onConfirmDeleteClick() {
    //Call delete endpoint
    this.postsService.deletePost(this.deletePostId);
    this.deleteDialog().nativeElement.close();
    this.deletePostId = '';
  }
}
