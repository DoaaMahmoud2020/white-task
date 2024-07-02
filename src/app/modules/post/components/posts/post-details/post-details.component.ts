import { NgOptimizedImage } from '@angular/common';
import { Component, DestroyRef, effect, inject, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { IComment } from '@app/modules/post/models/comment.model';
import { IPost } from '@app/modules/post/models/post.model';
import { IUser } from '@app/modules/post/models/user.model';
import { SpinnerLoadingComponent } from '@app/shared/components/spinner-loading/spinner-loading.component';
import { finalize } from 'rxjs/internal/operators/finalize';
import { CommentCardComponent } from '../comment-card/comment-card.component';
import { NotFoundDataComponent } from '@app/shared/components/not-found-data/not-found-data.component';
import { PostService } from '@app/modules/post/services/post.service';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [
    MatCardModule,
    RouterLink,
    MatIconModule,
    SpinnerLoadingComponent,
    NgOptimizedImage,
    CommentCardComponent,
    NotFoundDataComponent,
  ],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.scss',
})
export class PostDetailsComponent {
  id = input.required<number>();
  private _postService: PostService = inject(PostService);
  destroyRef: DestroyRef = inject(DestroyRef);
  isLoading!: boolean;
  post: IPost = {};
  user?: IUser;
  comments: IComment[] = [];
  constructor() {
    effect(() => {
      if (this.id()) {
        this.getPostDetails();
      }
    });
  }
  getPostDetails() {
    this.isLoading = true;
    this._postService
      .getItemById(this.id(), 'posts')
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: (response: IPost) => {
          this.onSuccess(response);
        },
        error: (error: Error) => {},
      });
  }
  onSuccess(response: IPost) {
    this.post = response;
    this.getUserDetails();
    this.getAllComments();
  }
  getAllComments() {
    this.isLoading = true;
    this._postService
      .getAllCommentsByPostId(this.id(), 'comments')
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: (response: IComment[]) => {
          this.comments = response;
        },
        error: (error: Error) => {},
      });
  }
  getUserDetails() {
    this.isLoading = true;
    this._postService
      .getItemById(this.post.userId!, 'users')
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: (response: IUser) => {
          this.user = response;
        },
        error: (error: Error) => {},
      });
  }
}
