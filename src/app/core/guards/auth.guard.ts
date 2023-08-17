import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { IsLoggedInService } from '../services/is-logged-in.service';

export const authGuard: CanActivateFn = () => {
  const service = inject(IsLoggedInService);
  const router = inject(Router);
  const isLoggedIn = service.isLoggedIn();
  if (!isLoggedIn) {
    router.navigate(['login']);
  }
  return isLoggedIn;
};
