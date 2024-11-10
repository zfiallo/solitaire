import Card from '../classes/card.js';

export default class Deck {
    constructor(scene) {
        let deck = [];
        let waste = [];

        this.render = (x, y) => {
            let deckSprite;

            if (deck.length > 20) {
                deckSprite = 'cardBack3';
            } else if (deck.length > 10) {
                deckSprite = 'cardBack2';
            } else if (deck.length > 0) {
                deckSprite = 'cardBack';
            } else if (deck.length == 0) {
                deckSprite = 'stock';
            }

            scene.add.image(x, y, deckSprite).setScale(1,1).setInteractive().on('pointerdown', () => {
                let i;

                if ((deck.length % 3) == 0) {
                    i = 0;
                    
                }
                if(deck.length  == 0) {
                    deck.push(waste);
                }

                this.Card = deck.lastIndexOf;
        
                this.Card.setVisible(true);
               // this.Card.setVisible(true);
                //this.Card.render(scene, 0, 0);
                //this.Card.render(283+(i*5), 100);
                waste.push(deck.pop());
                i++;
            });  
        }

        this.createDeck = () => {
            let temp = [];

            // adds cards - spades = 1, hearts = 2, clubs = 3, diamonds = 4
            for (let s = 1; s <= 4; s++) {
                for (let n = 1; n <= 13; n++) {
                    this.Card = new Card(this);
                    //this.Card.render(0, 0, s, n);
                    deck.push(this.Card.render(0, 0, s, n));
                }
            }

            // shuffles cards
            for (let i = 0; i <= 52; i++) {
                let j = Math.floor(Math.random() * 53);
                temp = deck[i];
                deck[i] = deck[j];
                deck[j] = temp;
            }

            // Deletes any undefined cards
            for (let k = 0; k <= 52; k++) {
                if (deck[k] == undefined) {
                    deck.splice(k, 1);
                }
            }
        }

        this.deal = () => {
            for (let i = 1; i <= 7; i++) {
                tableau[7].push(deck.pop());
            }
            for (let i = 1; i <= 6; i++) {
                tableau[6].push(deck.pop());
            }
            for (let i = 1; i <= 5; i++) {
                tableau[5].push(deck.pop());
            }
            for (let i = 1; i <= 4; i++) {
                tableau[4].push(deck.pop());
            }
            for (let i = 1; i <= 3; i++) {
                tableau[3].push(deck.pop());
            }
            for (let i = 1; i <= 2; i++) {
                tableau[2].push(deck.pop());
            }
            tableau[1].push(deck.pop());
        }

        this.getDeck = () => {
            return deck;
        }
    }
}