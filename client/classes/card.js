
export default class Card {
    constructor(scene) {
        //let suit
        //let number;
        //suit = this.suit;
        //number = this.number;
        //let isFlipped = false;
        //let onTop = false;
        //let sprite;

        this.render = (x, y, suit, number) => {
            //suit = this.suit;
            //number = this.number;
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

            let card = scene.add.sprite(x, y, 'cardSprites').setFrame(frame).setScale(1,1).setVisible(false).setInteractive().setData({
                "suit" : this.suit,
                "number": this.number
            }).on('drag', (pointer, gameObject, dragX, dragY) => {
                gameObject.x = dragX;
                gameObject.y = dragY;
            });

            return card;
        }

        /*this.flipCard = (Card) => {
            isFlipped = true;

        }

        this.getImg = () => {
            return img;
        }

        this.setData = (suit, number) => {
            suit = this.suit;
            number = this.number;
        }*/

    }
}

/*
.on('drag', function (pointer, gameObject, dragX, dragY) {
                gameObject.x = dragX;
                gameObject.y = dragY;
            });
*/