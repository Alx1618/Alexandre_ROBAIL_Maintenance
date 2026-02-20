import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('fr');
    const savedLocale = localStorage.getItem('locale');
    const localeToUse = (savedLocale === 'fr' || savedLocale === 'en') ? savedLocale : 'fr';
    
    // Attendre que les traductions soient chargées
    this.translate.use(localeToUse).subscribe({
      next: () => {
        console.log('Langue chargee:', localeToUse);
      },
      error: (err) => {
        console.error('Erreur lors du chargement initial de la langue:', err);
        // Essayer de charger le francais en fallback
        this.translate.use('fr').subscribe();
      }
    });
  }

  getCurrentLocale(): string {
    return this.translate.currentLang || this.translate.defaultLang || 'fr';
  }

  setLocale(locale: string): void {
    if (locale !== 'fr' && locale !== 'en') {
      console.warn('Locale invalide, utilisation de fr');
      locale = 'fr';
    }
    
    this.translate.use(locale).subscribe({
      next: () => {
        localStorage.setItem('locale', locale);
        console.log('Langue changee vers:', locale);
      },
      error: (err) => {
        console.error('Erreur lors du changement de langue:', err);
        // Fallback vers francais
        this.translate.use('fr').subscribe({
          next: () => localStorage.setItem('locale', 'fr')
        });
      }
    });
  }

  initLocale(): void {
    // Déjà fait dans le constructeur
  }
}
