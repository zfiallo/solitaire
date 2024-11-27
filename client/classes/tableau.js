export default class Tableau {
    constructor(scene, tableau) {

        this.render = (x, y, h, v) => {
            
            this.renderZones(x, y, h, v);
            this.renderDealtCards();
            this.update(x, y, h, v);

            return tableau;
        }

        this.renderZones = (x, y, h, v) => {
            for (let i = 0; i < 7; i++) {
                //let zone = 
                scene.add.zone(x + (h * i), y + 120, 75, 340).setDepth(-1).setInteractive({
                    dropZone: true,
                }).setData({
                    "type": 'tableau',
                    'array': tableau[i]
                });
                //this.showZones(zone);
            }
        }

        this.showZones = (dropZone) => {
            scene.add.graphics().lineStyle(4, 0xff69b4).strokeRect(dropZone.x - dropZone.input.hitArea.width / 2, dropZone.y - dropZone.input.hitArea.height / 2, dropZone.input.hitArea.width, dropZone.input.hitArea.height);
        }

        this.update = (x, y, h, v) => {
            for (let i = 0; i < 7; i++) {
                for (let j = 0; j <= tableau[i].length-1; j++) {
                    tableau[i][j].onTop = false;
                    tableau[i][j].setVisible(true).setPosition(x + (i * h), y + (j * v)).setDepth(j + 1).setData({
                        "location": tableau[i],
                        "originX": x + (i * h),
                        "originY": y + (j * v)
                    });
                    if (j == tableau[i].length-1) {
                        tableau[i][j].onTop = true;
                    }
                }
            }
            this.setTableau(tableau);
        }

        this.renderDealtCards = () => {
            for (let i = 0; i < 7; i++) {
                for (let j = 0; j <= i; j++) {
                    if (i > j) {
                        tableau[i][j].setTexture('deckSprites', [2]);
                        tableau[i][j].isFlipped = true;
                    }
                    if (i == j) {
                        scene.input.setDraggable(tableau[i][j]);
                        tableau[i][j].onTop = true;
                    }
                }
            }
        }

        this.getTableau = () => {
            return this.tableau;
        }

        this.setTableau = (tableau) => {
            this.tableau = tableau;
        }
    }
}