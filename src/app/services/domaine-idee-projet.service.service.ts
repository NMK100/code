import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DomaineIdeeProjetService {

  private readonly enumToLabelMap: { [key: string]: string } = {
    FINTECH: 'Finance',
    EDTECH: 'Éducation',
    HEALTHTECH: 'Santé',
    AGRITECH: 'Agriculture',
    LEGALTECH: 'Droit',
    GOVTECH: 'Secteur public',
    GREENTECH: 'Écologie',
    PROPTECH: 'Immobilier',
    INSURTECH: 'Assurance',
    HRTECH: 'Ressources humaines',
    RETAILTECH: 'Commerce',
    TRAVELTECH: 'Tourisme',
    SPORTTECH: 'Sport',
    ADTECH: 'Publicité',
    MARTECH: 'Marketing',
    MUSICTECH: 'Musique',
    FASHIONTECH: 'Mode',
    FOODTECH: 'Alimentation',
    CYBERSECURITY: 'Cybersécurité',
    AI_ML: 'Intelligence Artificielle',
    IOT: 'Internet des Objets',
    BIG_DATA: 'Big Data',
    CLOUD_COMPUTING: 'Cloud Computing',
    BLOCKCHAIN: 'Blockchain'
  };

  private readonly labelToEnumMap: { [label: string]: string };

  constructor() {
    // Construction automatique du mapping inverse
    this.labelToEnumMap = Object.entries(this.enumToLabelMap)
      .reduce((acc, [key, value]) => {
        acc[value] = key;
        return acc;
      }, {} as { [label: string]: string });
  }

  /** Retourne un label lisible à partir de l’enum */
  getLabelFromEnum(enumKey: string): string {
    return this.enumToLabelMap[enumKey] || enumKey;
  }

  /** Retourne l’enum correspondant à partir d’un label */
  getEnumFromLabel(label: string): string {
    return this.labelToEnumMap[label] || label;
  }

  /** Retourne la liste complète des options (utile pour des <select>) */
  getAllOptions(): { key: string, label: string }[] {
    return Object.entries(this.enumToLabelMap).map(([key, label]) => ({ key, label }));
  }
}

