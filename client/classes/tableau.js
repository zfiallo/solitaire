export default class Tableau {
    constructor(scene, tableau) {

        this.render = (x, y) => {
            let v = 20;     // vertical spacing     
            let h = 80;     // horizonal spacing

            // renders dealt cards
            for (let i = 6; i >= 0; i--) {
                for (let j = i; j >= 0; j--) {
                    if (i > j) {
                        tableau[i][j].setTexture('deckSprites', [2]);
                        tableau[i][j].isFlipped = true;
                    }
                    if (i == j) {
                        scene.input.setDraggable(tableau[i][j]);
                        tableau[i][j].onTop = true;
                    }
                    tableau[i][j].depth = j + 1;
                    tableau[i][j].setVisible(true).setPosition(243 + (i * 90), 230 + (j * v));
                }
            }

            //for(let i = 0; i > 7; i++) {
            //    tableau[i].lastIndexOf.onTop = true;
            //}

            // width was 70

            // render drop zones
            /*
            for (let k = 0; k < 7; k++) {
                scene.add.zone(x + (h * k), y).setRectangleDropZone(tableau[k].lastIndexOf().y, 95).setInteractive({
                    dropZone: true
                }).setData({
                    "cards": 0
                });
            }
            */
            ///*
            let dropZone = scene.add.zone(x, y).setRectangleDropZone(95, 70).setInteractive({
                dropZone: true
            }).setData({
                "cards": 0
            });
            let t2 = scene.add.zone(x + h, y).setRectangleDropZone(95, 70).setInteractive({
                dropZone: true
            }).setData({
                "cards": 0
            });
            let t3 = scene.add.zone(x + (2 * h), y).setRectangleDropZone(95, 70).setInteractive({
                dropZone: true
            }).setData({
                "cards": 0
            });
            let t4 = scene.add.zone(x + (3 * h), y).setRectangleDropZone(95, 70).setInteractive({
                dropZone: true
            }).setData({
                "cards": 0
            });
            let t5 = scene.add.zone(x + (4 * h), y).setRectangleDropZone(95, 70).setInteractive({
                dropZone: true
            }).setData({
                "cards": 0
            });
            let t6 = scene.add.zone(x + (5 * h), y).setRectangleDropZone(95, 70).setInteractive({
                dropZone: true
            }).setData({
                "cards": 0
            });
            let t7 = scene.add.zone(x + (6 * h), y).setRectangleDropZone(95, 70).setInteractive({
                dropZone: true
            }).setData({
                "cards": 0
            });
            //*/
        }

        //this.getArray = (i) => {
        //    return this.tableau[i];
        //}
        /*
        this.flipCard = (card) => {
            card.setTexture('deckSprites', [2]);
            card.setInteractive({draggable: false});
            card.isFlipped = true;
        }*/
    }
}