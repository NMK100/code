import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Contributeur } from '../../models/contributeur/contributeur';
import { Env } from '../../env';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContributeurDataService {
  constructor(private http: HttpClient, private data: DataService) {}
  //Pour la creation d'un compte Contributeurs:
  addContributeur(contributeur: Contributeur): Observable<Contributeur> {
    return this.data.postData(Env.CREATE_CONTRIBUTEUR, contributeur);
  }
}
