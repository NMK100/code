import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { CommentaireIdééProjet } from '../../models/CommentaireIdéé_Projet/commentaire-idéé-projet';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class PageVisiteurService {
  //url
  private url= 'http://localhost:8180/utilisateurs/commentaires-idees-projet/projets/';


  constructor(private http:HttpClient){}

  RecupererideeCommentaire():Observable<CommentaireIdééProjet[]>{
    return this.http.get<CommentaireIdééProjet[]>(this.url);
  }
    
  
}
