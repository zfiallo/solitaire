export default class Foundation {
    constructor(scene) {
        let foundation = [[], [], [], []];

        this.render = (x, y, s) => {

            this.renderZones(x, y, s);

        }

        this.update = (x, y, s) => {
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j <= foundation[i].length-1; j++) {
                    foundation[i][j].onTop = false;
                    foundation[i][j].setVisible(true).setPosition(x + (s * i), y).setDepth(j + 1).setData({
                        "location": foundation[i],
                        "originX": x + (s * i),
                        "originY": y
                    });
                    if (j == foundation[i].length-1) {
                        foundation[i][j].onTop = true;
                    }
                }
            }
            this.setFoundation(foundation);
        }

        this.renderZones = (x, y, s) => {
            for (let i = 0; i < 4; i++) {
                scene.add.image(x + (s * i), y, 'foundation').setScale(1,1);
                //let zone = 
                scene.add.zone(x + (s * i), y, 75, 100).setRectangleDropZone(70, 95).setInteractive({
                    dropZone: true
                }).setData({
                    "type": 'foundation',
                    "array": foundation[i]
                });
                //this.showZones(zone);
            }
        }

        this.showZones = (dropZone) => {
            scene.add.graphics().lineStyle(4, 0xff69b4).strokeRect(dropZone.x - dropZone.input.hitArea.width / 2, dropZone.y - dropZone.input.hitArea.height / 2, dropZone.input.hitArea.width, dropZone.input.hitArea.height);
        }

        this.getFoundation = () => {
            return this.foundation;
        }

        this.setFoundation = (foundation) => {
            this.foundation = foundation;
        }
    }
}