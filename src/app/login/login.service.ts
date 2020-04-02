import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {PathAPI} from '../common/api_path';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  successSignUp = '';
  constructor(
    private http: HttpClient
  ) { }

  login(username, password) {
    const params = new HttpParams().set('userName', username).set('password', password);
    return this.http.post(PathAPI.LOGIN, {}, {params});
  }

  signup(params) {
    return this.http.post(PathAPI.SIGN_UP, params);
  }

}
