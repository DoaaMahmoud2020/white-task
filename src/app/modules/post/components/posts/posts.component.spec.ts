import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { PostsComponent } from './posts.component';
import { PostService } from '../../services/post.service';
import { IPost } from '../../models/post.model';
import { DestroyRef } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PostCardComponent } from './post-card/post-card.component';
import { SpinnerLoadingComponent } from '@app/shared/components/spinner-loading/spinner-loading.component';
import { NotFoundDataComponent } from '@app/shared/components/not-found-data/not-found-data.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs/internal/observable/of';

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;
  let postService: jasmine.SpyObj<PostService>;

  const mockPosts: IPost[] = [
    { title: 'First Post', body: 'This is the body of the first post' },
    { title: 'Second Post', body: 'Body of the second post' },
    { title: 'Another Post', body: 'Here is another post body' },
  ];

  beforeEach(waitForAsync(() => {
    const postServiceSpy = jasmine.createSpyObj('PostService', ['getAll']);

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatCardModule,
        PostCardComponent,
        SpinnerLoadingComponent,
        NotFoundDataComponent,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
      ],
      declarations: [PostsComponent],
      providers: [
        { provide: PostService, useValue: postServiceSpy },
        DestroyRef,
      ],
    }).compileComponents();

    postService = TestBed.inject(PostService) as jasmine.SpyObj<PostService>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    postService.getAll.and.returnValue(of(mockPosts));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set postsList and filteredPosts on success', () => {
    component.getAllPosts();
    expect(component.postsList).toEqual(mockPosts);
    expect(component.filteredPosts).toEqual(mockPosts);
  });

  it('should filter postsList based on search input', () => {
    component.searchControl.setValue('first');
    expect(component.filteredPosts.length).toBe(1);
    expect(component.filteredPosts[0].title).toBe('First Post');

    component.searchControl.setValue('post');
    expect(component.filteredPosts.length).toBe(3);

    component.searchControl.setValue('second');
    expect(component.filteredPosts.length).toBe(1);
    expect(component.filteredPosts[0].title).toBe('Second Post');
  });

  it('should set isLoading to true when getAllPosts is called and to false when completed', () => {
    component.getAllPosts();
    expect(component.isLoading).toBe(true);

    fixture.detectChanges();
    expect(component.isLoading).toBe(false);
  });
});
