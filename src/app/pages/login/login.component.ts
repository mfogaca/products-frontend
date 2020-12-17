import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userId = "";
  password = "";
  isLoadingResults = false;
  loginForm: FormGroup;
  showError: boolean = false;
  errorMessage: string = "";

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      'username' : [null, Validators.required],
      'password' : [null, Validators.required]
    });    
  }

  login() {

  }

  onFormSubmit(form:NgForm) {
    this.isLoadingResults = true;
    this.api.login(form)
      .subscribe(res => {
          this.isLoadingResults = false;
          console.log("Login return : " + JSON.stringify(res));
          if (res.success) {
            localStorage.setItem("loggedUser","OK");
            this.router.navigate(['/products']);
          } else {
            this.showError = true;
            this.errorMessage = res.error;
          }
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }

}
