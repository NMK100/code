import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { Users } from '../../../models/users';
import { PorteurProjetDataService } from '../../../services/porteurProjet/porteur-projet-data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-porteur-projet',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './porteur-projet.component.html',
  styleUrl: './porteur-projet.component.css',
})
export class PorteurProjetComponent implements OnInit {
  conditionUtilisation: FormGroup;
  user!: Users;
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private data: DataService,
    private dataPorteur: PorteurProjetDataService,
    private toastr:ToastrService,
  ) {
    this.conditionUtilisation = this.fb.group({
      condition: [false, [Validators.requiredTrue]],
    });
  }
  ngOnInit() {
    if (!this.data.userData) {
      console.error('Aucune donnée utilisateur trouvée dans le service.');
      this.route.navigate(['inscription']);
    } else {
      this.user = this.data.userData; // Récupérer les données de l'utilisateur depuis le service
    }
  }

  valider() {
    if (this.conditionUtilisation.valid) {
      console.log('Conditions acceptées');
      console.log('Données du porteur de projet :', this.user);
      this.dataPorteur.addPorteur(this.user).subscribe({
        next: (response) => {
          // console.log('Porteur de projet enregistré avec succès', response);
          this.toastr.success("Porteur de projet enregistré avec succès","erreur",{
            timeOut: 1000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-center'
          })
          this.route.navigate(['login']);
        },
        error: (error) => {
          console.error(
            "Erreur lors de l'enregistrement du porteur de projet",
            error
          );
          this.toastr.error("Erreur lors de l'enregistrement du porteur de projet","erreur",{
            timeOut: 1000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-center'
          })
          // this.route.navigate(['inscription']);
        },
      });
      // this.route.navigate(['inscription/choix']);
    } else {
      // console.error("Veuillez accepter les conditions d'utilisation");
      this.toastr.error("Veuillez accepter les conditions d'utilisation","erreur",{
        timeOut: 1000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-center'
      })
    }
  }
}
