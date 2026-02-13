import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AttractionInterface } from '../Interface/attraction.interface';
import { CritiqueFormInterface } from '../Interface/critique.interface';
import { AttractionService } from '../Service/attraction.service';

export interface CritiqueDialogData {
  attraction: AttractionInterface;
}

@Component({
  selector: 'app-critique-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
  ],
  templateUrl: './critique-dialog.component.html',
  styleUrl: './critique-dialog.component.scss',
})
export class CritiqueDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<CritiqueDialogComponent>);
  private readonly data = inject<CritiqueDialogData>(MAT_DIALOG_DATA);
  private readonly fb = inject(FormBuilder);
  private readonly attractionService = inject(AttractionService);

  attraction = this.data.attraction;

  form = this.fb.nonNullable.group({
    texte: ['', [Validators.required, Validators.minLength(10)]],
    note: [3, [Validators.required, Validators.min(1), Validators.max(5)]],
    anonyme: [false],
    nom: [''],
    prenom: [''],
  });

  onSubmit(): void {
    if (this.form.invalid) return;
    const v = this.form.getRawValue();
    const payload: CritiqueFormInterface = {
      texte: v.texte,
      note: v.note,
    };
    if (!v.anonyme) {
      payload.nom = v.nom || undefined;
      payload.prenom = v.prenom || undefined;
    }
    this.attractionService.postCritique(this.attraction.attraction_id!, payload).subscribe({
      next: () => this.dialogRef.close(true),
      error: () => this.dialogRef.close(false),
    });
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
