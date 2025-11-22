import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getAllUsers`);
  }
  createNewUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/createNewUser`, userData);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteUser/${id}`);
  }

  changePassword(id: number, passwords: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/changePassword/${id}`, passwords);
  }
}
