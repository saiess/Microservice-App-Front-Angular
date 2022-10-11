import { Injectable } from '@angular/core';
import { UserModel } from '../models/user-model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  static USER_INFO = 'USER_INFO';

  private userInfoSubject: BehaviorSubject<UserModel>;
  public cuurentUser$: Observable<UserModel>;

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) {
    const jsonString = this.cookieService.get(AuthenticationService.USER_INFO);
    if (jsonString === '') {
      this.userInfoSubject = new BehaviorSubject<UserModel>(null);
    } else {
      this.userInfoSubject = new BehaviorSubject<UserModel>(
        JSON.parse(this.cookieService.get(AuthenticationService.USER_INFO))
      );
    }

    this.cuurentUser$ = this.userInfoSubject.asObservable();
  }

  login(username: string, password: string): Observable<UserModel> {
    const url = '';

    return this.httpClient.post<UserModel>(url, { username, password }).pipe(
      map((userModel) => {
        //* create a cookie with jwtToken
        this.cookieService.set(
          AuthenticationService.USER_INFO,
          JSON.stringify(userModel)
        );
        //* create a cookie with user id

        //* notify everbody else body
        this.userInfoSubject.next(userModel);

        return userModel;
      })
    );
  }

  logout() {
    //TODO: logout logic
    this.cookieService
      .delete(AuthenticationService.USER_INFO)
      // @ts-ignore
      .this.userInfoSubject.next(null);
  }

  registerUser(formValue: any): Observable<UserModel> {
    const url = '';
    return this.httpClient.post<UserModel>(url, formValue).pipe(
      map((userModel) => {
        //* create a cookie with jwtToken
        this.cookieService.set(
          AuthenticationService.USER_INFO,
          JSON.stringify(userModel)
        );
        //* notify everbody else body
        this.userInfoSubject.next(userModel);

        return userModel;
      })
    );
  }

  public get currentUserValue() {
    return this.userInfoSubject.value;
  }
}
