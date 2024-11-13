export default class Tableau {
    constructor(scene, tableau) {
        //let tableau = [[], [], [], [], [], [], []];
       // let tableau = this.tableau;

        this.render = (x,y) => {
            // vertical spacing
            let s = 20;

            // horizonal spacing was 90

            // renders dealt cards
            for (let i = 6; i >= 0; i--) {
                for (let j = i; j >= 0; j--) {
                    if (i > j) {
                        this.flipCard(tableau[i][j]);
                        tableau[i][j].setInteractive({draggable: false});
                    }
                    if (i == j) {
                        tableau[i][j].setInteractive({draggable: true});
                    }
                    tableau[i][j].depth = j + 1;
                    tableau[i][j].setVisible(true).setX(243 + (i*90)).setY(230 + (j * s));
                }
            }

            let t1 = scene.add.zone(x, y, 95, 70).setRectangleDropZone(95,70).setScale(1,1).setData({
                "cards": 0
            });
            let t2 = scene.add.zone(x + 80, y, 95, 70).setRectangleDropZone(95,70).setScale(1,1).setData({
                "cards": 0
            });
            let t3 = scene.add.zone(x + 160, y, 95, 70).setRectangleDropZone(95,70).setScale(1,1).setData({
                "cards": 0
            });
            let t4 = scene.add.zone(x + 240, y, 95, 70).setRectangleDropZone(95,70).setScale(1,1).setData({
                "cards": 0
            });
            let t5 = scene.add.zone(x + 320, y, 95, 70).setRectangleDropZone(95,70).setScale(1,1).setData({
                "cards": 0
            });
            let t6 = scene.add.zone(x + 400, y, 95, 70).setRectangleDropZone(95,70).setScale(1,1).setData({
                "cards": 0
            });
            let t7 = scene.add.zone(x + 480, y, 95, 70).setRectangleDropZone(95,70).setScale(1,1).setData({
                "cards": 0
            });
        }

        this.getArray = (i) => {
            return this.tableau[i];
        }

        this.flipCard = (card) => {
            card.setTexture('deckSprites', [2]);
        }
    }
}