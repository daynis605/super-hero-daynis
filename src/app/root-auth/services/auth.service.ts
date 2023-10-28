import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { }

  public register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password)
  }

  public login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((value) => {
        sessionStorage.setItem('auth', JSON.stringify(true));
      })

  }

  public logout() {
    sessionStorage.removeItem('auth');
    return signOut(this.auth);
  }

  public isLogin(): boolean {
    if(sessionStorage && sessionStorage.getItem('auth')){
      return true
    }
    else return false
   // return sessionStorage.getItem('auth')!=null  ? true : false
  }

}
