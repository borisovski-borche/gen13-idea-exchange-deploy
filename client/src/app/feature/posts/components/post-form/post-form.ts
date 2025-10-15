import { Location } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostsService } from '../../../../core/services/posts-service';
import { Post } from '../../post-model';

@Component({
  selector: 'app-post-form',
  imports: [ReactiveFormsModule],
  templateUrl: './post-form.html',
  styleUrl: './post-form.scss',
})
export class PostForm {
  private location = inject(Location);
  private postsService = inject(PostsService);

  postForm = this.generateForm();

  editPostData = signal<Post | null>(window.history.state.post || null);

  ngOnInit() {
    if (this.editPostData()) this.updateFormValue(this.editPostData());
  }

  generateForm() {
    return new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40),
      ]),
      body: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(240),
      ]),
    });
  }

  updateFormValue(post: Post) {
    this.postForm.setValue({
      title: post.title,
      body: post.body,
    });
  }

  onFormSubmit() {
    this.postForm.markAllAsTouched();

    if (this.postForm.invalid) return;

    console.log('form submitted with value: ', this.postForm.value);

    if (this.editPostData()) {
      this.postsService.updatePost(this.editPostData()._id, {
        title: this.postForm.value.title,
        body: this.postForm.value.body,
      });
    } else {
      this.postsService.createPost({
        title: this.postForm.value.title,
        body: this.postForm.value.body,
      });
    }
  }

  goBack() {
    this.location.back();
  }
}
