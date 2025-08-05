import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable } from 'rxjs';
import { CommentaireIdééProjet } from '../models/CommentaireIdéé_Projet/commentaire-idéé-projet';



@Injectable({
  providedIn: 'root'
})
export class PageVisiteurService {
  //url
  private url= 'http://localhost:8180/utilisateurs/commentaires-projets';

  constructor(private data:DataService){}

  recupererideeCommentaire():Observable<CommentaireIdééProjet>{
    return this.data.getData(this.url)c;
  }
    
  
}
