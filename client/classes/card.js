
export default class Card {
    constructor(scene, suit, number) {
        suit  = this.suit;
        number = this.number;
        let isFlipped = false;
        let frame;
        let sprite;
        let onTop = false;

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
            
            if(isFlipped) {
                sprite = 'cardSprites';
            } else {
                sprite = 'cardBack';
            }

            if (onTop) {
                card.isFlipped = true;
                scene.input.setDraggable(card);
            }

            scene.add.sprite(x, y, sprite, frame).setScale(1,1).setInteractive().setData({
                "suit": suit,
                "number": number
            }).on('drag', function (pointer, gameObject, dragX, dragY) {
                gameObject.x = dragX;
                gameObject.y = dragY;
            });
        
        }

        this.flipCard = (Card) => {
            isFlipped = true;

        }

        this.getCard = (Card) => {
            return Card;
        }
        this.setCard = (newCard) => {
            this.Card = newCard;
        }
    }
}