import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Gestionnaire } from '../../../models/gestionnaire/gestionnaire';
import { Users } from '../../../models/users';
import { DataService } from '../../../services/data.service';
import { GestionnaireDataService } from '../../../services/gestionnaire/gestionnaire-data.service';
import { ToastrService } from 'ngx-toastr';
import { Contributeur } from '../../../models/contributeur/contributeur';
import { ContributeurDataService } from '../../../services/contributeur/contributeur-data.service';

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
  contributeur!:Contributeur;

  formulaireContributeur: FormGroup;
  constructor(
    private fb:FormBuilder,
    private route:Router,
    private data:DataService,
    private dtContributeur:ContributeurDataService,
    private toastr:ToastrService
  ) {
    this.formulaireContributeur = this.fb.group({
      condition: [false,[Validators.requiredTrue]],
      specialite:["",[Validators.required]],
      type:["DEVELOPPEUR"]
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
      // console.log("", this.fichierName);
      this.toastr.success(`Fichier sélectionné:${this.ficher.name}`,"Selectionner",{
        timeOut: 1000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      })
    } else {
      console.error("Aucun fichier sélectionné");
    }
  }

  valider(){
    if (this.formulaireContributeur.valid) {
      if (!this.ficher) {
        // console.error("Aucun fichier sélectionné pour l'upload");

        this.toastr.error("Aucun fichier sélectionné ! Veuillez selectionné un fichier pour l'upload","erreur",{
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'
        })
        return;
      }
      if (!this.fichierName) {
        // console.error("Le nom du fichier n'est pas défini");
        this.toastr.error("Le nom du fichier n'est pas défini","erreur",{
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'
        })
        return;
      }

      this.dtContributeur.uploadCV(this.ficher, this.fichierName).subscribe({
        next: (response) => {
          // console.log(this.user);
          const contributeur = {
            nom:this.user.getNom,
            prenom:this.user.getPrenom,
            email:this.user.getEmail,
            genre:this.user.getGenre,
            motDePasse:this.user.getMotDePasse,
            niveau: "DEBUTANT",
            specialite: this.formulaireContributeur.value.specialite,
            type: this.formulaireContributeur.value.type,
            pieces: 0,
            uriCv: response.chemin
          }
          console.log(contributeur);

          console.log("Fichier uploadé avec succès:",response.chemin);
          this.dtContributeur.addContributeur(contributeur).subscribe({
            next: (res) => {
              this.toastr.success("Contributeur/ce ajouté avec succès","Ajoute",{
                timeOut: 1000,
                progressBar: true,
                progressAnimation: 'increasing',
                positionClass: 'toast-top-right'
              })
              console.log("Contributeur/ce ajouté avec succès:", res);
              this.route.navigate(['login']);
            },
            error: (err) => {
              console.error("Erreur lors de l'ajout du Contributeur/ce:", err);
              this.toastr.error("Erreur lors de l'ajout du Contributeur/ce","erreur",{
                timeOut: 1000,
                progressBar: true,
                progressAnimation: 'increasing',
                positionClass: 'toast-top-right'
              })
            }
          });
        },
        error: (error) => {
          console.error("Erreur lors de l'upload du fichier:", error);

          this.toastr.error("Erreur lors de l'upload du fichier","erreur",{
            timeOut: 1000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          })
        }
      });
      console.log("Conditions acceptées");
      // this.route.navigate(['inscription/choix']);
    } else {
      // console.error("Veuillez accepter les conditions d'utilisation");
        this.toastr.error("Veuillez accepter les conditions d'utilisation","erreur",{
          timeOut: 1000,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'
        })
    }
  }
}
