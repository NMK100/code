import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Gestionnaire } from '../../../models/gestionnaire/gestionnaire';
import { Users } from '../../../models/users';
import { DataService } from '../../../services/data.service';
import { GestionnaireDataService } from '../../../services/gestionnaire/gestionnaire-data.service';

@Component({
  selector: 'app-contributeur',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './contributeur.component.html',
  styleUrl: './contributeur.component.css'
})
export class ContributeurComponent implements OnInit {
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
    // if (!this.data.userData) {
    //   this.route.navigate(['inscription']);
    // }else {
    //   this.user = this.data.userData;
    // }
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
          console.log(this.user);
          const gestionnaire = {
            nom:this.user.getNom,
            prenom:this.user.getPrenom,
            email:this.user.getEmail,
            genre:this.user.getGenre,
            motDePasse:this.user.getMotDePasse,
            uriCv:response.chemin
          };
          console.log(gestionnaire);

          console.log("Fichier uploadé avec succès:",response.chemin);
          this.dtGestionnaire.addGestionnaire(gestionnaire).subscribe({
            next: (res) => {
              console.log("Gestionnaire ajouté avec succès:", res);
              this.route.navigate(['login']);
            },
            error: (err) => {
              console.error("Erreur lors de l'ajout du gestionnaire:", err);
            }
          });
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
