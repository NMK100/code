import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { DataService } from '../data.service';
import { Env } from '../../env';
import { catchError, Observable, tap } from 'rxjs';
import { Ideeprojet } from '../../models/ideeprojet/ideeprojet';

@Injectable({
  providedIn: 'root',
})
export class AccueilService {
  constructor(private http: HttpClient, private data: DataService) {}

  readonly url = Env.GETRECOMMADATION;
  private ideeProjets = signal<Ideeprojet[]>([]);

  getRecommandationByideeProjet(id: number): Observable<Ideeprojet[]> {
    return this.data.getData(`${this.url}/${id}`).pipe(
      tap((ideeProjets) => this.ideeProjets.set(ideeProjets)),
      catchError((error) => {
        console.error('Erreur lors de la récupération des utilisateurs', error);
        throw error;
      })
    );
  }
}
