import { Component } from '@angular/core';
import { CommentaireIdééProjet } from '../../models/CommentaireIdéé_Projet/commentaire-idéé-projet';
import { PageVisiteurService } from '../../services/commentaireidéeprojet/page-visiteur.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-page-visiteur',
  imports: [CommonModule],
  templateUrl: './page-visiteur.component.html',
  styleUrl: './page-visiteur.component.css'
})
export class PageVisiteurComponent {
  listecommentaireideeprojet!:CommentaireIdééProjet[];
  messageerreur!:String;
  constructor(private pagevisiteurservice:PageVisiteurService){};

  ngOnInit():void{
    this.pagevisiteurservice.RecupererideeCommentaire().subscribe({
      next:(data:CommentaireIdééProjet[])=>{
        this.listecommentaireideeprojet=data;
        console.log(this.listecommentaireideeprojet)

      },
      error:(erreur)=>{
        console.log(erreur);
        this.messageerreur="Une erreur est survenu lors du chargement";
      }
    })
    
  }


}
