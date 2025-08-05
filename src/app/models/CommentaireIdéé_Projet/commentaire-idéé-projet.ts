
export class CommentaireIdééProjet {
  constructor(private id:number,private idutilisateur:number,private idideeProjet:number,private contenu:String,private dateCommentaire:Date){}
//getters

public get getid():number{
return this.id;
}

public get getidutilisateur():number{
  return this.idutilisateur;
}

public get getidideeProjet():number{
  return this.idideeProjet;
}

public get getcontenu():String{
  return this.contenu;
}

public get getdateCommentaire():Date{
  return this.dateCommentaire
}

//setters

public set setid(id:number){
  this.id=id;
}

public set setidutilisateur(id:number){
  this.idutilisateur=id;
}

public set setidideeprojet(id:number){
  this.idideeProjet=id;
}

public set setcontenu(contenu:String){
  this.contenu=contenu;
}
  
}
