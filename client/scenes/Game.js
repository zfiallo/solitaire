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

        //console.log();
    }

    update () {

    }

}