export interface Card {
    id: number,
    cardName: string,
    cardSet: number,
    setNumber: number,
    rarity: string,
    type: string,
    condition: string,
    language: string,
    quantity: number
}

export class card {
    constructor(
        public id: number,
        public cardName: string,
        public cardSet: number,
        public setNumber: number,
        public rarity: string,
        public type: string,
        public condition: string,
        public language: string,
        public quantity: number
    ) {
        
    }
}
