import { Component, Input } from '@angular/core';
import { card, Card } from '../card';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CardService } from '../card.service';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrl: './card-details.component.css'
})
export class CardDetailsComponent {
   card: Card | undefined;
   isDisabled: boolean = true;
  
  constructor(
    private route: ActivatedRoute,
    private cardService: CardService,
    private location: Location
  ){}

  ngOnInit(): void {
    this.getCard();
  }

  getCard(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.cardService.getCard(id).subscribe(card => this.card = card);
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

  Edit() {
    this.isDisabled = false;
  }

  submit() {

    
    const id = Number(this.route.snapshot.paramMap.get('id'));
    var cardName = (<HTMLInputElement>document.getElementById('cardName')).value;
    var cardSet = (<HTMLInputElement>document.getElementById('cardSet')).value;
    var setNumber=(<HTMLInputElement>document.getElementById('setNumber')).value;
    var rarity = (<HTMLInputElement>document.getElementById('rarity')).value;
    var type = (<HTMLInputElement>document.getElementById('type')).value;
    var condition = (<HTMLInputElement>document.getElementById('condition')).value;
    var language = (<HTMLInputElement>document.getElementById('language')).value;
    var quantity = (<HTMLInputElement>document.getElementById('quanity')).value;
    var newCard = new card(id, cardName, Number(cardSet), Number(setNumber), rarity, type, condition, language, Number(quantity))
    this.cardService.updateCard(id, newCard)
  }

  Cancel() {
    this.isDisabled = true;
  }
}
