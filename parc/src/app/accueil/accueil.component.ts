import { Component } from '@angular/core';
import { AttractionService } from '../Service/attraction.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { AttractionInterface } from '../Interface/attraction.interface';
import { MatCardModule } from '@angular/material/card';
import { CritiqueListComponent } from '../critique-list/critique-list.component';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule, MatCardModule, CritiqueListComponent],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss'
})
export class AccueilComponent {

  constructor(public attractionService: AttractionService) {}

  public attractions: Observable<AttractionInterface[]> = this.attractionService.getAllAttraction();

  getStars(difficulte: number): { filled: boolean }[] {
    const n = Math.min(5, Math.max(0, difficulte || 0));
    return Array.from({ length: 5 }, (_, i) => ({ filled: i < n }));
  }
}
