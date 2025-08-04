import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { GestionnaireDataService } from '../../../services/gestionnaire/gestionnaire-data.service';
import { Users } from '../../../models/users';
import { Gestionnaire } from '../../../models/gestionnaire/gestionnaire';

@Component({
  selector: 'app-gestionnaire',
  imports: [CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './gestionnaire.component.html',
  styleUrl: './gestionnaire.component.css'
})
export class GestionnaireComponent implements OnInit {
  ficher: File | null = null;
  fichierName: string = '';
  user!: Users
  gestionnaire!:Gestionnaire;

  conditionUtilisation: FormGroup;
  constructor(private fb:FormBuilder, private route:Router,private data:DataService,private dtGestionnaire:GestionnaireDataService) {
    this.conditionUtilisation = this.fb.group({
      condition: [false,[Validators.requiredTrue]]
    });
  }

  ngOnInit(){
    if (!this.data.userData) {
      this.route.navigate(['inscription']);
    }else {
      this.user = this.data.userData;
    }
  }

  fichierSelectionner($event: Event) {
    const input = $event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.ficher = input.files[0];
      let date = new Date().getTime();
      const dateString = date.toString();
      this.fichierName = dateString + "_" +this.ficher.name;
      console.log("Fichier sélectionné:", this.fichierName);
    } else {
      console.error("Aucun fichier sélectionné");
    }
  }

  valider(){
    if (this.conditionUtilisation.valid) {
      if (!this.ficher) {
        console.error("Aucun fichier sélectionné pour l'upload");
        return;
      }
      if (!this.fichierName) {
        console.error("Le nom du fichier n'est pas défini");
        return;
      }

      this.dtGestionnaire.uploadCV(this.ficher, this.fichierName).subscribe({
        next: (response) => {
          // this.gestionnaire = new Gestionnaire(this.user, response);
          console.log("Fichier uploadé avec succès:", response);
          // this.dtGestionnaire.addGestionnaire(this.gestionnaire).subscribe({
          //   next: (res) => {
          //     console.log("Gestionnaire ajouté avec succès:", res);
          //     this.route.navigate(['inscription/choix']);
          //   },
          //   error: (err) => {
          //     console.error("Erreur lors de l'ajout du gestionnaire:", err);
          //   }
          // });
        },
        error: (error) => {
          console.error("Erreur lors de l'upload du fichier:", error);
        }
      });
      console.log("Conditions acceptées");
      // this.route.navigate(['inscription/choix']);
    } else {
      console.error("Veuillez accepter les conditions d'utilisation");
    }
  }

}
