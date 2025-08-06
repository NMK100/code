import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface SearchResult {
  id: number;
  title: string;
  description: string;
  type: 'projet' | 'utilisateur' | 'idee' | 'tache';
  url: string;
}

export interface SearchResponse {
  results: SearchResult[];
  total: number;
  hasMore: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiBaseUrl = 'http://localhost:8080/api'; // Ajustez selon votre configuration

  constructor(private http: HttpClient) {}

  /**
   * Effectue une recherche globale dans tous les types de contenu
   */
  searchAll(term: string): Observable<SearchResult[]> {
    if (!term || term.trim().length < 2) {
      return of([]);
    }

    const searchTerm = encodeURIComponent(term.trim());
    
    return forkJoin({
      projets: this.searchProjets(searchTerm),
      utilisateurs: this.searchUtilisateurs(searchTerm),
      idees: this.searchIdees(searchTerm),
      taches: this.searchTaches(searchTerm)
    }).pipe(
      map(response => {
        const results: SearchResult[] = [
          ...response.projets.map(p => ({ ...p, type: 'projet' as const })),
          ...response.utilisateurs.map(u => ({ ...u, type: 'utilisateur' as const })),
          ...response.idees.map(i => ({ ...i, type: 'idee' as const })),
          ...response.taches.map(t => ({ ...t, type: 'tache' as const }))
        ];
        
        // Trier par pertinence (vous pouvez implémenter votre propre algorithme)
        return this.sortByRelevance(results, term);
      }),
      catchError(error => {
        console.error('Erreur lors de la recherche globale:', error);
        return of([]);
      })
    );
  }

  /**
   * Recherche dans les projets
   */
  private searchProjets(term: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiBaseUrl}/projets/search?term=${term}`).pipe(
      catchError(error => {
        console.error('Erreur lors de la recherche de projets:', error);
        return of([]);
      })
    );
  }

  /**
   * Recherche dans les utilisateurs
   */
  private searchUtilisateurs(term: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiBaseUrl}/utilisateurs/search?term=${term}`).pipe(
      catchError(error => {
        console.error('Erreur lors de la recherche d\'utilisateurs:', error);
        return of([]);
      })
    );
  }

  /**
   * Recherche dans les idées de projet
   */
  private searchIdees(term: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiBaseUrl}/idees/search?term=${term}`).pipe(
      catchError(error => {
        console.error('Erreur lors de la recherche d\'idées:', error);
        return of([]);
      })
    );
  }

  /**
   * Recherche dans les tâches
   */
  private searchTaches(term: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiBaseUrl}/taches/search?term=${term}`).pipe(
      catchError(error => {
        console.error('Erreur lors de la recherche de tâches:', error);
        return of([]);
      })
    );
  }

  /**
   * Recherche avancée avec filtres
   */
  searchAdvanced(term: string, filters: {
    types?: string[];
    dateRange?: { start: Date; end: Date };
    status?: string[];
  }): Observable<SearchResult[]> {
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

  /**
   * Obtient les suggestions de recherche
   */
  getSuggestions(term: string): Observable<string[]> {
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

  /**
   * Obtient les tendances de recherche populaires
   */
  getPopularSearches(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiBaseUrl}/search/popular`).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération des recherches populaires:', error);
        return of([]);
      })
    );
  }

  /**
   * Trie les résultats par pertinence
   */
  private sortByRelevance(results: SearchResult[], searchTerm: string): SearchResult[] {
    const term = searchTerm.toLowerCase();
    
    return results.sort((a, b) => {
      const aScore = this.calculateRelevanceScore(a, term);
      const bScore = this.calculateRelevanceScore(b, term);
      return bScore - aScore;
    });
  }

  /**
   * Calcule un score de pertinence pour un résultat
   */
  private calculateRelevanceScore(result: SearchResult, searchTerm: string): number {
    let score = 0;
    const title = result.title.toLowerCase();
    const description = result.description.toLowerCase();
    
    // Score pour correspondance exacte dans le titre
    if (title.includes(searchTerm)) {
      score += 10;
    }
    
    // Score pour correspondance partielle dans le titre
    const titleWords = title.split(' ');
    const searchWords = searchTerm.split(' ');
    const titleMatches = titleWords.filter(word => 
      searchWords.some(searchWord => word.includes(searchWord))
    ).length;
    score += titleMatches * 5;
    
    // Score pour correspondance dans la description
    if (description.includes(searchTerm)) {
      score += 3;
    }
    
    // Bonus pour les types prioritaires
    if (result.type === 'projet') score += 2;
    if (result.type === 'utilisateur') score += 1;
    
    return score;
  }

  /**
   * Sauvegarde une recherche dans l'historique
   */
  saveSearchHistory(term: string): void {
    const history = this.getSearchHistory();
    const newHistory = [term, ...history.filter(item => item !== term)].slice(0, 10);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  }

  /**
   * Obtient l'historique des recherches
   */
  getSearchHistory(): string[] {
    try {
      const history = localStorage.getItem('searchHistory');
      return history ? JSON.parse(history) : [];
    } catch {
      return [];
    }
  }

  /**
   * Efface l'historique des recherches
   */
  clearSearchHistory(): void {
    localStorage.removeItem('searchHistory');
  }
} 