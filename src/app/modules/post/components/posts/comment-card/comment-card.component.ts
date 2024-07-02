import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { IComment } from '@app/modules/post/models/comment.model';

@Component({
  selector: 'app-comment-card',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './comment-card.component.html',
  styleUrl: './comment-card.component.scss'
})
export class CommentCardComponent {
  comment = input.required<IComment>();
}
