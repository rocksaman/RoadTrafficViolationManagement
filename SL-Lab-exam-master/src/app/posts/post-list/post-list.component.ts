import { PostsService } from './../posts.service';
import { Component, OnInit, OnDestroy} from '@angular/core';
import {Post} from '../post.model';
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy{
  // posts = [
  //   {
  //     title: 'First Post', content: 'First post\'s content'
  //   },
  //   {
  //     title: 'Second Post', content: 'Second post\'s content'
  //   },
  //   {
  //     title: 'Third Post', content: 'Third post\'s content'
  //   },
  // ];
  posts: Post[] = [];
  private postsSub: Subscription;

  constructor(public postsService: PostsService) {}

  ngOnInit() {
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
    .subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }
  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
