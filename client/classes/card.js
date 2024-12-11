export default class Card {
    constructor(scene) {
        this.firstClickTime = 0;

        this.render = (x, y, suit, number) => {
            let originX = x;
            let originY = y;
            let isFlipped = false;
            let onTop = false;
            let frame;
            let color;

            if (suit == 1) {
                frame = number - 1;
                color = 1;
            } else if (suit == 2) {
                frame = number + 12;
                color = 2;
            } else if (suit == 3) {
                frame = number + 25;
                color = 1;
            } else if (suit == 4) {
                frame = number + 38;
                color = 2;
            }

            let card = scene.add.sprite(x, y, 'cardSprites').setFrame(frame).setVisible(false).setScale(1, 1).setInteractive({
                draggable: false
            }).setData({
                "suit" : suit,
                "number": number,
                "location": undefined,
                "color": color,
                "originX": originX,
                "originY": originY
            }).on('pointerdown', () => {
                // flips cards over when they are on top
                if(card.isFlipped && card.onTop) {
                    isFlipped = false;
                    card.setTexture('cardSprites', frame);
                    scene.input.setDraggable(card);
                }

                // double click functionality
                if (this.firstClickTime == 0) {
                    this.firstClickTime = new Date();
                    return;
                }
                   
                let elapsed = new Date() - this.firstClickTime;
                   
                if (elapsed < 350) {
                    scene.doubleClick(card);
                }
                   
                this.firstClickTime = 0;
                
            }).on('drag', (pointer, dragX, dragY) => {
                let thisArray =  card.getData('location');

                if ((thisArray.length - 1) != thisArray.indexOf(card)) {        // drag multiple cards at once
                    let group = scene.add.group();

                    for (let i = thisArray.indexOf(card); i <= thisArray.length - 1; i++) {
                        group.add(thisArray.at(i));
                        scene.children.bringToTop(thisArray.at(i));
                        thisArray.at(i).setData({'group': group});
                    }
                    
                    group.setXY(dragX, dragY, 0, 20);
                    return group;
                } else {                                // basic drag function
                    scene.children.bringToTop(card);
                    card.x = dragX;
                    card.y = dragY;
                }
            });
            
            return card;
        }
    }
}