import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-side-bar',
  imports: [CommonModule, HeaderComponent],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  // Propriété pour contrôler l'affichage détaillé ou compact de la sidebar
  afficherDetailsSidebar = true;

  // Méthode pour basculer entre l'état détaillé et compact de la sidebar
  changerEtatSidebar() {
    this.afficherDetailsSidebar = !this.afficherDetailsSidebar;
  }
}
