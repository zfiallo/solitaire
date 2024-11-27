import Card from '../classes/card.js';

export default class Deck {
    constructor(scene) {
        let deck = [];
        let waste = [];
        let reset = false;
        let isEmpty = false;

        this.render = (x, y) => {

            let deckSprite = scene.add.sprite(x, y, 'deckSprites').setFrame(0).setScale(1, 1).setInteractive().on('pointerdown', () => {

                if(deck.length == 0 && waste.length == 0) {
                    deckSprite.setFrame(3);
                    return;
                }

                if(reset) {
                    deckSprite.setFrame(0);
                    for (let j = 0; j <= waste.length-1; j++) {
                        waste[j].setVisible(false);
                    }
                    deck = waste.toReversed();
                    waste = [];
                    reset = false;
                    return;
                }
                
                let thisCard = deck.pop();
                scene.children.bringToTop(thisCard);
                /*thisCard.setVisible(true).setPosition(330, 100).setData({
                    "location": waste,
                    "originX": 330,
                    "originY": 100
                });*/

                thisCard.setVisible(true).setPosition(359, 70).setData({
                    "location": waste,
                    "originX": 359,
                    "originY": 70
                });
                
                scene.input.setDraggable(thisCard);
                waste.push(thisCard);

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
            //return deck;
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

        this.getDeck = () => {
            return this.deck;
        }

        this.setDeck = (deck) => {
            this.deck = deck;
        }

        this.getWaste = () => {
            return this.waste;
        }

        this.setWaste = (waste) => {
            this.waste = waste;
        }
    }
}