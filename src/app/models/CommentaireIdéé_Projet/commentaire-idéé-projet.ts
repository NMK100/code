
export class CommentaireIdééProjet {
  constructor(readonly id:number,public idutilisateur:number,public idideeProjet:number,public contenu:String,public dateCommentaire:Date){}
}