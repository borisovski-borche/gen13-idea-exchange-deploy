import { Component, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-comment-form',
  imports: [ReactiveFormsModule],
  templateUrl: './comment-form.html',
  styleUrl: './comment-form.scss',
})
export class CommentForm {
  submitOutput = output<string>();

  commentForm = new FormGroup({
    body: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(140),
    ]),
  });

  onFormSubmit() {
    if (this.commentForm.invalid) return;

    console.log('comment submitted');

    this.submitOutput.emit(this.commentForm.value.body);

    this.commentForm.reset();
  }
}
