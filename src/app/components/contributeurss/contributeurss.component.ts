import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RecherchebarreComponent } from '../../components/UI/recherchebarre/recherchebarre.component';
import { SideBarComponent } from '../../components/UI/side-bar/side-bar.component';
import { FooterComponent } from '../../components/UI/footer/footer.component';

@Component({
  selector: 'app-contributeurss',
  imports: [CommonModule, RecherchebarreComponent, SideBarComponent, FooterComponent],
  templateUrl: './contributeurss.component.html',
  styleUrl: './contributeurss.component.css',
})
export class ContributeurssComponent {}
