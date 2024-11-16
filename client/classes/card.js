
import Tableau from '../classes/tableau.js';
export default class Card {
    constructor(scene, suit, number) {
        let frame;
        let isFlipped = false;
        //let onTop = false;

        // Determines spritesheet frame from card data
        if (suit == 1) {
            frame = number - 1;
        } else if (suit == 2) {
            frame = number + 12;
        } else if (suit == 3) {
            frame = number + 25;
        } else if (suit == 4) {
            frame = number + 38;
        }

        this.render = (x, y) => {

            let card = scene.add.sprite(x, y, 'cardSprites').setFrame(frame).setVisible(false).setInteractive({
                draggable: false
            }).setData({
                "suit" : this.suit,
                "number": this.number
            }).on('pointerdown', () => {
                if(!isFlipped) {
                    card.setTexture('cardSprites', frame);
                    scene.input.setDraggable(card);
                }
            }).on('drag', (pointer, dragX, dragY) => {
                scene.children.bringToTop(card);
                card.x = dragX;
                card.y = dragY;
            }).on('dragend', (pointer, dragX, dragY) => {
                //card.x = x;
                //card.y = y;
            }).on('drop', (pointer, card, dropZone) => {
                card.x = dropZone.x;
                card.y = dropZone.y;
                //card.x = Phaser.Math.Snap.To(dropZone.x, 32);
                //card.y = Phaser.Math.Snap.To(dropZone.y, 32);
                //card.setPosition(dropZone.x, dropZone.y);
            });
            
            return card;
        }
    }
}