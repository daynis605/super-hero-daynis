import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { }

  public register(email: string, password: string): Promise<any> {
    return createUserWithEmailAndPassword(this.auth, email, password)
  }

  public login(email: string, password: string): Promise<any> {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((value) => {
        sessionStorage.setItem('auth', JSON.stringify(true));
      }
      )
  }

  public logout() {
    sessionStorage.removeItem('auth');
    return signOut(this.auth);
  }


  public isLogin(): boolean {
    return sessionStorage.getItem('auth') != null ? true : false
  }

}
