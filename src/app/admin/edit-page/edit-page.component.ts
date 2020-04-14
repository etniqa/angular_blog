import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {PostsService} from '../../shared/posts.service';
import {switchMap} from 'rxjs/operators';
import {Post} from '../../shared/interfaces';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  editPost: Post;
  isSubmitted = false;
  uSub: Subscription; // for unsubscribe of streams$


  constructor(private route: ActivatedRoute,
              private postsService: PostsService,
              ) { }

  ngOnInit(): void {
    this.route.params
      .pipe(switchMap((params: Params) => {
        return this.postsService.getById(params['id']);
      })).subscribe((post: Post) => {
      this.editPost = post;
      this.form = new FormGroup({
          title: new FormControl(post.title, Validators.required),
          text: new FormControl(post.text, Validators.required)
        });
    });
  }

  ngOnDestroy(): void {
    if (this.uSub) this.uSub.unsubscribe();
  }

  submit() {
    this.isSubmitted = true;
    this.uSub = this.postsService.update({
      ...this.editPost,
      text: this.form.get('text').value,
      title: this.form.get('title').value,
    }).subscribe(() => {
      this.isSubmitted = false;
    });
  }
}
