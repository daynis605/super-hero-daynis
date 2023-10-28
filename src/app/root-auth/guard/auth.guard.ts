import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router)
  const authService = inject(AuthService)

  if(!authService.isLogin()){
    return true
  }
    router.navigate(['/home']);
    return false
};
