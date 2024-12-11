import { Component } from '@angular/core';
import { card } from '../card';
import { CardService } from '../card.service';

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.component.html',
  styleUrl: './new-card.component.css'
})
export class NewCardComponent {

  constructor(private cardService: CardService)
  {

  }
  rarity = ["Common", "Uncommon", "Rare", "Holo Rare", "Reverse Holo", "Ultra Rare", "Secret Rare", "Full Art", "Rainbow Rare", "Promo"]
  type = [
    "Grass",
    "Fire",
    "Water",
    "Lightning",
    "Psychic",
    "Fighting",
    "Darkness",
    "Metal",
    "Fairy",
    "Dragon",
    "Colorless"
  ];
  condition = [
    "Mint (M)",
    "Near Mint (NM)",
    "Lightly Played (LP)",
    "Moderately Played (MP)",
    "Heavily Played (HP)",
    "Damaged (DMG)"
  ];

  addCard() {
    var cardName = (<HTMLInputElement>document.getElementById('cardName')).value;
    var cardSet = (<HTMLInputElement>document.getElementById('cardSet')).value;
    var setNumber=(<HTMLInputElement>document.getElementById('setNumber')).value;
    var rarity = (<HTMLInputElement>document.getElementById('rarity')).value;
    var type = (<HTMLInputElement>document.getElementById('type')).value;
    var condition = (<HTMLInputElement>document.getElementById('condition')).value;
    var language = (<HTMLInputElement>document.getElementById('language')).value;
    var quantity = (<HTMLInputElement>document.getElementById('quanity')).value;
    var newCard = new card(0, cardName, Number(cardSet), Number(setNumber), rarity, type, condition, language, Number(quantity))
    this.cardService.addCard(newCard)
  }
  
  onSubmit() { 
    this.addCard();
    
  }
}