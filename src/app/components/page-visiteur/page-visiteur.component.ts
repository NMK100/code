import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ideeprojet } from '../../models/ideeprojet/ideeprojet';
import { IdeeprojetService } from '../../services/ideeprojet/ideeprojet.service';
import { HeaderComponent } from '../UI/header/header.component';

@Component({
  selector: 'app-page-visiteur',
  imports: [CommonModule],
  templateUrl: './page-visiteur.component.html',
  styleUrl: './page-visiteur.component.css',
})
export class PageVisiteurComponent {
  listeideeprojet!: Ideeprojet[];
  messageerreur!: String;
  constructor(private ideeprojetservice: IdeeprojetService) {}

  ngOnInit(): void {
    this.ideeprojetservice.Recupererideeprojet().subscribe({
      next: (data) => {
        this.listeideeprojet = data;
        console.log(this.listeideeprojet);
      },
      error: (erreur) => {
        console.log(erreur);
        this.messageerreur = 'Une erreur est survenu lors du chargement';
      },
    });
  }
}
