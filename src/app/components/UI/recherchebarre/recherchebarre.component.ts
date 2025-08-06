import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

export interface SearchResult {
  id: number;
  title: string;
  description: string;
  type: 'projet' | 'utilisateur' | 'idee' | 'tache';
  url: string;
}

@Component({
  selector: 'app-recherchebarre',
  imports: [CommonModule, FormsModule],
  templateUrl: './recherchebarre.component.html',
  styleUrl: './recherchebarre.component.css'
})
export class RecherchebarreComponent implements OnInit, OnDestroy {
  @Output() searchResults = new EventEmitter<SearchResult[]>();
  @Output() searchPerformed = new EventEmitter<string>();

  searchTerm: string = '';
  searchResultsList: SearchResult[] = [];
  isLoading: boolean = false;
  showResults: boolean = false;
  errorMessage: string = '';
  suggestions: string[] = [];
  showSuggestions: boolean = false;

  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor() {}

  ngOnInit(): void {
    // Configuration de la recherche en temps réel avec debounce
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(term => {
      if (term.length >= 2) {
        this.performSearch(term);
      } else {
        this.clearResults();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSearchInput(): void {
    this.searchSubject.next(this.searchTerm);
  }

  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.performSearch(this.searchTerm.trim());
      this.searchPerformed.emit(this.searchTerm);
    }
  }

  private performSearch(term: string): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.showSuggestions = false;

    // Simulation de recherche pour l'instant
    setTimeout(() => {
      const mockResults: SearchResult[] = [
        {
          id: 1,
          title: 'Projet ' + term,
          description: 'Description du projet ' + term,
          type: 'projet',
          url: '/projets/1'
        },
        {
          id: 2,
          title: 'Utilisateur ' + term,
          description: 'utilisateur@exemple.com',
          type: 'utilisateur',
          url: '/utilisateurs/2'
        }
      ];

      this.searchResultsList = mockResults;
      this.showResults = mockResults.length > 0;
      this.isLoading = false;
      this.searchResults.emit(mockResults);
    }, 1000);
  }

  private clearResults(): void {
    this.searchResultsList = [];
    this.showResults = false;
    this.showSuggestions = false;
  }

  afficheIdeeProjet(): void {
    // Action pour le bouton ampoules (les idées de projet de collabdev)
    console.log('Bouton idées de projet cliqué');
    this.chargeSuggestions();
  }

  afficheLesProjets(): void {
    // Action pour le bouton dossier (les projets t de collabdev)
    console.log('Bouton mes projets cliqué');
    
  }

  private chargeSuggestions(): void {
    if (this.searchTerm.length >= 2) {
      // Simulation de suggestions
      this.suggestions = [
        this.searchTerm + ' projet',
        this.searchTerm + ' idée',
        this.searchTerm + 'utilisateur'
      ];
      //pour l'affichaaaaaaage ou le nom affichage en fonction du suggestion que l'utilisateur a saisie 
      this.showSuggestions = this.suggestions.length > 0;
    }
  }
 
  //gestion du clique sur une suggestion
  onSuggestionClick(suggestion: string): void {
    this.searchTerm = suggestion;
    this.showSuggestions = false;
    this.onSearch();
  }

  onResultClick(result: SearchResult): void {
    // Navigation vers le résultat sélectionné
    console.log('Résultat sélectionné:', result);
    this.showResults = false;
    this.showSuggestions = false;
    
    // Navigation vers la page correspondante
    switch (result.type) {
      case 'projet':
        
        break;
      case 'utilisateur':
        
        break;
      case 'tache':
       
        break;
    }
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.clearResults();
    this.errorMessage = '';
  }

  // Méthodes pour les notifications
  onNotificationClick(): void {
    console.log('Notifications cliquées');
    // les notifications
  }

  onContactClick(): void {
    console.log('Contact cliqué');
    // la page de contact
  }

  // Méthodes utilitaires pour les résultats de recherche
  getResultIcon(type: string): string {
    
    switch (type) {
      case 'projet':
        return 'ri-folder-2-line';
      case 'utilisateur':
        return 'ri-group-fill ';
      case 'idee':
        return 'fa-lightbulb';
      default:
        return 'fa-file';
    }
  }

  getResultTypeLabel(type: string): string {
    const colorMap: Record<string, string> = {
    projet: '#888888ff',      
    utilisateur: '#334DAA', 
    idee: '#F6C434'         
  };
    switch (type) {
      case 'projet':
        return 'Projet';
      case 'utilisateur':
        return 'Utilisateur';
      case 'idee':
        return 'Idée';
      default:
        return 'Autre';
    }
  }
}
