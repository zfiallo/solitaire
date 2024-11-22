import Deck from '../classes/deck.js';
import Foundation from '../classes/foundation.js';
import Tableau from '../classes/tableau.js';

export default class Game extends Phaser.Scene {
    constructor () {
        super('Game');
    }

    preload () {
        this.load.spritesheet('cardSprites', "/client/assets/cardSprites.png", {frameHeight: 96, frameWidth : 71, endFrame: 51});
        this.load.spritesheet('deckSprites', "/client/assets/deckSprites.png", {frameHeight: 98, frameWidth : 75, endFrame: 3});
        this.load.image('foundation', '/client/assets/foundation.png');
    }

    create () {

        this.Deck = new Deck(this);
        this.Deck.createDeck();
        this.Deck.render(243, 100);

        this.Tableau = new Tableau(this, this.Deck.deal());

        this.Tableau.render(243, 230);

        this.Foundation = new Foundation(this);
        this.Foundation.render(543, 100);

    }

    update () {

        this.input.on('drop', (pointer, card, dropZone) => {
            let target = dropZone.getData('array').at(dropZone.getData('array').length - 1);
            let dropped = false;

            if (dropZone.getData('type') == 'foundation') {
                if (((dropZone.getData('array').length == 0) && (card.getData('number') == 1)) || ((dropZone.getData('array').length > 0) && (card.getData('number') == target.getData('number') + 1) && (card.getData('suit') == target.getData('suit')))) {
                    dropped = true;
                    dropZone.getData('array').push(card.getData('location').pop(card));
                    card.setData({'location': dropZone.getData('array')});
                    this.Foundation.update(543, 100, 80);
                    this.Tableau.update(243, 230, 90, 20);
                } else {
                    this.returnCard(card);
                }
            } else if (dropZone.getData('type') == 'tableau') {
                if (dropZone.getData('array').length == 0 && card.getData('number') != 13) {
                    this.returnCard(card);
                    return;
                } else if (((card.getData('number') == 13) && (dropZone.getData('array').length == 0)) || ((card.getData('number') == target.getData('number') - 1) && (target.getData('color') != card.getData('color')))) {
                    dropped = true;
                    if (card.getData('group') != undefined) {
                        let groupArray = card.getData('group').getChildren();

                        for (let i = 0; i <= groupArray.length-1; i++) {
                            groupArray[i].getData('location').pop();
                            dropZone.getData('array').push(groupArray[i]);
                            groupArray[i].setData({'location': dropZone.getData('array')});
                        }
                        
                        card.getData('group').clear();
                    } else {
                        dropZone.getData('array').push(card.getData('location').pop(card));
                        card.setData({'location': dropZone.getData('array')});
                    }
                    this.Tableau.update(243, 230, 90, 20);
                } else {
                    this.returnCard(card);
                }
            } else {
                this.returnCard(card);
            }
            return dropped;
        });

        this.input.on('dragend', (pointer, card, dropped) => {
            if(!dropped) {
                this.returnCard(card);
            } else {
                dropped = false;
            }
        });

        this.returnCard = (card) => {
            if (card.getData('group') != undefined) {
                card.getData('group').setXY(card.getData('originX'), card.getData('originY'), 0, 20);
                card.getData('group').clear();
            } else {
                card.x = card.getData('originX');
                card.y = card.getData('originY');
            }
        }
    }
}