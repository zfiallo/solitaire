import Card from '../classes/card.js';

export default class Deck {
    constructor(scene) {
        //let deck = [];
        let waste = [];
        let reset = false;
        let isEmpty = false;
        this.deck = [];

        this.render = (x, y) => {

            let deckSprite = scene.add.sprite(x, y, 'deckSprites').setFrame(0).setScale(1, 1).setInteractive().on('pointerdown', () => {

                if(this.deck.length == 0 && waste.length == 0) {
                    deckSprite.setFrame(3).setX(x - 3);
                    return;
                }

                if(reset) {
                    deckSprite.setFrame(0);
                    for (let j = 0; j <= waste.length-1; j++) {
                        waste[j].setVisible(false);
                    }
                    this.deck = waste.toReversed();
                    waste = [];
                    reset = false;
                    return;
                }
                
                let thisCard = this.deck.pop();
                scene.children.bringToTop(thisCard);

                thisCard.setVisible(true).setPosition(((window.innerWidth / 2 ) - 255) + 78, window.innerHeight / 5).setData({
                    "location": waste,
                    "originX": ((window.innerWidth / 2 ) - 255) + 78,
                    "originY": window.innerHeight / 5,
                });
                
                scene.input.setDraggable(thisCard);
                waste.push(thisCard);

                if (this.deck.length > 16) {
                    deckSprite.setFrame(0);
                } else if (this.deck.length > 8) {
                    deckSprite.setFrame(1).setX(x - 1);
                } else if (this.deck.length > 0) {
                    deckSprite.setFrame(2).setX(x - 2);
                } else if (this.deck.length == 0) {
                    deckSprite.setFrame(3).setX(x - 3);
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
                    this.deck.push(new Card(scene, s, n).render(0, 0));
                }
            }

            // shuffles cards
            for (let i = 0; i <= 52; i++) {
                let j = Math.floor(Math.random() * 53);
                temp = this.deck[i];
                this.deck[i] = this.deck[j];
                this.deck[j] = temp;
            }

            // Deletes any undefined cards
            for (let k = 0; k <= 52; k++) {
                if (this.deck[k] == undefined) {
                    this.deck.splice(k, 1);
                }
            }
            //return this.deck;
        }

        this.deal = () => { 
            let tableau = [[], [], [], [], [], [], []];

            for (let i = 6; i >= 0; i--) {
                for (let j = i; j >= 0; j--) {
                    tableau[i].push(this.deck.pop());
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