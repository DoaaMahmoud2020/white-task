import { Component, DestroyRef, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { IPost } from '../../models/post.model';
import { PostCardComponent } from './post-card/post-card.component';
import { SpinnerLoadingComponent } from '@app/shared/components/spinner-loading/spinner-loading.component';
import { NotFoundDataComponent } from '@app/shared/components/not-found-data/not-found-data.component';
import { HttpService } from '@app/core/services/http.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs/internal/operators/finalize';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    MatCardModule,
    PostCardComponent,
    SpinnerLoadingComponent,
    NotFoundDataComponent,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  providers: [HttpService],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent {
  isLoading?: boolean;
  postsList: IPost[] = [];
  filteredPosts: IPost[] = [];
  private _postService: PostService = inject(PostService);
  destroyRef: DestroyRef = inject(DestroyRef);
  searchControl: FormControl<string | null> = new FormControl('');

  ngOnInit(): void {
    this.getAllPosts();
    this.getAllPostsWithFilter();
  }
  getAllPosts() {
    this.isLoading = true;
    this._postService
      .getAll({}, 'posts')
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: (response: IPost[]) => {
          this.onSuccess(response);
        },
        error: (error: Error) => {},
      });
  }
  onSuccess(response: IPost[]) {
    this.postsList = response;
    this.filteredPosts = this.postsList;
  }
  getAllPostsWithFilter(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(500), takeUntilDestroyed(this.destroyRef))
      .subscribe((response) => {
        const searchValue = response?.toLowerCase() ?? '';
        this.filteredPosts = this.postsList.filter(
          (item) =>
            item.body?.toLowerCase().includes(searchValue) ||
            item.title?.toLowerCase().includes(searchValue)
        );
      });
  }
}
