import { Card } from '..objects/card.js';

export default class Deck {
    constructor(scene) {
        this.deck = [];
        
        deck.setData({
            "cardCount": 0
        })

        this.render = (x, y, sprite) => {
            let sprite = this.add.sprite(x, y, 'deckSprite', frame);
            let card = scene.add.image(sprite).setScale(1,1).setInteractive();
        }

        Deck.on('pointerover', () => {
            
        });

        this.newDeck = () => {
            // spades = 1, hearts = 2, clubs = 3, diamonds = 4
            for (let s = 1; s <= 4; s++) {
                for (n = 1; n <= 13; n++) {
                    deck.push(new Card(s, n));
                }
            }
        }

        this.shuffle = () => {
            let temp = [];
            for (let i = 0; i <= 52; i++) {
                let j = Math.floor(Math.random() * 53);
                temp = deck[i];
                deck[i] = deck[j];
                deck[j] = temp;
            }
            // Deletes any undefined cards
            let k = deck.length;
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
    }
}