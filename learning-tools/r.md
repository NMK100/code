Voici un **pipe Angular** (`enumToLabel`) qui convertit les valeurs de l’énumération `DomaineIdeeProjet` en noms présentables. Il est prêt à être utilisé dans un projet Angular :

---

### ✅ **Fichier du pipe : `enum-to-label.pipe.ts`**

```ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumToLabel'
})
export class EnumToLabelPipe implements PipeTransform {

  private readonly labelMap: { [key: string]: string } = {
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

  transform(value: string): string {
    return this.labelMap[value] || value;
  }
}
```

---

### ✅ **Utilisation dans un template Angular**

```html
<span>{{ domaineProjet | enumToLabel }}</span>
```

Par exemple, si `domaineProjet = 'FINTECH'`, le résultat affiché sera **"Finance"**.

---

### ✅ **Déclaration dans un module Angular**

Ajoute le pipe à ton module (`app.module.ts` ou un module spécifique) :

```ts
import { EnumToLabelPipe } from './pipes/enum-to-label.pipe';

@NgModule({
  declarations: [
    // autres composants...
    EnumToLabelPipe
  ],
  exports: [
    EnumToLabelPipe
  ]
})
export class SharedModule { }
```

---

Souhaites-tu également un système multilingue (ex: i18n) pour ce pipe ou une version qui fonctionne avec une énumération TypeScript directement plutôt qu’un `string` ?
