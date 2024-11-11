
export default class Card {
    constructor(scene) {
        //let isFlipped = false;
        //let onTop = false;

        this.render = (x, y, suit, number) => {
            let frame;

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

            //sprite = 'cardSprites';
            /*if(isFlipped) {
                sprite = 'cardSprites';
            } else {
                sprite = 'cardBack';
            }*/

            let card = scene.add.sprite(x, y, 'cardSprites').setFrame(frame).setVisible(false).setData({
                "suit" : this.suit,
                "number": this.number
            }).on('drag', (pointer, dragX, dragY) => {
                card.depth = 1;
                card.x = dragX;
                card.y = dragY;
            }).on('dragend', (pointer) => {
                card.x = 330;
                card.y = 100;
            });

            return card;
        }

        this.setVisible = (card) => {
            this.card.setVisible(true);

        }

        this.flipCard = (card) => {
            this.card.setSprite('deckSprites').setFrame(2);
        }

    }
}
