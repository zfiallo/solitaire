import Card from '../classes/card.js';
import Deck from '../classes/deck.js';
import Foundation from '../classes/foundation.js';
import Tableau from '../classes/tableau.js';

export default class Game extends Phaser.Scene {
    constructor () {
        super('Game');
    }

    preload () {
        this.load.spritesheet('cardSprites', "/client/assets/cardSprites.png", {frameHeight: 95, frameWidth : 70, endFrame: 51});
        this.load.image('stock', '/client/assets/stock.png');
        this.load.image('foundation', '/client/assets/foundation.png');
        this.load.image('cardBack', '/client/assets/cardBack.png');
        this.load.image('cardBack2', '/client/assets/cardBack2.png');
        this.load.image('cardBack3', '/client/assets/cardBack3.png');
    }

    create () {
        this.Deck = new Deck(this);
        this.Deck.createDeck();
        this.Deck.render(243, 100);

        this.Foundation = new Foundation(this);
        this.Foundation.render(543, 100);

        this.Tableau = new Tableau(this);
        this.Tableau.render(243, 230);

        console.log(this.Deck.getDeck());

    }

    update () {

    }

}

