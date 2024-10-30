export default class Card {
    constructor(scene) {
        this.render = (x, y, suit, number) => {
            
            // Determines spritesheet frame from card data
            let frame;
            if (suit == 1) {
                frame = number - 1;
            } else if (suit == 2) {
                frame = number + 12;
            } else if (suit == 3) {
                frame = number + 25;
            } else if (suit == 4) {
                frame = number + 38;
            }

            let sprite = this.add.sprite(x, y, 'cardSprites', frame);
            let card = scene.add.image(suit, number, sprite).setScale(1,1).setInteractive.setData({
                "suit": this.suit,
                "number": this.number,
                "sprite": this.sprite
            });
            if (onTop) {
                scene.input.setDraggable(card);
            } else {
                card.sprite = "cardBack"
            }
            return card;
        }
    }
}