import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../shared/interfaces';
import {AuthService} from '../shared/services/auth.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  messageFromGuard = '';
  constructor(public auth: AuthService,
              private router: Router,
              private route: ActivatedRoute
              ) { }

  ngOnInit(): void {
    // check queryParams for having params with error
    this.route.queryParams.subscribe((params: Params) => {
      if (params['loginAgain']) {
        this.messageFromGuard = 'please fill fields';
      } else if (params['authFailed']) {
        this.messageFromGuard = 'Enter your data again';
      }
    });

    this.form = new FormGroup({
      email: new FormControl(null,
        [Validators.required, Validators.email]),
      password: new FormControl(null,
        [Validators.required, Validators.minLength(6)])
      }
    );
  }

  submit() {
    this.submitted = true;  // for disable submit button for impossibility send new request while this is in load
    // next block is useless, because this verification form perform in component.html
    if (this.form.invalid) {
      return;
    }

    // create possible admin
    const user: User = {
      email: this.form.get('email').value,
      password: this.form.get('password').value
    };
    this.auth.login(user)
      .subscribe(() => {
        // useless:
        // when we get success from server - clean form and navigate to dashboard
        this.form.reset();
        this.router.navigate(['/admin', 'dashboard']);
      },
        (reject) => {
        console.log('from login-page.component.ts', reject);
        });
    this.submitted = false;
  }
}
