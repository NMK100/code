import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { InscriptionChoixComponent } from './components/inscription/inscription-choix/inscription-choix.component';
import { ContributeurComponent } from './components/inscription/contributeur/contributeur.component';
import { GestionnaireComponent } from './components/inscription/gestionnaire/gestionnaire.component';
import { PorteurProjetComponent } from './components/inscription/porteur-projet/porteur-projet.component';
import { InscriptionIndexComponent } from './components/inscription/inscription-index/inscription-index.component';
import { PageVisiteurComponent } from './components/page-visiteur/page-visiteur.component';
import { HeaderComponent } from './components/UI/header/header.component';
import { Component } from '@angular/core';
import { SideBarComponent } from './components/UI/side-bar/side-bar.component';
import { FooterComponent } from './components/UI/footer/footer.component';
import { AccueilComponent } from './components/accueil/accueil.component';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'inscription',
    component: InscriptionComponent,
    children: [
      { path: '', component: InscriptionIndexComponent },
      { path: 'choix', component: InscriptionChoixComponent },
      { path: 'contributeur', component: ContributeurComponent },
      { path: 'gestionnaire', component: GestionnaireComponent },
      { path: 'porteur_de_projet', component: PorteurProjetComponent },
      { path: '**', redirectTo: '' },
    ],
  },
  { path: 'page-visiteur', component: PageVisiteurComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'sidebar', component: SideBarComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'accueil', component: AccueilComponent },
];
