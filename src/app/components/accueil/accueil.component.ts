import { Component, OnInit, signal } from '@angular/core';
import { AccueilService } from '../../services/accueil/accueil.service';
import { Users } from '../../models/users';
// import { AccueilService } from '../../services/accueil.service';

@Component({
  selector: 'app-accueil',
  imports: [],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css',
})
export class AccueilComponent implements OnInit {
  isSoutienState = signal(false);

  constructor(private accueilService: AccueilService) {}

  ngOnInit(): void {
    // this.accueilService.getRecommandationByideeProjet().subscribe();
    throw new Error('Method not implemented.');
  }

  handelClick(): void {
    if (this.isSoutienState()) {
      this.isSoutienState.set(false);
    } else {
      this.isSoutienState.set(true);
    }
  }
}
