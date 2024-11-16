import Card from '../classes/card.js';

export default class Deck {
    constructor(scene) {
        let deck = [];
        let waste = [];
        let reset = false;

        this.render = (x, y) => {
            let i = 0;

            let deckSprite = scene.add.sprite(x, y, 'deckSprites').setFrame(0).setScale(1,1).setInteractive().on('pointerdown', () => {
                if(reset) {
                    waste[i-1].setVisible(false);
                    deckSprite.setFrame(0);
                    deck = waste.toReversed();
                    waste = [];
                    i = 0;
                    reset = false;
                    return;
                }

                if(i > 0) {
                    waste[i - 1].setVisible(false);
                }

                waste.push(deck.pop());
                waste[i].setVisible(true).setPosition(330, 100);
                scene.input.setDraggable(waste[i]);
                i = i + 1; 

                if (deck.length > 16) {
                    deckSprite.setFrame(0);
                } else if (deck.length > 8) {
                    deckSprite.setFrame(1);
                } else if (deck.length > 0) {
                    deckSprite.setFrame(2);
                } else if (deck.length == 0) {
                    deckSprite.setFrame(3);
                    reset = true;
                    return;
                }
            });  
        }

        this.createDeck = () => {
            let temp = [];

            // adds cards - spades = 1, hearts = 2, clubs = 3, diamonds = 4
            for (let s = 1; s <= 4; s++) {
                for (let n = 1; n <= 13; n++) {
                    deck.push(new Card(scene, s, n).render(0, 0));
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

        this.deal = () => { 
            let tableau = [[], [], [], [], [], [], []];

            for (let i = 6; i >= 0; i--) {
                for (let j = i; j >= 0; j--) {
                    tableau[i].push(deck.pop());
                }
            }

            return tableau;
        }

        //this.getDeck = () => {
        //    return deck;
        //}

        //this.flipCard = (card) => {
        //    card.setTexture('deckSprites', [2]);
        //}
    }
}