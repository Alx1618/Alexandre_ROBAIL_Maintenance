import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { AttractionInterface } from '../Interface/attraction.interface';
import { CritiqueInterface } from '../Interface/critique.interface';
import { AttractionService } from '../Service/attraction.service';
import { CritiqueDialogComponent, CritiqueDialogData } from '../critique-dialog/critique-dialog.component';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-critique-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatDialogModule],
  templateUrl: './critique-list.component.html',
  styleUrl: './critique-list.component.scss',
})
export class CritiqueListComponent implements OnChanges {
  @Input({ required: true }) attraction!: AttractionInterface;

  private readonly attractionService = inject(AttractionService);
  private readonly dialog = inject(MatDialog);

  critiques$: Observable<CritiqueInterface[]> = of([]);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['attraction'] && this.attraction?.attraction_id != null) {
      this.refreshCritiques();
    }
  }

  openDialog(): void {
    const ref = this.dialog.open<CritiqueDialogComponent, CritiqueDialogData, boolean>(
      CritiqueDialogComponent,
      {
        width: '480px',
        data: { attraction: this.attraction },
      }
    );
    ref.afterClosed().subscribe((added) => {
      if (added) {
        this.refreshCritiques();
      }
    });
  }

  refreshCritiques(): void {
    const id = this.attraction?.attraction_id;
    if (id != null) {
      this.critiques$ = this.attractionService.getCritiques(id);
    } else {
      this.critiques$ = of([]);
    }
  }

  displayName(c: CritiqueInterface): string {
    if (c.nom || c.prenom) {
      return [c.prenom, c.nom].filter(Boolean).join(' ');
    }
    return $localize`:Anonymous author label:Anonyme`;
  }
}
