import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Post} from '../../shared/interfaces';
import {PostsService} from '../../shared/posts.service';
import {AlertService} from '../shared/services/alert.service';


@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {
  form: FormGroup;
  titleForm: FormControl;
  textForm: FormControl;
  authorForm: FormControl;
  // postsService = for interaction with firebase (fb)
  constructor(private postsService: PostsService,
              private alertService: AlertService) { }

  ngOnInit(): void {
    this.titleForm = new FormControl(null, Validators.required);
    this.textForm = new FormControl(null, Validators.required);
    this.authorForm = new FormControl(null, Validators.required);

    this.form = new FormGroup({
      title: this.titleForm,
      text: this.textForm,
      author: this.authorForm
    });
  }

  submit() {
    const post: Post = {
      title: this.titleForm.value,
      text: this.textForm.value,
      author: this.authorForm.value,
      date: new Date()
    };
    this.postsService.create(post).subscribe((resolve) => {
      console.log(resolve);
      this.form.reset();
      this.alertService.success('post was created');
    });
  }

}
