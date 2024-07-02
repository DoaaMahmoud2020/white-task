import { Component, DestroyRef, effect, inject, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { IPost } from '@app/modules/post/models/post.model';
import { IUser } from '@app/modules/post/models/user.model';
import { finalize } from 'rxjs/internal/operators/finalize';
import { MatIconModule } from '@angular/material/icon';
import { PostService } from '@app/modules/post/services/post.service';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [MatCardModule, RouterModule, MatIconModule],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss',
})
export class PostCardComponent {
  post = input.required<IPost>();
  private _postService: PostService = inject(PostService);
  destroyRef: DestroyRef = inject(DestroyRef);
  isLoading!: boolean;
  user?: IUser;
  constructor() {
    effect(() => {
      if (this.post()) {
        this.getUserDetails();
      }
    });
  }
  getUserDetails() {
    this.isLoading = true;
    this._postService
      .getItemById(this.post().userId!, 'users')
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
