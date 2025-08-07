import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface ResultatRecherche {
  id: number;
  title: string;
  description: string;
  type: 'projet' | 'utilisateur' | 'idee';
  url: string;
}

export interface ReponseRecherche {
  results: ResultatRecherche[];
  total: number;
  hasMore: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class RechercheService {
  private apiBaseUrl = 'http://localhost:8180/'; 

  constructor(private http: HttpClient) {}

  /*Effectue une recherche globale dans tous les types de contenu*/
  searchAll(term: string): Observable<ResultatRecherche[]> {
    if (!term || term.trim().length < 2) {
      return of([]);
    }

    const searchTerm = encodeURIComponent(term.trim());
    
    return forkJoin({
      projets: this.searchProjets(searchTerm),
      utilisateurs: this.searchUtilisateurs(searchTerm),
      idees: this.searchIdees(searchTerm),
    }).pipe(
      map(response => {
        const results: ResultatRecherche[] = [
          ...response.projets.map(p => ({ ...p, type: 'projet' as const })),
          ...response.utilisateurs.map(u => ({ ...u, type: 'utilisateur' as const })),
          ...response.idees.map(i => ({ ...i, type: 'idee' as const })),
        ];
        
        return results;
      }),
      catchError(error => {
        console.error('Erreur lors de la recherche globale:', error);
        return of([]);
      })
    );
  }

  /*Recherche dans les projets*/
  public searchProjets(term: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiBaseUrl}/projets/search?term=${term}`).pipe(
      catchError(error => {
        console.error('Erreur lors de la recherche de projets:', error);
        return of([]);
      })
    );
  }

  /*Recherche dans les utilisateurs*/
  public searchUtilisateurs(term: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiBaseUrl}/utilisateurs/search?term=${term}`).pipe(
      catchError(error => {
        console.error('Erreur lors de la recherche d\'utilisateurs:', error);
        return of([]);
      })
    );
  }

  /* Recherche dans les idées de projet*/
  public searchIdees(term: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiBaseUrl}/idees/search?term=${term}`).pipe(
      catchError(error => {
        console.error('Erreur lors de la recherche d\'idées:', error);
        return of([]);
      })
    );
  }
  /*Recherche avancée avec filtre */
  rechercherAvancee(term: string, filters: {
    types?: string[];
    dateRange?: { start: Date; end: Date };
    status?: string[];
  }): Observable<ResultatRecherche[]> {
    const params = new URLSearchParams();
    params.append('term', term);
    
    if (filters.types?.length) {
      params.append('types', filters.types.join(','));
    }
    
    if (filters.dateRange) {
      params.append('startDate', filters.dateRange.start.toISOString());
      params.append('endDate', filters.dateRange.end.toISOString());
    }
    
    if (filters.status?.length) {
      params.append('status', filters.status.join(','));
    }

    return this.http.get<any[]>(`${this.apiBaseUrl}/search/advanced?${params.toString()}`).pipe(
      map(results => results.map(r => ({ ...r, type: r.type || 'autre' as const }))),
      catchError(error => {
        console.error('Erreur lors de la recherche avancée:', error);
        return of([]);
      })
    );
  }

  /*les suggestions de recherche*/
  suggestionsRecherche(term: string): Observable<string[]> {
    if (!term || term.trim().length < 2) {
      return of([]);
    }

    return this.http.get<string[]>(`${this.apiBaseUrl}/search/suggestions?term=${encodeURIComponent(term.trim())}`).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération des suggestions:', error);
        return of([]);
      })
    );
  }
  
   /* l'historique des recherches*/
  histoireRecherche(): string[] {
    try {
      const history = localStorage.getItem('searchHistory');
      return history ? JSON.parse(history) : [];
    } catch {
      return [];
    }
  }

  /*Efface l'historique des recherches*/
  effacerRechercheHistoire(): void {
    localStorage.removeItem('searchHistory');
  }
} 