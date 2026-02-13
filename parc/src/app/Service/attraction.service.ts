import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from './data.service';
import { AttractionInterface } from '../Interface/attraction.interface';
import { MessageInterface } from '../Interface/message.interface';
import { CritiqueInterface, CritiqueFormInterface } from '../Interface/critique.interface';

@Injectable({
  providedIn: 'root',
})
export class AttractionService {

  constructor(private dataService: DataService) {
  }

  public getAllAttraction(): Observable<AttractionInterface[]> {
    const url = "http://127.0.0.1:5000/attraction";
    const data = this.dataService.getData(url);
    return data as Observable<AttractionInterface[]>;
  }

  public postAttraction(attraction: AttractionInterface): Observable<MessageInterface> {
    const url = "http://127.0.0.1:5000/attraction";
    const data = this.dataService.postData(url, attraction);
    return data as Observable<MessageInterface>;
  }

  public getCritiques(attractionId: number): Observable<CritiqueInterface[]> {
    const url = `http://127.0.0.1:5000/attraction/${attractionId}/critiques`;
    return this.dataService.getData(url) as Observable<CritiqueInterface[]>;
  }

  public postCritique(attractionId: number, critique: CritiqueFormInterface): Observable<MessageInterface> {
    const url = `http://127.0.0.1:5000/attraction/${attractionId}/critique`;
    return this.dataService.postData(url, critique) as Observable<MessageInterface>;
  }
}