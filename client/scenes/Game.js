import { Scene } from 'phaser';
import { Card } from '..objects/card.js';
import { Deck } from '..objects/deck.js';
import { Foundation } from '..objects/foundation.js';
import { Tableau } from '..objects/tableau.js';
import { Waste } from '..objects/waste.js';

export class Game extends Phaser.Scene {
    constructor () {
        super('Game');
    }

    preload () {
        this.load.spritesheet('cardSprites', "./assets/cardSprites.png", {frameHeight: 95, frameWidth : 70, endFrame: 51});
        this.load.image('background', 'client/assets/background.png');
        this.load.image('stock', 'client/assets/stock.png');
        this.load.image('foundation', 'client/assets/foundation.png');
        this.load.image('cardBack', 'client/assets/cardBack1.png');
    }

    create () {
        this.add.image(auto, auto, 'background');
        
        this.Deck = newDeck();
        Phaser.Math.RND.shuffle([this.Deck]);
        this.Deck.deal();
        this.Deck.render();


    }

    update () {

    }

}

