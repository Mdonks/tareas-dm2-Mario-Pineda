import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})

export class AuthGuard {
  private readonly _authService: AuthService = inject(AuthService);
  private readonly _router: Router = inject(Router);

  async canActivate(): Promise<boolean> {
    const isUserLoggedIn: boolean = await this._authService.isUserLoggedIn();
    if (!isUserLoggedIn) this._router.navigate(['/login-page']);
    return isUserLoggedIn;
  }
}
