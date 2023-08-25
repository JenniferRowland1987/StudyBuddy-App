import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  private apiUrl = "https://localhost:7120/api/Favorites"

  constructor(private http: HttpClient) { }

  getAllFavorites(): Observable<any>
  {
    return this.http.get<any[]>(this.apiUrl);
  }

  getFavorites(studentId: number): Observable<any[]>
  {
    const url = `${this.apiUrl}/${studentId}`
    return this.http.get<any[]>(url);
  }

  createFavorite(studentId: number, questionId: number)
  {
    const favoriteData = {studentId, questionId}
    return this.http.post<any>(this.apiUrl, favoriteData);
  }

  deleteFavorite(id: number)
  {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url)
  }

}
