import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderpageVisiteurComponent } from './components/headerpage-visiteur/headerpage-visiteur.component';
import { Router, Event, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/UI/footer/footer.component';
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderpageVisiteurComponent,
    CommonModule,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'collabdev';
  ispagevisiteur = false;
  constructor(private router: Router) {
    this.router.events.subscribe((eve: Event) => {
      if (eve instanceof NavigationEnd) {
        this.ispagevisiteur = eve.urlAfterRedirects === '/page-visiteur';
      }
    });
  }
}
