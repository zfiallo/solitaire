import { Scene } from 'phaser';
import { Deck } from '..objects/Deck.js';
import { Card } from '..objects/Card.js';
import { Stack } from '..objects/Stack.js';

export class Game extends Scene 
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
        this.Deck = new Deck();
    }

    update () 
    {

    }

}

