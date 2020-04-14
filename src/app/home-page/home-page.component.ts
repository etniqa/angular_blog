import { Component, OnInit } from '@angular/core';
import {PostsService} from '../shared/posts.service';
import {Post} from '../shared/interfaces';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  posts: Post[];
  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.postsService.getAll().subscribe((posts) => {
      this.posts = posts;
    });
  }

}
