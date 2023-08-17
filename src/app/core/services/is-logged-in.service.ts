import { Injectable } from '@angular/core';
import { CognitoUserPool, CognitoUserSession } from 'amazon-cognito-identity-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedInService {
  isLoggedIn() {
    let isAuth = false;
    let poolData = {
      UserPoolId: environment.cognitoUserPoolId,
      ClientId: environment.cognitoAppClientId
    };
    let userPool = new CognitoUserPool(poolData);
    let cognitoUser = userPool.getCurrentUser();

    if (cognitoUser != null) {
      cognitoUser.getSession((err: any, session: CognitoUserSession) => {
        if (err) {
          alert(err.message || JSON.stringify(err));
        } else {
          isAuth = session.isValid();
        }
      });
    }
    return isAuth;
  }
}
