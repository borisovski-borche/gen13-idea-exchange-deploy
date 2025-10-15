import { Component, input } from '@angular/core';
import { Comment } from '../../post-model';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-comments-list',
  imports: [DatePipe, RouterLink],
  templateUrl: './comments-list.html',
  styleUrl: './comments-list.scss',
})
export class CommentsList {
  showPostLink = input(false);
  comments = input<Comment[]>([]);
}
