export class Ideeprojet {
  private id!: number;
  private titre!: string;
  private description!: string;
  private domaine!: string;
  private uriCDC!: string;
  private nombreSoutien!: number;
  private datePublication!: Date;
  private idUtilisateur!: number;
  private commentaireIdeeProjets!: {
    description: string;
    datePublication: Date;
    idutilisateur: Number;
  }[];

  constructor(
    titre: string,
    id: number,
    description: string,
    domain: string,
    uricv: string,
    nombreSoutien: number,
    datePublication: Date,
    idUtilisateur: number,
    commentaireIdeeProjets: {
      description: string;
      datePublication: Date;
      idutilisateur: Number;
    }[]
  ) {
    (this.id = id),
      (this.titre = titre),
      (this.commentaireIdeeProjets = commentaireIdeeProjets),
      (this.datePublication = datePublication),
      (this.description = description),
      (this.idUtilisateur = idUtilisateur),
      (this.domaine = domain),
      (this.nombreSoutien = nombreSoutien),
      (this.uriCDC = uricv);
  }

  public get getId(): number {
    return this.id;
  }

  public set setId(id: number) {
    this.id = id;
  }
}
