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

        this.createDemo = () => {
            ///*  create demo deck
            let s = [3, 3, 2, 2, 3, 2, 1, 2, 1, 1, 4, 4, 1, 4, 1, 2, 4, 3, 4, 4, 1, 3, 2, 1, 1, 4, 4, 3, 2, 2, 3, 3, 1, 2, 1, 4, 2, 3, 4, 3, 3, 1, 4, 2, 3, 2, 4, 3, 4, 2, 1, 1];
            let n = [1, 6, 4, 7, 7, 9, 5, 3, 10, 8, 5, 12, 12, 2, 4, 8, 1, 2, 11, 7, 2, 13, 5, 3, 9, 4, 6, 3, 1, 10, 5, 10, 1, 12, 13, 9, 11, 9, 8, 11, 12, 6, 10, 13, 8, 2, 3, 4, 13, 6, 7, 11];
            
            this.Card = new Card(scene);

            for (let i = 0; i < 52; i++) {
                this.deck.push(this.Card.render(0, 0, s[i], n[i]));
            }
            //*/
            /*  get random deck
            let s = [];
            let n = [];


            for (let i = 0; i < 52; i++) {
                s.push(this.deck[i].getData('suit'));
                n.push(this.deck[i].getData('number'));
            }
            console.log(s, n);
            */
        }

        this.createDeck = () => {
            let temp = [];
            this.Card = new Card(scene);
            // adds cards - spades = 1, hearts = 2, clubs = 3, diamonds = 4
            for (let s = 1; s <= 4; s++) {
                for (let n = 1; n <= 13; n++) {
                    this.deck.push(this.Card.render(0, 0, s, n));
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