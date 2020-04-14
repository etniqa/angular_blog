import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from '../../shared/posts.service';
import {Post} from '../../shared/interfaces';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {AlertService} from '../shared/services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  isLoaded = false;
  posts: Post[];
  pSub: Subscription;
  dSub: Subscription;
  searchStr = '';

  constructor(private postsService: PostsService,
              private alertService: AlertService
              ) { }

  ngOnInit(): void {
    this.isLoaded = false;
    this.pSub = this.postsService.getAll().subscribe((posts) => {
      this.posts = posts;
      this.isLoaded = true;
    });
  }

  ngOnDestroy(): void {
    if (this.pSub) this.pSub.unsubscribe();
    if (this.dSub) this.pSub.unsubscribe();
  }

  // remove post
  remove(id: string) {
    this.dSub = this.postsService.remove(id)
      .subscribe(() => {
        this.posts.filter((post) => post.id !== id);
        this.alertService.warning('post was deleted');
      });
  }
}
