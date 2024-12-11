import { Injectable } from '@angular/core';
import { Card } from './card';
import { catchError, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private url = 'http://localhost:5038/pokemonInventory';
  constructor(
    private http: HttpClient
  ) { }

  getCards(): Observable<Card[]> {
    return this.http.get<Card[]>(this.url+"/GetAllInventory");
    
  }

  getCard(id: number): Observable<Card> {
    return this.http.get<Card>(`${this.url}/GetInventory?id=${id}`);
  }

  addCard(card: Card): Observable<any> {
    return this.http.post(`${this.url}/AddInventory`, card);
  }

  deleteCard(id: number): Observable<any> {
    return this.http.delete(`${this.url}/DeleteInventory?id=${id}`);
  }

  // Update an existing card by ID
  updateCard(id: number, card: Card): Observable<any> {
    return this.http.put(`${this.url}/UpdateInventory?id=${id}`, card);
  }
}
