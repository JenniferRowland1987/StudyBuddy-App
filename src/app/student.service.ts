import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = "https://localhost:7120/api/Students";

  constructor(private http: HttpClient) { }

  getStudents(): Observable<any[]>
  {
    return this.http.get<any[]>(this.apiUrl);
  }

  getStudent(id: number): Observable<any>
  {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }

  createStudent(student: any)
  {
    return this.http.post<any>(this.apiUrl, student);
  }

}
