import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Env } from '../../env';
import { PorteurProjet } from '../../models/porteurProjet/porteur-projet';
import { Observable } from 'rxjs';
import { Users } from '../../models/users';

@Injectable({
  providedIn: 'root',
})
export class PorteurProjetDataService {
  constructor(private http: HttpClient, private data: DataService) {}
  //Pour la creation d'un compte PorteurProjet:
  addPorteur(user: Users): Observable<PorteurProjet> {
    return this.data.postData(Env.CREATE_PORTER_PROJET, user);
  }
}
