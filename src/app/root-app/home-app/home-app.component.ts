import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/root-auth/services/auth.service';
import { LoaderService } from '../services/loader.service';


@Component({
  selector: 'app-home-app',
  templateUrl: './home-app.component.html',
  styleUrls: ['./home-app.component.scss']
})
export class HomeAppComponent {

  constructor(private authService: AuthService,
    public loading: LoaderService, private router: Router) { }


  public logout() {
    this.authService.logout()
    this.router.navigate(['/auth/login']);
  }

}
