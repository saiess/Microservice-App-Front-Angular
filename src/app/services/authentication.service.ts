import { Injectable } from '@angular/core';
import { UserModel } from '../models/user-model';
import { Observable, observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  
  constructor() { }
  login(username: string, password: string): Observable<UserModel> {
    
    
    const userModel = new UserModel();
    userModel.displayName = 'sai';
    userModel.username = 'said';
    userModel.password = "1234";

    return of(userModel);
  }

  logout() {
    //TODO: logout logic
  }
}
