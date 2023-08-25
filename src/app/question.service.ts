import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private apiUrl = "https://localhost:7120/api/Questions";

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<any[]>
  {
    return this.http.get<any[]>(this.apiUrl);
  }

  getQuestion(id: number): Observable<any>
  {
    const url = `${this.apiUrl}/${id}`
    return this.http.get<any>(url);
  }

  deleteQuestion(id: number): Observable<any>
  {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }

  createQuestion(question : any): Observable<any>
  {
    return this.http.post<any>(this.apiUrl, question);
  }
  
}
