export default class Card {
    constructor(scene, suit, number) {
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
        
        this.render = (x, y) => {
            let originX = x;
            let originY = y;

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
                if(card.isFlipped && card.onTop) {
                    card.setTexture('cardSprites', frame);
                    scene.input.setDraggable(card);
                }
            }).on('drag', (pointer, dragX, dragY) => {
                let thisArray =  card.getData('location');

                if ((thisArray.length - 1) != thisArray.indexOf(card)) {
                    let group = scene.add.group();

                    for (let i = thisArray.indexOf(card); i <= thisArray.length - 1; i++) {
                        group.add(thisArray.at(i));
                        scene.children.bringToTop(thisArray.at(i));
                        thisArray.at(i).setData({'group': group});
                    }
                    
                    group.setXY(dragX, dragY, 0, 20);
                    return group;
                } else {
                    scene.children.bringToTop(card);
                    card.x = dragX;
                    card.y = dragY;
                }
            });
            
            return card;
        }

        this.getLocation = () => {
            return this.location;
        }

        this.setLocation = (location) => {
            this.location = location;
        }
    }
}