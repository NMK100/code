import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../models/users';
import { DataService } from './data.service';
import { Login } from '../models/login/login';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private dataG: DataService,
    private route: Router,
    private toastr: ToastrService
  ) {}

  login(data: Login) {
    const token = localStorage.getItem('token_user');
    if (token != null || undefined) {
      const chemin = localStorage.getItem('chemin');
      this.route.navigate([chemin]);
    } else {
      this.dataG.login(data).subscribe({
        next: (res: any) => {
          console.log(res);
          // localStorage.setItem("token_user",res.token)
          localStorage.setItem('user_id', res.email);
          let chemin = '';
          switch (res.role) {
            case 'CONTRIBUTEUR':
              chemin = '/contributeur';
              break;
            case 'GESTIONNAIRE':
              chemin = '/gestionnaire';
              break;
            case 'PORTEUR_PROJET':
              chemin = '/porteur_projet';
              break;
            default:
              chemin = '/';
          }
          localStorage.setItem('chemin', res.chemin);
          this.toastr.success(
            'Authentification reussie avec succès',
            'succès',
            {
              timeOut: 1000,
              progressBar: true,
              progressAnimation: 'increasing',
              positionClass: 'toast-top-right',
            }
          );
          this.route.navigate([chemin]);
        },
        error: (err) => {
          this.toastr.error('Veuillez renseigner tout les champs', 'erreur', {
            timeOut: 3000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right',
          });
          this.route.navigate(['/login']);
        },
      });
    }
  }

  logout() {
    localStorage.removeItem('token_user');
    localStorage.removeItem('chemin');
    this.route.navigate(['/login']);
  }
}
