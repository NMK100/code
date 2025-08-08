import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router, Event, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "./components/UI/header/header.component";
import { SideBarComponent } from "./components/UI/side-bar/side-bar.component";
import { RecherchebarreComponent } from "./components/UI/recherchebarre/recherchebarre.component";
import { FooterComponent } from './components/UI/footer/footer.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, CommonModule],
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
