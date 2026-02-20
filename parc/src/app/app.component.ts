import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './Service/auth.service';
import { LocaleService } from './Service/locale.service';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, MatToolbarModule, MatButtonModule, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'parc';

  constructor(public authService: AuthService, public router: Router, public localeService: LocaleService, private translate: TranslateService) {
    this.authService.setUser();
    // La locale est déjà initialisée dans LocaleService constructor
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }

  toggleLanguage() {
    try {
      const current = this.localeService.getCurrentLocale();
      const newLocale = current === 'fr' ? 'en' : 'fr';
      this.localeService.setLocale(newLocale);
    } catch (error) {
      console.error('Erreur lors du changement de langue:', error);
    }
  }

  getLanguageLabel(): string {
    return this.localeService.getCurrentLocale() === 'fr' ? 'EN' : 'FR';
  }
}
