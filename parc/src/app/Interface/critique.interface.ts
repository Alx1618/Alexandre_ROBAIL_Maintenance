export interface CritiqueInterface {
  critique_id: number;
  attraction_id: number;
  texte: string;
  note: number;
  nom: string | null;
  prenom: string | null;
}

export interface CritiqueFormInterface {
  texte: string;
  note: number;
  nom?: string;
  prenom?: string;
}
