import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionManagementService {
  private httpClient = inject(HttpClient);

  registerUser(
    username: string,
    email: string,
    password: string,
    matchedPassword: string
  ) {
    return this.httpClient.post('http://www.localhost:8080/api/register', {
      username: username,
      email: email,
      password: password,
      matchedPassword: matchedPassword,
    });
  }
}
