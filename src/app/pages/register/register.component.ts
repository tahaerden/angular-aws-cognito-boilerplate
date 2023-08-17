import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CognitoUser, CognitoUserAttribute, CognitoUserPool } from 'amazon-cognito-identity-js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm!: FormGroup;
  confirmationForm!: FormGroup;
  confirmationStep = false;
  cognitoUser!: CognitoUser;
  resendCodeTimer!: number;

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(25)
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(25)
      ]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
    this.confirmationForm = this.fb.group({
      code: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  signUp() {
    var userPool = new CognitoUserPool({
      UserPoolId: environment.cognitoUserPoolId,
      ClientId: environment.cognitoAppClientId
    });
    userPool.signUp(
      this.registerForm.value.email,
      this.registerForm.value.password,
      [
        new CognitoUserAttribute({
          Name: 'email',
          Value: this.registerForm.value.email
        }),
        new CognitoUserAttribute({
          Name: 'custom:firstName',
          Value: this.registerForm.value.firstName
        }),
        new CognitoUserAttribute({
          Name: 'custom:lastName',
          Value: this.registerForm.value.lastName
        })
      ],
      [],
      (err, result) => {
        if (err) {
          alert(err.message || JSON.stringify(err));
          return;
        }
        if (!result) {
          alert('User details could not be found.');
          return;
        }
        this.cognitoUser = result.user;
        this.confirmationStep = true;
        this.startResendCodeTimer();
        alert('Please check your e-mail including the Junk folder to verify your e-mail address.');
      }
    );
  }
  confirmRegistration() {
    this.cognitoUser.confirmRegistration(this.confirmationForm.value.code, true, (err, result) => {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      alert('User is confirmed. You can now login.');
      this.router.navigate(['login']);
    });
  }
  resendConfirmationCode() {
    this.startResendCodeTimer();
    this.cognitoUser.resendConfirmationCode((err, result) => {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      alert('Please check your e-mail including the Junk folder to verify your e-mail address.');
    });
  }
  startResendCodeTimer() {
    this.resendCodeTimer = 60;
    const timer = setInterval(() => {
      this.resendCodeTimer--;
      if (this.resendCodeTimer === 0) {
        clearInterval(timer);
      }
    }, 1000);
  }
}
