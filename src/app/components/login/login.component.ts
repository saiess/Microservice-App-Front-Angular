import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted =  false;
  loading = false;

  get f() {
    return this.loginForm.controls;
  }
  constructor(private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;

    if(this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f['username'].value, this.f['password'].value)
    .subscribe({
      next: () => {
        console.log("success");
        this.router.navigate(['/home'])
      },
      error: () => {
        console.log("error");
        this.loading = false;
      }}
      // data => {
      //   console.log("success");
      //   this.router.navigate(['/home']);
      // },
      // error => {
      //   console.log("error");
      //   this.loading = false;
      // }
    )
  }
}
