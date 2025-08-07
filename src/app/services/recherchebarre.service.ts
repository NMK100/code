import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' 
})
export class RecherchebarreService {
  private apiUrl = 'http://localhost:8180'; 

  constructor(private http: HttpClient) {}

  search(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?q=${query}`);
  }
}
