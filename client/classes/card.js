export default class Card {
    constructor(scene) {
        let  suit;
        let number;
        let sprite;
        let frame;
        let isFlipped = true;

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

        this.render = (x, y, sprite) => {
            let sprite = this.add.sprite(x, y, 'cardSprites', frame);
            let card = scene.add.image(suit, number, sprite).setScale(1,1).setInteractive.setData({
                "suit": this.suit,
                "number": this.number,
                "sprite": this.sprite
            });
            if (onTop) {
                card.isFlipped = true;
                scene.input.setDraggable(card);
            }
            return card;
        }
    }
}