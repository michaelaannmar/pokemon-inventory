import { Component, OnInit } from '@angular/core';
import { Card } from '../card';
import { CardService } from '../card.service';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent  {
  Cards: Card[] = [];
  isModalOpen = false; 
  cardIdToDelete: number | null = null; 
  constructor(private cardService: CardService)
  {

  }

  getCards(): void {
    this.cardService.getCards().subscribe(cards => this.Cards = cards);
  }

  ngOnInit(): void {
    this.getCards();
  }
  confirmDelete(id: number): void {
    this.cardIdToDelete = id;
    this.isModalOpen = true;
  }

  // Close the confirmation modal
  closeModal(): void {
    this.isModalOpen = false;
    this.cardIdToDelete = null;
  }

  deleteCard(): void {
    if(this.cardIdToDelete !== null) {
    this.cardService.deleteCard(this.cardIdToDelete);
  }}
}
