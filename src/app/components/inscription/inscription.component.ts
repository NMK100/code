import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../UI/footer/footer.component";

@Component({
  selector: 'app-inscription',
  imports: [RouterOutlet, FooterComponent],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css'
})
export class InscriptionComponent {

}
