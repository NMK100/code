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
  constructor( private data: DataService) {}
  //Pour la creation d'un compte Contributeurs:
  addContributeur(contributeur: any): Observable<Contributeur> {
    return this.data.postData(Env.CREATE_CONTRIBUTEUR, contributeur);
  }

  //Pour l'upload d'un fichier:
  uploadCV(file: File,nomFichier:string): Observable<any> {
    return this.data.uploadFile(Env.UPLOAD_URL, file,nomFichier,"CV");
  }
}
