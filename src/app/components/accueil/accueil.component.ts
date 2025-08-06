import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-accueil',
  imports: [],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css',
})
export class AccueilComponent {
  isSoutienState = signal(false);

  handelClick(): void {
    if (this.isSoutienState()) {
      this.isSoutienState.set(false);
    } else {
      this.isSoutienState.set(true);
    }
  }
}
