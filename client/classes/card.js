export default class Card {
    constructor(scene) {

        this.render = (x, y, suit, number) => {
            let originX = x;
            let originY = y;
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
                "originY": originY,
                "group": undefined,
                "isFlipped": false,
                "onTop": false,
                "clickTime": 0
            }).on('pointerdown', () => {

                // flips cards over when they are on top
                if(card.getData('isFlipped') && card.getData('onTop')) {
                    card.setData('isFlipped', false);
                    card.setTexture('cardSprites', frame);
                    scene.input.setDraggable(card);

                    card.setData('clickTime', 0);   
                    return;
                }

                // double click functionality
                if (card.getData('clickTime') == 0) {
                    card.setData('clickTime', new Date());
                    return;
                }
                   
                let elapsed = new Date() - card.getData('clickTime');
                   
                if (elapsed < 350) {
                    scene.doubleClick(card);
                    card.setData('clickTime', 0);
                }

                card.setData('clickTime', 0);

            }).on('drag', (pointer, dragX, dragY) => {
                let thisArray =  card.getData('location');

                if (((thisArray.length - 1) != thisArray.indexOf(card)) && thisArray != 'waste') {        // drag multiple cards at once
                    let group = scene.add.group();

                    for (let i = thisArray.indexOf(card); i <= thisArray.length - 1; i++) {
                        group.add(thisArray[i]);
                        scene.children.bringToTop(thisArray[i]);
                        thisArray[i].setData({
                            'group': group,
                            'clickTime': 0

                        });
                    }
                    
                    group.setXY(dragX, dragY, 0, 20);
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