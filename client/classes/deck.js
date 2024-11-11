import Card from '../classes/card.js';

export default class Deck {
    constructor(scene) {
        let deck = [];
        let waste = [];
        let hidden = [];
        let resetDeck = false;

        this.render = (x, y) => {
            let i = 0;

            let deckSprite = scene.add.sprite(x, y, 'deckSprites').setFrame(0).setScale(1,1).setInteractive().on('pointerdown', () => {

                if (deck.length > 20) {
                    deckSprite.setFrame(1);
                } else if (deck.length > 10) {
                    deckSprite.setFrame(2);
                } else if (deck.length == 0) {
                    deckSprite.setFrame(3);
                }

                if(resetDeck) {
                    waste[i-1].setVisible(false);
                    deckSprite.setFrame(1);
                    deck = waste.reverse();
                    waste = [];
                    i = 0;
                    resetDeck = false;
                    return;
                }

                if(deck.length == 0) {
                    resetDeck = true;
                    return;
                }

                if(i > 0) {
                    waste[i - 1].setVisible(false);
                }

                waste.push(deck.pop());
                waste[i].setVisible(true).setX(330).setY(100);
                waste[i].setInteractive({draggable: true});
                i = i + 1; 
            });  
        }

        this.createDeck = () => {
            let temp = [];

            // adds cards - spades = 1, hearts = 2, clubs = 3, diamonds = 4
            for (let s = 1; s <= 4; s++) {
                for (let n = 1; n <= 13; n++) {
                    deck.push(new Card(scene).render(0, 0, s, n));
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
            return deck;
        }

        this.deal = (scene) => {
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