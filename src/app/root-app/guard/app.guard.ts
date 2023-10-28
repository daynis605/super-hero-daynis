import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/root-auth/services/auth.service';

export const appGuard: CanActivateFn = () => {
  const router = inject(Router)
  const authService = inject(AuthService)

  if(authService.isLogin()){
    return true
  }
    router.navigate(['/auth/login']);
    return false


};
