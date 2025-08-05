import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Gestionnaire } from '../../models/gestionnaire/gestionnaire';
import { Env } from '../../env';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GestionnaireDataService {
  constructor(private http: HttpClient, private data: DataService) {}
  //Pour la creation d'un compte Gestionnaire:
  addGestionnaire(gestionnaire: Gestionnaire): Observable<Gestionnaire> {
    return this.data.postData(Env.CREATE_GESTIONNAIRE, gestionnaire);
  }
}
