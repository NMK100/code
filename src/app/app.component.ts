import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
<<<<<<< HEAD
import { HeaderpageVisiteurComponent } from './components/headerpage-visiteur/headerpage-visiteur.component';
import { Router, Event, NavigationEnd } from '@angular/router';
=======
import { HeaderComponent } from './components/UI/header/header.component';
import { Router,Event,NavigationEnd } from '@angular/router';
>>>>>>> main
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/UI/footer/footer.component';
@Component({
  selector: 'app-root',
<<<<<<< HEAD
  imports: [
    RouterOutlet,
    HeaderpageVisiteurComponent,
    CommonModule,
    FooterComponent,
  ],
=======
  imports: [RouterOutlet,HeaderComponent,CommonModule],
>>>>>>> main
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'collabdev';
<<<<<<< HEAD
  ispagevisiteur = false;
  constructor(private router: Router) {
    this.router.events.subscribe((eve: Event) => {
      if (eve instanceof NavigationEnd) {
        this.ispagevisiteur = eve.urlAfterRedirects === '/page-visiteur';
      }
    });
  }
=======
  ispagevisiteur=false
  constructor(private router:Router){
   this.router.events.subscribe((eve:Event) =>
   {
    if(eve instanceof NavigationEnd){
      this.ispagevisiteur=eve.urlAfterRedirects === '/page-visiteur';
      
    }
   })

}
>>>>>>> main
}
