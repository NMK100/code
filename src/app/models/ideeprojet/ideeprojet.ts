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
    uricdc: string,
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
      (this.uriCDC = uricdc);
  }

  //id
  public get getId(): number {
    return this.id;
  }

  public set setId(id: number) {
    this.id = id;
  }
  //titre
  public get getTitre(): string {
    return this.titre;
  }

  public set setTitre(titre: string) {
    this.titre = titre;
  }
  //Description
  public get getDescription(): string {
    return this.description;
  }
  public set setDescription(description: string) {
    this.description = description;
  }
  //Domaine

  public get getDomain(): string {
    return this.domaine;
  }

  public set setDomain(domain: string) {
    this.domaine = domain;
  }

  public get getUriCdc(): string {
    return this.uriCDC;
  }

  public set setUriCdc(uriCdc: string) {
    this.uriCDC = uriCdc;
  }

  public get getNumbreDeSoutien(): number {
    return this.nombreSoutien;
  }

  public set setNumberDeSoutien(nombreSoutien: number) {
    this.nombreSoutien = nombreSoutien;
  }

  public get getDatePublicatipon(): Date {
    return this.datePublication;
  }

  public set setDatePublication(datePublication: Date) {
    this.datePublication = datePublication;
  }

  public get getIdUtilisateur(): number {
    return this.idUtilisateur;
  }

  public set setIdUtilisateur(id: number) {
    this.idUtilisateur = id;
  }

  public get getcommentaireIdeeProjets(): {
    description: string;
    datePublication: Date;
    idutilisateur: Number;
  }[] {
    return this.commentaireIdeeProjets;
  }

  public set setCommentaireIdeeProjets(
    commentaireIdeeProjets: {
      description: string;
      datePublication: Date;
      idutilisateur: Number;
    }[]
  ) {
    this.commentaireIdeeProjets = commentaireIdeeProjets;
  }
}
