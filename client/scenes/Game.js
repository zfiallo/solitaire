import { Scene } from 'phaser';
import { deck } from '..objects/deck.js';
import { Card } from '..objects/card.js';
import { Stack } from '..objects/stack.js';

export class Game extends Phaser.Scene 
{
    constructor () 
    {
        super('Game');
    }

    preload () 
    {
        this.load.spritesheet('cardSprites', "./assets/cardSprites.png", {frameHeight: 95, frameWidth : 70, endFrame: 51});
        this.load.image('background', 'client/assets/background.png');
        this.load.image('stock', 'client/assets/stock.png');
        this.load.image('foundation', 'client/assets/foundation.png');
        this.load.image('cardBack', 'client/assets/cardBack1.png');
    }

    create () 
    {
        this.add.image(auto, auto, 'background');
        
        this.Deck = new Deck();

        
    }

    update () 
    {

    }

}

