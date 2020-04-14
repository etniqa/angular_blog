import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {Post} from '../shared/interfaces';
import {switchMap} from 'rxjs/operators';
import {PostsService} from '../shared/posts.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {
  post$: Observable<Post>;
  constructor(private postsService: PostsService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    // return stream$ with post
    this.post$ = this.route.params
      .pipe(switchMap((params) => {
        return this.postsService.getById(params['id']);
      }));
  }

}
