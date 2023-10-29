import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService{

  constructor(private auth: Auth) { }

  public register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password)
  }

  public login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((value) => {
        localStorage.setItem('auth', JSON.stringify(true));
      })

  }

  public logout() {
    localStorage.removeItem('auth');
    return signOut(this.auth);
  }


  public isLogin(): boolean {
    return localStorage.getItem('auth')!=null ? true : false
  }

}
