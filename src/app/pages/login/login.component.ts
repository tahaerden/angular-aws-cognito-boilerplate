import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  CognitoUserSession
} from 'amazon-cognito-identity-js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  confirmationForm!: FormGroup;
  confirmationStep = false;
  cognitoUser!: CognitoUser;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
    this.confirmationForm = this.fb.group({
      code: new FormControl('', [Validators.required, Validators.minLength(6)]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  login() {
    let authenticationDetails = new AuthenticationDetails({
      Username: this.loginForm.value.email,
      Password: this.loginForm.value.password
    });
    let userPool = new CognitoUserPool({
      UserPoolId: environment.cognitoUserPoolId,
      ClientId: environment.cognitoAppClientId
    });
    let userData = { Username: this.loginForm.value.email, Pool: userPool };
    this.cognitoUser = new CognitoUser(userData);
    this.cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (session: CognitoUserSession) => {
        this.cognitoUser.getUserAttributes((err: any, result: any) => {
          if (err) {
            alert(err.message || JSON.stringify(err));
            return;
          }
          const userDetails = {} as any;
          for (let i = 0; i < result.length; i++) {
            userDetails[result[i].getName().replace('custom:', '')] = result[i].getValue();
          }
          localStorage.setItem('userDetails', JSON.stringify(userDetails));
        });
        this.router.navigate(['home']);
      },
      onFailure: (err) => {
        alert(err.message || JSON.stringify(err));
      }
    });
  }

  forgotPassword() {
    if (!this.loginForm.value.email) {
      alert('Please enter your e-mail address first');
      return;
    }
    var userPool = new CognitoUserPool({
      UserPoolId: environment.cognitoUserPoolId,
      ClientId: environment.cognitoAppClientId
    });
    let userData = { Username: this.loginForm.value.email, Pool: userPool };
    this.cognitoUser = new CognitoUser(userData);
    this.cognitoUser.forgotPassword({
      onSuccess: (result) => {
        alert('Please enter the confirmation code from your e-mail and the new desired password.');
        this.confirmationStep = true;
      },
      onFailure: (err) => {
        alert(err.message || JSON.stringify(err));
      }
    });
  }

  confirmPassword() {
    this.cognitoUser.confirmPassword(
      this.confirmationForm.value.code,
      this.confirmationForm.value.newPassword,
      {
        onSuccess: (result) => {
          alert('Your password is updated.');
          this.confirmationStep = false;
        },
        onFailure: (err) => {
          alert(err.message || JSON.stringify(err));
        }
      }
    );
  }
}
